import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptyStateComponent {
  /** The Material Symbols icon name to display */
  @Input() icon: string = 'inbox';
  
  /** The primary title text */
  @Input() title: string = 'No Data Available';
  
  /** The secondary description text */
  @Input() description: string = 'There is currently nothing to show here.';
  
  /** Optional action button text. If provided, the button will be rendered. */
  @Input() actionText?: string;
  
  /** Event emitted when the action button is clicked */
  @Output() actionClick = new EventEmitter<void>();
}
