import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

interface DownloadData {
  title: string;
  summary: { label: string; value: string }[];
  yearlyBreakdown: Record<string, string | number>[];
}

export const downloadExcel = (data: DownloadData) => {
  const workbook = XLSX.utils.book_new();
  
  // Summary sheet
  const summaryData = data.summary.map(item => ({
    Metric: item.label,
    Value: item.value
  }));
  const summarySheet = XLSX.utils.json_to_sheet(summaryData);
  XLSX.utils.book_append_sheet(workbook, summarySheet, 'Summary');
  
  // Yearly breakdown sheet
  const breakdownSheet = XLSX.utils.json_to_sheet(data.yearlyBreakdown);
  XLSX.utils.book_append_sheet(workbook, breakdownSheet, 'Yearly Breakdown');
  
  // Write to file
  XLSX.writeFile(workbook, `${data.title}.xlsx`);
};

export const downloadPDF = (data: DownloadData) => {
  const doc = new jsPDF();
  
  // Title
  doc.setFontSize(20);
  doc.text(data.title, 14, 20);
  
  // Summary section
  doc.setFontSize(16);
  doc.text('Summary', 14, 40);
  
  const summaryTable = data.summary.map(item => [item.label, item.value]);
  (doc as any).autoTable({
    startY: 45,
    head: [['Metric', 'Value']],
    body: summaryTable,
    theme: 'grid'
  });
  
  // Yearly breakdown section
  const tableY = (doc as any).lastAutoTable.finalY + 20;
  doc.setFontSize(16);
  doc.text('Yearly Breakdown', 14, tableY);
  
  const breakdownTable = data.yearlyBreakdown.map(row => 
    Object.values(row).map(value => value.toString())
  );
  (doc as any).autoTable({
    startY: tableY + 5,
    head: [Object.keys(data.yearlyBreakdown[0])],
    body: breakdownTable,
    theme: 'grid'
  });
  
  doc.save(`${data.title}.pdf`);
}; 