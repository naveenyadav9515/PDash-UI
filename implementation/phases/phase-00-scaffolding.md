# Phase 0: Project Scaffolding & Foundation (Frontend)

> Initialize the Angular 20 project with proper structure, path aliases, and code quality tooling.

---

## Epic 0.1: Project Initialization

### Feature 0.1.1: Angular Project Setup
- [x] **Completed** - Initialize Angular 20 project with SSR, standalone components, and strict TypeScript
- [x] **Completed** - Configure `tsconfig.json` with `strict: true`
- [x] **Completed** - Add path aliases: `@core/*`, `@shared/*`, `@features/*`, `@env/*`, `@lib/*`
- [x] **Completed** - Set `angular.json` budget thresholds (warn: 500KB, error: 1MB initial bundle)

### Feature 0.1.2: Directory Structure
- [x] **Completed** - Create `src/app/core/` — `interceptors/`, `guards/`, `services/`, `models/`, `constants/`
- [x] **Completed** - Create `src/app/shared/` — `components/`, `pipes/`, `directives/`, `validators/`
- [x] **Completed** - Create `src/app/features/` — `workspace/`, `module-gallery/`, `module-screen/`, `search/`, `settings/`, `admin/`
- [x] **Completed** - Create `src/app/layouts/` — `main-layout/`, `auth-layout/`
- [x] **Completed** - Add placeholder `index.ts` barrel files in each directory for clean re-exports

### Feature 0.1.3: Environment Configuration
- [x] **Completed** - Create `environment.ts` (dev) with local API base URL and feature flags
- [x] **Completed** - Create `environment.prod.ts` (prod) with production API base URL
- [x] **Completed** - Ensure environment files do NOT contain secrets

---

## Epic 0.2: Code Quality Tooling

### Feature 0.2.1: Linting
- [x] **Completed** - Install and configure `@angular-eslint` with strict rules
- [x] **Completed** - Add `lint` script to `package.json`

### Feature 0.2.2: Formatting
- [x] **Completed** - Install and configure Prettier with `.prettierrc`
- [x] **Completed** - Create `.prettierignore` (dist, node_modules, coverage)

### Feature 0.2.3: Git Hooks
- [x] **Completed** - Install `husky` and `lint-staged`
- [x] **Completed** - Configure pre-commit hook to run lint + format on staged files
- [x] **Completed** - Add `.editorconfig` for cross-IDE consistency
