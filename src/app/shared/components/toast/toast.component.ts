import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '@core/services/notification.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('toastAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(100%) scale(0.95)' }),
        animate('300ms cubic-bezier(0.2, 0.8, 0.2, 1)', style({ opacity: 1, transform: 'translateX(0) scale(1)' }))
      ]),
      transition(':leave', [
        animate('250ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({ opacity: 0, transform: 'translateX(100%) scale(0.95)' }))
      ])
    ])
  ]
})
export class ToastComponent {
  private notificationService = inject(NotificationService);

  /** Signal exposing the active list of toasts */
  public toasts = this.notificationService.toasts;

  /**
   * Helper to map toast type to Material Symbol icon string
   */
  getIcon(type: string): string {
    switch (type) {
      case 'success': return 'check_circle';
      case 'error': return 'error';
      case 'warning': return 'warning';
      case 'info':
      default: return 'info';
    }
  }

  /**
   * Manually dismiss a toast
   */
  dismiss(id: string): void {
    this.notificationService.remove(id);
  }
}
