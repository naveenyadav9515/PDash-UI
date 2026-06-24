# P-Dash — Frontend (Angular) Implementation Plan

> **Structure:** Phase → Epic → Feature → Story
> **Stack:** Angular 20, TypeScript, CSS (Glassmorphism)
> **Approach:** Foundation first (Phases 0–11), then individual module screen implementations.
> **Sync:** Phase numbers are synchronized with the Backend implementation plan.

---

## Phase Overview

| Phase | Name | Status | Details |
|-------|------|--------|---------|
| 0 | [Project Scaffolding & Foundation](./phases/phase-00-scaffolding.md) | 🔲 Not Started | Angular init, directory structure, tooling |
| 1 | [Core Infrastructure & Configuration](./phases/phase-01-infrastructure.md) | 🔲 Not Started | Design system, shared components, theme |
| 2 | [Security & HTTP Layer](./phases/phase-02-security.md) | 🔲 Not Started | Interceptors, guards, error handler |
| 3 | [Authentication & Authorization](./phases/phase-03-auth.md) | 🔲 Not Started | Auth service, login/register UI, user switcher |
| 4 | [Workspace System](./phases/phase-04-workspace.md) | 🔲 Not Started | Workspace service, footer nav, create/manage |
| 5 | [Module System & Module Gallery](./phases/phase-05-module-gallery.md) | 🔲 Not Started | Gallery UI, module cards, usage counters |
| 6 | [Workspace-Module References & Import](./phases/phase-06-references.md) | 🔲 Not Started | Drag-to-assign, batch save, workspace dashboard |
| 7 | [Module Screen — Fixed Cards & User Widgets](./phases/phase-07-module-screen.md) | 🔲 Not Started | Module screen layout, cards, widget gallery |
| 8 | [Edit Mode & Module Visibility Management](./phases/phase-08-edit-visibility.md) | 🔲 Not Started | Edit mode toggle, reorder, three-tier removal UI |
| 9 | [Global Search](./phases/phase-09-search.md) | 🔲 Not Started | Search overlay, categorized results |
| 10 | [User Management, Settings & Admin](./phases/phase-10-admin.md) | 🔲 Not Started | Settings panel, admin console, profile |
| 11 | [PWA & Offline Support](./phases/phase-11-pwa.md) | 🔲 Not Started | Service worker, manifest, update notification |
| 12 | [Testing](./phases/phase-12-testing.md) | 🔲 Not Started | Unit tests, component tests, E2E tests |
| 13 | [DevOps & CI/CD](./phases/phase-13-devops.md) | 🔲 Not Started | Docker, nginx, GitHub Actions |
| 14 | [Performance & Monitoring](./phases/phase-14-performance.md) | 🔲 Not Started | Lighthouse, bundle optimization, SEO |
| 15 | [Polish & Hardening](./phases/phase-15-polish.md) | 🔲 Not Started | Accessibility, visual polish, documentation |
| Future | [Individual Module Screen Implementations](./phases/phase-future-modules.md) | 🔲 Not Started | F1–F12 module-specific screens |

---

## Module List (F1–F12)

| Code | Module | Description |
|------|--------|-------------|
| F1 | Notes | Quick notes and bookmarks |
| F2 | Kitchen Utilities | Track utility levels (gas, water, power) |
| F3 | Expense Tracker | Track income, expenses, budgets |
| F4 | Travel Logger | Past journeys and future trip planning |
| F5 | Big Purchases | Savings goals with deadline tracking |
| F6 | Reminders | Manual + automated alerts |
| F7 | Kirana Planner | Weekly grocery list with master catalog |
| F8 | Plans | Social plans with friends and family |
| F9 | Rules | Personal rules with "rule of the day" |
| F10 | Movies | Watchlist with status tracking |
| F11 | Streak Loggers & Activity Details | Consistency tracking with activity logs |
| F12 | Splitwise | Shared expense splitting |
| — | Feature Log | Development feature logging |

---

## Core Hierarchy

```
Application
  └── Workspace (user-created, max 6, footer navigation)
        └── Module Reference (many-to-many, drag-to-assign)
              └── Module (reusable mini-application)
                    └── Module Screen
                          ├── Fixed Cards (mandatory, system-controlled)
                          └── User Widgets (optional, user-controlled)
```

---

## Architecture Principles

1. Mobile-first design — Mobile-Perfect, Desktop-Contained (`max-width: 480px` centered).
2. Glassmorphism footer navigation — fixed, transparent, frosted glass, Apple-inspired.
3. User-created workspaces — users decide structure, not the system.
4. Configuration-driven workspace limits — never hardcoded.
5. Reusable modules — one module, many workspace references, zero duplication.
6. Simple drag-to-workspace import — no sizing, positioning, or dialog questions.
7. Automatic placement — modules auto-arrange in workspace dashboard.
8. Explicit Edit Mode — reorder, remove, configure only when activated.
9. Fixed Cards for core functionality — mandatory, always visible in module screens.
10. Optional Widgets for customization — user-controlled, inside module screens only.
11. Separate visibility from existence — removing references ≠ deleting data.
12. Archive before delete — workspace lifecycle: Active → Archived → Restored.
