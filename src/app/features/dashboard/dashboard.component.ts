import {
  Component,
  ChangeDetectionStrategy,
  signal,
  afterNextRender,
  inject,
  PLATFORM_ID,
  HostListener,
  ElementRef,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '@core/services/api.service';
import { Feature } from '@core/models/feature.model';
import { FeatureLog } from '@core/models/feature-log.model';
import { NotificationService } from '@core/services/notification.service';
import {
  DbConnectionStatus,
  APP_STRINGS,
  DB_STATUS_ICONS,
  GREETING_THRESHOLDS,
  GREETINGS,
  STORAGE_KEYS,
} from '@core/constants/app.constants';

import { LoaderComponent } from '../../shared/components';
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
  imports: [LoaderComponent],
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
  protected readonly quoteText = signal<string>('');

  /** Most recently logged upcoming features for dashboard glimpse */
  protected readonly recentLogs = signal<FeatureLog[]>([]);

  /** Current feature selected for showing detail modal */
  protected readonly selectedFeature = signal<Feature | null>(null);

  /** Settings and Theme options state */
  protected readonly isSettingsOpen = signal<boolean>(false);
  protected readonly currentTheme = signal<'dark' | 'light'>('dark');

  /** Extra metrics for welcome card */
  protected readonly notesCount = signal<number>(8);
  protected readonly kitchenCount = signal<number>(5);

  /* ── Private Dependencies ── */
  private readonly apiService = inject(ApiService);
  private readonly notificationService = inject(NotificationService);
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly elementRef = inject(ElementRef);

  constructor() {
    afterNextRender(() => {
      this.setGreetingByTimeOfDay();
      this.loadApiData();
      this.loadRecentLogs();
      this.setCurrentDate();
      this.initializeTheme();
      this.loadExtraMetrics();
      this.setRandomQuote();
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

  /** Toggles the settings theme dropdown menu */
  protected toggleSettingsMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.isSettingsOpen.update((open) => !open);
  }

  /** Sets the active system theme (dark/light) */
  protected setTheme(theme: 'dark' | 'light'): void {
    if (isPlatformBrowser(this.platformId)) {
      // Add smooth transition helper class
      document.documentElement.classList.add('theme-transitioning');
      
      this.currentTheme.set(theme);
      document.documentElement.setAttribute('data-theme', theme);
      
      // Store in both standard keys for full compliance
      localStorage.setItem(STORAGE_KEYS.THEME_PREFERENCE, theme);
      localStorage.setItem('pdash-theme', theme);

      // Update theme-color meta tag for Android address bar styling
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) {
        meta.setAttribute('content', theme === 'light' ? '#f4f3f8' : '#13111c');
      }

      // Remove transition class after the transition is complete
      setTimeout(() => {
        document.documentElement.classList.remove('theme-transitioning');
      }, 1500); // 1.5s transition window
    }
    this.isSettingsOpen.set(false);
  }

  /** Click handler to automatically close the settings dropdown when clicking outside */
  @HostListener('document:click', ['$event'])
  protected onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const settingsContainer = this.elementRef.nativeElement.querySelector('.settings-container');
    const isClickInside = settingsContainer && settingsContainer.contains(target);
    if (!isClickInside) {
      this.isSettingsOpen.set(false);
    }
  }

  /** Keydown handler to close settings dropdown on Escape key press */
  @HostListener('document:keydown.escape')
  protected onEscapePress(): void {
    this.isSettingsOpen.set(false);
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

  /** Initializes theme from localStorage */
  private initializeTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = (localStorage.getItem(STORAGE_KEYS.THEME_PREFERENCE) || localStorage.getItem('pdash-theme')) as 'dark' | 'light' || 'dark';
      this.currentTheme.set(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
      
      // Update theme-color meta tag for Android address bar styling on init
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) {
        meta.setAttribute('content', savedTheme === 'light' ? '#f4f3f8' : '#13111c');
      }
    }
  }

  /** Sets a random motivational quote on load */
  private setRandomQuote(): void {
    const quotes = [
      "Consistency is what transforms average into excellence.",
      "Simplicity is the ultimate sophistication.",
      "The best way to predict the future is to create it.",
      "Focus on being productive instead of busy.",
      "Make it simple, but significant.",
      "Quality is not an act, it is a habit.",
      "Strive for progress, not perfection."
    ];
    const randomIndex = Math.floor(Math.random() * quotes.length);
    this.quoteText.set(quotes[randomIndex]);
  }

  /** Loads extra counts for welcome banner card from local storage */
  private loadExtraMetrics(): void {
    if (isPlatformBrowser(this.platformId)) {
      const savedNotes = localStorage.getItem('pdash-notes-count');
      if (savedNotes) {
        this.notesCount.set(parseInt(savedNotes, 10));
      } else {
        localStorage.setItem('pdash-notes-count', '8');
      }

      const savedKitchen = localStorage.getItem('pdash-kitchen-count');
      if (savedKitchen) {
        this.kitchenCount.set(parseInt(savedKitchen, 10));
      } else {
        localStorage.setItem('pdash-kitchen-count', '5');
      }
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
      error: () => {
        this.dbStatus.set('error');
        this.notificationService.error('Failed to establish connection with server', 'System Offline');
      },
    });

    this.apiService.fetchFeatures().subscribe({
      next: (res) => {
        this.features.set(res.data);
        this.dbStatus.set('connected');
        this.notificationService.success('Secure pipeline established successfully', 'Systems Online');
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
