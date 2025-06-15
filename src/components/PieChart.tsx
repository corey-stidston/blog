'use client';

import { PieChart as RechartPieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface PieChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
  colors?: string[];
}

const defaultColors = ['#FFC300', '#013566', '#254D32', '#770058', '#ED1C24'];

export function PieChart({ data, colors = defaultColors }: PieChartProps) {
  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <RechartPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </RechartPieChart>
      </ResponsiveContainer>
    </div>
  );
} 