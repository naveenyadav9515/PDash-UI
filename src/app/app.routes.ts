import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { FeatureLogComponent } from './features/feature-log/feature-log.component';

/**
 * Global Routing Table.
 *
 * Defines entry paths for dashboard features:
 * - Empty path defaults to the main Dashboard view.
 * - `upcoming-features` routes to the isolated feature log logger.
 */
export const routes: Routes = [
  { path: '', component: DashboardComponent, title: 'P-Dash' },
  { path: 'upcoming-features', component: FeatureLogComponent, title: 'P-Dash — Features Log' },
  { path: '**', redirectTo: '' },
];
