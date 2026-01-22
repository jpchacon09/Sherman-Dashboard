import { useEffect, useState, useMemo } from 'react';
import {
  DollarSign,
  TrendingDown,
  TrendingUp,
  Wallet,
  Calendar,
  RefreshCw
} from 'lucide-react';
import MetricCard from './components/MetricCard';
import ColaboradorCard from './components/ColaboradorCard';
import DailyTrendChart from './components/DailyTrendChart';
import ServiceStatsChart from './components/ServiceStatsChart';
import GastoDistributionChart from './components/GastoDistributionChart';
import DashboardFilters, { FilterState } from './components/DashboardFilters';
import ColaboradorGoalGauge from './components/ColaboradorGoalGauge';
import WhatIfSimulator from './components/WhatIfSimulator';
import DailyIncomeChart from './components/DailyIncomeChart';
import { fetchTransactions } from './services/googleSheets';
import {
  calculateDashboardMetrics,
  calculateColaboradorStats,
  calculateServiceStats,
  calculateDailyTrends,
  calculateGastoDistribution,
  formatCurrency
} from './utils/dataProcessors';
import type { Transaction } from './types';

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    colaborador: '',
    tipoIngreso: '',
    tipoServicio: '',
    fechaInicio: '',
    fechaFin: ''
  });

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchTransactions();
      setTransactions(data);
      setLastUpdate(new Date());
    } catch (err) {
      setError('Error al cargar los datos. Intenta nuevamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();

    const interval = setInterval(() => {
      loadData();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Filtrar transacciones
  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      if (filters.colaborador && t.colaborador !== filters.colaborador) return false;
      if (filters.tipoIngreso && t.tipoMovimiento !== filters.tipoIngreso) return false;
      if (filters.tipoServicio && t.tipoServicio !== filters.tipoServicio) return false;

      if (filters.fechaInicio) {
        const transDate = new Date(t.fecha);
        const startDate = new Date(filters.fechaInicio);
        if (transDate < startDate) return false;
      }

      if (filters.fechaFin) {
        const transDate = new Date(t.fecha);
        const endDate = new Date(filters.fechaFin);
        if (transDate > endDate) return false;
      }

      return true;
    });
  }, [transactions, filters]);

  // Obtener listas únicas para los filtros
  const uniqueColaboradores = useMemo(() =>
    Array.from(new Set(transactions.map(t => t.colaborador))).filter(Boolean).sort(),
    [transactions]
  );

  const uniqueTiposIngreso = useMemo(() =>
    Array.from(new Set(transactions.map(t => t.tipoMovimiento))).filter(Boolean).sort(),
    [transactions]
  );

  const uniqueTiposServicio = useMemo(() =>
    Array.from(new Set(transactions.map(t => t.tipoServicio))).filter(Boolean).sort(),
    [transactions]
  );

  // Calcular métricas con transacciones filtradas
  const metrics = calculateDashboardMetrics(filteredTransactions);
  const colaboradores = calculateColaboradorStats(filteredTransactions);
  const servicios = calculateServiceStats(filteredTransactions);
  const trends = calculateDailyTrends(filteredTransactions);
  const gastos = calculateGastoDistribution(filteredTransactions);

  if (loading && transactions.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-sherman-primary animate-spin mx-auto mb-4" />
          <p className="text-xl text-slate-700">Cargando datos de Sherman...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <img
                src="/logo.jpeg"
                alt="Sherman Logo"
                className="w-16 h-16 rounded-full object-cover shadow-lg border-2 border-sherman-primary"
              />
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-sherman-primary to-sherman-secondary bg-clip-text text-transparent">
                  Sherman Dashboard
                </h1>
                <p className="text-slate-600 mt-2">
                  Gestión y análisis del negocio canino
                </p>
              </div>
            </div>
            <button
              onClick={loadData}
              disabled={loading}
              className="btn-primary flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Actualizar
            </button>
          </div>

          {lastUpdate && (
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Calendar className="w-4 h-4" />
              <span>
                Última actualización: {lastUpdate.toLocaleTimeString('es-CO')}
              </span>
            </div>
          )}

          {error && (
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
              {error}
            </div>
          )}
        </div>

        {/* Filtros */}
        <DashboardFilters
          filters={filters}
          onFilterChange={setFilters}
          colaboradores={uniqueColaboradores}
          tiposIngreso={uniqueTiposIngreso}
          tiposServicio={uniqueTiposServicio}
        />

        {/* Métricas Principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Ingresos"
            value={metrics.totalIngresos}
            icon={DollarSign}
            type="currency"
            color="green"
          />
          <MetricCard
            title="Total Gastos"
            value={metrics.totalGastos}
            icon={TrendingDown}
            type="currency"
            color="red"
          />
          <MetricCard
            title="Balance"
            value={metrics.balance}
            icon={Wallet}
            type="currency"
            color={metrics.balance >= 0 ? 'green' : 'red'}
          />
          <MetricCard
            title="Margen de Ganancia"
            value={metrics.margenGanancia}
            icon={TrendingUp}
            type="percent"
            color="purple"
          />
        </div>

        {/* Métricas de Hoy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="card bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2 text-slate-900">
              <DollarSign className="w-5 h-5 text-green-600" />
              Ingresos Hoy
            </h3>
            <p className="text-3xl font-bold text-green-600">
              {formatCurrency(metrics.ingresosHoy)}
            </p>
          </div>
          <div className="card bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2 text-slate-900">
              <TrendingDown className="w-5 h-5 text-red-600" />
              Gastos Hoy
            </h3>
            <p className="text-3xl font-bold text-red-600">
              {formatCurrency(metrics.gastosHoy)}
            </p>
          </div>
        </div>

        {/* Análisis Diario de Ingresos */}
        <div className="mb-8">
          <DailyIncomeChart data={trends} />
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <DailyTrendChart data={trends} />
          <ServiceStatsChart data={servicios} />
        </div>

        {/* Distribución de Gastos */}
        {gastos.length > 0 && (
          <div className="mb-8">
            <GastoDistributionChart data={gastos} />
          </div>
        )}

        {/* Metas de Colaboradores */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-slate-900">
            <span className="text-sherman-primary">🎯</span>
            Seguimiento de Metas (COP $1,700,000)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {colaboradores.slice(0, 6).map((colaborador) => (
              <ColaboradorGoalGauge
                key={colaborador.nombre}
                colaborador={colaborador}
                goalAmount={1700000}
              />
            ))}
          </div>
        </div>

        {/* Simulador What-If */}
        {colaboradores.length > 0 && servicios.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-slate-900">
              <span className="text-sherman-secondary">🔮</span>
              Simuladores de Meta por Colaborador
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {colaboradores.slice(0, 4).map((colaborador) => (
                <WhatIfSimulator
                  key={colaborador.nombre}
                  colaborador={colaborador}
                  servicios={servicios}
                  goalAmount={1700000}
                />
              ))}
            </div>
          </div>
        )}

        {/* Top Colaboradores */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="text-sherman-accent">⭐</span>
            Top Colaboradores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {colaboradores.slice(0, 6).map((colaborador, index) => (
              <ColaboradorCard
                key={colaborador.nombre}
                colaborador={colaborador}
                rank={index + 1}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-slate-600 text-sm mt-12 pb-4">
          <p>Sherman Dashboard v1.0 - {transactions.length} transacciones cargadas</p>
        </div>
      </div>
    </div>
  );
}

export default App;
