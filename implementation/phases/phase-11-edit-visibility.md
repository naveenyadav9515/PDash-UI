# Phase 11: Edit Mode & Module Visibility Management (Frontend)

> The global edit mode state and the Three-Tier Removal UI.

---

## Epic 8.1: Edit Mode State

### Feature 8.1.1: Edit Mode Service
- [ ] Create `core/services/edit-mode.service.ts`
- [ ] `isEditMode` signal (default: false)
- [ ] `toggleEditMode()` method

### Feature 8.1.2: Edit Mode UI Bindings
- [ ] Bind toggle button in Main Layout header
- [ ] When active: workspace footer shows drag handles
- [ ] When active: workspace dashboard module cards show drag handles & remove buttons
- [ ] When active: module screens allow widget drag/resize

---

## Epic 8.2: Three-Tier Removal UI

### Feature 8.2.1: Operation 1 (Dashboard)
- [ ] Add "Remove" icon to module cards (visible only in Edit Mode)
- [ ] Calls `ModuleService.removeModuleFromWorkspace`
- [ ] Visual removal from dashboard

### Feature 8.2.2: Operation 2 & 3 (Module Management)
- [ ] Add "Management" tab in Module Screen or Settings
- [ ] Button: "Remove from all workspaces" (Operation 2) -> prompts with usage count
- [ ] Button: "Clear Module Data" (Operation 3) -> requires typed confirmation (e.g. typing module name) -> calls Clear Data API
