# Phase 1: Core Infrastructure & Configuration (Frontend)

> Set up the P-Dash design system (CSS tokens, glassmorphism), shared component library, and theme service.

---

## Epic 1.1: Design System — CSS Foundation

### Feature 1.1.1: Typography & Fonts
- [x] **Completed** - Import `Geist` font from Google Fonts CDN in `index.html`
- [x] **Completed** - Import `Material Symbols Outlined` icon font in `index.html`
- [x] **Completed** - Define typography scale tokens in `src/styles.css`: `--lm-font-display-lg` through `--lm-font-mono-sm`

### Feature 1.1.2: Color Tokens
- [x] **Completed** - Define all `--lm-color-*` CSS custom properties in `src/styles.css`
- [x] **Completed** - Primary, secondary, tertiary, error colors
- [x] **Completed** - Surface variants (background, card, elevated)
- [x] **Completed** - Text variants (primary, secondary, muted, inverse)

### Feature 1.1.3: Spacing & Elevation Tokens
- [x] **Completed** - Define spacing tokens using 4px base unit: `--lm-space-2xs` (4px) through `--lm-space-3xl` (48px)
- [x] **Completed** - Define stack spacing: `--lm-stack-sm`, `--lm-stack-md`, `--lm-stack-lg`
- [x] **Completed** - Define container padding and gutter tokens
- [x] **Completed** - Define elevation tokens: blur values, border widths, shadow layers

### Feature 1.1.4: Glassmorphism Utility Classes
- [x] **Completed** - Create `.glass-mantle` — heavy blur for backdrops/overlays
- [x] **Completed** - Create `.glass-card` — medium blur for card containers with hover animation
- [x] **Completed** - Create `.glass-float` — highest elevation for floating elements/modals
- [x] **Completed** - Create `.border-etched` — subtle border to define glass edges

### Feature 1.1.5: Theme System
- [x] **Completed** - Create Dark Mode ("Deep Space") as default theme token set
- [x] **Completed** - Create Light Mode ("Snow Glass") theme token set
- [x] **Completed** - Toggle themes via `[data-theme="light"]` attribute on `<html>`
- [x] **Completed** - Ensure all color tokens swap seamlessly between themes

---

## Epic 1.2: Responsive Layout System

### Feature 1.2.1: Breakpoints
- [x] **Completed** - Define CSS breakpoint variables: `768px` (tablet), `1024px` (desktop), `1440px` (wide)
- [x] **Completed** - Use `min-width` media queries (mobile-first approach)

### Feature 1.2.2: App Shell Container
- [x] **Completed** - Implement Mobile-Perfect, Desktop-Contained pattern
- [x] **Completed** - Mobile: `width: 100%` — no compromise on mobile design
- [x] **Completed** - Desktop: `max-width: 480px`, `margin-inline: auto` — centered panel
- [x] **Completed** - CSS logical properties for RTL-readiness (`margin-inline-start`, `padding-inline-end`)

---

## Epic 1.3: Shared Component Library

### Feature 1.3.1: Button Component
- [ ] Build `app-button` standalone component
- [ ] Variants: primary, secondary/glass, danger
- [ ] States: default, hover, active, disabled, loading (spinner)
- [ ] Use `ChangeDetectionStrategy.OnPush`
- [ ] Add `data-testid` attribute

### Feature 1.3.2: Input Component
- [ ] Build `app-input` standalone component
- [ ] Glass-styled input with focus ring animation
- [ ] Validation error display below input
- [ ] Support: text, email, password, number types

### Feature 1.3.3: Card Component
- [ ] Build `app-card` standalone component
- [ ] Glass-card wrapper with content projection slots: header, body, footer
- [ ] Hover elevation animation

### Feature 1.3.4: Modal Component
- [ ] Build `app-modal` standalone component
- [ ] Glass-float overlay with backdrop blur
- [ ] Focus trap (tab key stays within modal)
- [ ] Keyboard dismiss (Escape key closes)
- [ ] Backdrop click closes modal

### Feature 1.3.5: Loader Component
- [ ] Build `app-loader` standalone component
- [ ] Variants: skeleton loader (placeholder shapes), spinner (circular animation)
- [ ] Full-page loader variant for app initialization

### Feature 1.3.6: Toast/Notification Component
- [ ] Build `app-toast` standalone component
- [ ] Create `NotificationService` for centralized user feedback
- [ ] Types: success, error, warning, info
- [ ] Auto-dismiss with configurable duration
- [ ] Stack multiple toasts vertically

### Feature 1.3.7: Empty State Component
- [ ] Build `app-empty-state` standalone component
- [ ] Accepts: icon, title, description, action button (optional)
- [ ] Used when lists/views have no data

---

## Epic 1.4: Theme Service

### Feature 1.4.1: Theme Detection & Persistence
- [ ] Create `core/services/theme.service.ts`
- [ ] SSR-safe detection using `PLATFORM_ID` + `isPlatformBrowser`
- [ ] Respect `prefers-color-scheme` as default on first visit
- [ ] Persist user preference in `localStorage` (with SSR guard)
- [ ] Toggle `data-theme` attribute on `<html>` element
- [ ] Expose `currentTheme` signal: `'dark' | 'light' | 'system'`


---

## Integrated Testing (Frontend)

> Unit tests, component tests, and E2E critical paths.

---

## Epic 12.1: Unit & Component Testing

### Feature 12.1.1: Core Tests
- [ ] Configure Jasmine/Karma (or Jest)
- [ ] Test core services (Auth, Workspace, Theme)
- [ ] Test shared components (Button, Input, Modal)
- [ ] Test Workspace Dashboard auto-placement rendering

---

## Epic 12.2: End-to-End Testing

### Feature 12.2.1: E2E Suite
- [ ] Set up Cypress or Playwright
- [ ] Test Login flow
- [ ] Test Drag-to-assign module import flow
- [ ] Test Three-Tier module removal operations
- [ ] Test Edit Mode toggles
