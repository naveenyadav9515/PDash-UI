import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

export type LoaderVariant = 'spinner' | 'skeleton' | 'full-page';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {
  /** The visual variant of the loader. Default is 'spinner'. */
  @Input() variant: LoaderVariant = 'spinner';

  /** Optional title for the 'full-page' variant. */
  @Input() title?: string;

  /** Optional description for the 'full-page' variant. */
  @Input() description?: string;
}
