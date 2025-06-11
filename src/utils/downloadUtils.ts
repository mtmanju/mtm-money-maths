import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import ExcelJS from 'exceljs';
import { formatCurrency, formatPercentage } from './formatUtils';

interface SummaryItem {
  label: string;
  value: string;
}

interface DownloadData {
  summary: SummaryItem[];
  title: string;
  description?: string;
  yearlyBreakdown?: Array<{
    [key: string]: string | number;
  }>;
}

export const downloadExcel = async (data: DownloadData) => {
  // Create a new workbook
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'MTM Money Maths';
  workbook.created = new Date();

  // Add summary sheet
  const summarySheet = workbook.addWorksheet('Summary');
  summarySheet.columns = [
    { header: 'Parameter', key: 'parameter', width: 30 },
    { header: 'Value', key: 'value', width: 20 }
  ];

  // Add summary data
  data.summary.forEach((item: SummaryItem) => {
    summarySheet.addRow({ parameter: item.label, value: item.value });
  });

  // Style summary sheet
  summarySheet.getRow(1).font = { bold: true };
  summarySheet.getColumn('parameter').font = { bold: true };

  // Add yearly breakdown sheet
  const breakdownSheet = workbook.addWorksheet('Yearly Breakdown');
  if (data.yearlyBreakdown && data.yearlyBreakdown.length > 0) {
    const headers = Object.keys(data.yearlyBreakdown[0]);
    breakdownSheet.columns = headers.map(header => ({
      header,
      key: header,
      width: 20
    }));

    // Add data rows
    data.yearlyBreakdown.forEach(row => {
      breakdownSheet.addRow(row);
    });

    // Style breakdown sheet
    breakdownSheet.getRow(1).font = { bold: true };
  }

  // Save the file
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${data.title}.xlsx`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

export const downloadPDF = async (data: DownloadData) => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text(data.title, 14, 20);

  // Add summary table
  autoTable(doc, {
    startY: 30,
    head: [['Parameter', 'Value']],
    body: data.summary.map((item: SummaryItem) => [item.label, item.value]),
    theme: 'grid',
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: 255,
      fontStyle: 'bold',
    },
    styles: {
      font: 'helvetica',
      fontSize: 10,
    },
    columnStyles: {
      0: { cellWidth: 80 },
      1: { cellWidth: 100 },
    },
  });

  // Add description if available
  if (data.description) {
    const finalY = (doc as any).lastAutoTable.finalY || 30;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(data.description, 14, finalY + 20);
  }

  // Save the PDF
  doc.save(`${data.title.toLowerCase().replace(/\s+/g, '-')}.pdf`);
}; 