import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Target } from 'lucide-react';
import { formatCurrency } from '../utils/dataProcessors';
import type { ColaboradorStats } from '../types';

interface ColaboradorGoalGaugeProps {
  colaborador: ColaboradorStats;
  goalAmount?: number;
}

const ColaboradorGoalGauge: React.FC<ColaboradorGoalGaugeProps> = ({
  colaborador,
  goalAmount = 1700000
}) => {
  const percentage = Math.min((colaborador.totalIngresos / goalAmount) * 100, 100);
  const remaining = Math.max(goalAmount - colaborador.totalIngresos, 0);

  const data = [
    { name: 'Alcanzado', value: percentage },
    { name: 'Faltante', value: 100 - percentage }
  ];

  const getColor = () => {
    if (percentage >= 100) return '#10b981'; // green
    if (percentage >= 75) return '#3b82f6'; // blue
    if (percentage >= 50) return '#f59e0b'; // orange
    return '#ef4444'; // red
  };

  const COLORS = [getColor(), '#e5e7eb'];

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Target className="w-5 h-5 text-sherman-primary" />
          {colaborador.nombre}
        </h3>
        <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
          percentage >= 100
            ? 'bg-green-100 text-green-700'
            : 'bg-blue-100 text-blue-700'
        }`}>
          {percentage.toFixed(1)}%
        </span>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="75%"
            startAngle={180}
            endAngle={0}
            innerRadius={60}
            outerRadius={90}
            paddingAngle={0}
            dataKey="value"
          >
            {data.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-4 space-y-3">
        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
          <span className="text-sm text-slate-600">Meta Mensual</span>
          <span className="font-bold text-slate-900">{formatCurrency(goalAmount)}</span>
        </div>
        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
          <span className="text-sm text-green-700">Ingresos Actuales</span>
          <span className="font-bold text-green-700">{formatCurrency(colaborador.totalIngresos)}</span>
        </div>
        {remaining > 0 && (
          <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
            <span className="text-sm text-orange-700">Falta por Alcanzar</span>
            <span className="font-bold text-orange-700">{formatCurrency(remaining)}</span>
          </div>
        )}
        {percentage >= 100 && (
          <div className="text-center p-3 bg-green-100 rounded-lg">
            <span className="text-green-700 font-bold">🎉 ¡Meta Alcanzada!</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ColaboradorGoalGauge;
