import React from 'react';
import { LucideIcon } from 'lucide-react';
import { formatCurrency } from '../utils/dataProcessors';

interface MetricCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  type?: 'currency' | 'number' | 'percent';
  trend?: number;
  color?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon: Icon,
  type = 'currency',
  trend,
  color = 'blue'
}) => {
  const formatValue = () => {
    switch (type) {
      case 'currency':
        return formatCurrency(value);
      case 'percent':
        return `${value.toFixed(1)}%`;
      default:
        return value.toLocaleString();
    }
  };

  const getColorClasses = () => {
    const colors: Record<string, string> = {
      blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      green: 'bg-green-500/10 text-green-400 border-green-500/20',
      red: 'bg-red-500/10 text-red-400 border-red-500/20',
      purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      orange: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className={`stat-card ${getColorClasses()}`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-${color}-500/20`}>
          <Icon className="w-6 h-6" />
        </div>
        {trend !== undefined && (
          <span className={`text-sm font-semibold ${trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {trend >= 0 ? '+' : ''}{trend.toFixed(1)}%
          </span>
        )}
      </div>
      <h3 className="text-sm font-medium text-slate-400 mb-2">{title}</h3>
      <p className="text-2xl font-bold">{formatValue()}</p>
    </div>
  );
};

export default MetricCard;
