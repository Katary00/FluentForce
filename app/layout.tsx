/**
 * FluentForce - English Learning Platform
 * Desarrollado por Grupo 3 de Usabilidad Y Accesibilidad
 */
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "FluentForce - Grupo 3 Usabilidad y Accesibilidad",
  description: "Desarrollado por Grupo 3 de Usabilidad Y Accesibilidad",
  generator: "Grupo 3 - Usabilidad y Accesibilidad",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
