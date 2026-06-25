# Phase 8: Module System & Module Gallery (Frontend)

> Module state management and the Module Gallery UI.

---

## Epic 8.1: Module Service

### Feature 8.1.1: Catalog State
- [ ] Create `core/services/module.service.ts`
- [ ] `moduleGallery` signal holding all available module definitions
- [ ] `fetchModuleGallery()` — fetch catalog from `/api/v1/modules`

### Feature 8.1.2: Usage Statistics Integration
- [ ] Method to fetch usage count for modules (e.g. "Used in 2 workspaces")
- [ ] Combine usage statistics with catalog data

---

## Epic 8.2: Module Gallery UI

### Feature 8.2.1: Gallery Page
- [ ] Build `features/module-gallery/module-gallery.component.ts`
- [ ] Route: `/gallery`
- [ ] Display grid of all available module cards
- [ ] Category filtering or basic search within gallery

### Feature 8.2.2: Module Card
- [ ] Build `features/module-gallery/module-gallery-card.component.ts`
- [ ] Display icon, name, description
- [ ] Display usage indicator ("Used in: Home, Finance")
- [ ] Draggable visual state (prep for Phase 6 import flow)

### Feature 8.2.3: Workspace Drop Targets
- [ ] At bottom of gallery, render horizontal list of user's active workspaces
- [ ] Visual styling to indicate they are drop targets for modules
