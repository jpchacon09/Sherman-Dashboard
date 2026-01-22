import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Calculator, TrendingUp } from 'lucide-react';
import { formatCurrency } from '../utils/dataProcessors';
import type { ColaboradorStats, ServiceStats } from '../types';

interface WhatIfSimulatorProps {
  colaborador: ColaboradorStats;
  servicios: ServiceStats[];
  goalAmount?: number;
}

const WhatIfSimulator: React.FC<WhatIfSimulatorProps> = ({
  colaborador,
  servicios,
  goalAmount = 1700000
}) => {
  const remaining = Math.max(goalAmount - colaborador.totalIngresos, 0);

  // Calcular cuántos servicios adicionales se necesitan de cada tipo
  const simulationData = servicios.map(servicio => {
    const avgPrice = servicio.promedioMonto;
    const servicesNeeded = avgPrice > 0 ? Math.ceil(remaining / avgPrice) : 0;
    const totalRevenue = servicesNeeded * avgPrice;

    return {
      tipoServicio: servicio.tipoServicio,
      serviciosNecesarios: servicesNeeded,
      ingresoPromedio: avgPrice,
      ingresoTotal: totalRevenue,
      alcanzaMeta: totalRevenue >= remaining
    };
  });

  return (
    <div className="card">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-2">
          <Calculator className="w-6 h-6 text-sherman-primary" />
          Simulador "What If" - {colaborador.nombre}
        </h3>
        <p className="text-sm text-slate-600">
          Servicios necesarios para alcanzar la meta de {formatCurrency(goalAmount)}
        </p>
      </div>

      {remaining > 0 ? (
        <>
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700 font-medium">Falta por Alcanzar</p>
                <p className="text-2xl font-bold text-blue-900">{formatCurrency(remaining)}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={simulationData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis type="number" stroke="#64748b" style={{ fontSize: '12px' }} />
              <YAxis dataKey="tipoServicio" type="category" width={100} stroke="#64748b" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  color: '#1e293b'
                }}
                formatter={(value: number) => value.toFixed(0)}
              />
              <Bar dataKey="serviciosNecesarios" name="Servicios Necesarios" radius={[0, 8, 8, 0]}>
                {simulationData.map((entry) => (
                  <Cell
                    key={`cell-${entry.tipoServicio}`}
                    fill={entry.alcanzaMeta ? '#10b981' : '#f59e0b'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          <div className="mt-6 space-y-3">
            {simulationData.map((item) => (
              <div
                key={item.tipoServicio}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <div className="flex-1">
                  <p className="font-semibold text-slate-900">{item.tipoServicio}</p>
                  <p className="text-sm text-slate-600">
                    Promedio: {formatCurrency(item.ingresoPromedio)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-sherman-primary">
                    {item.serviciosNecesarios}
                  </p>
                  <p className="text-xs text-slate-600">servicios necesarios</p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center p-8 bg-green-50 rounded-lg">
          <div className="text-6xl mb-4">🎉</div>
          <h4 className="text-2xl font-bold text-green-700 mb-2">
            ¡Meta Alcanzada!
          </h4>
          <p className="text-green-600">
            {colaborador.nombre} ya ha superado la meta de {formatCurrency(goalAmount)}
          </p>
        </div>
      )}
    </div>
  );
};

export default WhatIfSimulator;
