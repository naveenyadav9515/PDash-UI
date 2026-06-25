# Phase 9: Workspace-Module References & Import (Frontend)

> Drag-to-assign import flow and rendering modules in the workspace dashboard.

---

## Epic 6.1: Drag-to-Assign Import Flow

### Feature 6.1.1: Drag & Drop Interaction
- [ ] Implement drag-and-drop in `module-gallery.component.ts` using Angular CDK DragDrop
- [ ] User drags module card, drops onto workspace icon at bottom of screen
- [ ] Visual feedback: hovered workspace glows
- [ ] Update local component state mapping `pendingAssignments`

### Feature 6.1.2: Batch Save
- [ ] "Done" button in gallery header/footer
- [ ] Loop through `pendingAssignments` and call API `assignModulesToWorkspace` for each affected workspace
- [ ] Single notification on completion, navigate back to Home workspace

---

## Epic 6.2: Workspace Dashboard Display

### Feature 6.2.1: Module Loading
- [ ] Update `workspace-dashboard.component.ts`
- [ ] Call `ModuleService.getModulesForWorkspace(activeWorkspaceId)` on workspace switch
- [ ] Maintain `workspaceModules` signal

### Feature 6.2.2: Module Card Layout
- [ ] Auto-placement layout in workspace dashboard
- [ ] Responsive grid (CSS Grid, auto-fill)
- [ ] Build simplified `dashboard-module-card.component.ts`
  - Shows icon, name
  - Click navigates to `/workspace/:wId/module/:mId`
- [ ] Empty state: "No modules yet. Open Module Gallery."
