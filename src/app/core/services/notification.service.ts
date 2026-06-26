import { Injectable, signal, WritableSignal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private toastsSignal: WritableSignal<ToastMessage[]> = signal([]);
  public readonly toasts = this.toastsSignal.asReadonly();

  private counter = 0;
  private readonly DEFAULT_DURATION = 5000;

  constructor() {}

  /**
   * Show a success toast notification
   */
  success(message: string, title?: string, duration?: number): void {
    this.show({ type: 'success', message, title, duration });
  }

  /**
   * Show an error toast notification
   */
  error(message: string, title?: string, duration?: number): void {
    this.show({ type: 'error', message, title, duration });
  }

  /**
   * Show a warning toast notification
   */
  warning(message: string, title?: string, duration?: number): void {
    this.show({ type: 'warning', message, title, duration });
  }

  /**
   * Show an info toast notification
   */
  info(message: string, title?: string, duration?: number): void {
    this.show({ type: 'info', message, title, duration });
  }

  /**
   * Generic method to push a toast into the queue
   */
  private show(config: Omit<ToastMessage, 'id'>): void {
    const id = `toast_${Date.now()}_${this.counter++}`;
    const newToast: ToastMessage = {
      id,
      ...config,
      duration: config.duration || this.DEFAULT_DURATION
    };

    this.toastsSignal.update(current => [...current, newToast]);

    // Auto-remove after duration
    if (newToast.duration > 0) {
      setTimeout(() => {
        this.remove(id);
      }, newToast.duration);
    }
  }

  /**
   * Remove a specific toast by its ID
   */
  remove(id: string): void {
    this.toastsSignal.update(current => current.filter(toast => toast.id !== id));
  }
}
