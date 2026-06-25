# Phase 19: DevOps & CI/CD (Frontend)

> Nginx serving, Docker setup, and CI pipelines.

---

## Epic 19.1: Containerization

### Feature 19.1.1: Nginx Docker
- [ ] Create multi-stage `Dockerfile` (Node build -> Nginx serve)
- [ ] Create `nginx.conf` handling SPA fallback (index.html)
- [ ] Setup gzip compression in Nginx

---

## Epic 19.2: Pipelines

### Feature 19.2.1: GitHub Actions & Environments
- [ ] Workflow 1 (Staging): Merge from `feature/*` to `staging` builds Angular, deploys to **Staging URL**, and auto-deletes feature branch
- [ ] Workflow 2 (Production): Merge from `staging` to `release` builds production bundle and auto-deploys to **Prod URL**
- [ ] Lighthouse CI action integration on `release` merges

