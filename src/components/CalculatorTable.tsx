import React from 'react';
import { StyledTableContainer } from './calculatorStyles';
import { colors, typography } from './calculatorStyles';

interface Column {
  label: string;
  key: string;
}

interface CalculatorTableProps {
  columns: Column[];
  rows: any[];
}

export const CalculatorTable: React.FC<CalculatorTableProps> = ({ columns, rows }) => {
  return (
    <StyledTableContainer>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: typography.fontFamily, fontSize: '0.9rem', color: colors.secondary }}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th 
                key={column.key}
                style={{ 
                  padding: '12px', 
                  textAlign: column.key === 'year' || column.key === 'month' ? 'left' : 'right', 
                  borderBottom: '1px solid #E0E0E0',
                  fontWeight: 600
                }}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td 
                  key={column.key}
                  style={{ 
                    padding: '12px', 
                    textAlign: column.key === 'year' || column.key === 'month' ? 'left' : 'right', 
                    borderBottom: '1px solid #E0E0E0'
                  }}
                >
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </StyledTableContainer>
  );
}; 