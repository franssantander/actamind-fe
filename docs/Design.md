# Design.md — Actamind

**Status:** Draft for MVP

---

## 1. Design principle: modular UI, not one dashboard

The single biggest risk for a 3-layer, 7-feature app is the "flying a 747" cockpit — every widget fighting for attention on one screen. Actamind avoids this with **modes**: distinct workspaces, not a single dense dashboard.

| Mode | Shows | Hides |
|---|---|---|
| **Focus mode** | Pomodoro timer + the one active task | Everything else — habit grid, kanban board, journal |
| **Plan mode** | Kanban board, reminders/calendar | Journal editor, blog tools |
| **Write mode** | Minimalist distraction-free editor (journal or blog post) | Kanban, habit tracker, timers |
| **Explore mode** | Second brain search, resources grid, backlinks list | Execution-layer widgets |

A lightweight **Dashboard** (built last, per `PRD.md` build sequence) is the only screen that previews across modes — everything else commits fully to its mode.

## 2. Visual language

- **Base:** shadcn/ui + Tailwind, since it pairs naturally with Next.js and gives accessible primitives out of the box rather than hand-rolling components.
- **Typography:** one sans-serif for UI chrome, and a distinct serif or reading-optimized face for long-form content (journal entries, blog posts, resource notes) — the "Write mode" content area should feel like writing, not like filling out a form.
- **Color:** a small, restrained palette. Reserve saturated color for state (task status, streak indicators, publish/draft badges) — not for decoration. Each of the three layers can carry a subtle accent (e.g. one hue for Execution, one for Second Brain, one for Publishing) so users get a spatial sense of "which layer am I in" without reading labels.
- **Density:** the Kanban board and Resources grid are the densest screens — give them room. The Journal and Post Editor are the least dense — generous whitespace, narrow measure (60–75 characters per line) for readability.

## 3. Core interaction patterns

- **Linking:** every task detail panel and every note has a "Linked to Knowledge" / "Linked resources (n)" section. This is a first-class UI element, not a buried tab — it's the feature the roadmap calls out as the product's actual differentiator.
- **Drag-and-drop:** Kanban cards between columns; optionally, dragging a card onto the Pomodoro widget to start a linked focus session (per `PRD.md` §5.1 integration).
- **Publish flow:** a single, visible stepper — Journal entry → Post Editor → Public/Private toggle → live URL. Never bury "publish" behind a settings menu; it should feel like the reward at the end of writing.
- **Empty states:** every list-based screen (Kanban, Journal, Resources) needs a designed empty state with a single clear call to action — these are the first screens a new user sees and shouldn't look broken.

## 4. Screen inventory (MVP)

Maps directly to the sitemap and `PRD.md` feature scope:

- Dashboard (assembled last)
- Kanban board + task detail panel
- Pomodoro widget (standalone + embedded in Focus mode)
- Habit tracker (list + streak grid)
- Journal (entry list, editor, "Linked to" panel)
- Resources (upload, grid, type filters, detail panel)
- Second Brain dashboard (Journal + Resources side-by-side, backlinks list)
- Post editor (draft → public/private toggle)
- Public blog post page
- Public author page (Should-have)
- Auth screens (login, signup, password reset)
- Billing/plan screen (current plan, usage against limits, upgrade CTA)

## 5. States every screen must design for

- Loading (skeletons, not spinners, for list-based screens)
- Empty (see §3)
- Error (inline, recoverable — never a full-page crash for a failed fetch)
- At-limit (plan limit reached — a specific state, not a generic error, with a clear upgrade path per `Schema.md` §5)

## 6. Accessibility baseline

- All interactive elements keyboard-navigable (critical for the Kanban board's drag-and-drop — provide a non-drag fallback, e.g. a "move to" menu).
- Color is never the only signal for task status or publish state — pair with icon or label.
- Minimum body text size 16px; the Write mode editor should respect user font-size preferences where the underlying editor supports it.
- WCAG AA contrast minimum across both light and dark themes.

## 7. Dark mode

Supported from day one, not retrofitted — Tailwind + shadcn/ui's theming makes this close to free if planned upfront, and the target user (developers, indie hackers) skews toward dark-mode-by-default.

## 8. References

- `PRD.md` — feature scope and modes this design system supports
- `productivity_app_sitemap.png` — layer relationships this design system organizes around
