# FluentForce - Deployment en Netlify

## 🚀 Configuración para Netlify

Este proyecto está configurado para ser desplegado en Netlify con las siguientes optimizaciones:

### Archivos de Configuración

- `netlify.toml` - Configuración principal de Netlify
- `next.config.mjs` - Configuración de Next.js para exportación estática
- `public/_headers` - Headers de optimización
- `public/robots.txt` - SEO y crawling
- `.env.production` - Variables de entorno para producción

### Scripts de Build

```bash
npm run build    # Build de Next.js
npm run netlify  # Build optimizado para Netlify
```

## 📝 Pasos para Deployment

### Opción 1: Deployment Automático desde Git

1. **Conectar repositorio a Netlify:**
   - Ve a [netlify.com](https://netlify.com)
   - Crea una cuenta o inicia sesión
   - Click en "New site from Git"
   - Conecta tu repositorio de GitHub

2. **Configuración de Build:**
   - Build command: `npm run build`
   - Publish directory: `out`
   - Node version: `18`

3. **Variables de entorno (opcional):**
   - `NEXT_PUBLIC_APP_URL`: URL de tu sitio
   - `NODE_ENV`: `production`

### Opción 2: Deployment Manual

1. **Build local:**
   ```bash
   npm install
   npm run build
   ```

2. **Deploy manual:**
   - Ve a netlify.com
   - Arrastra la carpeta `out` a la interfaz de Netlify

## 🔧 Configuraciones Adicionales

### Custom Domain
1. En Netlify Dashboard > Domain settings
2. Add custom domain
3. Configura DNS según las instrucciones

### SSL/HTTPS
- Se configura automáticamente con Netlify
- Let's Encrypt incluido gratis

### Performance
- Headers de cache configurados
- Compresión gzip/brotli automática
- CDN global incluido

## 🎯 Optimizaciones Incluidas

- **SEO**: robots.txt y meta tags
- **Performance**: Headers de cache optimizados
- **Security**: Headers de seguridad configurados
- **Accessibility**: Soporte completo de navegación por teclado
- **PWA Ready**: Configurado para Progressive Web App

## 🐛 Troubleshooting

### Build Failures
- Verifica que todas las dependencias estén en `package.json`
- Revisa que no hay errores de TypeScript críticos
- Asegúrate de que el Node version sea 18+

### 404 Errors
- Verifica que el `output: 'export'` esté en `next.config.mjs`
- Confirma que las rutas están configuradas correctamente

### Performance Issues
- Optimiza imágenes antes del deployment
- Verifica que los headers de cache estén funcionando
- Usa herramientas como Lighthouse para análisis

## 📊 Monitoring

Una vez desplegado, puedes monitorear:
- Analytics en Netlify Dashboard
- Core Web Vitals
- Uptime y performance
- Logs de deployment

## 🔄 CI/CD

El proyecto está configurado para deployment automático:
- Push a `main` → Build automático
- Pull requests → Deploy previews
- Rollback automático en caso de errores
