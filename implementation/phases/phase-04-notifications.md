# Phase 4: Notifications & Real-Time Sync (Frontend)

> Notification Center UI and WebSocket state syncing.

---

## Epic 17.1: Real-Time Sync

### Feature 17.1.1: WebSocket Client
- [ ] Create `core/services/socket.service.ts`
- [ ] Authenticate socket connection
- [ ] Listen for server mutation events and update Angular Signals automatically (eliminating the need for manual refreshes)

---

## Epic 17.2: Notification Center

### Feature 17.2.1: Notification UI
- [ ] Build `features/notifications/notification-bell.component.ts` (Header icon with unread badge)
- [ ] Build floating dropdown/overlay listing recent notifications
- [ ] Click handling to mark as read and navigate to action URL
- [ ] Intercept incoming Admin Direct Messages via socket and display them as an urgent Toast or floating Modal requiring user acknowledgment

### Feature 17.2.2: Push Subscription
- [ ] Request user permission for browser notifications
- [ ] Send push subscription object to Backend API via Service Worker
