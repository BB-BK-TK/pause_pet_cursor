# Pause Pet — Phase 1 Implementation Tasks

## 0. How to use this file

Implement **one task at a time**.

Before each task, read:

- `/docs/PRD.md`
- `/docs/design.md`
- `/docs/DEV_NOTES.md`
- `/AGENTS.md`

### Universal constraints

- No backend, auth, database, Supabase, payments, or API routes.
- `localStorage` only for persistence.
- Korean user-facing copy per `design.md`.
- Mobile-first layout.
- Do not modify unrelated files.
- Do not refactor unless required for the task.

### Prompt template

```txt
Implement Task [N] from /docs/tasks.md.
Follow PRD, design.md, DEV_NOTES.md, and AGENTS.md.
Do not modify unrelated files.
Output: changed files + how to test.
```

---

## Current repo status (baseline)

Implemented in repo:

- Next.js App Router + TypeScript + Tailwind, mobile-first `AppShell`
- **P1 onboarding:** target app selection → zodiac setup (sign or birthday) → companion reveal
- **Pause loop:** home quick pause → active timer → success / gentle give-up
- `lib/storage.ts` (`pause-pet-state`), `lib/settings.ts` (`pause-pet-settings`), `lib/zodiac.ts`
- Zodiac companion messages on home, active, success, give-up (character matching only — not fortunes)

Tasks below may be historical; prefer PRD P1 scope when in doubt.

---

# Task 0 — Implementation plan (no code)

## Prompt

Read PRD, design, DEV_NOTES, AGENTS.md. Output only:

1. Target file structure
2. Build order (reference task numbers)
3. Data model summary
4. Risks (timer accuracy, SSR/localStorage, tab visibility)

Do not write code.

## Acceptance

- Plan matches focus-timer MVP only (no app-blocking features).

---

# Task 1 — Data model and storage

## Goal

Replace placeholder `PetState` with PRD `AppState`.

## Files

- `lib/types.ts`
- `lib/constants.ts` (durations, copy keys, EXP constants)
- `lib/storage.ts`
- `lib/date.ts`
- `lib/exp.ts`
- `lib/streak.ts`
- `hooks/useAppState.ts`

## Acceptance

- Default `AppState` matches PRD §15.
- Load/save via `pause-pet-state` key.
- Schema `version: 1`; safe migration from old placeholder JSON if present.
- No `window` / `localStorage` during SSR.
- Helpers: `completeSession`, `giveUpSession`, `startSession`, `recomputeStreak`.

## Test

- Refresh preserves state.
- Manual `localStorage` inspect shows valid JSON.

---

# Task 2 — App shell and screen router

## Goal

In-app navigation between screens (no multi-route required).

## Files

- `app/page.tsx`
- `components/` shell as needed
- `lib/types.ts` (`ScreenName`)

## Screens (placeholders OK)

- `home`, `focus`, `complete`, `giveUp`
- optional: `onboarding`

## Acceptance

- Can switch screens via state for development.
- Mobile-centered layout (`max-w-md`).
- Focus screen hides any bottom nav.

## Test

- Dev-only buttons or temporary routing to verify each screen mounts.

---

# Task 3 — Home screen

## Goal

Duration selection + stats + start CTA.

## Files

- `screens/HomeScreen.tsx`
- `components/DurationPicker.tsx`
- `components/PetDisplay.tsx`
- `components/StatCard.tsx`
- `components/PrimaryButton.tsx`

## Acceptance

- Korean copy from design.md §9 (Home).
- Presets: 15 / 25 / 45 / 60 minutes.
- Shows streak, total minutes, completed sessions from state.
- `집중 시작` disabled until duration selected.
- Starts session → navigates to `focus` with timer initialized.

## Test

- Select 25분 → start → lands on Focus with 25:00.

---

# Task 4 — Focus screen and timer

## Goal

Countdown + waiting pet + give-up entry.

## Files

- `screens/FocusScreen.tsx`
- `components/FocusTimer.tsx`
- `hooks/useFocusTimer.ts`

## Acceptance

- Large `MM:SS` timer, updates every second.
- Pet `waiting` state.
- Supportive Korean copy.
- `그만할게요` → give-up flow (confirm optional per design).
- On `00:00` → `complete` + persist via `completeSession`.
- Tab visibility: use elapsed time from `endsAt` where possible (see DEV_NOTES).

## Test

- Short dev duration override OR test with 15-min and fast-forward via mocked clock if added.
- Give-up does not increment completed sessions.

---

# Task 5 — Complete screen

## Goal

Celebrate success, show EXP, return home.

## Files

- `screens/CompleteScreen.tsx`
- Update `PetDisplay` happy state

## Acceptance

- Korean copy per design.md.
- Shows `+{exp} EXP`.
- `홈으로` returns to Home with updated stats.

## Test

- Complete session → EXP and `completedSessions` increase.

---

# Task 6 — Give-up screen

## Goal

Gentle early exit.

## Files

- `screens/GiveUpScreen.tsx`
- Optional confirm modal/component on Focus

## Acceptance

- No shame copy.
- Does not grant EXP or completed session (per PRD defaults).
- `홈으로` clears `sessionInProgress`.

## Test

- Start → give up → stats unchanged except no completion bump.

---

# Task 7 — Pet EXP and level display

## Goal

Visible progression on Home (and Complete).

## Files

- `components/PetDisplay.tsx`
- `lib/exp.ts`

## Acceptance

- EXP bar or level label (`Lv.n`).
- Level derived from EXP per PRD formula.
- Pet mood/state prop: `idle` | `waiting` | `happy` | `comfort`.

## Test

- Multiple completions increase level over time.

---

# Task 8 — Streak logic and edge cases

## Goal

Correct consecutive-day streak.

## Files

- `lib/streak.ts`
- `lib/date.ts`

## Acceptance

- Completing session on new day updates streak per PRD §14.2.
- `lastCompletedDate` stored as local `YYYY-MM-DD`.
- Streak displays correctly on Home after refresh.

## Test

- Mock dates in unit-less manual test plan (change system date or inject test helper).

---

# Task 9 — Optional onboarding

## Goal

Single-screen first-run (skip if time-boxed).

## Files

- `screens/OnboardingScreen.tsx`

## Acceptance

- Shows MVP promise line.
- `시작하기` sets `onboardingCompleted` and shows Home.

## Test

- Clear storage → onboarding appears once.

---

# Task 10 — UI polish (visual only)

## Goal

Align with design.md; no new features.

## Acceptance

- Warm mobile aesthetic, rounded cards, large timer.
- Korean copy pass (natural tone).
- No logic changes unless fixing UI bugs.

## Test

- Design QA checklist in design.md §12.

---

# Task 11 — QA and build

## Goal

Production-ready prototype.

## Checklist

- `npm run build` passes
- `npm run dev` works
- No SSR localStorage errors
- Full flows: Home → Focus → Complete → Home
- Home → Focus → Give-up → Home
- State persists on refresh
- Mobile 360px layout OK
- No backend/auth/API added

## Output

- Bugs found + fixes
- Test steps

---

# Task 12 — Deployment prep (optional)

## Files

- `docs/README.md` or root `README.md`

## Acceptance

- How to run, build, deploy (Vercel)
- Phase 1 limitations listed

---

# Phase 1 definition of done

- [ ] User selects focus duration and starts timer
- [ ] Pet visible in waiting state during focus
- [ ] Timer completes → reward + EXP + stats
- [ ] Give-up uses gentle Korean copy only
- [ ] Streak, total minutes, session count on Home
- [ ] All progress in `localStorage`
- [ ] `npm run build` succeeds
- [ ] Mobile browser test OK

---

# Suggested next work (after Phase 1)

- Reset pet / data button in settings
- Change target app after onboarding (settings screen)
- Partial session credit
- Share card for streak

---

# Phase 2 — Web / PWA (not implemented)

Per PRD §20 — **no Android permissions in web app**:

- [ ] **Browser notification** after pause completion (e.g. “5분, 잘 넘겼어요”)
- [ ] **PWA install prompt** on repeat visits (Add to Home Screen)
- [ ] Change target app / zodiac in settings without full reset

---

# Phase 3+ — Android native (not implemented)

Per PRD **§21**. Web prototype uses **intervention simulation** (`screens/InterventionScreen.tsx`) — not real app detection.

**Native roadmap (when Android app ships):**

- [ ] **Detect target app open** with Usage Access → trigger same intervention UX as web simulation
- [ ] **Show intervention natively** (full-screen layer over distracting app)
- [ ] **Notify after allowed-use timer ends** (Notification permission)
- [ ] **Lock Mode later** — Accessibility permission for strongest block (see §21)

Source of truth for permission copy: `lib/nativePermissions.ts`. Placeholder UI: `screens/FutureProtectionScreen.tsx`.

## Protection modes (product)

| Mode | Permissions |
|------|-------------|
| **Soft Pause** | None (manual pause — current web P1) |
| **Detect Mode** | Usage Access, Notification, Battery optimization exclusion |
| **Lock Mode** | Above + Accessibility Service (+ optional Overlay) |

## Recommended native implementation phases

### Phase 3A — Android shell + Soft Pause

- [ ] New Android project (Kotlin); no Usage Access yet
- [ ] Port onboarding: target app → zodiac → reveal
- [ ] Manual 5-min pause timer + zodiac copy (parity with web)
- [ ] localStorage-equivalent on-device storage

### Phase 3B — Detect Mode

- [ ] Usage Access permission flow + Korean copy from PRD §21.3.1
- [ ] Background service: detect opens of selected packages
- [ ] Gentle notification / in-app nudge when target app used
- [ ] Notification permission + pause-complete alerts (§21.3.2)
- [ ] Battery optimization exclusion prompt (§21.3.3)
- [ ] Onboarding step: choose **Detect** + permission setup

### Phase 3C — Lock Mode

- [ ] Accessibility Service (Lock Mode only) with clear consent UI (§21.3.4)
- [ ] Foreground app detection → Pause Pet intervention activity
- [ ] Optional: Overlay permission for full-screen pause (§21.3.5)
- [ ] Onboarding step: choose **Lock** + staged permission setup
- [ ] Audit: Accessibility used only for user-selected apps / focus protection

### Phase 3D — Polish

- [ ] Permission re-check on upgrade / revoke
- [ ] Settings: change protection level and target apps
- [ ] Align intervention copy with `lib/zodiac.ts` per sign

## Android onboarding (future)

1. Target app selection  
2. Zodiac companion  
3. **Protection level** (Soft / Detect / Lock)  
4. **Permission setup** (only what the level needs)  

## Web placeholder (done in repo)

- [x] `lib/nativePermissions.ts` — modes, permissions, Korean copy
- [x] `FutureProtectionScreen` — read-only explainer from Home
- [x] PRD §21 — full permission model

Do **not** add Android dependencies or Gradle modules to the Next.js repo until Phase 3A starts in a separate project.

---

*Tasks aligned with P1 web + §21 Android native roadmap (docs + UI placeholders only).*
