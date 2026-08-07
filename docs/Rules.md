# Rules.md — Actamind

**Status:** Draft for MVP — engineering conventions for the Next.js + NestJS + PostgreSQL stack

---

## 1. Repository conventions

- Monorepo (Turborepo or Nx), apps in `apps/*`, shared code in `packages/*` — see `Architecture.md` §1.
- One PR = one logical change. Prefer several small PRs over one large one, even during solo development — it keeps history reviewable and bisectable.
- Branch naming: `feature/<short-desc>`, `fix/<short-desc>`, `chore/<short-desc>`.
- Commits follow **Conventional Commits** (`feat:`, `fix:`, `chore:`, `refactor:`, `docs:`) — enables automated changelogs later and makes `git log` actually useful.

## 2. Code style

- **Linting/formatting:** ESLint + Prettier, shared config in `packages/config`, enforced via a pre-commit hook (Husky + lint-staged) and again in CI — never rely on editor settings alone.
- **TypeScript:** `strict: true` in both apps. No `any` without a comment explaining why. Shared types (DTOs, entities) live in `packages/types` or are generated from the Prisma schema — never hand-duplicated between `web` and `api`.
- **Naming:** `camelCase` for variables/functions, `PascalCase` for components/classes/types, `kebab-case` for file names (except React component files, which match the component name in `PascalCase`).

## 3. NestJS conventions

- One module per domain concept (see `Architecture.md` §4) — resist the urge to create a giant shared "core" module that everything imports from.
- Controllers stay thin: validate input (via DTOs), call a service, return a response. All business logic lives in services, which are the unit-testable layer.
- Every mutation endpoint re-derives `user_id` from the authenticated request context — **never** trust a `user_id` field in the request body. This is the entire authorization model for a solo-first product; treat it as non-negotiable.
- Plan-limit checks (`Schema.md` §5) happen in a shared guard/interceptor, not copy-pasted into each controller.
- DTOs validated with `class-validator`; reject unknown fields (`whitelist: true`, `forbidNonWhitelisted: true` on the global `ValidationPipe`).

## 4. Next.js conventions

- Server components by default; add `"use client"` only where interactivity requires it (Kanban drag-and-drop, Pomodoro timer, editors).
- Data fetching: server components fetch directly from the API for initial render; TanStack Query handles client-side mutations and cache invalidation after that.
- No business logic in the frontend beyond optimistic UI and form validation mirrors — the API is the single source of truth for anything that affects data integrity or billing.

## 5. Database & migrations

- Prisma schema is the source of truth; `Schema.md` is the human-readable mirror of it — when they diverge, update both in the same PR.
- Every migration is generated (`prisma migrate dev`), reviewed in the PR diff, and named descriptively (`add_note_links_table`, not `update1`).
- No manual schema changes against staging/production — migrations only, run as an explicit CI/CD step.
- Destructive migrations (dropping a column/table) require a backup/rollback note in the PR description.

## 6. Testing

- **Unit tests** for service-layer business logic (Nest) — especially plan-limit enforcement and note-linking logic, since these encode the product's actual rules.
- **Integration tests** for API endpoints against a real (test) Postgres instance, not mocks — schema correctness matters more than isolation here.
- **E2E tests** (Playwright) for the critical path only: signup → create task → link a note → publish a post. Don't chase 100% E2E coverage in MVP; this one flow is the product's core loop.
- CI blocks merge on: lint, typecheck, unit tests, integration tests.

## 7. API design rules

- REST, resource-oriented (`/tasks`, `/notes`, `/posts/:id/publish`), not RPC-style endpoints.
- Consistent response envelope: `{ data, meta }` for paginated lists, `{ data }` for single resources, `{ error: { code, message } }` for failures.
- Pagination via cursor or offset (`?cursor=` / `?page=&limit=`) — pick one and use it everywhere; don't mix styles across endpoints.
- Versioning: prefix with `/v1` from day one, even with a single consumer — cheap now, painful to retrofit.

## 8. Environment & secrets

- No secrets in the repo, ever — `.env.example` committed, real `.env` files gitignored.
- Separate Stripe keys, database URLs, and storage buckets per environment (`local`/`staging`/`production`) — never point staging at the production database "just to check something."
- Feature flags (if introduced) live in environment/config, not hardcoded booleans scattered through the codebase.

## 9. Definition of done (per feature)

A feature isn't done until it has: the DTO/validation in place, an ownership check, a passing integration test, an empty/error/loading state in the UI, and — if it touches a plan-limited resource — the limit check wired in. Skipping any of these is a deliberate, stated tradeoff in the PR description, not a silent omission.

## 10. References

- `Architecture.md` — system structure these rules organize
- `Schema.md` — the schema these migration rules govern
