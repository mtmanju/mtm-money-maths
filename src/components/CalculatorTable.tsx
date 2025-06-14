import React from 'react';
import { StyledTableContainer, tableStyles, tableHeaderCell, tableCell } from './calculatorStyles';

export interface CalculatorTableColumn {
  label: string;
  key: string;
}

export const CalculatorTable: React.FC<{
  columns: CalculatorTableColumn[];
  rows: any[];
}> = ({ columns, rows }) => (
  <StyledTableContainer>
    <table style={tableStyles as React.CSSProperties}>
      <thead>
        <tr>
          {columns.map((col, idx) => (
            <th key={col.key} style={tableHeaderCell as React.CSSProperties}>{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, idx) => (
          <tr key={idx}>
            {columns.map((col) => (
              <td key={col.key} style={tableCell as React.CSSProperties}>
                {row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </StyledTableContainer>
); 