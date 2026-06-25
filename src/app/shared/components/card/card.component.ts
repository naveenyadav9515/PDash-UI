import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  @Input() hoverable = true;
  @Input() padding: 'none' | 'sm' | 'md' | 'lg' = 'md';
}
