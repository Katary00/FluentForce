/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración para exportación estática en Netlify
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Configuración para archivos estáticos
  assetPrefix: process.env.NODE_ENV === "production" ? "" : "",
  // Configuración de rutas
  basePath: "",
  // Optimización del compilador
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
