import {
  Component,
  ChangeDetectionStrategy,
  signal,
  afterNextRender,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '@core/services/api.service';
import { Feature } from '@core/models/feature.model';
import { FeatureLog } from '@core/models/feature-log.model';
import {
  DbConnectionStatus,
  APP_STRINGS,
  DB_STATUS_ICONS,
  GREETING_THRESHOLDS,
  GREETINGS,
  STORAGE_KEYS,
} from '@core/constants/app.constants';

/**
 * Dashboard Component.
 *
 * Primary user landing page showing the greeting header, database connection status,
 * and a hybrid flow of full-width and grid features.
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class DashboardComponent {
  /* ── Protected Properties & Signals ── */

  protected readonly strings = APP_STRINGS;
  protected readonly dbIcons = DB_STATUS_ICONS;
  protected readonly userName = 'Naani';

  protected readonly greeting = signal<string>(GREETINGS.DEFAULT);
  protected readonly dbStatus = signal<DbConnectionStatus>('connecting');
  protected readonly features = signal<Feature[]>([]);
  protected readonly apiMessage = signal<string>('');

  /** Current date string formatted nicely for dashboard display */
  protected readonly todayDate = signal<string>('');

  /** Most recently logged upcoming features for dashboard glimpse */
  protected readonly recentLogs = signal<FeatureLog[]>([]);

  /** Current feature selected for showing detail modal */
  protected readonly selectedFeature = signal<Feature | null>(null);

  /* ── Private Injectable References ── */

  private readonly apiService = inject(ApiService);
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);

  constructor() {
    afterNextRender(() => {
      this.setGreetingByTimeOfDay();
      this.loadApiData();
      this.loadRecentLogs();
      this.setCurrentDate();
    });
  }

  /* ── Protected Methods ── */

  /** Gets a loaded feature by name (returns mock if not loaded yet) */
  protected getFeature(name: string): Feature {
    const found = this.features().find(
      (f) => f.name.toLowerCase().trim() === name.toLowerCase().trim()
    );
    if (found) return found;

    return {
      _id: `mock-${name}`,
      name,
      description: `Track and organize your daily ${name.toLowerCase()} updates`,
      icon: this.getIconForFeature(name),
      enabled: true,
    };
  }

  /** Navigates to the Feature Log screen */
  protected openFeatureLog(): void {
    this.router.navigate(['/upcoming-features']);
  }

  /** Handles clicking on feature cards to show details modal */
  protected onFeatureClick(feature: Feature): void {
    this.selectedFeature.set(feature);
  }

  /** Closes the feature details modal */
  protected closeDetails(): void {
    this.selectedFeature.set(null);
  }

  /* ── Private Methods ── */

  /** Sets greeting message based on current hour */
  private setGreetingByTimeOfDay(): void {
    const hour = new Date().getHours();
    if (hour < GREETING_THRESHOLDS.MORNING_END) {
      this.greeting.set(GREETINGS.MORNING);
    } else if (hour < GREETING_THRESHOLDS.AFTERNOON_END) {
      this.greeting.set(GREETINGS.AFTERNOON);
    } else {
      this.greeting.set(GREETINGS.EVENING);
    }
  }

  /** Formats and sets the current date for the dashboard header */
  private setCurrentDate(): void {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    };
    this.todayDate.set(new Date().toLocaleDateString('en-US', options));
  }

  /** Fetches features from the API */
  private loadApiData(): void {
    this.apiService.fetchHello().subscribe({
      next: (res) => this.apiMessage.set(res.message),
      error: () => this.dbStatus.set('error'),
    });

    this.apiService.fetchFeatures().subscribe({
      next: (res) => {
        this.features.set(res.data);
        this.dbStatus.set('connected');
      },
      error: () => {
        this.dbStatus.set('error');
      },
    });
  }

  /** Loads the 2 most recent logged features for preview */
  private loadRecentLogs(): void {
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem(STORAGE_KEYS.FEATURE_LOGS);
      if (stored) {
        try {
          const logs: FeatureLog[] = JSON.parse(stored);
          this.recentLogs.set(logs.slice(0, 2));
        } catch {
          /* ignore corrupted data */
        }
      }
    }
  }

  /** Gets fallback icon name based on feature name */
  private getIconForFeature(name: string): string {
    switch (name.toLowerCase()) {
      case 'notes': return 'sticky_note_2';
      case 'kitchen': return 'countertops';
      case 'finance tracker': return 'account_balance';
      case 'travel': return 'flight_takeoff';
      case 'reminders': return 'notifications_active';
      case 'purchases': return 'shopping_bag';
      case 'kirana': return 'shopping_cart';
      case 'plans': return 'event';
      case 'rules': return 'gavel';
      case 'movies': return 'movie';
      case 'streak loggers': return 'grid_on';
      default: return 'widgets';
    }
  }
}
