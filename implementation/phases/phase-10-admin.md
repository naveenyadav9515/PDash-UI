# Phase 10: User Management, Settings & Admin (Frontend)

> User settings page and admin console.

---

## Epic 10.1: Settings Panel

### Feature 10.1.1: Profile Settings
- [ ] Build `features/settings/settings-page.component.ts`
- [ ] Update Name form
- [ ] Theme selection (Light, Dark, System) saving to `ThemeService`
- [ ] Password reset trigger

### Feature 10.1.2: Workspace Management
- [ ] List all active and archived workspaces
- [ ] Restore archived workspaces
- [ ] Permanently delete workspaces (with warnings)

---

## Epic 10.2: Admin Console

### Feature 10.2.1: Admin Dashboard
- [ ] Build `features/admin/admin-dashboard.component.ts` (protected by RoleGuard)
- [ ] User list table (virtual scrolling if > 50)
- [ ] Deactivate user toggle

### Feature 10.2.2: Module Gallery Management
- [ ] UI to add new module definitions
- [ ] UI to edit descriptions/icons
- [ ] UI to deactivate modules from catalog
