import { useEffect, useState } from 'react';
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

  const metrics = calculateDashboardMetrics(transactions);
  const colaboradores = calculateColaboradorStats(transactions);
  const servicios = calculateServiceStats(transactions);
  const trends = calculateDailyTrends(transactions);
  const gastos = calculateGastoDistribution(transactions);

  if (loading && transactions.length === 0) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-sherman-primary animate-spin mx-auto mb-4" />
          <p className="text-xl text-slate-300">Cargando datos de Sherman...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-sherman-primary to-sherman-secondary bg-clip-text text-transparent">
                Sherman Dashboard
              </h1>
              <p className="text-slate-400 mt-2">
                Gestión y análisis del negocio canino
              </p>
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
            <div className="flex items-center gap-2 text-sm text-slate-400">
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
          <div className="card bg-gradient-to-br from-green-900/20 to-green-800/10 border-green-500/20">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-400" />
              Ingresos Hoy
            </h3>
            <p className="text-3xl font-bold text-green-400">
              {formatCurrency(metrics.ingresosHoy)}
            </p>
          </div>
          <div className="card bg-gradient-to-br from-red-900/20 to-red-800/10 border-red-500/20">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-red-400" />
              Gastos Hoy
            </h3>
            <p className="text-3xl font-bold text-red-400">
              {formatCurrency(metrics.gastosHoy)}
            </p>
          </div>
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
        <div className="text-center text-slate-500 text-sm mt-12 pb-4">
          <p>Sherman Dashboard v1.0 - {transactions.length} transacciones cargadas</p>
        </div>
      </div>
    </div>
  );
}

export default App;
