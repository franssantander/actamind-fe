# PRD.md — Actamind

**Status:** Draft for MVP · **Owner:** Actamind Software · **Last updated:** {{date}}

---

## 1. Summary

Actamind is a unified workspace that bridges three layers a knowledge worker usually keeps in separate apps: getting things done today (**Execution**), preserving what they learn (**Second Brain**), and sharing it publicly (**Publishing**). The bet is that linking these layers together — not just collecting them under one roof — is the actual product.

## 2. Problem statement

People currently stitch together a to-do app, a notes app, and a blogging platform, and the connective tissue between them (which task came from which research, which journal entry became which post) lives in their head, not in any tool. That context is lost the moment they close the tab.

## 3. Goals

- Ship a working, single-user product where a task can link to the notes/resources behind it, and a journal entry can become a public post in one flow.
- Keep the UI from becoming a "flying a 747" dashboard — modular, mode-based, not everything-at-once.
- Validate the core linking mechanic before investing in collaboration, analytics, or AI features.

### Non-goals (explicitly out of scope for MVP)

- Multi-user collaboration, teams, shared boards, comments
- Mood tracking / journal sentiment analysis / AI-generated insights
- Graph visualization of linked notes
- Custom domains, scheduled publishing, SEO analytics
- Native mobile apps (responsive web only)

## 4. Target user

Solo builders, indie hackers, and knowledge workers who already journal or take notes and want their private thinking to flow into public writing without re-typing it into a separate blogging tool. Primary persona: **Francis** — a full-stack developer who wants one tool instead of Todoist + Notion + a separate blog.

## 5. Feature scope (MoSCoW, from the MVP roadmap)

Each module below is scoped as **Must** (ship in v1) / **Should** (if time allows) / **Later** (post-launch).

### 5.1 Execution layer
| | Must | Should | Later |
|---|---|---|---|
| Kanban | Board view, drag-and-drop, Backlog/In Progress/Done columns, task detail panel, **Linked to Knowledge panel** | List/Calendar view toggle, filter/sort | Comments/activity feed (implies multi-user — decide solo vs. team first) |
| Pomodoro | Focus/break timer, optional task attach with auto time-logging | — | — |
| Habit tracker | Daily habit list, streak counter | — | — |
| Reminders | — | Basic time-based reminder widget | Location-based alerts |

### 5.2 Second brain
| | Must | Should | Later |
|---|---|---|---|
| Journal | Entry list, rich text editor, tags, daily streak counter, "Linked to" panel | Grouped by date (Today/Yesterday/older) | Mood tracking, "Top Themes" insights, journal prompts |
| Resources | Upload, type filters (Images/Docs/Links), grid view, detail panel with tags | "Connected to" tabs (Journal/Kanban) | Pagination polish, sort variants |
| Second Brain Dashboard | Journal + Resources side-by-side, basic backlinks list | Tags panel, auto-linking from Kanban | Connections graph visualization |

### 5.3 Publishing layer
| | Must | Should | Later |
|---|---|---|---|
| Post editor | Journal entry → editor → public/private toggle → live URL | SEO/settings panel (tags, featured image) | Unlisted visibility, custom domain, scheduling, SEO preview, analytics |
| Public blog page | Single post view (title, author, date, content, share buttons) | Basic author page | Comments, follow button, full-text search |

### 5.4 Dashboard
Assembled **last**, once modules 5.1–5.3 have real data: Kanban preview (3 columns), Pomodoro widget, habit mini-grid, journal quick-entry, quick capture box.

### 5.5 Plans & pricing
Free tier with usage limits (active tasks, storage, monthly posts) and a paid tier that lifts them. See `Schema.md` §5 for the data model. Billing handled by Stripe; no coupon or seat-based logic in MVP.

## 6. Build sequence

1. **Notes spine** — unified notes table (journal + resources), tags, attachments, manual link-to-task UI. No graph view — just a list of what's linked.
2. **Kanban + linking** — board, cards, and the Linked to Knowledge panel wired to real notes. This is the point the product stops feeling like a to-do app.
3. **Publish toggle** — visibility flag + slug + public route, reusing the journal/post editor.
4. **Dashboard** — glanceable summary once 1–3 have real data.
5. **Everything in "Later"** — pick 1–2 per post-launch cycle based on what's actually missed.

## 7. Success metrics (MVP)

- A user can create a task, link it to a note, and see that link from both sides.
- A user can take a journal entry from private → published with a live URL in under 2 minutes.
- Time-to-first-linked-note (signup → first task↔note link) — the moment the product's core idea "clicks."

## 8. Risks / open questions

- **Solo vs. team-first** — must be decided before building anything resembling comments or shared boards; changes the auth/permissions model significantly.
- Rich text editor choice (affects both journal and post editor) — needs to support the same content model for both, since a post starts as a copy of a journal entry.
- Storage provider for resources (local vs. S3-compatible) — affects `plan_limits.storage_mb` enforcement from day one.

## 9. References

- `Architecture.md` — system design and stack decisions
- `Schema.md` — database schema (app + plans/pricing)
- `Design.md` — UI/UX principles and mode-based navigation
- `Rules.md` — engineering conventions
