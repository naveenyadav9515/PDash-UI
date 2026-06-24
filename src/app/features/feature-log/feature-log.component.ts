import {
  Component,
  ChangeDetectionStrategy,
  signal,
  afterNextRender,
  inject,
  PLATFORM_ID,
  HostListener,
} from '@angular/core';
import { isPlatformBrowser, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { FeatureLog } from '@core/models/feature-log.model';
import { APP_STRINGS, STORAGE_KEYS } from '@core/constants/app.constants';

/**
 * FeatureLog Component.
 *
 * Isolated page that allows the user to record, display, and delete
 * point-wise upcoming features and ideas. Persists state to localStorage.
 */
@Component({
  selector: 'app-feature-log',
  templateUrl: './feature-log.component.html',
  styleUrl: './feature-log.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, DatePipe],
})
export class FeatureLogComponent {
  /* ── Protected Template Properties ── */

  protected readonly strings = APP_STRINGS;
  protected readonly featureLogs = signal<FeatureLog[]>([]);

  /** Form Group for the feature logger */
  protected readonly featureLogForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    details: new FormArray([
      new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    ]),
  });

  /* ── Private Dependency References ── */

  private readonly platformId = inject(PLATFORM_ID);
  private readonly router = inject(Router);

  constructor() {
    afterNextRender(() => {
      this.loadFeatureLogs();
    });
  }

  /* ── Protected Template Methods ── */

  /** Gets FormArray controls for pointwise detail inputs */
  protected get detailControls(): FormControl[] {
    return (this.featureLogForm.get('details') as FormArray).controls as FormControl[];
  }

  /** Navigates back to the main dashboard page */
  protected goBack(): void {
    this.router.navigate(['/']);
  }

  /** Appends a new input field to the FormArray */
  protected addDetailPoint(): void {
    const details = this.featureLogForm.get('details') as FormArray;
    details.push(new FormControl('', { nonNullable: true, validators: [Validators.required] }));
  }

  /** Removes a detail input field from the FormArray (min 1 field) */
  protected removeDetailPoint(index: number): void {
    const details = this.featureLogForm.get('details') as FormArray;
    if (details.length > 1) {
      details.removeAt(index);
    }
  }

  /** Commits the feature log form to signal state and persists it */
  protected saveFeatureLog(): void {
    if (this.featureLogForm.invalid) return;

    const formValue = this.featureLogForm.value;
    const newLog: FeatureLog = {
      id: crypto.randomUUID(),
      name: formValue.name ?? '',
      details: (formValue.details ?? []).filter((d): d is string => !!d?.trim()),
      createdAt: new Date().toISOString(),
    };

    this.featureLogs.update((logs) => [newLog, ...logs]);
    this.persistFeatureLogs();
    this.resetLogForm();
  }

  /** Deletes a feature log entry by ID */
  protected deleteFeatureLog(id: string): void {
    this.featureLogs.update((logs) => logs.filter((l) => l.id !== id));
    this.persistFeatureLogs();
  }

  /* ── Private Support Methods ── */

  /** Loads logs from local storage in an SSR-safe manner */
  private loadFeatureLogs(): void {
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem(STORAGE_KEYS.FEATURE_LOGS);
      if (stored) {
        try {
          this.featureLogs.set(JSON.parse(stored));
        } catch {
          /* ignore corrupted config data */
        }
      }
    }
  }

  /** Saves logs to local storage in an SSR-safe manner */
  private persistFeatureLogs(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(STORAGE_KEYS.FEATURE_LOGS, JSON.stringify(this.featureLogs()));
    }
  }

  /** Clears and resets the FormArray and name fields */
  private resetLogForm(): void {
    this.featureLogForm.reset();
    const details = this.featureLogForm.get('details') as FormArray;
    details.clear();
    details.push(new FormControl('', { nonNullable: true, validators: [Validators.required] }));
  }
}
