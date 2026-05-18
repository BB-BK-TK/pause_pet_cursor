# AGENTS.md

## Purpose

This file defines repo-level working rules for Codex.

Codex should follow these rules for all tasks in this repository.

This repository is for the Phase 1 prototype of Pause Pet / 잠깐멈춤, a mobile-first PWA that simulates an anti-doomscrolling pause experience.

---

## Source of Truth

Before product work, read:
- `/docs/PRD.md`

Before UI, copy, or design work, read:
- `/docs/design.md`

Before implementation tasks, read:
- `/docs/tasks.md`

For every task, follow this file:
- `/AGENTS.md`

---

## Working Rules

- Implement one task at a time.
- Do not modify unrelated files.
- Do not refactor unless required for the current task.
- Do not expand scope.
- Do not add backend.
- Do not add authentication.
- Do not add API routes.
- Do not add a database.
- Do not add payment or subscription functionality.
- Do not add native app-blocking functionality.
- Do not add iOS Screen Time API integration.
- Do not add Android UsageStatsManager integration.
- Use LocalStorage only for prototype state.
- Keep the app mobile-first.
- Keep Korean copy natural and warm.
- Avoid shame-based language.
- Avoid medical/addiction positioning.
- Keep the app deployable to Vercel.

---

## Tech Stack

Use:
- Next.js
- React
- TypeScript
- Tailwind CSS
- LocalStorage
- Vercel

Avoid in Phase 1:
- Backend
- Auth
- Database
- API routes
- Native modules
- Push notifications
- Payments
- AI coaching
- Community features

---

## Output Format

After each implementation task, output only:

1. Changed files
2. What changed
3. How to test

Keep responses concise.

For planning tasks, output only the requested plan.

For QA tasks, output:

1. Bugs found
2. Changed files
3. How to test

---

## Product Reminder

Pause Pet / 잠깐멈춤 is not a productivity dashboard.

It is a warm Korean-first digital wellbeing prototype.

Core experience:

> User simulates opening a distracting app → app asks “잠깐. 지금 왜 열었어?” → user pauses → user chooses not to open → pet/room grows → saved time increases.

The Phase 1 prototype should feel like a real mobile app, even though real app blocking is not implemented.

---

## Key Scope Boundary

If a task seems to require real app blocking, backend, auth, API routes, database, native app code, or payment, do not implement it.

Instead, implement a simple Phase 1 simulation using local state and LocalStorage.
