# Phase 2: Security & HTTP Layer (Frontend)

> Set up HTTP interceptors for auth tokens, error handling, and loading state. Create route guards.

---

## Epic 2.1: HTTP Interceptors

### Feature 2.1.1: Auth Interceptor
- [ ] Create `core/interceptors/auth.interceptor.ts`
- [ ] Attach JWT token from `AuthService` to `Authorization: Bearer` header on all outgoing API requests
- [ ] Skip token attachment for public endpoints (login, register)

### Feature 2.1.2: Error Interceptor
- [ ] Create `core/interceptors/error.interceptor.ts`
- [ ] Catch HTTP error responses (4xx, 5xx)
- [ ] Parse standardized error envelope from backend
- [ ] Trigger toast notification via `NotificationService` with user-friendly message
- [ ] Handle `401 Unauthorized` — redirect to login
- [ ] Handle `429 Too Many Requests` — show rate limit message

### Feature 2.1.3: Loading Interceptor
- [ ] Create `core/interceptors/loading.interceptor.ts`
- [ ] Track active HTTP request count
- [ ] Expose `isLoading` signal for global loading spinner state
- [ ] Increment on request start, decrement on response/error

### Feature 2.1.4: Interceptor Registration
- [ ] Register all interceptors using `provideHttpClient(withInterceptors([...]))` in `app.config.ts`

---

## Epic 2.2: Route Guards

### Feature 2.2.1: Auth Guard
- [ ] Create `core/guards/auth.guard.ts`
- [ ] Redirect unauthenticated users to login page
- [ ] Check `AuthService.activeUser` signal

### Feature 2.2.2: Role Guard
- [ ] Create `core/guards/role.guard.ts`
- [ ] Restrict admin-only routes — check `AuthService.isAdmin` signal
- [ ] Redirect non-admin users to dashboard

### Feature 2.2.3: Unsaved Changes Guard
- [ ] Create `core/guards/unsaved-changes.guard.ts`
- [ ] Prompt user before navigating away from dirty forms
- [ ] Show confirmation dialog: "You have unsaved changes. Leave anyway?"

---

## Epic 2.3: Global Error Handler

### Feature 2.3.1: Custom Error Handler
- [ ] Create custom `ErrorHandler` class in `core/`
- [ ] Catch all unhandled errors (runtime exceptions, promise rejections)
- [ ] Log errors to a structured logger service
- [ ] Display user-friendly notification via `NotificationService`
- [ ] Never show raw stack traces to user

---

## Integrated DevOps & CI/CD (Frontend)

> Nginx serving, Docker setup, and CI pipelines.

---

## Epic 13.1: Containerization

### Feature 13.1.1: Nginx Docker
- [ ] Create multi-stage `Dockerfile` (Node build -> Nginx serve)
- [ ] Create `nginx.conf` handling SPA fallback (index.html)
- [ ] Setup gzip compression in Nginx

---

## Epic 13.2: Pipelines

### Feature 13.2.1: GitHub Actions & Environments
- [ ] Workflow 1 (Staging): Merge from `feature/*` to `staging` builds Angular and auto-deploys to **Staging URL** (Testing API)
- [ ] Workflow 2 (Production): Merge from `feature/*` to `main` builds production Angular bundle and auto-deploys to **Prod URL**
- [ ] Lighthouse CI action integration on `main` merges
