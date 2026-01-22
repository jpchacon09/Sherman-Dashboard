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
      blue: 'bg-blue-50 text-blue-600 border-blue-200',
      green: 'bg-green-50 text-green-600 border-green-200',
      red: 'bg-red-50 text-red-600 border-red-200',
      purple: 'bg-purple-50 text-purple-600 border-purple-200',
      orange: 'bg-orange-50 text-orange-600 border-orange-200',
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
          <span className={`text-sm font-semibold ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend >= 0 ? '+' : ''}{trend.toFixed(1)}%
          </span>
        )}
      </div>
      <h3 className="text-sm font-medium text-slate-600 mb-2">{title}</h3>
      <p className="text-2xl font-bold">{formatValue()}</p>
    </div>
  );
};

export default MetricCard;
