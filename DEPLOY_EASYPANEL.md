# 🚀 Guía de Despliegue en EasyPanel - Sherman Dashboard

Esta guía te mostrará cómo desplegar el Dashboard de Sherman en EasyPanel paso a paso.

## 📋 Prerrequisitos

1. Cuenta en [EasyPanel](https://easypanel.io/)
2. Proyecto subido a GitHub (este repositorio)
3. Google Sheets API Key configurada
4. ID de tu hoja de cálculo de Google Sheets

## 🔑 Variables de Entorno Requeridas

Antes de desplegar, necesitarás configurar estas variables:

```env
VITE_GOOGLE_API_KEY=tu_api_key_de_google
VITE_SPREADSHEET_ID=tu_spreadsheet_id
VITE_SHEET_NAME=Finance
VITE_SHEET_RANGE=A:Z
```

### 📝 Cómo obtener las credenciales:

#### Google API Key:
1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita "Google Sheets API"
4. Ve a "Credenciales" > "Crear credenciales" > "Clave de API"
5. Copia la API Key generada

#### Spreadsheet ID:
- Es la parte larga en la URL de tu Google Sheet
- Ejemplo: `https://docs.google.com/spreadsheets/d/`**`1I5HSsNyutjuaLGR1ruyh5B_rKCuOU77GdduAWpzJFf8`**`/edit`
- El ID es: `1I5HSsNyutjuaLGR1ruyh5B_rKCuOU77GdduAWpzJFf8`

## 🐳 Pasos de Despliegue

### 1. Preparar el Repositorio

Si aún no has subido tu código a GitHub:

```bash
git init
git add .
git commit -m "Initial commit - Sherman Dashboard"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/sherman-dashboard.git
git push -u origin main
```

### 2. Crear Servicio en EasyPanel

1. Ingresa a tu panel de EasyPanel
2. Haz clic en **"New Service"** o **"Crear Servicio"**
3. Selecciona **"GitHub Repository"** como fuente

### 3. Conectar Repositorio

1. Autoriza EasyPanel para acceder a tu cuenta de GitHub
2. Selecciona el repositorio **sherman-dashboard**
3. Selecciona la rama **main**

### 4. Configurar Build

1. **Build Method**: Selecciona **Docker**
2. El sistema detectará automáticamente el `Dockerfile` en la raíz del proyecto

### 5. Configurar Variables de Entorno

En la sección "Environment Variables", agrega:

| Variable | Valor | Descripción |
|----------|-------|-------------|
| `VITE_GOOGLE_API_KEY` | Tu API Key | Clave de Google Cloud |
| `VITE_SPREADSHEET_ID` | ID de tu sheet | ID de tu hoja de cálculo |
| `VITE_SHEET_NAME` | Finance | Nombre de la pestaña (hoja) |
| `VITE_SHEET_RANGE` | A:Z | Rango de columnas a leer |

⚠️ **IMPORTANTE**: Nunca subas estas credenciales al repositorio. Siempre configúralas en EasyPanel.

### 6. Configurar Puerto

- **Puerto**: `80`
- El Dockerfile ya está configurado para exponer el puerto 80

### 7. Desplegar

1. Haz clic en **"Deploy"** o **"Desplegar"**
2. Espera 3-5 minutos mientras:
   - Se construye la imagen Docker
   - Se instalan las dependencias
   - Se compila el proyecto con Vite
   - Se configura Nginx

### 8. Verificar Despliegue

1. Una vez completado, EasyPanel te dará una URL
2. Accede a la URL y verifica que el dashboard cargue correctamente
3. Verifica que los datos de Google Sheets se sincronicen

## 🔄 Actualizaciones Automáticas

EasyPanel puede configurarse para hacer redespliegues automáticos:

1. Ve a la configuración del servicio
2. Activa **"Auto Deploy on Push"**
3. Cada push a la rama `main` desplegará automáticamente

## 🐛 Solución de Problemas

### Error: "Failed to build"
- Verifica que todas las variables de entorno estén configuradas
- Revisa que el `Dockerfile` esté en la raíz del proyecto
- Verifica los logs de construcción en EasyPanel

### Error: "Cannot read Google Sheets"
- Verifica que la API Key sea correcta
- Asegúrate de que Google Sheets API esté habilitada
- Confirma que el Spreadsheet ID sea el correcto
- Verifica que la hoja esté compartida como "Cualquiera con el enlace puede ver"

### La página carga pero sin datos
- Revisa la consola del navegador (F12)
- Verifica que las variables de entorno estén bien configuradas
- Comprueba que el nombre de la hoja (VITE_SHEET_NAME) sea correcto

### Error 404 al navegar
- El archivo `nginx.conf` debe estar configurado correctamente
- Esto ya está incluido en el proyecto

## 🌐 Dominio Personalizado (Opcional)

1. En EasyPanel, ve a la configuración del servicio
2. Sección **"Domains"**
3. Agrega tu dominio personalizado
4. Configura los DNS según las instrucciones de EasyPanel
5. Espera a que se active el certificado SSL (automático)

## 📊 Características del Dashboard Desplegado

Una vez desplegado, tendrás acceso a:

✅ Dashboard en tiempo real 24/7
✅ Sincronización automática con Google Sheets cada 30 segundos
✅ Análisis financiero completo
✅ Seguimiento de metas por colaborador
✅ Simuladores "What If"
✅ Gráficos interactivos
✅ Filtros avanzados
✅ HTTPS automático
✅ Rendimiento optimizado con Nginx
✅ Diseño responsive para móvil y desktop

## 🔐 Seguridad

- Todas las conexiones usan HTTPS
- Las credenciales se manejan como variables de entorno
- Headers de seguridad configurados en Nginx
- Compresión Gzip habilitada
- Cache optimizado para assets estáticos

## 📞 Soporte

Si encuentras problemas:

1. Revisa los logs en EasyPanel
2. Verifica la consola del navegador
3. Confirma que las variables de entorno estén correctas
4. Asegúrate de que tu hoja de Google Sheets tenga los permisos correctos

## 🎉 ¡Listo!

Tu Dashboard de Sherman está ahora desplegado y listo para usar. Accede desde cualquier dispositivo con tu URL de EasyPanel.
