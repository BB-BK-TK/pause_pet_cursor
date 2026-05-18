# Pause Pet — Phase 1 PRD (MVP)

## 0. Document purpose

This PRD is the **product source of truth** for Pause Pet Phase 1.

Coding agents (Cursor, Codex, etc.) should:

1. Read this file before implementing features.
2. Follow `/docs/design.md` for UX, tone, and visuals.
3. Implement one task at a time from `/docs/tasks.md`.
4. Check `/docs/DEV_NOTES.md` for technical constraints and current repo state.

Do not paste this entire PRD into every prompt. Reference the file path instead.

Related: `/AGENTS.md` (repo-level coding rules).

---

## 1. Product summary

**Pause Pet** is a **Korean, mobile-first focus timer** where a cute pet **emotionally supports** the user during focus sessions.

The user picks a focus duration, starts a timer, and stays with a pet that is “waiting together” until the session ends. Completing a session rewards the pet with EXP and updates local progress (streak, total minutes, completed sessions).

Phase 1 is a **web prototype** (Next.js PWA-friendly). There is **no real app blocking**, no accounts, and no backend.

---

## 2. MVP promise

> **집중하는 동안 혼자가 아니라, 작은 펫이 같이 기다려준다.**

English (internal reference only):  
*While you focus, you are not alone—a small pet waits with you.*

---

## 3. One-line concept

**부드러운 감정 동반형 집중 타이머** — 귀여운 펫과 함께 집중 시간을 지키는 앱.

---

## 4. Core user problem

Target users want to focus but get distracted easily. They often:

- Start studying or working, then drift to their phone.
- Feel alone or unmotivated during long focus blocks.
- Dislike harsh productivity tools (streak shaming, blocking, dashboards).
- Want a **small emotional reward** for staying focused—not another chart.

The problem is not “lack of discipline lectures.” It is:

> **Focus feels lonely and easy to abandon without gentle encouragement.**

---

## 5. Target users

### Primary

- Korean users who want to focus but get distracted easily.
- Students, office workers, creators, side-project builders.
- People who dislike harsh productivity or parental-control-style apps.

### Secondary

- Anyone who wants a calm, cute companion during pomodoro-style sessions.
- Users who prefer **emotional support** over analytics-heavy tools.

### Not positioned as

- Medical, ADHD, or addiction treatment.
- Parental control or surveillance.
- Enterprise workforce monitoring.

---

## 6. Product positioning

### Pause Pet is NOT

- A strict productivity / KPI dashboard app.
- A phone-blocking or Screen Time replacement (Phase 1).
- A native iOS/Android app (Phase 1).
- An AI coach or social habit network.

### Pause Pet IS

- A **soft emotional focus companion**.
- A **mobile-first** timer with the pet as the emotional center.
- A **local-only** prototype that proves the loop: duration → focus → complete → reward.

Positioning phrase:

> **“혼내지 않고, 같이 기다려주는 집중 친구.”**

---

## 7. Phase 1 goal

Ship a **working, deployable** mobile web experience where a user can:

1. Choose a focus duration.
2. Start a session and see the pet waiting.
3. Complete the session and earn EXP.
4. See streak, total focus minutes, and completed session count.
5. Give up mid-session with **gentle** copy (no shame).
6. Return later with progress still saved (`localStorage`).

Success = users say the pet makes focus feel **warmer and easier to continue**, not more stressful.

---

## 8. Technical stack (Phase 1)

| Layer | Choice |
|--------|--------|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Persistence | `localStorage` only |
| Deployment | Vercel (or static host) |

### Explicitly excluded

- Backend, database, Supabase
- User accounts / auth
- API routes (unless trivial static config—prefer none)
- Native app blocking (iOS Screen Time, Android UsageStats)
- iOS/Android native shells
- Payments / subscriptions
- Social / community
- AI personalization
- Push notifications

---

## 9. Phase 1 features (in scope)

| # | Feature | Requirement |
|---|---------|-------------|
| 1 | **Select focus duration** | Preset chips (e.g. 15 / 25 / 45 / 60 min); one tap to choose |
| 2 | **Start timer** | Starts countdown for selected duration |
| 3 | **Pet waiting during focus** | Dedicated focus UI; pet + supportive Korean copy; minimal distractions |
| 4 | **Complete session** | When timer hits 0: celebration UI, grant EXP, update stats |
| 5 | **Save local progress** | All state in `localStorage`; survives refresh |
| 6 | **Pet EXP** | EXP increases on successful completion; optional simple level display |
| 7 | **Stats** | Streak (days), total focus minutes, completed session count |
| 8 | **Give-up flow** | User can exit early; gentle copy; no EXP for incomplete session (or reduced—see rules) |
| 9 | **Korean UX copy** | All user-facing strings in natural Korean |

---

## 10. Out of scope (Phase 1)

- Native app blocking
- iOS / Android native apps
- User accounts
- Backend / Supabase
- Payments
- Social / community
- AI personalization
- Push notifications
- Real-time sync across devices
- Leaderboards
- Complex pet customization shop
- Background timer when tab is fully closed (best-effort only; document limitation)

---

## 11. Core user flows

### 11.1 First visit (happy path)

1. User opens app → **Home** (집중 시작 화면).
2. User selects duration (e.g. 25분).
3. User taps **집중 시작**.
4. **Focus screen**: large timer, pet “waiting” animation/state, calm copy.
5. Timer reaches 0 → **Complete screen**: praise, EXP gained, stats updated.
6. User taps **홈으로** → Home shows updated streak / minutes / sessions.

### 11.2 Returning user

1. Open app → Home shows pet, stats summary, duration presets.
2. Start another session.

### 11.3 Give-up flow (mid-session)

1. On Focus screen, user taps **그만할게요** (or similar—see design.md).
2. **Give-up confirm** (optional single step): gentle message, confirm / cancel.
3. Session ends **without** full completion reward.
4. Gentle copy on result (e.g. “괜찮아요. 다음에 다시 같이 해봐요.”).
5. Return Home; streak rules apply (see §14).

---

## 12. Screens and requirements

Navigation: **in-app screen state** (no Next.js multi-route required for MVP). Suggested `ScreenName` union in DEV_NOTES.

### 12.1 Home — `home`

**Purpose:** Choose duration and see progress at a glance.

**Required content**

- Pet visual (emotional center).
- Short greeting (Korean).
- Duration presets.
- Primary CTA: **집중 시작** (disabled until duration selected).
- Stats row or cards:
  - 연속 **{streakDays}**일
  - 총 집중 **{totalFocusMinutes}**분
  - 완료 **{completedSessions}**회
- Optional: pet level / EXP bar.

**Copy examples**

- Headline: `오늘도 같이 집중해볼까요?`
- Sub: `작은 펫이 옆에서 기다릴게요.`

### 12.2 Focus — `focus`

**Purpose:** Active countdown; pet waits with user.

**Required content**

- **Large timer** (MM:SS), highly visible.
- Pet in **waiting** state (see design.md).
- Supportive line (rotate or static), e.g. `천천히 해도 괜찮아요. 펫이 기다리고 있어요.`
- Secondary control: **그만할게요** (give-up; not prominent as primary CTA).

**Behavior**

- Timer counts down once per second (client-side).
- Page should remain usable if user switches tabs (use `visibility` / elapsed time where possible—see DEV_NOTES).
- No other navigation except give-up.

### 12.3 Complete — `complete`

**Purpose:** Celebrate success; show rewards.

**Required content**

- Positive headline: `잘했어요! 같이 집중했어요.`
- EXP gained: `+{expGained} EXP`
- Updated stats snippet.
- Pet in **happy** state.
- CTA: **홈으로**

**Behavior**

- Persist: `completedSessions += 1`, add minutes to `totalFocusMinutes`, update streak, add EXP, update `lastSessionDate`.

### 12.4 Give-up — `giveUp`

**Purpose:** Acknowledge stop without shame.

**Required content**

- Headline: `오늘은 여기까지도 괜찮아요.`
- Sub: `쉬었다가 다시 시작하면 돼요.`
- No harsh stats (“실패” forbidden).
- CTA: **홈으로**

**Behavior**

- Do **not** increment `completedSessions`.
- Do **not** add full session minutes (optional: add partial minutes—**default: no partial credit** for MVP).
- Do **not** break streak unless product rule says so—**default: giving up does not increment streak but does not reset it either**.

### 12.5 Optional: Onboarding — `onboarding`

**MVP:** Optional single screen. If included:

- Explain promise in ≤5 seconds.
- CTA: **시작하기** → `home`.
- Set `onboardingCompleted = true` in storage.

If skipped for speed, Home must still be self-explanatory.

---

## 13. Focus duration presets

Default presets (minutes):

| Label | Value |
|-------|-------|
| 15분 | 15 |
| 25분 | 25 |
| 45분 | 45 |
| 60분 | 60 |

- Store selected duration in session state when starting.
- Allow only one selection before start.
- Custom duration is **out of scope** for Phase 1 unless trivial to add later.

---

## 14. Game rules (EXP, streak, stats)

### 14.1 Completed session

When timer reaches 0:

- `completedSessions += 1`
- `totalFocusMinutes += sessionDurationMinutes`
- `pet.exp += expGained` (see formula below)
- Update `lastCompletedDate` (ISO date `YYYY-MM-DD` in local timezone)
- Recompute `streakDays`

**EXP formula (Phase 1, simple)**

```
expGained = Math.floor(sessionDurationMinutes / 5) * 5
```

Examples: 15 min → 15 EXP; 25 min → 25 EXP; 60 min → 60 EXP.

**Pet level (optional display)**

```
level = Math.floor(pet.exp / 100) + 1
```

Adjust constants in `lib/constants.ts` only.

### 14.2 Streak

- A **streak day** counts if the user completes **at least one** session that calendar day (local time).
- `streakDays` = consecutive days with ≥1 completion, ending today or yesterday if today not yet completed.
- Giving up does **not** add a streak day.
- Missing a day resets streak to 0 (or to 1 on next completion—implement standard consecutive logic).

### 14.3 Give-up

- No EXP grant (default).
- No `completedSessions` increment.
- No minutes added to `totalFocusMinutes` (default).

### 14.4 Daily reset

- Track `lastActiveDate`; optional UI “오늘 N회 완료” can reset daily—totals do not reset.

---

## 15. Data model (`localStorage`)

Storage key: `pause-pet-state` (may migrate schema—version field recommended).

```ts
export type ScreenName =
  | "onboarding"
  | "home"
  | "focus"
  | "complete"
  | "giveUp";

export type FocusDurationMinutes = 15 | 25 | 45 | 60;

export type PetData = {
  name: string;
  exp: number;
  level: number; // derived on save or computed in UI
};

export type SessionInProgress = {
  durationMinutes: FocusDurationMinutes;
  startedAt: string; // ISO timestamp
  endsAt: string; // ISO timestamp
} | null;

export type AppState = {
  version: 1;
  onboardingCompleted: boolean;
  pet: PetData;
  completedSessions: number;
  totalFocusMinutes: number;
  streakDays: number;
  lastCompletedDate: string | null; // YYYY-MM-DD
  lastActiveDate: string; // YYYY-MM-DD
  sessionInProgress: SessionInProgress;
};
```

Default state: see `/docs/DEV_NOTES.md`.

---

## 16. Suggested file structure

```txt
pause-pet/
  docs/
    PRD.md
    design.md
    tasks.md
    DEV_NOTES.md
  app/
    page.tsx          # Client shell / screen router
    layout.tsx
    globals.css
  components/
    BottomNav.tsx     # optional Phase 1
    DurationPicker.tsx
    FocusTimer.tsx
    PetDisplay.tsx
    StatCard.tsx
    PrimaryButton.tsx
  screens/
    HomeScreen.tsx
    FocusScreen.tsx
    CompleteScreen.tsx
    GiveUpScreen.tsx
    OnboardingScreen.tsx  # optional
  lib/
    types.ts
    constants.ts
    storage.ts
    date.ts
    streak.ts
    exp.ts
  hooks/
    useAppState.ts
    useFocusTimer.ts
```

---

## 17. Non-functional requirements

| Area | Requirement |
|------|-------------|
| Performance | Fast first load; minimal dependencies |
| Mobile | Optimized for 360–430px width; large timer and tap targets |
| Language | Korean UI; natural tone per design.md |
| Persistence | State survives refresh |
| Build | `npm run build` passes; TypeScript strict |
| Accessibility | Readable contrast; buttons ≥44px touch target where possible |
| Privacy | No data leaves device in Phase 1 |

---

## 18. Phase 1 success criteria

- [ ] User can select duration and start timer in &lt;10 seconds.
- [ ] Focus screen shows large timer + waiting pet.
- [ ] Completing session updates EXP and stats in `localStorage`.
- [ ] Give-up flow uses gentle Korean copy only.
- [ ] Streak / total minutes / session count display on Home.
- [ ] Refresh mid-project does not corrupt state (or recovers safely).
- [ ] App builds and runs on mobile browser.
- [ ] Deployable to Vercel with no env secrets.

---

## 19. User test questions (post-MVP build)

1. 집중할 때 이 앱이 도움이 될 것 같나요?
2. 펫이 있으면 집중을 더 이어가고 싶어지나요?
3. 타이머 UI가 보기 편한가요?
4. 포기할 때 문구가 부담스럽지 않은가요?
5. 너무 유치하거나, 반대로 너무 딱딱한 부분이 있나요?
6. 실제로 매일 쓸 것 같은가요? 왜/왜 아닌가요?

---

## 20. Future phases (reference only — do not implement)

- Real app blocking / intent interception
- Native apps
- Accounts and cloud sync
- Push reminders
- More pet animations and items
- Social sharing of streaks

---

*Last updated: Phase 1 focus-timer MVP direction.*
