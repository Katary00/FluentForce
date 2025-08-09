"use client";

import React from 'react';
import { useFocusTrap } from '@/hooks/use-focus-trap';
import { Button } from '@/components/ui/button';
import { ExternalLink, Keyboard } from 'lucide-react';

interface FocusTrapWrapperProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Wrapper component que implementa focus trap según WCAG 2.1.2
 * Permite navegación interna y escape intencional al navegador
 */
export function FocusTrapWrapper({ children, className = "" }: FocusTrapWrapperProps) {
  const { containerRef, isTrapped, showEscapeHint, escapeToNavigator } = useFocusTrap();

  return (
    <div ref={containerRef} className={`focus-trap-container relative ${className}`}>
      {children}
      
      {/* Botón de escape al navegador */}
      <Button
        onClick={escapeToNavigator}
        variant="ghost"
        size="sm"
        className="fixed bottom-4 right-4 z-50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-200"
        title="Salir al navegador (Ctrl + Shift + B)"
        aria-label="Salir al navegador - Ctrl + Shift + B"
      >
        <ExternalLink className="w-4 h-4 mr-1" />
        <span className="text-xs">Navegador</span>
      </Button>

      {/* Indicador de ayuda de teclado */}
      <div 
        className="fixed bottom-20 left-4 z-50 bg-blue-50 dark:bg-blue-900/50 border border-blue-200 dark:border-blue-700 rounded-lg p-2 shadow-lg"
        aria-live="polite"
      >
        <div className="flex items-center text-xs text-blue-700 dark:text-blue-300">
          <Keyboard className="w-3 h-3 mr-1" />
          <span>
            <kbd className="px-1 py-0.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-xs">
              Ctrl
            </kbd> + 
            <kbd className="px-1 py-0.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-xs mx-1">
              Shift
            </kbd> + 
            <kbd className="px-1 py-0.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-xs">
              B
            </kbd>
            <span className="ml-1">= Liberar foco, luego Tab</span>
          </span>
        </div>
      </div>

      {/* Mensaje de confirmación cuando se escapa */}
      {showEscapeHint && (
        <div 
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[60] bg-green-500 text-white px-6 py-3 rounded-lg shadow-2xl animate-in slide-in-from-top duration-300"
          role="alert"
          aria-live="assertive"
        >
          <div className="flex items-center">
            <ExternalLink className="w-5 h-5 mr-2" />
            <span className="font-medium">Enfoque liberado - Usa Tab para ir al navegador</span>
          </div>
          <p className="text-sm mt-1 opacity-90">
            Presiona Tab para navegar a la barra de direcciones. El focus trap se reactivará en 5 segundos.
          </p>
        </div>
      )}

      {/* Indicador visual del estado del focus trap */}
      <div 
        className={`fixed top-0 left-0 w-full h-1 z-[70] transition-all duration-300 ${
          isTrapped 
            ? 'bg-gradient-to-r from-blue-500 to-green-500' 
            : 'bg-gradient-to-r from-orange-500 to-red-500'
        }`}
        aria-hidden="true"
      />
    </div>
  );
}
