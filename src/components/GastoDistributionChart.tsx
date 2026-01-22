import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import type { GastoDistribution } from '../types';
import { formatCurrency } from '../utils/dataProcessors';

interface GastoDistributionChartProps {
  data: GastoDistribution[];
}

const COLORS = ['#ef4444', '#f59e0b', '#eab308', '#84cc16', '#22c55e', '#14b8a6'];

const GastoDistributionChart: React.FC<GastoDistributionChartProps> = ({ data }) => {
  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <span className="text-red-400">💸</span>
        Distribución de Gastos
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ concepto, porcentaje }) => `${concepto}: ${porcentaje.toFixed(1)}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="monto"
          >
            {data.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '8px'
            }}
            formatter={(value: number) => formatCurrency(value)}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-6 space-y-2">
        {data.map((gasto, index) => (
          <div
            key={gasto.concepto}
            className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-sm text-slate-300">{gasto.concepto}</span>
            </div>
            <div className="text-right">
              <p className="font-semibold text-red-400">
                {formatCurrency(gasto.monto)}
              </p>
              <p className="text-xs text-slate-400">
                {gasto.porcentaje.toFixed(1)}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GastoDistributionChart;
