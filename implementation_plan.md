# P-Dash — Frontend (Angular) Implementation Plan

This document is the step-by-step execution blueprint for implementing the frontend Angular 20 application in strict compliance with the **Enterprise Frontend Guidelines** and the **V2 Architecture Blueprint**.

> **Foundation First:** Phases 0–7 build the complete workspace/module/reference UI foundation. Individual module screen implementations (Expense Tracker, Notes, etc.) will be added in later phases only after the foundation is stable.

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
  - `src/app/features/` — workspace, module-gallery, module-screen, dashboard, settings, admin, search
  - `src/app/layouts/` — `main-layout/`, `auth-layout/`
- [ ] Add placeholder `index.ts` barrel files for clean re-exports in each directory.

### 0.3. Linting & Formatting Setup
- [ ] Install and configure `@angular-eslint` with strict rules.
- [ ] Install and configure Prettier with `.prettierrc`.
- [ ] Set up Husky + lint-staged for pre-commit hooks.
- [ ] Add `.editorconfig` for cross-IDE consistency.

### 0.4. Environment Configuration
- [ ] Create `environment.ts` (dev) and `environment.prod.ts` (prod) with API base URLs.
- [ ] Ensure environment files do NOT contain secrets.

---

## Phase 1: Design System & Global Styles

### 1.1. P-Dash Adaptive CSS Foundation
- [ ] Import `Geist` font and `Material Symbols Outlined` from Google Fonts CDN in `index.html`.
- [ ] Define all `--lm-*` CSS custom properties in `src/styles.css`:
  - Color tokens (primary, secondary, tertiary, error, surface variants)
  - Typography scale (display-lg through mono-sm)
  - Spacing tokens (4px base unit, stack-sm/md/lg, container-padding, gutter)
  - Elevation tokens (blur values, border widths)
- [ ] Implement glassmorphism utility classes: `.glass-mantle`, `.glass-card`, `.glass-float`, `.border-etched`.
- [ ] Create Light Mode ("Snow Glass") and Dark Mode ("Deep Space") theme token sets toggled via `[data-theme]` attribute.

### 1.2. Responsive Layout — Mobile-Perfect, Desktop-Contained
- [ ] Define CSS breakpoint variables (`$bp-tablet: 768px`, `$bp-desktop: 1024px`, `$bp-wide: 1440px`).
- [ ] Implement app-shell container pattern:
  - Mobile: 100% width, no compromise.
  - Desktop: `max-width: 480px`, centered with `margin-inline: auto`.
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

### 2.2. Workspace Service
- [ ] Create `core/services/workspace.service.ts`:
  - `workspaces` signal holding all user workspaces.
  - `activeWorkspace` signal holding currently selected workspace.
  - `fetchWorkspaces()` — load workspaces from API.
  - `createWorkspace(data)` — create new workspace (enforce `maxWorkspaces` limit).
  - `updateWorkspace(id, data)` — rename, change icon.
  - `reorderWorkspaces(orderedIds)` — drag-reorder workspaces.
  - `archiveWorkspace(id)` — archive workspace.
  - `restoreWorkspace(id)` — restore archived workspace.
  - `switchWorkspace(workspaceId)` — change active workspace.

### 2.3. Module Service
- [ ] Create `core/services/module.service.ts`:
  - `moduleGallery` signal holding all available module definitions.
  - `fetchModuleGallery()` — load module catalog from API.
  - `getModulesForWorkspace(workspaceId)` — load modules assigned to workspace.
  - `assignModulesToWorkspace(workspaceId, moduleIds)` — batch assign (single API call).
  - `removeModuleFromWorkspace(workspaceId, moduleId)` — Operation 1.
  - `removeModuleFromAllWorkspaces(moduleId)` — Operation 2.
  - `clearModuleData(moduleId)` — Operation 3 (with confirmation).
  - `getModuleUsageCount(moduleId)` — get workspace count for a module.
  - `reorderModulesInWorkspace(workspaceId, orderedModuleIds)` — reorder.

### 2.4. Theme Service
- [ ] Create `core/services/theme.service.ts`:
  - SSR-safe theme detection using `PLATFORM_ID` + `isPlatformBrowser`.
  - Respect `prefers-color-scheme` as default.
  - Persist preference in `localStorage` (with SSR guard).
  - Toggle `data-theme` attribute on `<html>`.

### 2.5. Edit Mode Service
- [ ] Create `core/services/edit-mode.service.ts`:
  - `isEditMode` signal (default: false).
  - `enterEditMode()` — activate edit mode.
  - `exitEditMode()` — deactivate edit mode.
  - `toggleEditMode()` — toggle.
  - Only in edit mode can users: reorder modules, remove references, configure widgets, resize widgets.

### 2.6. Search Service
- [ ] Create `core/services/search.service.ts`:
  - `searchResults` signal holding search results.
  - `search(query)` — call global search API.
  - Support: workspace names, module names, module content.

### 2.7. HTTP Interceptors
- [ ] Create `core/interceptors/auth.interceptor.ts` — attach JWT tokens to outgoing requests.
- [ ] Create `core/interceptors/error.interceptor.ts` — catch HTTP errors, parse standardized error envelope, trigger toast notifications.
- [ ] Create `core/interceptors/loading.interceptor.ts` — manage global loading spinner state.
- [ ] Register all interceptors using `provideHttpClient(withInterceptors([...]))`.

### 2.8. Global Error Handler
- [ ] Create custom `ErrorHandler` in `core/` that catches unhandled errors.
- [ ] Log errors to a structured logger service.
- [ ] Display user-friendly error notifications via `NotificationService`.

### 2.9. Route Constants & Guards
- [ ] Define all route paths as constants in `core/constants/routes.ts`.
- [ ] Create `authGuard` — redirect unauthenticated users.
- [ ] Create `roleGuard` — restrict admin-only routes.
- [ ] Create `unsavedChangesGuard` — prompt before navigating away from dirty forms.

---

## Phase 3: Application Layout & Fixed Footer Navigation

### 3.1. Main Layout Shell
- [ ] Build `main-layout` component with:
  - **Header bar** with app name (P-Dash), user profile picture, theme toggle, search icon, edit mode toggle.
  - **Scrollable content area** — `<router-outlet>` for workspace dashboards and module screens.
  - **Fixed footer workspace navigation** — glassmorphism launcher bar.
- [ ] Content scrolls behind footer.
- [ ] Footer remains fixed at bottom.
- [ ] Smooth animations on workspace switching.

### 3.2. Fixed Footer Workspace Launcher
- [ ] Build `workspace-footer` component:
  - Displays workspace icons + names horizontally.
  - Horizontal scrolling support (swipe left/right).
  - Active workspace indicator (pill highlight).
  - Workspace reordering (in edit mode only, drag left/right).
  - Glassmorphism styling: transparent, frosted glass effect, blurred background.
  - Premium Apple-inspired design.
- [ ] Footer dynamically updates when workspaces are created/archived.

### 3.3. Auth Layout Shell
- [ ] Build `auth-layout` component for unauthenticated pages (login, register).
- [ ] Minimal centered card layout with P-Dash branding.

### 3.4. Route Configuration
- [ ] Configure `app.routes.ts` with:
  - Lazy-loaded feature routes under `main-layout`.
  - Auth routes under `auth-layout`.
  - Guards applied at route level.
  - Titles on every route for SEO.
  - Home workspace as default landing route.
- [ ] Implement `PreloadAllModules` preloading strategy.

---

## Phase 4: Workspace Dashboard

### 4.1. Workspace Dashboard Container
- [ ] Build `workspace-dashboard` smart component in `features/workspace/`.
- [ ] Inject `WorkspaceService` to get active workspace.
- [ ] Inject `ModuleService` to get modules for active workspace.
- [ ] Display modules in auto-placed card layout (no manual positioning).

### 4.2. Module Card Component
- [ ] Build `module-card` component:
  - Displays module icon, name, and brief description.
  - Click → navigates to Module Screen.
  - Glassmorphism card styling.
  - Hover animations and focus ring.
  - In edit mode: shows drag handle, remove button, configure button.
- [ ] No widget content on workspace dashboard — modules shown as navigation cards only.

### 4.3. Workspace Dashboard Layout
- [ ] Auto-placement: modules flow naturally in a responsive grid.
  - Mobile: single column or two-column grid.
  - Tablet/Desktop: adaptive columns.
- [ ] Smooth reflow animation when modules are added/removed.
- [ ] Empty state: "No modules yet. Open Module Gallery to add modules."

### 4.4. Edit Mode Interactions (Workspace Dashboard)
- [ ] When edit mode is active:
  - Module cards show drag handles.
  - Long-press or drag to reorder modules.
  - Show remove button on each module card (Operation 1: remove from this workspace only).
  - Show "Open Module Gallery" button to add new modules.
- [ ] When edit mode is inactive:
  - No drag interactions.
  - No accidental changes.
  - Click opens module screen.

---

## Phase 5: Module Gallery & Import Flow

### 5.1. Module Gallery Page
- [ ] Build `module-gallery` component in `features/module-gallery/`.
- [ ] Display all available modules from the catalog (F1–F12 + Feature Log).
- [ ] Each module card shows:
  - Icon, name, description.
  - Usage counter (e.g., "Used in 4 workspaces").
  - Or workspace names list (e.g., "Home • Finance • Productivity").
- [ ] At the bottom of the gallery: display workspace icons as drop targets.

### 5.2. Drag-to-Assign Import Flow
- [ ] User drags module card → drops onto workspace icon.
- [ ] Creates a workspace reference (no additional questions, no dialogs, no sizing, no positioning).
- [ ] Support assigning multiple modules across multiple workspaces before saving.
- [ ] "Done" button saves all pending assignments via single API call.
- [ ] Visual feedback: dragged module highlights, drop target workspace glows.

### 5.3. Import UX Rules
- [ ] NO grid size questions (removed: 1×1, 1×2, 2×2).
- [ ] NO positioning questions.
- [ ] NO rearrangement screen during import.
- [ ] Import process must remain extremely simple.

---

## Phase 6: Module Screen

### 6.1. Module Screen Container
- [ ] Build `module-screen` component in `features/module-screen/`.
- [ ] Route: `/workspace/:workspaceId/module/:moduleId`.
- [ ] Module screen contains two sections:
  1. **Fixed Cards section** — mandatory, system-controlled.
  2. **User Widgets section** — optional, user-controlled.

### 6.2. Fixed Cards
- [ ] Build `fixed-cards` container component:
  - Renders module-specific fixed cards.
  - Cards are mandatory — always visible.
  - Cannot be removed, hidden, or reordered by the user.
  - Represent core functionality of the module.
- [ ] Each module defines its own fixed cards (implemented per-module in future phases).

### 6.3. User Widgets
- [ ] Build `widget-container` component:
  - Renders user-selected widgets.
  - Widgets are optional and user-controlled.
  - Users can add, remove, reorder, resize, and configure widgets.
  - All widget editing only available in Edit Mode.
- [ ] Build `widget-gallery` component:
  - Each module provides its own widget gallery.
  - Users choose which widgets to display from the gallery.

### 6.4. Widget Edit Mode Interactions
- [ ] In edit mode within a module screen:
  - Drag to reorder widgets.
  - Resize widgets (if supported by the widget type).
  - Remove widgets.
  - Configure widgets (if widget has settings).
  - Open widget gallery to add new widgets.
- [ ] Outside edit mode:
  - Widgets display their data.
  - No editing interactions.

---

## Phase 7: Workspace Management & Settings

### 7.1. Workspace Creation Flow
- [ ] Build workspace creation dialog/sheet:
  - User enters workspace name.
  - User selects workspace icon.
  - Enforce `config.maxWorkspaces` limit (show message if limit reached).
  - Save creates workspace and adds to footer navigation.

### 7.2. Workspace Settings
- [ ] Build workspace settings panel:
  - Rename workspace.
  - Change workspace icon.
  - Archive workspace (prefer archive over delete).
  - Restore archived workspace.

### 7.3. Module Visibility Management
- [ ] Build UI for three separate operations:
  - **Operation 1:** Remove module from current workspace.
    - Available in edit mode on workspace dashboard.
    - Removes only the reference. Module data remains.
  - **Operation 2:** Remove module from all workspaces.
    - Available from Module Gallery or Module Management.
    - Shows usage count before confirming.
    - Removes all references. Module data remains.
  - **Operation 3:** Clear Module Data.
    - Dangerous operation — permanently deletes module data, settings, content.
    - Must require explicit confirmation dialog.
    - This is the ONLY operation that deletes actual module data.

### 7.4. Home Workspace
- [ ] Maintain a "Home" workspace as the default landing area.
- [ ] Purpose: Quick access, frequently used modules, favorites.
- [ ] Home workspace is created automatically for new users.

---

## Phase 8: Global Search

### 8.1. Search UI
- [ ] Build search overlay/page accessible from header:
  - Global search input with real-time results.
  - Search supports: workspace names, module names, relevant module content.
  - Categorized results display.
  - Debounce search input (300ms minimum).
- [ ] Search becomes increasingly valuable as modules grow.

---

## Phase 9: Settings & Admin Panels

### 9.1. Settings Panel
- [ ] Build settings page with:
  - Theme switcher (Light/Dark/System).
  - Workspace management (list, archive, restore).
  - Profile settings.
- [ ] Use reactive forms with validation.
- [ ] Save preferences to backend via `UserSettingsService`.

### 9.2. Admin Console
- [ ] Build admin page with:
  - User management table (CRUD, role assignment, activation toggle).
  - Module Gallery management (add/edit/deactivate modules).
  - Global configuration management.
- [ ] Role-guard protected. Only accessible to admin users.
- [ ] Use `ChangeDetectionStrategy.OnPush` and virtual scrolling for large lists.

---

## Phase 10: PWA & Offline Support

### 10.1. Service Worker Configuration
- [ ] Add `@angular/pwa` to the project.
- [ ] Configure `ngsw-config.json`:
  - Static assets: `installMode: prefetch`.
  - API data: `installMode: lazy` with TTL.
  - Font/icon CDN: cache with stale-while-revalidate.

### 10.2. Web App Manifest
- [ ] Configure `manifest.webmanifest` with app name (P-Dash), icons (72–512px), theme colors, display mode.
- [ ] Verify installability criteria (HTTPS, manifest, service worker).

### 10.3. Update Notification
- [ ] Implement `SwUpdate` service listener.
- [ ] Show toast notification when new version is available with "Reload" action.

---

## Phase 11: Testing

### 11.1. Unit Testing Setup
- [ ] Configure Jasmine/Karma (or Jest) with code coverage reporting.
- [ ] Set coverage thresholds: 80% services/utils, 60% components.
- [ ] Write unit tests for all core services:
  - AuthService, WorkspaceService, ModuleService, ThemeService, EditModeService, SearchService.
- [ ] Write unit tests for all shared components, pipes, and directives.

### 11.2. Feature Module Tests
- [ ] Write unit tests for workspace dashboard component (module loading, display).
- [ ] Write unit tests for module gallery (drag-assign flow, batch save).
- [ ] Write unit tests for module screen (fixed cards + user widgets rendering).
- [ ] Write unit tests for workspace footer navigation (switching, reordering).
- [ ] Write component tests for smart container components (data flow, state changes).
- [ ] Write component tests for dumb components (input/output contracts).

### 11.3. E2E Testing
- [ ] Set up Cypress or Playwright.
- [ ] Write E2E tests for critical paths:
  - Authentication/user switching.
  - Workspace creation, switching, archiving.
  - Module Gallery import flow (drag-to-assign, batch save).
  - Module screen navigation (fixed cards, widgets).
  - Edit mode: reorder modules, remove references.
  - Three-tier module removal operations.
  - Global search.
  - Settings toggles affecting dashboard.

---

## Phase 12: Performance & SEO Optimization

### 12.1. Performance Audit
- [ ] Run Lighthouse CI audit. Target scores: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 90.
- [ ] Analyze bundle size with `source-map-explorer`. Optimize imports.
- [ ] Implement virtual scrolling for all lists exceeding 50 items.
- [ ] Add `loading="lazy"` and `NgOptimizedImage` to all images.
- [ ] Debounce all search/filter inputs (300ms minimum).

### 12.2. SEO
- [ ] Add proper `<title>` tags per route using Angular's `TitleStrategy`.
- [ ] Add `<meta name="description">` per page.
- [ ] Ensure single `<h1>` per page with proper heading hierarchy.
- [ ] Use semantic HTML elements throughout.

---

## Phase 13: DevOps & CI/CD

### 13.1. Docker Configuration
- [ ] Create multi-stage `Dockerfile`:
  - Stage 1: `node` — install deps, build production bundle.
  - Stage 2: `nginx:alpine` — serve static files.
- [ ] Create `nginx.conf` for SPA routing (fallback to `index.html`), gzip compression, and caching headers.
- [ ] Create `Dockerfile.dev` for development with hot reload.

### 13.2. CI/CD Pipeline
- [ ] Create GitHub Actions workflow:
  - On PR: lint → test → build verification.
  - On merge to `main`: build → push Docker image → deploy.
  - Lighthouse CI audit on PRs.
- [ ] Configure branch protection rules on `main` (require CI pass + 1 approval).

### 13.3. Monitoring & Logging
- [ ] Integrate frontend error tracking (Sentry or similar).
- [ ] Set up structured logging for client-side errors.
- [ ] Add performance monitoring (Core Web Vitals tracking).

---

## Phase 14: Polish & Continuous Improvement

### 14.1. Accessibility Audit
- [ ] Run axe-core accessibility audit. Fix all critical/serious issues.
- [ ] Keyboard navigation testing across all features.
- [ ] Screen reader testing with NVDA/VoiceOver.

### 14.2. Visual Polish
- [ ] Apply glassmorphism styling consistently across all components.
- [ ] Add micro-animations (hover effects, transitions, loading animations).
- [ ] Verify Dark Mode styling for all components.
- [ ] Responsive testing across all breakpoints.
- [ ] Premium Apple-inspired design verification on footer navigation.

### 14.3. Documentation
- [ ] Ensure JSDoc coverage on all public APIs.
- [ ] Create `CONTRIBUTING.md` with development setup instructions.
- [ ] Document component API contracts in shared component README files.
- [ ] Maintain CHANGELOG for all releases.
- [ ] Dev Logs (development rules, guidelines, etc. — for later review).

---

## Future Phases: Individual Module Screen Implementations

> These phases will be added AFTER the foundation (Phases 0–7) is stable and tested.

### Module Screen Implementation Template
Each module screen follows the same pattern:
- [ ] Create `features/modules/<module-type>/` directory.
- [ ] Create module-specific API service (`<module>-api.service.ts`).
- [ ] Create module-specific store (`<module>.store.ts`).
- [ ] Create module-specific orchestrator service (`<module>.service.ts`).
- [ ] Build Fixed Cards components (mandatory, system-controlled):
  - Define which cards this module always shows.
  - Cards cannot be removed/hidden/reordered.
- [ ] Build Widget Gallery components (optional, user-controlled):
  - Define available widgets for this module.
  - Users choose which widgets to display.
- [ ] Define interfaces for module data models.
- [ ] Write unit tests for services and components.

### Planned Module Screens (to be implemented individually):
- Notes (F1)
- Kitchen Utilities (F2)
- Expense Tracker (F3)
- Travel Logger (F4)
- Big Purchases (F5)
- Reminders (F6)
- Kirana Planner (F7)
- Plans (F8)
- Rules (F9)
- Movies (F10)
- Streak Loggers & Activity Details (F11)
- Splitwise (F12)
- Feature Log (development feature)

---

## Core Hierarchy Reference

```
Application
  └── Workspace (user-created, max 6)
        └── Module Reference (many-to-many, drag-to-assign)
              └── Module (reusable mini-application)
                    └── Module Screen
                          ├── Fixed Cards (mandatory, system-controlled)
                          └── User Widgets (optional, user-controlled)
```

---

## Architecture Principles

1. **Mobile-first design** — Mobile-Perfect, Desktop-Contained.
2. **Glassmorphism footer navigation** — fixed, transparent, frosted glass, Apple-inspired.
3. **User-created workspaces** — users decide structure, not the system.
4. **Configuration-driven workspace limits** — `maxWorkspaces` from config, never hardcoded.
5. **Reusable modules** — one module, many workspace references, zero duplication.
6. **No original/shortcut concepts** — all workspace entries are equal references.
7. **Simple drag-to-workspace import flow** — no sizing, positioning, or dialog questions.
8. **Automatic placement** — modules auto-arrange in workspace dashboard.
9. **Explicit Edit Mode** — reorder, remove, configure only when activated.
10. **Fixed Cards for core functionality** — mandatory, always visible.
11. **Optional Widgets for customization** — user-controlled, inside module screens only.
12. **Separate visibility from existence** — removing references ≠ deleting data.
13. **Separate removal from deletion** — three-tier operations.
14. **Archive before delete** — workspace lifecycle: Active → Archived → Restored.
15. **Global search** — workspace names, module names, module content.
16. **Clean scalable many-to-many architecture** — WorkspaceModuleReference table.
17. **Consistent hierarchy** — Workspace → Module Reference → Module → Module Screen → Fixed Cards + User Widgets.
