# Phase 3: Authentication & Authorization (Frontend)

> Auth service, login/register UI, and development user switcher.

---

## Epic 3.1: Authentication Service

### Feature 3.1.1: State Management
- [ ] Create `core/services/auth.service.ts` using Angular Signals
- [ ] Define `activeUser` signal holding the current user session (or null)
- [ ] Define `isAdmin` computed signal derived from `activeUser.role`
- [ ] Define `token` signal holding the JWT access token
- [ ] Persist token in `localStorage` safely (with SSR checks)

### Feature 3.1.2: API Integration
- [ ] Implement `login(credentials)` — calls API, sets signals, saves token
- [ ] Implement `register(userData)` — calls API, auto-logins on success
- [ ] Implement `logout()` — clears signals and storage, redirects to login
- [ ] Implement `switchUser(userId)` — development-only session switcher, calls `/api/auth/switch`

---

## Epic 3.2: Auth Layout & UI Components

### Feature 3.2.1: Auth Layout Shell
- [ ] Build `layouts/auth-layout/auth-layout.component.ts`
- [ ] Minimal centered card layout with P-Dash branding
- [ ] Dark/Light mode toggle in the corner

### Feature 3.2.2: Login Page
- [ ] Build `features/auth/login/login.component.ts`
- [ ] Reactive form: email, password
- [ ] Validation: required fields, valid email format
- [ ] Loading state on submit button
- [ ] Error message display (invalid credentials)
- [ ] "Don't have an account? Register" link

### Feature 3.2.3: Register Page
- [ ] Build `features/auth/register/register.component.ts`
- [ ] Reactive form: firstName, lastName, email, password
- [ ] Validation: password strength, required fields
- [ ] Loading state on submit button

### Feature 3.2.4: Dev-Only User Switcher
- [ ] Build `shared/components/user-switcher/user-switcher.component.ts`
- [ ] Dropdown to select a predefined test user (e.g., User A, User B, Admin)
- [ ] Hidden entirely when `environment.production === true`
- [ ] Placed in the main layout header during development

---

## Epic 3.3: Password Recovery Flow

### Feature 3.3.1: Forgot Password Page
- [ ] Build `features/auth/forgot-password/forgot-password.component.ts`
- [ ] Input field for Email Address
- [ ] API call to trigger reset email
- [ ] Success state: "If an account exists, a recovery email has been sent."

### Feature 3.3.2: Reset Password Page
- [ ] Build `features/auth/reset-password/reset-password.component.ts` (Route: `/reset-password/:token`)
- [ ] Input fields for New Password and Confirm Password
- [ ] Form validation to ensure passwords match
- [ ] API call to submit new password and auto-login user upon success
