/**
 * RouteManager - Manejo de rutas y navegación de pantallas
 * FluentForce - English Learning Platform
 * Desarrollado por Grupo 3 de Usabilidad Y Accesibilidad
 */

export type ScreenType =
  | "welcome"
  | "login"
  | "register"
  | "dashboard"
  | "vocabulary"
  | "listening"
  | "grammar"
  | "reading"
  | "writing";

export interface RouteState {
  currentScreen: ScreenType;
  previousScreen?: ScreenType;
  params?: Record<string, any>;
}

export class RouteManager {
  private listeners: ((state: RouteState) => void)[] = [];
  private state: RouteState = {
    currentScreen: "welcome",
  };

  /**
   * Registra un listener para cambios de ruta
   */
  subscribe(listener: (state: RouteState) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  /**
   * Obtiene el estado actual de la ruta
   */
  getState(): RouteState {
    return { ...this.state };
  }

  /**
   * Navega a una nueva pantalla
   */
  navigate(screen: ScreenType, params?: Record<string, any>) {
    const previousScreen = this.state.currentScreen;
    this.state = {
      currentScreen: screen,
      previousScreen,
      params,
    };

    this.notifyListeners();
  }

  /**
   * Regresa a la pantalla anterior
   */
  goBack() {
    if (this.state.previousScreen) {
      this.navigate(this.state.previousScreen);
    }
  }

  /**
   * Notifica a todos los listeners sobre el cambio de estado
   */
  private notifyListeners() {
    this.listeners.forEach((listener) => listener(this.getState()));
  }

  /**
   * Obtiene la pantalla actual
   */
  getCurrentScreen(): ScreenType {
    return this.state.currentScreen;
  }

  /**
   * Verifica si estamos en una pantalla específica
   */
  isCurrentScreen(screen: ScreenType): boolean {
    return this.state.currentScreen === screen;
  }

  /**
   * Verifica si hay una pantalla anterior disponible
   */
  canGoBack(): boolean {
    return !!this.state.previousScreen;
  }
}

// Instancia global del router
export const router = new RouteManager();
