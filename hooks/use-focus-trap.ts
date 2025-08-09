import { useEffect, useCallback, useState, useRef } from 'react';

/**
 * Hook para manejar el focus trap según WCAG 2.1.2
 * Intercepta la navegación Tab para mantener el enfoque dentro de la app
 */
export function useFocusTrap() {
  const [isTrapped, setIsTrapped] = useState(true);
  const [showEscapeHint, setShowEscapeHint] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Función para obtener elementos focusables
  const getFocusableElements = useCallback(() => {
    if (!containerRef.current) return [];
    
    const focusableSelectors = [
      'button:not([disabled])',
      '[href]:not([disabled])', 
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"]):not([disabled])',
      'audio[controls]:not([disabled])',
      'video[controls]:not([disabled])'
    ].join(', ');

    return Array.from(containerRef.current.querySelectorAll(focusableSelectors)) as HTMLElement[];
  }, []);

  // Función para escapar al navegador
  const escapeToNavigator = useCallback(() => {
    setIsTrapped(false);
    
    // Mostrar mensaje de confirmación
    setShowEscapeHint(true);
    setTimeout(() => setShowEscapeHint(false), 4000);
    
    // Desenfocar elemento actual completamente
    (document.activeElement as HTMLElement)?.blur();
    
    // Crear un enlace invisible que active el foco del navegador
    const escapeLink = document.createElement('a');
    escapeLink.href = '#browser-navigation';
    escapeLink.style.position = 'fixed';
    escapeLink.style.top = '-9999px';
    escapeLink.style.left = '-9999px';
    escapeLink.style.opacity = '0';
    escapeLink.style.pointerEvents = 'none';
    escapeLink.tabIndex = 0;
    escapeLink.setAttribute('aria-label', 'Navegación del navegador');
    
    // Agregar al body y enfocar
    document.body.appendChild(escapeLink);
    
    setTimeout(() => {
      escapeLink.focus();
      
      // Simular Tab para que vaya al navegador
      setTimeout(() => {
        const tabEvent = new KeyboardEvent('keydown', {
          key: 'Tab',
          code: 'Tab',
          keyCode: 9,
          which: 9,
          bubbles: true,
          cancelable: true
        });
        
        // No prevenir el evento para que el navegador lo maneje naturalmente
        document.dispatchEvent(tabEvent);
        
        // Remover el enlace después de un momento
        setTimeout(() => {
          if (document.body.contains(escapeLink)) {
            document.body.removeChild(escapeLink);
          }
        }, 1000);
      }, 100);
    }, 50);
    
    // Reactivar el trap después de un tiempo
    setTimeout(() => {
      setIsTrapped(true);
      // Cuando se reactive, enfocar el primer elemento de la app si el foco está perdido
      setTimeout(() => {
        const focusableElements = getFocusableElements();
        if (focusableElements.length > 0 && 
            !containerRef.current?.contains(document.activeElement)) {
          focusableElements[0].focus();
        }
      }, 100);
    }, 5000);
  }, [getFocusableElements]);

  // Manejador principal de teclas
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Ctrl + Shift + B para escapar al navegador
    if (event.ctrlKey && event.shiftKey && event.key === 'B') {
      event.preventDefault();
      escapeToNavigator();
      return;
    }

    // Solo interceptar Tab si el trap está activo
    if (!isTrapped || event.key !== 'Tab') return;

    const focusableElements = getFocusableElements();
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    const activeElement = document.activeElement as HTMLElement;

    // Si Shift + Tab en el primer elemento, ir al último
    if (event.shiftKey && activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
      return;
    }

    // Si Tab en el último elemento, ir al primero
    if (!event.shiftKey && activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
      return;
    }
  }, [isTrapped, getFocusableElements, escapeToNavigator]);

  // Manejador de pérdida de foco
  const handleFocusOut = useCallback((event: FocusEvent) => {
    if (!isTrapped || !containerRef.current) return;

    // Pequeño delay para permitir que el nuevo elemento reciba el foco
    setTimeout(() => {
      const activeElement = document.activeElement;
      
      // Si el foco se ha ido fuera del contenedor, traerlo de vuelta
      if (!containerRef.current?.contains(activeElement)) {
        const focusableElements = getFocusableElements();
        if (focusableElements.length > 0) {
          focusableElements[0].focus();
        }
      }
    }, 10);
  }, [isTrapped, getFocusableElements]);

  // Configurar event listeners
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Event listeners a nivel de documento
    document.addEventListener('keydown', handleKeyDown, true);
    document.addEventListener('focusout', handleFocusOut, true);
    
    // Asegurar que el primer elemento focusable esté enfocado al cargar
    if (isTrapped) {
      const focusableElements = getFocusableElements();
      if (focusableElements.length > 0 && !container.contains(document.activeElement)) {
        focusableElements[0].focus();
      }
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
      document.removeEventListener('focusout', handleFocusOut, true);
    };
  }, [handleKeyDown, handleFocusOut, isTrapped, getFocusableElements]);

  return {
    containerRef,
    isTrapped,
    showEscapeHint,
    escapeToNavigator
  };
}
