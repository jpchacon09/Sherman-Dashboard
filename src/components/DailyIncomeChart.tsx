import React from 'react';
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
  ComposedChart
} from 'recharts';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar } from 'lucide-react';
import type { DailyTrend } from '../types';
import { formatCurrency } from '../utils/dataProcessors';

interface DailyIncomeChartProps {
  data: DailyTrend[];
}

const DailyIncomeChart: React.FC<DailyIncomeChartProps> = ({ data }) => {
  const formattedData = data.map(item => ({
    ...item,
    fechaDisplay: format(parseISO(item.fecha), 'EEE dd', { locale: es }),
    fechaFull: format(parseISO(item.fecha), 'dd MMMM yyyy', { locale: es })
  }));

  // Calcular promedios
  const avgIngresos = data.reduce((sum, d) => sum + d.ingresos, 0) / data.length;
  const avgGastos = data.reduce((sum, d) => sum + d.gastos, 0) / data.length;

  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-900">
        <Calendar className="w-6 h-6 text-sherman-primary" />
        Análisis Diario de Ingresos y Gastos
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <p className="text-sm text-green-700 font-medium">Promedio Diario Ingresos</p>
          <p className="text-2xl font-bold text-green-600">{formatCurrency(avgIngresos)}</p>
        </div>
        <div className="p-4 bg-red-50 rounded-lg border border-red-200">
          <p className="text-sm text-red-700 font-medium">Promedio Diario Gastos</p>
          <p className="text-2xl font-bold text-red-600">{formatCurrency(avgGastos)}</p>
        </div>
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-700 font-medium">Balance Promedio</p>
          <p className="text-2xl font-bold text-blue-600">{formatCurrency(avgIngresos - avgGastos)}</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="fechaDisplay"
            stroke="#64748b"
            style={{ fontSize: '11px' }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis
            stroke="#64748b"
            style={{ fontSize: '12px' }}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              color: '#1e293b'
            }}
            formatter={(value: number) => formatCurrency(value)}
            labelFormatter={(label, payload) => {
              if (payload && payload[0]) {
                return payload[0].payload.fechaFull;
              }
              return label;
            }}
          />
          <Legend />
          <Bar
            dataKey="ingresos"
            fill="#10b981"
            name="Ingresos"
            radius={[8, 8, 0, 0]}
          />
          <Bar
            dataKey="gastos"
            fill="#ef4444"
            name="Gastos"
            radius={[8, 8, 0, 0]}
          />
          <Line
            type="monotone"
            dataKey="balance"
            stroke="#3b82f6"
            strokeWidth={3}
            name="Balance"
            dot={{ fill: '#3b82f6', r: 5 }}
          />
        </ComposedChart>
      </ResponsiveContainer>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {formattedData.slice(-4).reverse().map((day) => (
          <div
            key={day.fecha}
            className="p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <p className="text-xs text-slate-600 mb-1">{day.fechaDisplay}</p>
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-xs text-green-600">Ingresos</span>
                <span className="text-sm font-semibold text-green-600">
                  {formatCurrency(day.ingresos)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-red-600">Gastos</span>
                <span className="text-sm font-semibold text-red-600">
                  {formatCurrency(day.gastos)}
                </span>
              </div>
              <div className="pt-1 border-t border-slate-200">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-blue-600">Balance</span>
                  <span className={`text-sm font-bold ${day.balance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                    {formatCurrency(day.balance)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyIncomeChart;
