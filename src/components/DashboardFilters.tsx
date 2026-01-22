import React from 'react';
import { Filter, X } from 'lucide-react';

export interface FilterState {
  colaborador: string;
  tipoIngreso: string;
  tipoServicio: string;
  fechaInicio: string;
  fechaFin: string;
}

interface DashboardFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  colaboradores: string[];
  tiposIngreso: string[];
  tiposServicio: string[];
}

const DashboardFilters: React.FC<DashboardFiltersProps> = ({
  filters,
  onFilterChange,
  colaboradores,
  tiposIngreso,
  tiposServicio
}) => {
  const handleChange = (field: keyof FilterState, value: string) => {
    onFilterChange({ ...filters, [field]: value });
  };

  const clearFilters = () => {
    onFilterChange({
      colaborador: '',
      tipoIngreso: '',
      tipoServicio: '',
      fechaInicio: '',
      fechaFin: ''
    });
  };

  const hasActiveFilters = Object.values(filters).some(v => v !== '');

  return (
    <div className="card mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Filter className="w-5 h-5 text-sherman-primary" />
          Filtros
        </h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1 font-medium"
          >
            <X className="w-4 h-4" />
            Limpiar Filtros
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Colaborador
          </label>
          <select
            value={filters.colaborador}
            onChange={(e) => handleChange('colaborador', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sherman-primary focus:border-transparent bg-white text-slate-900"
          >
            <option value="">Todos</option>
            {colaboradores.map((col) => (
              <option key={col} value={col}>
                {col}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Tipo de Movimiento
          </label>
          <select
            value={filters.tipoIngreso}
            onChange={(e) => handleChange('tipoIngreso', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sherman-primary focus:border-transparent bg-white text-slate-900"
          >
            <option value="">Todos</option>
            {tiposIngreso.map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Tipo de Servicio
          </label>
          <select
            value={filters.tipoServicio}
            onChange={(e) => handleChange('tipoServicio', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sherman-primary focus:border-transparent bg-white text-slate-900"
          >
            <option value="">Todos</option>
            {tiposServicio.map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Fecha Inicio
          </label>
          <input
            type="date"
            value={filters.fechaInicio}
            onChange={(e) => handleChange('fechaInicio', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sherman-primary focus:border-transparent bg-white text-slate-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Fecha Fin
          </label>
          <input
            type="date"
            value={filters.fechaFin}
            onChange={(e) => handleChange('fechaFin', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sherman-primary focus:border-transparent bg-white text-slate-900"
          />
        </div>
      </div>

      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap gap-2">
          {filters.colaborador && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
              Colaborador: {filters.colaborador}
              <button
                onClick={() => handleChange('colaborador', '')}
                className="hover:text-blue-900"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.tipoIngreso && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
              Tipo: {filters.tipoIngreso}
              <button
                onClick={() => handleChange('tipoIngreso', '')}
                className="hover:text-green-900"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.tipoServicio && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
              Servicio: {filters.tipoServicio}
              <button
                onClick={() => handleChange('tipoServicio', '')}
                className="hover:text-purple-900"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.fechaInicio && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
              Desde: {filters.fechaInicio}
              <button
                onClick={() => handleChange('fechaInicio', '')}
                className="hover:text-orange-900"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.fechaFin && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
              Hasta: {filters.fechaFin}
              <button
                onClick={() => handleChange('fechaFin', '')}
                className="hover:text-orange-900"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default DashboardFilters;
