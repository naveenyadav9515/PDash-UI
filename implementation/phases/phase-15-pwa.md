# Phase 15: PWA & Offline Support (Frontend)

> Service worker and Web App Manifest configuration.

---

## Epic 11.1: Progressive Web App

### Feature 11.1.1: Service Worker
- [ ] Run `ng add @angular/pwa`
- [ ] Configure `ngsw-config.json`
- [ ] Prefetch static assets (fonts, icons, CSS)
- [ ] Lazy cache API responses where appropriate

### Feature 11.1.2: Web App Manifest
- [ ] Configure `manifest.webmanifest`
- [ ] App Name: P-Dash
- [ ] Generate and link icons (72px - 512px)
- [ ] Set display mode: `standalone`
- [ ] Set theme colors to match Deep Space theme

### Feature 11.1.3: Update Notifications
- [ ] Use `SwUpdate` service
- [ ] Listen for new versions
- [ ] Show toast notification: "New version available. Reload?"


---

## Performance & Monitoring (Frontend)

> Optimization audits, lazy loading, and core web vitals.

---

## Epic 14.1: Asset Optimization

### Feature 14.1.1: Audits
- [ ] Run `source-map-explorer` and split heavy chunks
- [ ] Implement virtual scrolling for long lists
- [ ] Add `NgOptimizedImage` directives

### Feature 14.1.2: SEO
- [ ] Add Angular `TitleStrategy`
- [ ] Dynamic meta descriptions per page
