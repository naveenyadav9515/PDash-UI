# Phase 0: Project Scaffolding & Foundation (Frontend)

> Initialize the Angular 20 project with proper structure, path aliases, and code quality tooling.

---

## Epic 0.1: Project Initialization

### Feature 0.1.1: Angular Project Setup
- [ ] Initialize Angular 20 project with SSR, standalone components, and strict TypeScript
- [ ] Configure `tsconfig.json` with `strict: true`
- [ ] Add path aliases: `@core/*`, `@shared/*`, `@features/*`, `@env/*`, `@lib/*`
- [ ] Set `angular.json` budget thresholds (warn: 500KB, error: 1MB initial bundle)

### Feature 0.1.2: Directory Structure
- [ ] Create `src/app/core/` — `interceptors/`, `guards/`, `services/`, `models/`, `constants/`
- [ ] Create `src/app/shared/` — `components/`, `pipes/`, `directives/`, `validators/`
- [ ] Create `src/app/features/` — `workspace/`, `module-gallery/`, `module-screen/`, `search/`, `settings/`, `admin/`
- [ ] Create `src/app/layouts/` — `main-layout/`, `auth-layout/`
- [ ] Add placeholder `index.ts` barrel files in each directory for clean re-exports

### Feature 0.1.3: Environment Configuration
- [ ] Create `environment.ts` (dev) with local API base URL and feature flags
- [ ] Create `environment.prod.ts` (prod) with production API base URL
- [ ] Ensure environment files do NOT contain secrets

---

## Epic 0.2: Code Quality Tooling

### Feature 0.2.1: Linting
- [ ] Install and configure `@angular-eslint` with strict rules
- [ ] Add `lint` script to `package.json`

### Feature 0.2.2: Formatting
- [ ] Install and configure Prettier with `.prettierrc`
- [ ] Create `.prettierignore` (dist, node_modules, coverage)

### Feature 0.2.3: Git Hooks
- [ ] Install `husky` and `lint-staged`
- [ ] Configure pre-commit hook to run lint + format on staged files
- [ ] Add `.editorconfig` for cross-IDE consistency
