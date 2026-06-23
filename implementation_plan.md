# Lumina Personal Hub — Frontend (Angular) Implementation Plan

This document is the step-by-step execution blueprint for implementing the frontend Angular 20 application in strict compliance with the **Enterprise Frontend Guidelines**. Each phase is broken into actionable tasks with clear deliverables.

---

## Phase 0: Project Scaffolding & Foundation Setup

### 0.1. Angular Project Initialization
- [ ] Initialize Angular 20 project with SSR, standalone components, and strict TypeScript.
- [ ] Configure `tsconfig.json` with `strict: true` and path aliases (`@core/*`, `@shared/*`, `@features/*`, `@env/*`, `@lib/*`).
- [ ] Set up `angular.json` budget thresholds (warn: 500KB, error: 1MB initial bundle).

### 0.2. Directory Structure Creation
- [ ] Create the full directory tree as defined in Guidelines Section 1:
  - `src/app/core/` — `interceptors/`, `guards/`, `services/`, `models/`, `constants/`
  - `src/app/shared/` — `components/`, `pipes/`, `directives/`, `validators/`
  - `src/app/features/` — all 10 feature folders with internal sub-structure
  - `src/app/layouts/` — `main-layout/`, `auth-layout/`
- [ ] Add placeholder `index.ts` barrel files for clean re-exports in each directory.

### 0.3. Linting & Formatting Setup
- [ ] Install and configure `@angular-eslint` with strict rules.
- [ ] Install and configure Prettier with `.prettierrc`.
- [ ] Set up Husky + lint-staged for pre-commit hooks.
- [ ] Add `.editorconfig` for cross-IDE consistency.

### 0.4. Environment Configuration
- [ ] Create `environment.ts` (dev) and `environment.prod.ts` (prod) with API base URLs and feature flags.
- [ ] Ensure environment files do NOT contain secrets.

---

## Phase 1: Design System & Global Styles

### 1.1. Lumina Adaptive CSS Foundation
- [ ] Import `Geist` font and `Material Symbols Outlined` from Google Fonts CDN in `index.html`.
- [ ] Define all `--lm-*` CSS custom properties in `src/styles.scss`:
  - Color tokens (primary, secondary, tertiary, error, surface variants)
  - Typography scale (display-lg through mono-sm)
  - Spacing tokens (4px base unit, stack-sm/md/lg, container-padding, gutter)
  - Elevation tokens (blur values, border widths)
- [ ] Implement glassmorphism utility classes: `.glass-mantle`, `.glass-card`, `.glass-float`, `.border-etched`.
- [ ] Create Light Mode ("Snow Glass") and Dark Mode ("Deep Space") theme token sets toggled via `[data-theme]` attribute.

### 1.2. Responsive Breakpoints & Layout Utilities
- [ ] Define SCSS breakpoint mixins (`$bp-tablet: 768px`, `$bp-desktop: 1024px`, `$bp-wide: 1440px`).
- [ ] Create responsive grid utility classes.
- [ ] Implement CSS logical properties for RTL-readiness (`margin-inline-start`, `padding-inline-end`).

### 1.3. Shared Component Library (Base Kit)
- [ ] Build `app-button` component (primary, secondary/glass, danger variants, loading state).
- [ ] Build `app-input` component (glass input with validation error display, focus ring).
- [ ] Build `app-card` component (glass-card wrapper with header, body, footer slots).
- [ ] Build `app-modal` component (glass-float overlay with backdrop, focus trap, keyboard dismiss).
- [ ] Build `app-loader` component (skeleton loader and spinner variants).
- [ ] Build `app-toast` component and `NotificationService` for centralized user feedback.
- [ ] Build `app-empty-state` component for meaningful empty data views.
- [ ] Ensure all shared components use `ChangeDetectionStrategy.OnPush` and are standalone.
- [ ] Add `data-testid` attributes to all interactive elements.

---

## Phase 2: Core Services & Infrastructure

### 2.1. Authentication Service
- [ ] Create `core/services/auth.service.ts` using Angular Signals.
  - `activeUser` signal holding current user session.
  - `isAdmin` computed signal derived from `activeUser`.
  - `switchUser()` method calling the backend `/api/auth/switch` endpoint.
- [ ] Implement development-only user switcher component (hidden when `environment.production = true`).

### 2.2. Feature Flag Service
- [ ] Create `core/services/feature.service.ts`:
  - Fetch global feature config from `/api/config`.
  - Compute effective feature list: `globalEnabled ∩ userAllowed ∩ userEnabled`.
  - Expose `isFeatureActive(featureKey)` as a computed signal.

### 2.3. Theme Service
- [ ] Create `core/services/theme.service.ts`:
  - SSR-safe theme detection using `PLATFORM_ID` + `isPlatformBrowser`.
  - Respect `prefers-color-scheme` as default.
  - Persist preference in `localStorage` (with SSR guard).
  - Toggle `data-theme` attribute on `<html>`.

### 2.4. HTTP Interceptors
- [ ] Create `core/interceptors/auth.interceptor.ts` — attach JWT tokens to outgoing requests.
- [ ] Create `core/interceptors/error.interceptor.ts` — catch HTTP errors, parse standardized error envelope, trigger toast notifications.
- [ ] Create `core/interceptors/loading.interceptor.ts` — manage global loading spinner state.
- [ ] Register all interceptors using `provideHttpClient(withInterceptors([...]))`.

### 2.5. Global Error Handler
- [ ] Create custom `ErrorHandler` in `core/` that catches unhandled errors.
- [ ] Log errors to a structured logger service.
- [ ] Display user-friendly error notifications via `NotificationService`.

### 2.6. Route Constants & Guards
- [ ] Define all route paths as constants in `core/constants/routes.ts`.
- [ ] Create `authGuard` — redirect unauthenticated users.
- [ ] Create `roleGuard` — restrict admin-only routes.
- [ ] Create `featureGuard` — check feature-flag before activation.
- [ ] Create `unsavedChangesGuard` — prompt before navigating away from dirty forms.

---

## Phase 3: Layout Shells & Routing

### 3.1. Main Layout Shell
- [ ] Build `main-layout` component with:
  - Sidebar navigation (desktop) with glassmorphism, active state pill indicator.
  - Bottom navigation bar (mobile) with glass blur.
  - Header bar with user switcher, theme toggle, and notification bell.
  - `<router-outlet>` content area.
- [ ] Make navigation items dynamically filtered by active feature flags.

### 3.2. Auth Layout Shell
- [ ] Build `auth-layout` component for unauthenticated pages (login, register).
- [ ] Minimal centered card layout with Lumina branding.

### 3.3. Route Configuration
- [ ] Configure `app.routes.ts` with:
  - Lazy-loaded feature routes under `main-layout`.
  - Auth routes under `auth-layout`.
  - Guards applied at route level.
  - Titles on every route for SEO.
- [ ] Implement `PreloadAllModules` preloading strategy.

---

## Phase 4: Dashboard — Bento Grid Widget System

### 4.1. Dashboard Container
- [ ] Build `dashboard-page` smart component in `features/dashboard/`.
- [ ] Inject `FeatureService` to get active features.
- [ ] Render only widgets for enabled features.

### 4.2. Bento Grid Layout
- [ ] Implement responsive CSS Grid bento layout:
  - Desktop: multi-column grid with varying widget sizes.
  - Tablet: 2-column grid.
  - Mobile: single-column stack.
- [ ] Smooth reflow animation when widgets are toggled on/off.

### 4.3. Widget Components
- [ ] Build dumb widget card components for each feature:
  - `app-notes-widget` — pinned notes preview.
  - `app-kitchen-widget` — utility level progress bars.
  - `app-finance-widget` — expense summary chart.
  - `app-travel-widget` — upcoming trip card.
  - `app-reminders-widget` — active alerts list.
  - `app-purchases-widget` — savings goal progress.
  - `app-kirana-widget` — weekly shopping list preview.
  - `app-plans-widget` — upcoming social events.
  - `app-rules-widget` — rule of the day flip card.
  - `app-movies-widget` — watchlist status board.
  - `app-streak-widget` — consistency streak tracker (GitHub-style calendar grid).
- [ ] DB Connection Status indicator widget.
- [ ] Sticky warning header for critical reminders.

---

## Phase 5: Feature Module Implementation

### 5.1. Notes Module (F1)
- [ ] Create `notes-api.service.ts`, `notes.store.ts`, `notes.service.ts`.
- [ ] Build notes list page with search, category filter, and pin toggle.
- [ ] Build note detail/editor page with reactive form + autosave.
- [ ] Define `Note`, `CreateNoteRequest`, `NoteResponse` interfaces.

### 5.2. Kitchen & Kirana Module (F2 + F7)
- [ ] Create service layer (API client, store, orchestrator).
- [ ] Build kitchen utility tracker (Gas, Water, Power progress bars).
- [ ] Build Kirana planner with master catalog import flow and weekly list builder.
- [ ] Integrate low-threshold alerts with Reminders.

### 5.3. Finance & Purchases Module (F3 + F5)
- [ ] Create service layer for expenses and big purchases.
- [ ] Build expense logging form with category selection.
- [ ] Build expense dashboard with chart visualizations (category breakdown, monthly trends).
- [ ] Build big purchase goal tracker with savings progress bars and deadline calculator.

### 5.4. Travel Module (F4)
- [ ] Create service layer.
- [ ] Build multi-tab view: Past Journeys journal and Future Trips planner.
- [ ] Implement checklists and timeline components.

### 5.5. Reminders Module (F6 + F8)
- [ ] Create service layer.
- [ ] Build central notification console aggregating manual + automated alerts.
- [ ] Build social plans calendar/list for friends and family events.
- [ ] Implement priority sorting and dismissal.

### 5.6. Rules Module (F9)
- [ ] Create service layer.
- [ ] Build rules manager with CRUD.
- [ ] Build "Rule of the Day" flip card with random selection logic.

### 5.7. Movies Module (F10)
- [ ] Create service layer.
- [ ] Build watchlist with status board (To Watch → Watching → Watched).
- [ ] Implement rating system and search/filter.

### 5.8. Streak Loggers & Activity Details Module (F11)
- [ ] Create service layer (`streak.service.ts`, `streak.store.ts`) for tracking daily streaks and logging activities.
- [ ] Build activity detail logging forms/options (category/type, duration, status, custom notes).
- [ ] Implement consistency/streak tracker visualization (e.g., GitHub-style contribution grid or heat map).
- [ ] Implement activity log history view with filter options (date range, type) and search.
- [ ] Define interfaces for `Streak`, `ActivityLog`, and `LogActivityRequest`.

---

## Phase 6: Admin & Settings Panels

### 6.1. Settings Panel
- [ ] Build settings page with:
  - Feature display toggles (only for allowed features).
  - Theme switcher (Light/Dark/System).
  - Kirana master list importer (import selected catalog groups).
- [ ] Use reactive forms with validation.
- [ ] Save preferences to backend via `UserSettingsService`.

### 6.2. Admin Console
- [ ] Build admin page with:
  - User management table (CRUD, role assignment, activation toggle, feature permissions).
  - Global feature flag toggle switches.
  - Master Grocery Catalog CRUD.
- [ ] Role-guard protected. Only accessible to admin users.
- [ ] Use `ChangeDetectionStrategy.OnPush` and virtual scrolling for large user lists.

---

## Phase 7: PWA & Offline Support

### 7.1. Service Worker Configuration
- [ ] Add `@angular/pwa` to the project.
- [ ] Configure `ngsw-config.json`:
  - Static assets: `installMode: prefetch`.
  - API data: `installMode: lazy` with TTL.
  - Font/icon CDN: cache with stale-while-revalidate.

### 7.2. Web App Manifest
- [ ] Configure `manifest.webmanifest` with app name, icons (72–512px), theme colors, display mode.
- [ ] Verify installability criteria (HTTPS, manifest, service worker).

### 7.3. Update Notification
- [ ] Implement `SwUpdate` service listener.
- [ ] Show toast notification when new version is available with "Reload" action.

---

## Phase 8: Testing

### 8.1. Unit Testing Setup
- [ ] Configure Jasmine/Karma (or Jest) with code coverage reporting.
- [ ] Set coverage thresholds: 80% services/utils, 60% components.
- [ ] Write unit tests for all core services (AuthService, FeatureService, ThemeService).
- [ ] Write unit tests for all shared components, pipes, and directives.

### 8.2. Feature Module Tests
- [ ] Write unit tests for each feature's API service, store, and orchestrator.
- [ ] Write component tests for smart container components (data flow, state changes).
- [ ] Write component tests for dumb components (input/output contracts).

### 8.3. E2E Testing
- [ ] Set up Cypress or Playwright.
- [ ] Write E2E tests for critical paths:
  - Authentication/user switching.
  - Dashboard loading and widget rendering.
  - Feature navigation and CRUD flows.
  - Admin panel operations.
  - Settings toggles affecting dashboard.

---

## Phase 9: Performance & SEO Optimization

### 9.1. Performance Audit
- [ ] Run Lighthouse CI audit. Target scores: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 90.
- [ ] Analyze bundle size with `source-map-explorer`. Optimize imports.
- [ ] Implement virtual scrolling for all lists exceeding 50 items.
- [ ] Add `loading="lazy"` and `NgOptimizedImage` to all images.
- [ ] Debounce all search/filter inputs (300ms minimum).

### 9.2. SEO
- [ ] Add proper `<title>` tags per route using Angular's `TitleStrategy`.
- [ ] Add `<meta name="description">` per page.
- [ ] Ensure single `<h1>` per page with proper heading hierarchy.
- [ ] Use semantic HTML elements throughout.

---

## Phase 10: DevOps & CI/CD

### 10.1. Docker Configuration
- [ ] Create multi-stage `Dockerfile`:
  - Stage 1: `node` — install deps, build production bundle.
  - Stage 2: `nginx:alpine` — serve static files.
- [ ] Create `nginx.conf` for SPA routing (fallback to `index.html`), gzip compression, and caching headers.
- [ ] Create `Dockerfile.dev` for development with hot reload.

### 10.2. CI/CD Pipeline
- [ ] Create GitHub Actions workflow:
  - On PR: lint → test → build verification.
  - On merge to `main`: build → push Docker image → deploy.
  - Lighthouse CI audit on PRs.
- [ ] Configure branch protection rules on `main` (require CI pass + 1 approval).

### 10.3. Monitoring & Logging
- [ ] Integrate frontend error tracking (Sentry or similar).
- [ ] Set up structured logging for client-side errors.
- [ ] Add performance monitoring (Core Web Vitals tracking).

---

## Phase 11: Polish & Continuous Improvement

### 11.1. Accessibility Audit
- [ ] Run axe-core accessibility audit. Fix all critical/serious issues.
- [ ] Keyboard navigation testing across all features.
- [ ] Screen reader testing with NVDA/VoiceOver.

### 11.2. Visual Polish
- [ ] Apply Lumina glassmorphism styling consistently across all features.
- [ ] Add micro-animations (hover effects, transitions, loading animations).
- [ ] Verify Dark Mode styling for all components.
- [ ] Responsive testing across all breakpoints.

### 11.3. Documentation
- [ ] Ensure JSDoc coverage on all public APIs.
- [ ] Create `CONTRIBUTING.md` with development setup instructions.
- [ ] Document component API contracts in shared component README files.
- [ ] Maintain CHANGELOG for all releases.
- [ ] Dev Logs (development rules, guidelines, etc. — for later review).
