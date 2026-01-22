import { format, isToday } from 'date-fns';
import type {
  Transaction,
  DashboardMetrics,
  ColaboradorStats,
  ServiceStats,
  DailyTrend,
  GastoDistribution
} from '../types';

export const calculateDashboardMetrics = (transactions: Transaction[]): DashboardMetrics => {
  const ingresos = transactions.filter(t => t.tipoMovimiento === 'Ingreso');
  const gastos = transactions.filter(t => t.tipoMovimiento === 'Gasto');

  const totalIngresos = ingresos.reduce((sum, t) => sum + t.monto, 0);
  const totalGastos = gastos.reduce((sum, t) => sum + t.monto, 0);
  const balance = totalIngresos - totalGastos;

  const ingresosHoy = ingresos
    .filter(t => isToday(t.fecha))
    .reduce((sum, t) => sum + t.monto, 0);

  const gastosHoy = gastos
    .filter(t => isToday(t.fecha))
    .reduce((sum, t) => sum + t.monto, 0);

  const margenGanancia = totalIngresos > 0
    ? ((balance / totalIngresos) * 100)
    : 0;

  return {
    totalIngresos,
    totalGastos,
    balance,
    margenGanancia,
    totalTransacciones: transactions.length,
    ingresosHoy,
    gastosHoy
  };
};

export const calculateColaboradorStats = (transactions: Transaction[]): ColaboradorStats[] => {
  const colaboradoresMap = new Map<string, ColaboradorStats>();

  transactions
    .filter(t => t.tipoMovimiento === 'Ingreso' && t.colaborador)
    .forEach(t => {
      const existing = colaboradoresMap.get(t.colaborador) || {
        nombre: t.colaborador,
        totalIngresos: 0,
        totalTransacciones: 0,
        serviciosRealizados: 0,
        perrosAtendidos: 0,
        promedioIngreso: 0
      };

      existing.totalIngresos += t.monto;
      existing.totalTransacciones += 1;
      existing.serviciosRealizados += 1;
      existing.perrosAtendidos += t.cantidadPerros || 0;

      colaboradoresMap.set(t.colaborador, existing);
    });

  const stats = Array.from(colaboradoresMap.values()).map(stat => ({
    ...stat,
    promedioIngreso: stat.totalTransacciones > 0
      ? stat.totalIngresos / stat.totalTransacciones
      : 0
  }));

  return stats.sort((a, b) => b.totalIngresos - a.totalIngresos);
};

export const calculateServiceStats = (transactions: Transaction[]): ServiceStats[] => {
  const serviciosMap = new Map<string, ServiceStats>();

  const ingresoTransactions = transactions.filter(t => t.tipoMovimiento === 'Ingreso');
  const totalIngresosGeneral = ingresoTransactions.reduce((sum, t) => sum + t.monto, 0);

  ingresoTransactions.forEach(t => {
    if (!t.tipoServicio) return;

    const existing = serviciosMap.get(t.tipoServicio) || {
      tipoServicio: t.tipoServicio,
      totalIngresos: 0,
      cantidadServicios: 0,
      promedioMonto: 0,
      porcentajeTotal: 0
    };

    existing.totalIngresos += t.monto;
    existing.cantidadServicios += 1;

    serviciosMap.set(t.tipoServicio, existing);
  });

  const stats = Array.from(serviciosMap.values()).map(stat => ({
    ...stat,
    promedioMonto: stat.cantidadServicios > 0
      ? stat.totalIngresos / stat.cantidadServicios
      : 0,
    porcentajeTotal: totalIngresosGeneral > 0
      ? (stat.totalIngresos / totalIngresosGeneral) * 100
      : 0
  }));

  return stats.sort((a, b) => b.totalIngresos - a.totalIngresos);
};

export const calculateDailyTrends = (transactions: Transaction[]): DailyTrend[] => {
  const dailyMap = new Map<string, DailyTrend>();

  transactions.forEach(t => {
    const dateKey = format(t.fecha, 'yyyy-MM-dd');

    const existing = dailyMap.get(dateKey) || {
      fecha: dateKey,
      ingresos: 0,
      gastos: 0,
      balance: 0
    };

    if (t.tipoMovimiento === 'Ingreso') {
      existing.ingresos += t.monto;
    } else {
      existing.gastos += t.monto;
    }

    existing.balance = existing.ingresos - existing.gastos;

    dailyMap.set(dateKey, existing);
  });

  return Array.from(dailyMap.values())
    .sort((a, b) => a.fecha.localeCompare(b.fecha));
};

export const calculateGastoDistribution = (transactions: Transaction[]): GastoDistribution[] => {
  const gastosMap = new Map<string, number>();

  const gastoTransactions = transactions.filter(t => t.tipoMovimiento === 'Gasto');
  const totalGastos = gastoTransactions.reduce((sum, t) => sum + t.monto, 0);

  gastoTransactions.forEach(t => {
    const concepto = t.concepto || 'Sin categoría';
    const existing = gastosMap.get(concepto) || 0;
    gastosMap.set(concepto, existing + t.monto);
  });

  const distribution = Array.from(gastosMap.entries()).map(([concepto, monto]) => ({
    concepto,
    monto,
    porcentaje: totalGastos > 0 ? (monto / totalGastos) * 100 : 0
  }));

  return distribution.sort((a, b) => b.monto - a.monto);
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatPercent = (value: number): string => {
  return `${value.toFixed(1)}%`;
};
