# Phase 10: Module Screen — Fixed Cards & User Widgets (Frontend)

> The container for rendering individual module functionality.

---

## Epic 10.1: Module Screen Container

### Feature 10.1.1: Shell Component
- [ ] Build `features/module-screen/module-screen.component.ts`
- [ ] Route: `/workspace/:workspaceId/module/:moduleId`
- [ ] Fetch module details, settings, and widget config on init
- [ ] Top bar: Module Name, Back button, Edit Mode toggle

---

## Epic 10.2: Fixed Cards

### Feature 10.2.1: Fixed Cards Container
- [ ] Build `features/module-screen/fixed-cards/fixed-cards.component.ts`
- [ ] Host area for mandatory, system-controlled components
- [ ] (Specific fixed cards are implemented in Future Phases per module)

---

## Epic 10.3: User Widgets

### Feature 10.3.1: Widget Container
- [ ] Build `features/module-screen/widget-container/widget-container.component.ts`
- [ ] Render widgets based on fetched `WidgetConfig`
- [ ] (Specific widgets are implemented in Future Phases per module)

### Feature 10.3.2: Widget Gallery & Management
- [ ] Build `features/module-screen/widget-gallery/widget-gallery.component.ts`
- [ ] Allow adding new widgets to the current module screen
- [ ] Update config via `ModuleService`
