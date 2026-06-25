import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'glass';
type ButtonType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() type: ButtonType = 'button';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() icon = '';
  @Input() fullWidth = false;
  @Input() testId = 'app-button';

  @Output() onClick = new EventEmitter<MouseEvent>();

  handleClick(event: MouseEvent): void {
    if (!this.disabled && !this.loading) {
      this.onClick.emit(event);
    }
  }
}
