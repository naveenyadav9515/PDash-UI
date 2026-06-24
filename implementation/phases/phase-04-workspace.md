# Phase 4: Workspace System (Frontend)

> Workspace state management, footer navigation launcher, and workspace creation UI.

---

## Epic 4.1: Workspace Service

### Feature 4.1.1: State Management
- [ ] Create `core/services/workspace.service.ts`
- [ ] `workspaces` signal holding the list of active user workspaces
- [ ] `activeWorkspace` signal holding the currently selected workspace ID
- [ ] Implement `switchWorkspace(id)` to update active state

### Feature 4.1.2: API Integration
- [ ] `fetchWorkspaces()` — load from API, update signals
- [ ] `createWorkspace(data)` — call API, reload list, switch to new workspace
- [ ] `updateWorkspace(id, data)` — rename, change icon
- [ ] `reorderWorkspaces(orderedIds)` — call API, optimistic UI update
- [ ] `archiveWorkspace(id)` / `restoreWorkspace(id)`

---

## Epic 4.2: Application Layout & Footer

### Feature 4.2.1: Main Layout Shell
- [ ] Build `layouts/main-layout/main-layout.component.ts`
- [ ] Header: App Name (P-Dash), Theme toggle, Search icon, Edit Mode toggle
- [ ] Content area: `<router-outlet>` allowing scrolling behind footer
- [ ] Footer slot for workspace navigation

### Feature 4.2.2: Fixed Footer Workspace Launcher
- [ ] Build `features/workspace/workspace-footer/workspace-footer.component.ts`
- [ ] Render workspace icons and names horizontally
- [ ] Horizontal scroll/swipe support
- [ ] Glassmorphism styling (frosted glass, blurred background)
- [ ] Active indicator (pill highlight)
- [ ] Reordering support via drag-and-drop (only active in Edit Mode)

---

## Epic 4.3: Workspace Management UI

### Feature 4.3.1: Workspace Creation Flow
- [ ] Build `features/workspace/workspace-create/workspace-create.component.ts` (Dialog/Modal)
- [ ] Form: Name (required), Icon selection (icon picker)
- [ ] Enforce config-driven limit: show warning if `maxWorkspaces` reached
- [ ] Handle save and close

### Feature 4.3.2: Workspace Dashboard Container
- [ ] Build `features/workspace/workspace-dashboard/workspace-dashboard.component.ts`
- [ ] Route: `/workspace/:id`
- [ ] Subscribes to active workspace changes
- [ ] Prepares layout for Module Cards (to be implemented in Phase 6)
