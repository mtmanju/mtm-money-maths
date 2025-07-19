import React, { useMemo } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Box } from '@mui/material';

export interface ChartLineConfig {
  dataKey: string;
  color: string;
  name?: string;
}

export interface CalculatorChartProps {
  data: any[];
  lines: ChartLineConfig[];
  xKey?: string;
  yLabel?: string;
  height?: number;
  legend?: boolean;
  tooltipFormatter?: (value: any, name: string, props: any) => any;
  xAxisFormatter?: (value: any) => any;
  yAxisFormatter?: (value: any) => any;
  margin?: { top?: number; right?: number; left?: number; bottom?: number };
}

// Custom Y-axis label component for precise positioning
const CustomYAxisLabel = (props: any) => {
  const { viewBox, value } = props;
  // Place the label at x - 52px (further left of ticks), vertically centered, rotated vertically
  const x = viewBox.x - 52;
  const y = viewBox.y + viewBox.height / 2;
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      dominantBaseline="middle"
      fontWeight={600}
      fill="#888"
      style={{ fontSize: 16 }}
      transform={`rotate(-90, ${x}, ${y})`}
    >
      {value}
    </text>
  );
};

export const CalculatorChart: React.FC<CalculatorChartProps> = ({
  data,
  lines,
  xKey = 'year',
  yLabel = 'Amount',
  height = 300,
  legend = true,
  tooltipFormatter,
  xAxisFormatter,
  yAxisFormatter,
  margin = { top: 40, right: 30, left: 60, bottom: 30 },
}) => {
  // Dynamically calculate offset for Y-axis label to avoid overlap
  const maxTickLength = useMemo(() => {
    if (!data || data.length === 0) return 0;
    const values = data.flatMap(d => lines.map(l => d[l.dataKey])).filter(v => typeof v === 'number');
    return Math.max(...values.map(v => v.toLocaleString('en-IN').length), 0);
  }, [data, lines]);
  // Estimate width in pixels (approx 10px per char for currency)
  const yAxisLabelOffset = Math.max(30, maxTickLength * 10 + 10);

  return (
    <Box sx={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={margin}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} tickFormatter={xAxisFormatter} tick={{ fontSize: '0.7rem', fontFamily: 'inherit' }} />
          <YAxis
            label={<CustomYAxisLabel value={yLabel} />}
            tickFormatter={yAxisFormatter}
            tick={{ fontSize: '0.7rem', fontFamily: 'inherit' }}
          />
          <Tooltip formatter={tooltipFormatter} contentStyle={{ fontSize: '0.7rem' }} />
          {legend && <Legend wrapperStyle={{ marginTop: 40, fontSize: '0.75rem' }} />}
          {lines.map((line, idx) => (
            <Line
              key={idx}
              type="monotone"
              dataKey={line.dataKey}
              stroke={line.color}
              name={line.name || line.dataKey}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}; 