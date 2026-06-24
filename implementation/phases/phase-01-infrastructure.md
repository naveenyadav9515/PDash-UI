# Phase 1: Core Infrastructure & Configuration (Frontend)

> Set up the P-Dash design system (CSS tokens, glassmorphism), shared component library, and theme service.

---

## Epic 1.1: Design System — CSS Foundation

### Feature 1.1.1: Typography & Fonts
- [ ] Import `Geist` font from Google Fonts CDN in `index.html`
- [ ] Import `Material Symbols Outlined` icon font in `index.html`
- [ ] Define typography scale tokens in `src/styles.css`: `--lm-font-display-lg` through `--lm-font-mono-sm`

### Feature 1.1.2: Color Tokens
- [ ] Define all `--lm-color-*` CSS custom properties in `src/styles.css`
- [ ] Primary, secondary, tertiary, error colors
- [ ] Surface variants (background, card, elevated)
- [ ] Text variants (primary, secondary, muted, inverse)

### Feature 1.1.3: Spacing & Elevation Tokens
- [ ] Define spacing tokens using 4px base unit: `--lm-space-2xs` (4px) through `--lm-space-3xl` (48px)
- [ ] Define stack spacing: `--lm-stack-sm`, `--lm-stack-md`, `--lm-stack-lg`
- [ ] Define container padding and gutter tokens
- [ ] Define elevation tokens: blur values, border widths, shadow layers

### Feature 1.1.4: Glassmorphism Utility Classes
- [ ] Create `.glass-mantle` — heavy blur for backdrops/overlays
- [ ] Create `.glass-card` — medium blur for card containers with hover animation
- [ ] Create `.glass-float` — highest elevation for floating elements/modals
- [ ] Create `.border-etched` — subtle border to define glass edges

### Feature 1.1.5: Theme System
- [ ] Create Dark Mode ("Deep Space") as default theme token set
- [ ] Create Light Mode ("Snow Glass") theme token set
- [ ] Toggle themes via `[data-theme="light"]` attribute on `<html>`
- [ ] Ensure all color tokens swap seamlessly between themes

---

## Epic 1.2: Responsive Layout System

### Feature 1.2.1: Breakpoints
- [ ] Define CSS breakpoint variables: `768px` (tablet), `1024px` (desktop), `1440px` (wide)
- [ ] Use `min-width` media queries (mobile-first approach)

### Feature 1.2.2: App Shell Container
- [ ] Implement Mobile-Perfect, Desktop-Contained pattern
- [ ] Mobile: `width: 100%` — no compromise on mobile design
- [ ] Desktop: `max-width: 480px`, `margin-inline: auto` — centered panel
- [ ] CSS logical properties for RTL-readiness (`margin-inline-start`, `padding-inline-end`)

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
