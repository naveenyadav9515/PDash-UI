# Phase 6: Offline-First Architecture (Frontend)

> Robust IndexedDB caching and mutation queueing for subway/airplane scenarios.

---

## Epic 19.1: Local Data Store

### Feature 19.1.1: IndexedDB Integration
- [ ] Setup `localforage` or native IndexedDB wrapper
- [ ] Cache API responses (`GET`) to local DB for instantaneous initial loads

---

## Epic 19.2: Offline Mutation Queue

### Feature 19.2.1: Background Sync Interceptor
- [ ] Create `core/interceptors/offline-sync.interceptor.ts`
- [ ] If `navigator.onLine` is false, intercept `POST/PATCH/DELETE` requests
- [ ] Save mutations to a local queue in IndexedDB
- [ ] Implement a Background Sync manager to execute the queue sequentially when the network is restored
- [ ] Provide a "Syncing..." visual indicator in the UI header
