# Pause Pet — Design Direction (Phase 1)

## 0. Document purpose

This document defines **UX, visual, and copy direction** for Pause Pet Phase 1 (focus timer + emotional pet).

Agents must read this before UI work, copy changes, or component styling.

Related:

- `/docs/PRD.md` — features and rules
- `/docs/tasks.md` — build order
- `/docs/DEV_NOTES.md` — implementation notes

Do not repeat this document in prompts; reference the file path.

---

## 1. Design goal

Pause Pet is **not** a productivity dashboard.

It is a **Korean-first, mobile-first focus companion** where a cute pet waits with the user during focus time.

The app should feel:

- **Korean-native** (not translated English)
- **Cute but not childish**
- **Calm** — low anxiety, low friction
- **Soft emotional support** — companion, not coach
- **Minimal friction** — few taps to start focusing
- **Mobile-first** — phone in hand, one thumb

Product feeling:

> 작은 펫이 옆에서 “천천히 해도 돼”라고 말해주는 집중 공간.

---

## 2. What to avoid vs. aim for

### Avoid

- Enterprise / SaaS dashboard aesthetics
- Dense charts, leaderboards, KPI walls
- Harsh copy: 실패, 망함, 중독, 금지, 차단, 의지력 부족
- Parental-control or surveillance vibes
- Over-gamified RPG UI (inventory, gacha, battle stats)
- Infantile baby-talk or excessive emoji spam
- English-first labels in the UI

### Aim for

- Cozy mobile companion app (Korean consumer app sensibility)
- **Pet as emotional center** — larger and warmer than stat numbers
- **Large timer** during focus — hero element
- Rounded cards, soft surfaces, generous whitespace
- Clear one primary action per screen
- Celebration that feels warm, not loud

---

## 3. Product personality

| Trait | Description | Example copy |
|-------|-------------|--------------|
| Warm | Encourages without pressure | `펫이 옆에서 기다리고 있어요.` |
| Gentle | No shame on give-up | `오늘은 여기까지도 괜찮아요.` |
| Calm | Reduces focus anxiety | `천천히 해도 괜찮아요.` |
| Rewarding | Small wins matter | `잘했어요! 같이 집중했어요.` |
| Native Korean | Natural phrasing | Avoid literal EN calques |

Light wit is OK; scolding is not.

---

## 4. Tone and manner

### Do not say

- `집중 실패`
- `오늘도 망했어요`
- `의지력이 부족해요`
- `앱 사용을 차단합니다`
- `중독`
- `너무 많이 썼어요`

### Prefer

- `같이 집중해볼까요?`
- `천천히 해도 괜찮아요.`
- `오늘은 여기까지도 괜찮아요.`
- `다음에 다시 같이 해봐요.`
- `작은 집중이 쌓이고 있어요.`

---

## 5. UX principles

### 5.1 One primary action per screen

| Screen | Primary action |
|--------|----------------|
| Home | `집중 시작` |
| Focus | (implicit: stay; timer is hero) |
| Complete | `홈으로` |
| Give-up | `홈으로` |
| Onboarding (if used) | `시작하기` |

Secondary actions (e.g. give-up) must be visually **quieter** than primary completion path.

### 5.2 Pet before numbers

On Home:

1. Pet visual + name / level
2. Short emotional line
3. Duration picker
4. Primary CTA
5. Stats (streak, minutes, sessions) — compact, not dashboard-heavy

On Complete:

1. Happy pet
2. Praise copy
3. EXP gain
4. Brief stats
5. CTA

### 5.3 Large timer during focus

- Timer is the **largest typographic element** on screen.
- Use tabular/monospace numerals if available.
- Background calmer than Home (fewer elements).
- No bottom nav during active focus.

### 5.4 Gentle give-up

- Give-up control: text button or soft secondary style — not red “FAIL”.
- Confirm step optional; copy must stay kind.
- Never show negative streak animation on give-up.

### 5.5 Mobile-first

- Target width: **360–430px**; center column on desktop preview.
- Minimum tap target ~**44px** height.
- Full-width primary buttons.
- Avoid horizontal scroll.
- Safe-area padding for notched phones (`pb-safe` pattern if needed).

### 5.6 Low friction to start

- User should reach running timer in **≤2 taps** from Home (select duration → start).
- Remember last selected duration in `localStorage` (nice-to-have, not blocking).

---

## 6. Visual style

### Palette (suggested — Tailwind-friendly)

| Role | Direction |
|------|-----------|
| Background | Warm cream / soft amber-50 (`bg-amber-50`) |
| Surface cards | White or warm white, `rounded-2xl`, light border |
| Primary CTA | Soft amber / peach (`amber-500` hover `amber-600`) |
| Text primary | Stone-800 / stone-900 |
| Text secondary | Stone-500 |
| Accent | Muted lavender or mint for EXP bar (optional) |

No strict hex lock-in; keep **warm + calm**.

### Typography

- Korean-friendly sans stack (system UI or project font).
- Headlines: semibold, clear hierarchy.
- Timer: very large (e.g. `text-6xl` or `text-7xl`), bold or semibold.

### Components

- **Cards:** `rounded-2xl`, padding `p-6`+, soft shadow or border.
- **Buttons:** `rounded-xl` or `rounded-2xl`, full width on mobile.
- **Stats:** small labeled chips or 3-column row — not full analytics grid.

### Motion (Phase 1)

- Subtle CSS only: pet idle bounce, gentle pulse on timer last minute optional.
- No heavy animation libraries required.
- Complete screen: simple scale/fade-in acceptable.

---

## 7. Pet visual direction

Phase 1: **emoji or simple CSS illustration** is acceptable.

### Pet states

| State | When | Visual direction |
|-------|------|------------------|
| `idle` | Home, not in session | Relaxed, welcoming |
| `waiting` | Focus screen | Patient, “sitting with you” |
| `happy` | Complete screen | Celebratory, brighter |
| `comfort` | Give-up screen | Soft, not sad-angry |

Example emoji progression (replace with art later):

- Idle: 🐱
- Waiting: 😺 or 🐾
- Happy: 😸
- Comfort: 🐱💤

### EXP / level

- Thin EXP bar under pet name optional.
- Level label: `Lv.{n}` — small, not RPG-heavy.

---

## 8. Screen-specific design

### 8.1 Home

**Layout (top → bottom)**

1. Header: product name or short greeting
2. Pet card (centered, largest visual)
3. Duration chips (horizontal scroll or 2×2 grid)
4. Primary CTA
5. Stats row (3 items: streak, minutes, sessions)

**Empty state (first visit)**

- Same layout; stats show `0`; copy still welcoming.

### 8.2 Focus

**Layout**

1. Optional slim top: session label `집중 중`
2. **Timer (center, dominant)**
3. Pet `waiting` below or beside timer
4. One supportive sentence
5. Give-up link at bottom with margin

**Timer format:** `MM:SS` always; pad minutes.

**Last 60 seconds (optional polish)**

- Slightly warmer subcopy: `거의 다 왔어요.`

### 8.3 Complete

**Layout**

1. Happy pet (larger than Home)
2. Headline + subcopy
3. EXP badge: `+25 EXP`
4. Mini stat deltas (optional): `총 120분 집중`
5. `홈으로` button

Feel: **warm glow**, not fireworks explosion.

### 8.4 Give-up

**Layout**

1. Comfort pet
2. 2 lines max of copy
3. `홈으로` only — no guilt CTA

### 8.5 Onboarding (optional)

- One screen, pet + MVP promise line + `시작하기`.
- No carousel.

---

## 9. Korean copy bank

Use these as defaults; adjust in code via constants file.

### Home

| Key | Copy |
|-----|------|
| greeting | `오늘도 같이 집중해볼까요?` |
| sub | `작은 펫이 옆에서 기다릴게요.` |
| cta | `집중 시작` |
| streak | `연속 {n}일` |
| minutes | `총 {n}분 집중` |
| sessions | `완료 {n}회` |
| duration label | `집중 시간 선택` |

### Focus

| Key | Copy |
|-----|------|
| status | `집중 중` |
| support | `천천히 해도 괜찮아요. 펫이 기다리고 있어요.` |
| almost done | `거의 다 왔어요.` |
| give up | `그만할게요` |

### Give-up confirm (optional)

| Key | Copy |
|-----|------|
| title | `집중을 마칠까요?` |
| body | `괜찮아요. 쉬었다가 다시 시작하면 돼요.` |
| confirm | `네, 마칠게요` |
| cancel | `계속 집중하기` |

### Complete

| Key | Copy |
|-----|------|
| title | `잘했어요! 같이 집중했어요.` |
| sub | `오늘의 집중이 펫에게 힘이 됐어요.` |
| exp | `+{n} EXP` |
| cta | `홈으로` |

### Give-up result

| Key | Copy |
|-----|------|
| title | `오늘은 여기까지도 괜찮아요.` |
| sub | `다음에 다시 같이 해봐요.` |
| cta | `홈으로` |

### Onboarding (optional)

| Key | Copy |
|-----|------|
| promise | `집중하는 동안 혼자가 아니라, 작은 펫이 같이 기다려준다.` |
| cta | `시작하기` |

---

## 10. Layout and app shell

- Max content width: `max-w-md` centered.
- Page background: warm neutral.
- **No bottom nav during `focus` screen.**
- Bottom nav optional for Home / stats later — not required for MVP if single-flow router suffices.

---

## 11. Accessibility and readability

- Timer must meet contrast on background.
- Do not rely on color alone for selection state (add border/ring on selected duration chip).
- Buttons need visible focus ring.
- Prefer `aria-live="polite"` on timer region when feasible.

---

## 12. Design QA checklist

Before marking UI done:

- [ ] First-time user understands app in **≤5 seconds**
- [ ] Pet is visually central on Home and Focus
- [ ] Timer is the largest element on Focus
- [ ] Korean copy sounds native, not translated
- [ ] Give-up path has **no shaming** words
- [ ] Complete screen feels rewarding, not childish
- [ ] Stats are visible but not dashboard-dominant
- [ ] Works at 360px width without clipping
- [ ] Primary buttons are easy to tap one-handed
- [ ] Would look OK as a phone screenshot for user tests

---

*Last updated: Phase 1 focus-timer MVP direction.*
