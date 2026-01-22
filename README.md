# Sherman Dashboard

Dashboard en tiempo real para la gestión del negocio canino Sherman, con visualización de métricas financieras, análisis de colaboradores y servicios.

## Características

- **Métricas en Tiempo Real**: Visualización de ingresos, gastos, balance y margen de ganancia
- **Análisis de Colaboradores**: Ranking de colaboradores por ingresos generados
- **Estadísticas de Servicios**: Análisis detallado por tipo de servicio (Rutas, Guardería, etc.)
- **Tendencias Diarias**: Gráficos de evolución temporal
- **Distribución de Gastos**: Análisis visual de categorías de gastos
- **Actualización Automática**: Datos actualizados cada 30 segundos

## Stack Tecnológico

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Estilos**: Tailwind CSS
- **Gráficos**: Recharts
- **Iconos**: Lucide React
- **Fechas**: date-fns
- **HTTP Client**: Axios
- **Base de Datos**: Google Sheets API

## Instalación

1. Clonar el repositorio:
```bash
git clone <tu-repo>
cd sherman-dashboard
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env
```

Editar `.env` y agregar:
```env
VITE_GOOGLE_API_KEY=tu_google_api_key
VITE_SPREADSHEET_ID=1I5HSsNyutjuaLGR1ruyh5B_rKCuOU77GdduAWpzJFf8
VITE_SHEET_NAME=Finance
```

## Obtener Google API Key

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la API de Google Sheets
4. Crea credenciales (API Key)
5. Restringe la API Key solo a Google Sheets API
6. Copia la API Key y pégala en tu archivo `.env`

## Estructura del Proyecto

```
sherman-dashboard/
├── src/
│   ├── components/          # Componentes React
│   │   ├── MetricCard.tsx
│   │   ├── ColaboradorCard.tsx
│   │   ├── DailyTrendChart.tsx
│   │   ├── ServiceStatsChart.tsx
│   │   └── GastoDistributionChart.tsx
│   ├── services/            # Servicios de API
│   │   └── googleSheets.ts
│   ├── utils/               # Utilidades y procesadores
│   │   └── dataProcessors.ts
│   ├── types/               # Tipos TypeScript
│   │   └── index.ts
│   ├── App.tsx              # Componente principal
│   ├── main.tsx             # Punto de entrada
│   └── index.css            # Estilos globales
├── public/                  # Archivos estáticos
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## Desarrollo

Iniciar servidor de desarrollo:
```bash
npm run dev
```

El dashboard estará disponible en `http://localhost:5173`

## Build para Producción

```bash
npm run build
```

Los archivos optimizados se generarán en la carpeta `dist/`

## Preview de Producción

```bash
npm run preview
```

## Despliegue

### Vercel (Recomendado)

1. Instalar Vercel CLI:
```bash
npm i -g vercel
```

2. Desplegar:
```bash
vercel
```

3. Configurar variables de entorno en Vercel Dashboard

### Netlify

1. Instalar Netlify CLI:
```bash
npm i -g netlify-cli
```

2. Desplegar:
```bash
netlify deploy --prod
```

3. Configurar variables de entorno en Netlify Dashboard

## Estructura de Datos (Google Sheets)

El dashboard espera la siguiente estructura en la hoja "Finance":

| Columna | Tipo | Descripción |
|---------|------|-------------|
| ID | Texto | Identificador único (S001, S002, etc.) |
| Fecha | Fecha | Formato YYYY-MM-DD |
| Hora | Hora | Formato HH:MM |
| Tipo Movimiento | Texto | "Ingreso" o "Gasto" |
| Colaborador | Texto | Nombre del responsable |
| Concepto | Texto | Descripción del movimiento |
| Tipo Servicio | Texto | Categoría de servicio |
| Subtipo | Texto | Detalle adicional |
| Cantidad Perros | Número | Número de mascotas |
| Monto | Moneda | Valor en pesos colombianos |
| Observaciones | Texto | Notas adicionales |

## Métricas Calculadas

### Dashboard Principal
- **Total Ingresos**: Suma de todas las transacciones de ingreso
- **Total Gastos**: Suma de todas las transacciones de gasto
- **Balance**: Diferencia entre ingresos y gastos
- **Margen de Ganancia**: Porcentaje de ganancia sobre ingresos

### Colaboradores
- **Total Ingresos**: Suma de ingresos generados por colaborador
- **Servicios Realizados**: Cantidad de transacciones
- **Perros Atendidos**: Suma de cantidad de perros
- **Promedio por Servicio**: Ingreso promedio por transacción

### Servicios
- **Ingresos por Tipo**: Agrupación por tipo de servicio
- **Cantidad de Servicios**: Número de transacciones por tipo
- **Promedio por Servicio**: Monto promedio
- **Porcentaje del Total**: Proporción sobre ingresos totales

## Modo Offline / Sin API Key

Si no se configura una API Key, el dashboard funcionará con datos de ejemplo para pruebas y desarrollo.

## Personalización

### Colores del Tema

Editar `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      'sherman-primary': '#3b82f6',    // Azul principal
      'sherman-secondary': '#8b5cf6',  // Púrpura secundario
      'sherman-accent': '#10b981',     // Verde acento
    },
  },
}
```

### Intervalo de Actualización

Editar en `src/App.tsx`:

```typescript
const interval = setInterval(() => {
  loadData();
}, 30000); // Cambiar 30000 (30 segundos) al tiempo deseado en ms
```

## Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

MIT License

## Soporte

Para problemas o preguntas, abre un issue en el repositorio.

---

Desarrollado con ❤️ para Sherman
