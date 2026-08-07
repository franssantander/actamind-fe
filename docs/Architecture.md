# Architecture.md — Actamind

**Status:** Draft for MVP · **Stack:** Next.js · NestJS · PostgreSQL

---

## 1. High-level shape

Actamind is a client/server monorepo: a Next.js app for everything the user sees (private workspace + public blog), and a NestJS API that owns all business logic and data access. Postgres is the single source of truth; no second database for MVP.

```
apps/
  web/        # Next.js — app router, both private workspace and public blog
  api/        # NestJS — REST API, auth, business logic, queues
packages/
  ui/         # shared React components (shadcn/ui based)
  config/     # shared eslint/tsconfig/tailwind config
  types/      # shared DTOs / types generated from the API (or hand-shared)
```

Managed with a monorepo tool (Turborepo or Nx) so `web` and `api` share types without publishing a package.

## 2. Why this split (and not Next.js API routes alone)

Next.js API routes would work for a much smaller app, but NestJS is worth the extra process here because:
- The domain has real business rules (plan-limit enforcement, note↔task linking, publish workflow) that benefit from Nest's module/service/DI structure rather than living in loose route handlers.
- Background work (Pomodoro session finalization, plan-limit recalculation, thumbnail generation for uploaded resources) is cleaner behind a proper queue-backed service than inside a serverless function.
- It keeps the door open to a future mobile client or public API without duplicating logic into Next.js.

## 3. Frontend (Next.js)

- **App Router**, React Server Components for read-heavy pages (public blog post view, dashboard), client components for interactive surfaces (Kanban board, Pomodoro timer, journal editor).
- **Data fetching:** TanStack Query for client-side state (matches Francis's existing stack familiarity from KRBS); server components fetch directly via the API for initial page loads.
- **Auth:** session/JWT issued by NestJS, stored in an httpOnly cookie; Next.js middleware checks auth state for route protection between the four modes (Focus / Plan / Write / Explore).
- **Public blog routes** (`/blog/[slug]`, `/[author]`) are statically generated where possible (ISR) since they're public and cacheable; the private workspace is fully dynamic.
- **Rich text:** one editor component (Tiptap or similar) reused by both the Journal and the Post Editor, since a post starts as a copy of journal content — this is a shared component, not two implementations.

## 4. Backend (NestJS)

Modules mirror the product's three layers plus platform concerns:

```
src/
  auth/            # login, session, guards
  users/
  tasks/           # kanban
  time-logs/       # pomodoro sessions
  habits/
  notes/           # unified journal + resource entries
  tags/
  note-links/       # polymorphic linking
  posts/           # publishing layer
  billing/         # plans, subscriptions, Stripe webhooks
  storage/         # file upload abstraction (local/S3)
  common/          # guards, interceptors, filters, decorators
```

- **ORM:** Prisma — schema-first, generates typed client, migrations are reviewable diffs (pairs well with `Schema.md` being the source of truth people read before code).
- **API style:** REST with a consistent envelope (`{ data, meta }` for lists, `{ data }` for single resources) and RFC 7807-style problem details for errors. GraphQL is not needed at this scale and adds complexity the MVP doesn't need.
- **Validation:** `class-validator` DTOs on every endpoint; never trust client-supplied `user_id` — always derive from the auth context.
- **Background jobs:** BullMQ (Redis-backed) for anything that shouldn't block a request — resource thumbnailing, plan-limit re-checks, Stripe webhook processing.
- **File storage:** an interface (`StorageService`) with a local-disk implementation for dev and an S3-compatible implementation for prod, selected by env var — never write code that assumes one or the other.

## 5. Data layer

- PostgreSQL 15+, one schema, Prisma migrations checked into version control.
- Redis for: BullMQ queues, session/rate-limit storage, short-lived caches (e.g. plan-limit lookups).
- Full schema detail lives in `Schema.md` — this doc only covers where the database sits in the system, not its contents.

## 6. Cross-cutting concerns

- **Auth & authorization:** session-based for MVP (simpler than rolling your own JWT refresh flow); guard every mutation with an ownership check (`resource.user_id === request.user.id`) — the app is solo-first, so this check is the entire authorization model for now.
- **Plan-limit enforcement:** a single `PlanLimitsGuard`/interceptor checked before writes that could exceed a limit (creating a task, uploading a resource, publishing a post) — reads `plan_limits` for the user's plan and compares against a live count, per `Schema.md` §5.
- **Rate limiting:** basic IP + user based throttling on auth and public blog endpoints (NestJS `@nestjs/throttler`).
- **Logging & monitoring:** structured JSON logs (pino), shipped to whatever the deploy target supports; a basic uptime/error monitor (Sentry) from day one — cheap to add now, expensive to retrofit.
- **Environments:** `local`, `staging`, `production`, each with its own `.env`, Postgres instance, and Stripe test/live keys. No shared databases across environments.

## 7. Deployment (suggested, not prescriptive)

- **Next.js (`web`):** Vercel, or any Node host if you want everything on one provider.
- **NestJS (`api`):** a container-based host (Fly.io, Railway, Render, or a small VPS) — Nest doesn't fit the serverless model as cleanly as Next.js does.
- **Postgres + Redis:** managed instances (e.g. Neon/Supabase for Postgres, Upstash for Redis) to avoid running your own database ops during MVP.
- CI runs lint + typecheck + tests on every PR; migrations run as an explicit deploy step, never automatically on boot.

## 8. What's deliberately not here yet

- No microservices split — `api` is one deployable Nest app until there's a concrete scaling reason to split it.
- No GraphQL, no event sourcing, no multi-region setup.
- No dedicated search service (Postgres full-text search is enough for MVP note/task search).

## 9. References

- `Schema.md` — full database schema
- `PRD.md` — feature scope this architecture supports
- `Rules.md` — code organization and contribution conventions
