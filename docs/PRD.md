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

**Pause Pet** is a **Korean, mobile-first app-reduction companion**. Before opening a distracting app, the user pauses for a short time with a **zodiac companion pet** that waits beside them.

The user selects a target app to use less, meets their zodiac companion during onboarding (by sign or birthday), then starts short pause sessions (default 5 minutes). Completing a pause rewards the pet with EXP and updates local progress (streak, total minutes, completed sessions).

**Zodiac is character matching and UX personalization only** — not fortune-telling or daily horoscopes.

Phase 1 (P1) is a **web prototype** (Next.js PWA-friendly). There is **no real app blocking**, no accounts, and no backend.

---

## 2. MVP promise

> **앱을 열기 전, 별자리 친구가 잠깐 옆에서 기다려준다.**

English (internal reference only):  
*Before you open the app, your zodiac companion waits with you for a short pause.*

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

## 7. Phase 1 goal (P1)

Ship a **working, deployable** mobile web experience where a user can:

1. Complete onboarding: **target app** + **zodiac companion** (sign or birthday).
2. See personalized home copy for their app and zodiac friend.
3. Start a short pause (default 5 min) before opening the target app.
4. Complete the pause and earn EXP with zodiac-specific encouragement.
5. See streak, total pause minutes, and session count.
6. Give up mid-session with **gentle** zodiac comfort copy (no shame).
7. Return later with settings and progress saved (`localStorage`).

Success = users feel a **personal companion** helps them pause before distracting apps, without guilt or astrology overload.

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
| 1 | **Onboarding — target app** | User picks app to use less (presets + custom name) |
| 2 | **Onboarding — zodiac companion** | Select sign **or** enter birthday → computed sign |
| 3 | **Onboarding — reveal** | Show companion personality + pause intention (not fortune content) |
| 4 | **Select pause duration** | Preset chips: 5 / 10 / 15 / 25 min (default 5) |
| 5 | **Start timer** | Countdown for selected duration |
| 6 | **Zodiac pet during pause** | Companion emoji + sign-specific Korean messages on home / active / success / give-up |
| 7 | **Complete session** | Celebration UI, grant EXP, update stats |
| 8 | **Save local progress** | `pause-pet-state` + `pause-pet-settings` in `localStorage` |
| 9 | **Pet EXP** | EXP on successful completion; simple level display |
| 10 | **Stats** | Streak, total pause minutes, session count |
| 11 | **Give-up flow** | Gentle zodiac comfort copy; no EXP for incomplete session |
| 12 | **Korean UX copy** | Warm companion tone; not an astrology app |

---

## 10. Out of scope (Phase 1)

- Native app blocking
- iOS / Android native apps
- User accounts
- Backend / Supabase
- Payments
- Social / community
- AI personalization
- Push notifications (see **Phase 2+ roadmap**)
- Real-time sync across devices
- Leaderboards
- Complex pet customization shop
- Background timer when tab is fully closed (best-effort only; document limitation)

---

## 11. Core user flows

### 11.1 First visit (happy path)

1. User opens app → **Target app selection** onboarding.
2. **Zodiac setup** — select sign or enter birthday.
3. **Companion reveal** — personality + “5분만 같이 있어줄게요” for chosen app.
4. **Home** — zodiac friend waiting + **별자리 친구와 5분 멈추기**.
5. **Active pause** — timer + zodiac-specific focus message.
6. Timer reaches 0 → **Success** — urge passed, companion grew closer, EXP.
7. User continues or returns home; stats persisted.

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

### 15.1 Progress — `pause-pet-state`

Session history, pet EXP/level, streak, total pause minutes. See `lib/storage.ts`.

### 15.2 User settings — `pause-pet-settings`

```ts
export type ZodiacSign =
  | "aries" | "taurus" | "gemini" | "cancer" | "leo" | "virgo"
  | "libra" | "scorpio" | "sagittarius" | "capricorn" | "aquarius" | "pisces";

export type UserSettings = {
  hasCompletedOnboarding: boolean;
  targetAppName: string;
  defaultPauseMinutes: 5 | 10 | 15 | 25;
  zodiacSign: ZodiacSign;
  birthdayMonth?: number;
  birthdayDay?: number;
};
```

Zodiac companion copy and emoji: `lib/zodiac.ts` (personality + per-screen messages; not daily fortunes).

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

- **Browser notification** after pause completion
- **PWA install prompt** on repeat visits
- **Native app detection / blocking** (OS-level or companion app)
- Native iOS/Android shells
- Accounts and cloud sync
- More pet animations (beyond emoji/CSS)
- Social sharing of streaks

---

*Last updated: P1 app-reduction companion with target app + zodiac onboarding.*
