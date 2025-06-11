import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import ExcelJS from 'exceljs';
import { formatCurrency, formatPercentage } from './formatUtils';

interface SummaryItem {
  label: string;
  value: string;
}

interface DownloadData {
  title: string;
  summary: Array<{
    label: string;
    value: string;
  }>;
  description?: string;
  yearlyBreakdown?: Array<{
    [key: string]: string | number;
  }>;
}

export const downloadExcel = (data: DownloadData) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Summary');
  
  // Add title
  worksheet.mergeCells('A1:B1');
  worksheet.getCell('A1').value = data.title;
  worksheet.getCell('A1').font = { size: 16, bold: true };
  
  // Add headers
  worksheet.getCell('A2').value = 'Metric';
  worksheet.getCell('B2').value = 'Value';
  worksheet.getRow(2).font = { bold: true };
  
  // Add data
  data.summary.forEach((item, index) => {
    worksheet.getCell(`A${index + 3}`).value = item.label;
    worksheet.getCell(`B${index + 3}`).value = item.value;
  });
  
  // Auto-fit columns (guard for undefined)
  if (worksheet.columns) {
    worksheet.columns.forEach((column: Partial<ExcelJS.Column>) => {
      column.width = 20;
    });
  }
  
  // Save file
  workbook.xlsx.writeBuffer().then((buffer: ArrayBuffer) => {
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.title.toLowerCase().replace(/\s+/g, '-')}.xlsx`;
    a.click();
    window.URL.revokeObjectURL(url);
  });
};

export const downloadPDF = (data: DownloadData) => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(16);
  doc.text(data.title, 14, 15);
  
  // Add summary table
  autoTable(doc, {
    startY: 25,
    head: [['Metric', 'Value']],
    body: data.summary.map(item => [item.label, item.value]),
    theme: 'grid',
    headStyles: { fillColor: [41, 128, 185] },
  });
  
  // Add description if available
  if (data.description) {
    const finalY = (doc as any).lastAutoTable.finalY || 30;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(data.description, 14, finalY + 20);
  }
  
  doc.save(`${data.title.toLowerCase().replace(/\s+/g, '-')}.pdf`);
}; 