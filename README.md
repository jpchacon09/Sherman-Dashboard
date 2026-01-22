# 🐕 Sherman Dashboard

Dashboard moderno y profesional para la gestión y análisis del negocio canino Sherman. Incluye seguimiento en tiempo real de ingresos, gastos, colaboradores y metas financieras.

![Sherman Dashboard](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-18.3-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178c6)
![Vite](https://img.shields.io/badge/Vite-5.4-646cff)

## ✨ Características

### 📊 Métricas en Tiempo Real
- **Total de Ingresos y Gastos**: Visualización clara del flujo de efectivo
- **Balance General**: Estado financiero actualizado
- **Margen de Ganancia**: Análisis de rentabilidad
- **Métricas Diarias**: Ingresos y gastos del día en curso

### 👥 Gestión de Colaboradores
- **Top Colaboradores**: Ranking por desempeño
- **Seguimiento Individual**: Ingresos, servicios realizados y promedios
- **Perros Atendidos**: Contador de mascotas por colaborador

### 🎯 Seguimiento de Metas
- **Gráficos de Velocímetro**: Visualización del progreso hacia la meta de $1,700,000 COP
- **Indicadores de Progreso**: Sistema de colores según el avance
- **Alertas de Meta**: Notificación cuando se alcanza el objetivo

### 🔮 Simulador "What If"
- **Proyecciones por Servicio**: Calcula cuántos servicios se necesitan para alcanzar la meta
- **Análisis por Tipo de Servicio**: Comparación de diferentes estrategias
- **Visualización Interactiva**: Gráficos de barras con información detallada

### 📈 Análisis Avanzado
- **Gráfico de Tendencias Diarias**: Seguimiento de ingresos, gastos y balance
- **Distribución de Gastos**: Pie chart con categorías de gastos
- **Ingresos por Servicio**: Análisis de los servicios más rentables
- **Análisis Temporal**: Gráficos de ingresos por días con promedios

### 🔍 Filtros Inteligentes
- **Por Colaborador**: Ver rendimiento individual
- **Por Tipo de Movimiento**: Filtrar ingresos o gastos
- **Por Tipo de Servicio**: Analizar servicios específicos
- **Por Rango de Fechas**: Análisis temporal personalizado
- **Chips Visuales**: Vista rápida de filtros activos

### 🎨 Diseño Moderno
- **Interfaz Limpia**: Fondo blanco con elementos contrastantes
- **Responsive**: Se adapta a móvil, tablet y desktop
- **Logo Personalizado**: Branding de Sherman en el header
- **Gradientes y Colores**: Paleta profesional azul/púrpura/verde

## 🚀 Tecnologías

- **React 18.3** - Framework UI
- **TypeScript 5.5** - Tipado estático
- **Vite 5.4** - Build tool ultra-rápido
- **Tailwind CSS 3.4** - Estilos utility-first
- **Recharts 2.14** - Gráficos interactivos
- **Lucide React** - Iconos modernos
- **Google Sheets API** - Sincronización de datos
- **Date-fns** - Manejo de fechas
- **Docker + Nginx** - Despliegue en producción

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

## 📊 Estructura del Proyecto

```
sherman-dashboard/
├── src/
│   ├── components/          # Componentes React
│   │   ├── MetricCard.tsx          # Tarjeta de métricas
│   │   ├── ColaboradorCard.tsx     # Tarjeta de colaborador
│   │   ├── ColaboradorGoalGauge.tsx # Velocímetro de metas
│   │   ├── WhatIfSimulator.tsx     # Simulador what-if
│   │   ├── DashboardFilters.tsx    # Filtros del dashboard
│   │   ├── DailyIncomeChart.tsx    # Gráfico de ingresos diarios
│   │   ├── DailyTrendChart.tsx     # Gráfico de tendencias
│   │   ├── ServiceStatsChart.tsx   # Gráfico de servicios
│   │   └── GastoDistributionChart.tsx # Gráfico de gastos
│   ├── services/            # Servicios
│   │   └── googleSheets.ts         # Integración Google Sheets
│   ├── types/               # Definiciones TypeScript
│   │   └── index.ts               # Tipos del dashboard
│   ├── utils/               # Utilidades
│   │   └── dataProcessors.ts      # Procesamiento de datos
│   ├── App.tsx             # Componente principal
│   ├── main.tsx            # Entry point
│   └── index.css           # Estilos globales
├── public/
│   └── logo.jpeg           # Logo de Sherman
├── Dockerfile              # Configuración Docker
├── nginx.conf              # Configuración Nginx
├── build.sh                # Script de construcción
├── .dockerignore          # Archivos ignorados por Docker
├── DEPLOY_EASYPANEL.md    # Guía de despliegue
└── README.md              # Este archivo
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

## 🐳 Despliegue con Docker

### Build local

```bash
docker build \
  --build-arg VITE_GOOGLE_API_KEY=tu_api_key \
  --build-arg VITE_SPREADSHEET_ID=tu_spreadsheet_id \
  --build-arg VITE_SHEET_NAME=Finance \
  --build-arg VITE_SHEET_RANGE=A:Z \
  -t sherman-dashboard .
```

### Ejecutar contenedor

```bash
docker run -p 80:80 sherman-dashboard
```

## 🌐 Despliegue en EasyPanel

**📘 Sigue la guía completa en [DEPLOY_EASYPANEL.md](./DEPLOY_EASYPANEL.md)**

Resumen rápido:
1. Sube el proyecto a GitHub
2. Crea un nuevo servicio en EasyPanel
3. Conecta tu repositorio
4. Configura las variables de entorno:
   - `VITE_GOOGLE_API_KEY`
   - `VITE_SPREADSHEET_ID`
   - `VITE_SHEET_NAME`
   - `VITE_SHEET_RANGE`
5. Despliega con Docker
6. ¡Listo! Tu dashboard estará en línea en minutos

### Otras Opciones de Despliegue

#### Vercel
1. Importa el repositorio en Vercel
2. Configura las variables de entorno
3. Despliega automáticamente

#### Netlify
1. Conecta tu repositorio de GitHub
2. Configura las variables de entorno
3. Despliega con un clic

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

## 📱 Características Responsive

- **Desktop**: Layout de 3-4 columnas con todos los gráficos visibles
- **Tablet**: Layout de 2 columnas adaptativo
- **Móvil**: Layout de 1 columna con scroll vertical optimizado

## 🎨 Paleta de Colores

- **Primary**: `#3b82f6` (Azul)
- **Secondary**: `#8b5cf6` (Púrpura)
- **Accent**: `#10b981` (Verde)
- **Background**: `#ffffff` (Blanco)
- **Text**: `#1e293b` (Slate 900)

## 🔄 Actualización de Datos

- **Automática**: Cada 30 segundos
- **Manual**: Botón "Actualizar" en el header
- **Indicador**: Muestra la hora de última actualización

## 🛠️ Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build para producción
npm run preview  # Preview del build
npm run lint     # Linter ESLint
```

## 🔧 Personalización

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

## 📄 Licencia

Este proyecto es privado y está diseñado específicamente para el negocio Sherman.

## 👨‍💻 Autor

Desarrollado con ❤️ para Sherman Dashboard

## 🤝 Contribuir

Este es un proyecto privado. Para cambios o mejoras, contacta al administrador del proyecto.

## 📧 Soporte

Para soporte o consultas sobre el dashboard:
- Revisa la [Guía de Despliegue](./DEPLOY_EASYPANEL.md)
- Verifica los logs en la consola del navegador
- Contacta al equipo de desarrollo

---

**Sherman Dashboard v1.0** - Dashboard Profesional de Gestión Canina 🐕
