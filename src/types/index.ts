export interface Transaction {
  id: string;
  fecha: Date;
  hora: string;
  tipoMovimiento: 'Ingreso' | 'Gasto';
  colaborador: string;
  concepto: string;
  tipoServicio: string;
  subtipo: string;
  cantidadPerros: number;
  monto: number;
  observaciones: string;
}

export interface ColaboradorStats {
  nombre: string;
  totalIngresos: number;
  totalTransacciones: number;
  serviciosRealizados: number;
  perrosAtendidos: number;
  promedioIngreso: number;
}

export interface DashboardMetrics {
  totalIngresos: number;
  totalGastos: number;
  balance: number;
  margenGanancia: number;
  totalTransacciones: number;
  ingresosHoy: number;
  gastosHoy: number;
}

export interface ServiceStats {
  tipoServicio: string;
  totalIngresos: number;
  cantidadServicios: number;
  promedioMonto: number;
  porcentajeTotal: number;
}

export interface DailyTrend {
  fecha: string;
  ingresos: number;
  gastos: number;
  balance: number;
}

export interface GastoDistribution {
  concepto: string;
  monto: number;
  porcentaje: number;
}
