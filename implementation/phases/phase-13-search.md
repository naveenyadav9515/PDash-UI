# Phase 13: Global Search (Frontend)

> Search overlay and real-time results.

---

## Epic 9.1: Search UI

### Feature 9.1.1: Search Service
- [ ] Create `core/services/search.service.ts`
- [ ] Debounce search queries (300ms)
- [ ] Store results in signal

### Feature 9.1.2: Search Overlay Component
- [ ] Build `features/search/search-overlay.component.ts`
- [ ] Triggered by header icon or keyboard shortcut (Cmd/Ctrl+K)
- [ ] Glassmorphism floating modal overlay
- [ ] Auto-focus input
- [ ] Display categorized results (Workspaces, Modules, Content)
- [ ] Click result -> navigate and close overlay
