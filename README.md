# Pause Pet

A Korean mobile-first focus companion app where a cute pet waits with the user during focus sessions.

> **집중하는 동안, 펫이 조용히 기다려줄게요.**

Pause Pet is not a harsh productivity tool or a phone blocker. It is a soft, emotional focus companion: you pick a time, focus together with your pet, and come back to gentle encouragement—not guilt.

---

## 1. Product concept

**Problem:** Focusing alone can feel empty and easy to quit.

**Idea:** A small pet stays with you while the timer runs, so focus feels shared instead of lonely.

**Who it is for:** Korean-speaking users who want a calm, cute way to stay on task—students, office workers, creators, and side-project builders who dislike aggressive productivity apps.

**What it is not:** Parental controls, addiction treatment, or a dashboard-heavy KPI app.

---

## 2. MVP features

- **Focus duration selection** — 5, 15, 25, or 45 minutes
- **Countdown timer** — large, readable focus screen
- **Gentle give-up flow** — pause or end without shame copy
- **Session completion** — celebrate finishing a focus block
- **Pet EXP / level** — growth reward after each completed session
- **Total focus minutes** — lifetime minutes tracked on home
- **Streak** — consecutive days with at least one completed session
- **LocalStorage persistence** — progress survives refresh on the same browser

Also included: Korean UX copy, mobile-first layout, recent session history on home.

---

## 3. Tech stack

| | |
|---|---|
| Framework | **Next.js** (App Router) |
| UI | **React** |
| Language | **TypeScript** |
| Styling | **Tailwind CSS** |
| Data | **localStorage** (client only) |

No backend, no database, no environment variables required.

---

## 4. Local setup

**Requirements**

- Node.js 18.18+ (20 LTS recommended)
- npm 9+

**Install**

```bash
git clone <your-repo-url>
cd pause-pet
npm install
```

No `.env` file is needed.

**Docs** (optional, for contributors): see `/docs` — `PRD.md`, `design.md`, `tasks.md`, `DEV_NOTES.md`.

---

## 5. How to run

```bash
# Development (http://localhost:3000)
npm run dev

# Production build
npm run build

# Run production build locally
npm start

# Type check only
npm run lint
```

**Deploy (Vercel):** [github.com/BB-BK-TK/pause_pet_cursor](https://github.com/BB-BK-TK/pause_pet_cursor)

1. Import the repo in Vercel → **Framework Preset: Next.js**
2. **Production Branch:** `main` (code lives on `main` and `master`)
3. **Build Command:** `npm run build` (default)
4. **Output Directory:** leave empty (do not set `out` or `.next`)
5. **Environment variables:** none
6. Redeploy after pushing to `main`

If you see `404: NOT_FOUND`, the deployment is usually on the wrong branch or Output Directory was set incorrectly in Vercel project settings.

Test on a phone or narrow browser (~390px width) for the intended experience.

---

## 6. Data storage

All progress is stored in the browser under one key:

| Key | `pause-pet-state` |
|-----|-------------------|
| Location | `localStorage` |
| Scope | Per browser / per device |

**Stored fields (summary)**

- `completedSessions` — list of finished sessions (id, duration, timestamp)
- `totalFocusMinutes` — sum of completed focus time
- `streak` — consecutive days with a completion
- `petExp` / `petLevel` — pet growth
- `lastCompletedDate` — last calendar day a session was completed

Implementation: `lib/storage.ts` (SSR-safe: no `window` access on the server).

Clearing site data or using another browser starts fresh.

---

## 7. Current limitations

- **No accounts** — data does not sync across devices
- **No backend** — nothing is saved to a server
- **Timer is in-memory** — refreshing mid-session loses the active countdown (saved stats are kept)
- **No real app blocking** — does not lock Instagram, YouTube, etc.
- **Pet visuals** — emoji/CSS placeholder, not final character art
- **Streak display** — updates on completion; not a full calendar history view

---

## 8. Future roadmap

**Near term**

- Persist in-progress sessions (resume after refresh)
- Settings (reset data, pet name)
- PWA install prompt for home-screen use

**Later**

- Native iOS / Android apps
- Real focus / app-blocking integrations (Screen Time, etc.)
- Cloud sync and accounts
- Push reminders
- Richer pet animations and items
- Social sharing (streak cards)

**Explicitly out of scope for MVP**

- Backend / API / Supabase
- Auth
- Native app blocking (Phase 1)
- Push notifications
- Payments
- AI coaching or personalization

---

Built as a lean web MVP—ship fast, learn from real focus sessions, grow the pet later.
