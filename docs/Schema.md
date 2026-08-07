# Schema.md — Actamind

**Status:** Draft for MVP · **Database:** PostgreSQL · **ORM:** Prisma (recommended)

This is the human-readable mirror of the Prisma schema — per `Rules.md` §5, update both together. Scoped to **Must**-have features from `PRD.md`; "Later" items are listed at the end so nothing is designed twice.

---

## 1. Core

### `users`
| Column | Type | Notes |
|---|---|---|
| id | uuid PK | prefer uuid over serial for anything exposed in URLs/APIs |
| name | text | |
| email | text, unique | |
| password_hash | text | never store plaintext or reversible passwords |
| created_at / updated_at | timestamptz | |

---

## 2. Execution layer

### `tasks` (Kanban)
| Column | Type | Notes |
|---|---|---|
| id | uuid PK | |
| user_id | uuid FK → users, on delete cascade | |
| title | text | |
| description | text, nullable | |
| status | enum(`backlog`,`in_progress`,`done`) | drives the 3 board columns |
| position | integer | drag-and-drop ordering within a column |
| created_at / updated_at | timestamptz | |

Index: `(user_id, status, position)` — the board's primary query pattern.

### `task_time_logs` (Pomodoro)
| Column | Type | Notes |
|---|---|---|
| id | uuid PK | |
| task_id | uuid FK → tasks, nullable, on delete set null | nullable so a session can run standalone |
| user_id | uuid FK → users | |
| session_type | enum(`focus`,`break`) | |
| duration_seconds | integer | |
| started_at | timestamptz | |
| ended_at | timestamptz, nullable | null while a session is in progress |

Indexes: `(task_id)`, `(user_id, started_at)`.

### `habits`
| Column | Type | Notes |
|---|---|---|
| id | uuid PK | |
| user_id | uuid FK → users | |
| name | text | |
| frequency | enum(`daily`) | expand later if weekly habits are added |
| created_at | timestamptz | |

### `habit_logs`
| Column | Type | Notes |
|---|---|---|
| id | uuid PK | |
| habit_id | uuid FK → habits, on delete cascade | |
| log_date | date | one row per completed day |
| completed | boolean | |

Unique index `(habit_id, log_date)` — prevents duplicate check-ins; streak = count of consecutive dates working backward from today.

---

## 3. Knowledge layer (Second Brain)

### `notes` — unified Journal entries + Resources
| Column | Type | Notes |
|---|---|---|
| id | uuid PK | |
| user_id | uuid FK → users | |
| type | enum(`journal`,`resource`) | single table, two use cases |
| title | text, nullable | resources may not need one |
| body | text, nullable | rich text content |
| resource_type | enum(`image`,`document`,`link`,`file`), nullable | set only when `type = resource` |
| file_path | text, nullable | storage key/path, for uploads |
| url | text, nullable | when `resource_type = link` |
| created_at / updated_at | timestamptz | drives journal's date grouping and streak counter |

Index: `(user_id, type, created_at)`.

### `tags`
| Column | Type | Notes |
|---|---|---|
| id | uuid PK | |
| user_id | uuid FK → users | |
| name | text | |

### `note_tags` (join table)
| Column | Type | Notes |
|---|---|---|
| note_id | uuid FK → notes, on delete cascade | |
| tag_id | uuid FK → tags, on delete cascade | |

Composite PK `(note_id, tag_id)`.

### `note_links` — polymorphic backlinks, powers "Linked to Knowledge"
| Column | Type | Notes |
|---|---|---|
| id | uuid PK | |
| note_id | uuid FK → notes, on delete cascade | the note doing the linking |
| linkable_type | text | `"Task"` or `"Note"` |
| linkable_id | uuid | id on the target table |
| created_at | timestamptz | |

Indexes: `(note_id)` and `(linkable_type, linkable_id)` — both directions of the backlink lookup. Deliberately no graph/coordinates table; this already holds what a future graph view would need.

> **Prisma note:** Prisma doesn't model true polymorphic relations natively. Either (a) keep `note_links` as a plain table with `linkable_type`/`linkable_id` and resolve the target manually in the service layer, or (b) if you want relational integrity, use two nullable FK columns (`task_id`, `linked_note_id`) with a check constraint that exactly one is set. Option (a) is simpler and matches the table above; switch to (b) only if referential integrity on links becomes a real problem.

---

## 4. Publishing layer

### `posts`
| Column | Type | Notes |
|---|---|---|
| id | uuid PK | |
| user_id | uuid FK → users | |
| note_id | uuid FK → notes, nullable, on delete set null | source journal entry, if any |
| title | text | |
| slug | text, unique | powers the public URL |
| content | text | copied from the note's body, then edited independently |
| status | enum(`draft`,`published`) | the Public/Private toggle |
| published_at | timestamptz, nullable | |
| featured_image | text, nullable | Should-have field, cheap to include now |
| created_at / updated_at | timestamptz | |

Indexes: `(slug)` unique, `(status, published_at)` for a future "recent posts" listing.

---

## 5. Plans & billing

### `plans`
| Column | Type | Notes |
|---|---|---|
| id | uuid PK | |
| name | text | e.g. "Free", "Pro" |
| slug | text, unique | used in code, not just display |
| price_cents | integer | 0 for free tier |
| billing_interval | enum(`month`,`year`,`free`) | |
| stripe_price_id | text, nullable | null for the free plan |
| is_default | boolean | which plan a signup lands on |
| sort_order | integer | |
| created_at / updated_at | timestamptz | |

### `plan_limits` — key/value, one row per limit per plan
| Column | Type | Notes |
|---|---|---|
| id | uuid PK | |
| plan_id | uuid FK → plans | |
| key | text | e.g. `max_active_tasks`, `storage_mb`, `custom_domain`, `blog_posts_per_month` |
| value | text | cast in app code; `-1` = unlimited |

Unique index `(plan_id, key)`. Checked live against a count from the relevant table — no separate usage-tracking table for MVP.

### `subscriptions`
| Column | Type | Notes |
|---|---|---|
| id | uuid PK | |
| user_id | uuid FK → users, unique | one subscription per user — solo-first, no seats |
| plan_id | uuid FK → plans | |
| status | enum(`trialing`,`active`,`past_due`,`canceled`,`incomplete`) | mirrors Stripe status |
| stripe_customer_id | text, nullable | |
| stripe_subscription_id | text, nullable | |
| trial_ends_at | timestamptz, nullable | |
| current_period_start | timestamptz | |
| current_period_end | timestamptz | |
| cancel_at_period_end | boolean | |
| created_at / updated_at | timestamptz | |

### `invoices` (optional — skip unless rendering billing history in-app)
| Column | Type | Notes |
|---|---|---|
| id | uuid PK | |
| subscription_id | uuid FK → subscriptions | |
| amount_cents | integer | |
| status | enum(`paid`,`open`,`failed`) | |
| stripe_invoice_id | text | |
| paid_at | timestamptz, nullable | |

---

## 6. Deliberately excluded from MVP

- `reminders` — add (`user_id`, `title`, `remind_at`, `is_done`) when picked up as a Should-have.
- `note_graph_positions` — graph viz layout; `note_links` already holds what it would need.
- `moods` / `journal_themes` — needs NLP or manual mood-tagging UX not yet designed.
- `comments`, threaded replies — implies a multi-user permissions model; decide solo vs. team first (`PRD.md` §8).
- `custom_domains`, `scheduled_publish_at`, usage-metering tables — real features, but premature before MVP has users.

## 7. References

- `Architecture.md` §5 — where this schema sits in the system
- `Rules.md` §5 — migration conventions this schema follows
- `PRD.md` — feature scope this schema supports
