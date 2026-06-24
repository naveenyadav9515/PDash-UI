# Phase 13: DevOps & CI/CD (Frontend)

> Nginx serving, Docker setup, and CI pipelines.

---

## Epic 13.1: Containerization

### Feature 13.1.1: Nginx Docker
- [ ] Create multi-stage `Dockerfile` (Node build -> Nginx serve)
- [ ] Create `nginx.conf` handling SPA fallback (index.html)
- [ ] Setup gzip compression in Nginx

---

## Epic 13.2: Pipelines

### Feature 13.2.1: GitHub Actions
- [ ] Workflow for PRs: lint + test
- [ ] Workflow for `main`: build production bundle + push image
- [ ] Lighthouse CI action integration
