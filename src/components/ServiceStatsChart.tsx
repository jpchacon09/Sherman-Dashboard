import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';
import type { ServiceStats } from '../types';
import { formatCurrency } from '../utils/dataProcessors';

interface ServiceStatsChartProps {
  data: ServiceStats[];
}

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4'];

const ServiceStatsChart: React.FC<ServiceStatsChartProps> = ({ data }) => {
  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <span className="text-sherman-primary">📊</span>
        Ingresos por Tipo de Servicio
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis
            dataKey="tipoServicio"
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
          <Bar dataKey="totalIngresos" name="Total Ingresos" radius={[8, 8, 0, 0]}>
            {data.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map((service, index) => (
          <div
            key={service.tipoServicio}
            className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-sm text-slate-300">{service.tipoServicio}</span>
            </div>
            <div className="text-right">
              <p className="font-semibold text-white">
                {formatCurrency(service.totalIngresos)}
              </p>
              <p className="text-xs text-slate-400">
                {service.cantidadServicios} servicios
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceStatsChart;
