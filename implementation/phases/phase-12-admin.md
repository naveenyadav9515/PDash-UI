# Phase 12: User Management, Settings & Admin (Frontend)

> User settings page and admin console.

---

## Epic 12.1: Settings Panel

### Feature 12.1.1: Profile Settings
- [ ] Build `features/settings/settings-page.component.ts`
- [ ] Update Name form
- [ ] Theme selection (Light, Dark, System) saving to `ThemeService`
- [ ] Password reset trigger

### Feature 12.1.2: Workspace Management
- [ ] List all active and archived workspaces
- [ ] Permanently delete workspaces (with warnings)

---

## Epic 12.2: Admin Console

### Feature 12.2.1: User Management Panel
- [ ] Build `features/admin/user-management.component.ts` (protected by RoleGuard)
- [ ] User list table (virtual scrolling if > 50) with active/inactive status filters
- [ ] Live Presence Indicator: display a green/gray dot based on real-time `isOnline` status mapped from WebSocket
- [ ] Security actions menu: Deactivate/Suspend user, Force Logout, Trigger Password Reset
- [ ] Admin messaging action: "Send Direct Message/Notification" opening a modal to push an urgent alert to the user's screen
- [ ] Admin data edit mode: capability to edit a user's basic data limits if needed

### Feature 12.2.2: Module Gallery & Feature Flags
- [ ] UI to add new module definitions globally
- [ ] UI to edit descriptions/icons of existing modules
- [ ] Global enable/disable toggles (Feature Flags): instantly hide a module from the catalog for all users if it requires maintenance

---

## Epic 12.3: Admin Insights Dashboard

### Feature 12.3.1: System Analytics View
- [ ] Build `features/admin/admin-insights.component.ts`
- [ ] Key Metrics Cards: Total Users, Active Users (Last 7 days), Total Workspaces
- [ ] Visual Charts: Most popular modules across the platform
- [ ] System Health indicator: Server uptime and storage usage warnings
