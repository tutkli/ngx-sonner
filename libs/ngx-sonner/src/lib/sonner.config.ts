import { InjectionToken } from '@angular/core';
import { ToastClassnames } from './types';

export type SonnerConfig = {
  /**
   * Lifetime of toast (in ms)
   * @default 4000
   */
  toastLifetime: number;
  /**
   * Gap between toasts (in px)
   * @default 14
   */
  gap: number;
  /**
   * Distance to swipe to remove a toast (in px)
   * @default 20
   */
  swipeThreshold: number;
  /**
   * Time to unmount a toast after if has been deleted (in ms)
   * @default 200
   */
  timeBeforeUnmount: number;
  /**
   * Visible toasts
   * @default 3
   */
  visibleToastsAmount: number;
  /**
   * Viewport padding (in px)
   * @default 32
   */
  viewportOffset: number;
  /**
   * Toast width (in px)
   * @default 356
   */
  toastWidth: number;
  defaultClasses: ToastClassnames;
};

export const defaultConfig: SonnerConfig = {
  toastLifetime: 4000,
  gap: 14,
  swipeThreshold: 20,
  timeBeforeUnmount: 200,
  visibleToastsAmount: 3,
  viewportOffset: 32,
  toastWidth: 356,
  defaultClasses: {
    toast: '',
    title: '',
    description: '',
    loader: '',
    closeButton: '',
    cancelButton: '',
    actionButton: '',
    action: '',
    warning: '',
    error: '',
    success: '',
    default: '',
    info: '',
    loading: '',
  },
};

export const SONNER_CONFIG = new InjectionToken<SonnerConfig>('SONNER_CONFIG', {
  providedIn: 'root',
  factory: () => defaultConfig,
});

export function sonnerConfig(config: Partial<SonnerConfig>): SonnerConfig {
  return { ...defaultConfig, ...config };
}
