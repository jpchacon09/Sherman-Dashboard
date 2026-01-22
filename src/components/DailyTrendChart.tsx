import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import type { DailyTrend } from '../types';
import { formatCurrency } from '../utils/dataProcessors';

interface DailyTrendChartProps {
  data: DailyTrend[];
}

const DailyTrendChart: React.FC<DailyTrendChartProps> = ({ data }) => {
  const formattedData = data.map(item => ({
    ...item,
    fechaDisplay: format(parseISO(item.fecha), 'dd MMM', { locale: es })
  }));

  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <span className="text-sherman-primary">📈</span>
        Tendencias Diarias
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis
            dataKey="fechaDisplay"
            stroke="#94a3b8"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            stroke="#94a3b8"
            style={{ fontSize: '12px' }}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '8px'
            }}
            formatter={(value: number) => formatCurrency(value)}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="ingresos"
            stroke="#10b981"
            strokeWidth={2}
            name="Ingresos"
            dot={{ fill: '#10b981', r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="gastos"
            stroke="#ef4444"
            strokeWidth={2}
            name="Gastos"
            dot={{ fill: '#ef4444', r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="balance"
            stroke="#3b82f6"
            strokeWidth={2}
            name="Balance"
            dot={{ fill: '#3b82f6', r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DailyTrendChart;
