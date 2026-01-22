import axios from 'axios';
import type { Transaction } from '../types';

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const SPREADSHEET_ID = import.meta.env.VITE_SPREADSHEET_ID || '1I5HSsNyutjuaLGR1ruyh5B_rKCuOU77GdduAWpzJFf8';
const SHEET_NAME = import.meta.env.VITE_SHEET_NAME || 'Finance';

interface SheetData {
  values: string[][];
}

let cachedData: Transaction[] | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 30000; // 30 segundos

const parseMontoString = (montoStr: string): number => {
  if (!montoStr) return 0;

  const cleanedStr = montoStr
    .replace(/\$/g, '')
    .replace(/\./g, '')
    .replace(/,/g, '.')
    .trim();

  const parsed = parseFloat(cleanedStr);
  return isNaN(parsed) ? 0 : parsed;
};

const parseDate = (dateStr: string): Date => {
  if (!dateStr) return new Date();

  const parts = dateStr.split('-');
  if (parts.length === 3) {
    return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
  }

  return new Date(dateStr);
};

const parseSheetData = (data: SheetData): Transaction[] => {
  if (!data.values || data.values.length === 0) {
    return [];
  }

  // Primera fila contiene los headers
  const rows = data.values.slice(1);

  const transactions: Transaction[] = [];

  for (const row of rows) {
    if (!row || row.length === 0 || !row[0]) continue;

    const transaction: Transaction = {
      id: row[0] || '',
      fecha: parseDate(row[1] || ''),
      hora: row[2] || '',
      tipoMovimiento: (row[3] === 'Ingreso' ? 'Ingreso' : 'Gasto'),
      colaborador: row[4] || '',
      concepto: row[5] || '',
      tipoServicio: row[6] || '',
      subtipo: row[7] || '',
      cantidadPerros: parseInt(row[8]) || 0,
      monto: parseMontoString(row[9] || '0'),
      observaciones: row[10] || '',
    };

    if (transaction.id && transaction.monto > 0) {
      transactions.push(transaction);
    }
  }

  return transactions;
};

export const fetchTransactions = async (): Promise<Transaction[]> => {
  const now = Date.now();

  if (cachedData && (now - lastFetchTime) < CACHE_DURATION) {
    console.log('Usando datos en caché');
    return cachedData;
  }

  if (!API_KEY) {
    console.warn('No se configuró VITE_GOOGLE_API_KEY. Usando datos de ejemplo.');
    return getSampleData();
  }

  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`;

    const response = await axios.get<SheetData>(url);

    cachedData = parseSheetData(response.data);
    lastFetchTime = now;

    console.log(`Datos actualizados: ${cachedData.length} transacciones`);

    return cachedData;
  } catch (error) {
    console.error('Error al obtener datos de Google Sheets:', error);

    if (cachedData) {
      console.warn('Error en API. Usando última versión en caché.');
      return cachedData;
    }

    console.warn('Sin caché disponible. Usando datos de ejemplo.');
    return getSampleData();
  }
};

export const clearCache = () => {
  cachedData = null;
  lastFetchTime = 0;
};

const getSampleData = (): Transaction[] => {
  return [
    {
      id: 'S001',
      fecha: new Date('2026-01-20'),
      hora: '08:45',
      tipoMovimiento: 'Ingreso',
      colaborador: 'Diana Muñoz',
      concepto: 'Ruta matutina zona norte',
      tipoServicio: 'Ruta',
      subtipo: 'Individual',
      cantidadPerros: 4,
      monto: 28000,
      observaciones: ''
    },
    {
      id: 'S002',
      fecha: new Date('2026-01-20'),
      hora: '09:15',
      tipoMovimiento: 'Gasto',
      colaborador: 'Angie Estupiñan',
      concepto: 'Alimento Premium',
      tipoServicio: 'Insumos',
      subtipo: 'Alimento',
      cantidadPerros: 0,
      monto: 85000,
      observaciones: 'Mensual'
    },
    {
      id: 'S003',
      fecha: new Date('2026-01-20'),
      hora: '10:30',
      tipoMovimiento: 'Ingreso',
      colaborador: 'Luis García',
      concepto: 'Guardería 24h - Golden Retriever',
      tipoServicio: 'Guardería',
      subtipo: '24 horas',
      cantidadPerros: 1,
      monto: 35000,
      observaciones: 'VIP'
    },
  ];
};
