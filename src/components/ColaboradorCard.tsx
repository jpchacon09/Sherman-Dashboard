import React from 'react';
import { User, TrendingUp, DollarSign, Briefcase } from 'lucide-react';
import { formatCurrency } from '../utils/dataProcessors';
import type { ColaboradorStats } from '../types';

interface ColaboradorCardProps {
  colaborador: ColaboradorStats;
  rank: number;
}

const ColaboradorCard: React.FC<ColaboradorCardProps> = ({ colaborador, rank }) => {
  const getMedalEmoji = (rank: number) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${rank}`;
    }
  };

  return (
    <div className="card bg-gradient-to-br from-blue-50 to-purple-50 hover:shadow-2xl transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-sherman-primary/20 rounded-lg">
            <User className="w-5 h-5 text-sherman-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{colaborador.nombre}</h3>
            <span className="text-xl">{getMedalEmoji(rank)}</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between p-2 bg-white/60 rounded">
          <div className="flex items-center gap-2 text-slate-700">
            <DollarSign className="w-4 h-4" />
            <span className="text-sm">Total Ingresos</span>
          </div>
          <span className="font-bold text-green-600">
            {formatCurrency(colaborador.totalIngresos)}
          </span>
        </div>

        <div className="flex items-center justify-between p-2 bg-white/60 rounded">
          <div className="flex items-center gap-2 text-slate-700">
            <Briefcase className="w-4 h-4" />
            <span className="text-sm">Servicios</span>
          </div>
          <span className="font-semibold text-blue-600">
            {colaborador.serviciosRealizados}
          </span>
        </div>

        <div className="flex items-center justify-between p-2 bg-white/60 rounded">
          <div className="flex items-center gap-2 text-slate-700">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm">Promedio</span>
          </div>
          <span className="font-semibold text-purple-600">
            {formatCurrency(colaborador.promedioIngreso)}
          </span>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-300">
          <div className="text-center">
            <span className="text-slate-600 text-sm">Perros Atendidos</span>
            <p className="text-2xl font-bold text-orange-600 mt-1">
              {colaborador.perrosAtendidos}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColaboradorCard;
