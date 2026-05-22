import { localYmd } from "./date";
import { isZodiacSign, type ZodiacSign } from "./zodiac";

export const STATE_STORAGE_KEY = "pause-pet-state";
export const SETTINGS_STORAGE_KEY = "pause-pet-settings";

/** @deprecated Use STATE_STORAGE_KEY */
export const STORAGE_KEY = STATE_STORAGE_KEY;

const MAX_RECENT_EVENTS = 20;
const PREVENT_EXP_GAIN = 5;
const EXP_PER_LEVEL = 30;

const VALID_PAUSE_MINUTES = new Set([5, 10, 15, 30]);

export type PauseEventType = "prevented" | "allowed" | "returned" | "extended";

export type PauseEvent = {
  id: string;
  type: PauseEventType;
  targetAppName: string;
  minutes?: number;
  createdAt: string;
};

export type UserSettings = {
  hasCompletedOnboarding: boolean;
  targetAppName: string;
  defaultPauseMinutes: number;
  zodiacSign: ZodiacSign;
  birthdayMonth?: number;
  birthdayDay?: number;
};

export type PausePetState = {
  preventedCount: number;
  todayPreventedCount: number;
  estimatedSavedMinutes: number;
  petExp: number;
  petLevel: number;
  recentEvents: PauseEvent[];
  lastActiveDate: string | null;
};

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function createEventId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `evt-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function calculatePetLevel(exp: number): number {
  return Math.floor(Math.max(0, exp) / EXP_PER_LEVEL) + 1;
}

/** @deprecated Use calculatePetLevel */
export function levelFromExp(petExp: number): number {
  return calculatePetLevel(petExp);
}

export function createDefaultSettings(): UserSettings {
  return {
    hasCompletedOnboarding: false,
    targetAppName: "",
    defaultPauseMinutes: 5,
    zodiacSign: "gemini",
  };
}

export function createDefaultState(): PausePetState {
  return {
    preventedCount: 0,
    todayPreventedCount: 0,
    estimatedSavedMinutes: 0,
    petExp: 0,
    petLevel: 1,
    recentEvents: [],
    lastActiveDate: null,
  };
}

function normalizePauseMinutes(value: unknown): number {
  if (typeof value === "number" && VALID_PAUSE_MINUTES.has(value)) {
    return value;
  }
  return 5;
}

function normalizeSettings(raw: unknown): UserSettings {
  const fallback = createDefaultSettings();
  if (!raw || typeof raw !== "object") {
    return fallback;
  }

  const data = raw as Record<string, unknown>;
  const zodiacSign =
    typeof data.zodiacSign === "string" && isZodiacSign(data.zodiacSign)
      ? data.zodiacSign
      : fallback.zodiacSign;

  const birthdayMonth =
    typeof data.birthdayMonth === "number" &&
    Number.isInteger(data.birthdayMonth) &&
    data.birthdayMonth >= 1 &&
    data.birthdayMonth <= 12
      ? data.birthdayMonth
      : undefined;

  const birthdayDay =
    typeof data.birthdayDay === "number" &&
    Number.isInteger(data.birthdayDay) &&
    data.birthdayDay >= 1 &&
    data.birthdayDay <= 31
      ? data.birthdayDay
      : undefined;

  return {
    hasCompletedOnboarding: data.hasCompletedOnboarding === true,
    targetAppName:
      typeof data.targetAppName === "string" ? data.targetAppName.trim() : "",
    defaultPauseMinutes: normalizePauseMinutes(data.defaultPauseMinutes),
    zodiacSign,
    birthdayMonth,
    birthdayDay,
  };
}

function normalizeEvent(raw: unknown): PauseEvent | null {
  if (!raw || typeof raw !== "object") {
    return null;
  }
  const e = raw as Partial<PauseEvent>;
  const types: PauseEventType[] = [
    "prevented",
    "allowed",
    "returned",
    "extended",
  ];
  if (
    typeof e.id !== "string" ||
    !types.includes(e.type as PauseEventType) ||
    typeof e.targetAppName !== "string" ||
    typeof e.createdAt !== "string"
  ) {
    return null;
  }
  return {
    id: e.id,
    type: e.type as PauseEventType,
    targetAppName: e.targetAppName,
    minutes: typeof e.minutes === "number" ? e.minutes : undefined,
    createdAt: e.createdAt,
  };
}

function applyTodayReset(state: PausePetState, today: string): PausePetState {
  if (state.lastActiveDate === today) {
    return state;
  }
  return {
    ...state,
    todayPreventedCount: 0,
    lastActiveDate: today,
  };
}

function withPetLevel(state: PausePetState): PausePetState {
  return {
    ...state,
    petLevel: calculatePetLevel(state.petExp),
  };
}

function migrateLegacyState(data: Record<string, unknown>): PausePetState {
  const today = localYmd();
  const petExp =
    typeof data.petExp === "number"
      ? Math.max(0, data.petExp)
      : typeof data.pauses === "number"
        ? Math.min(data.pauses, 20) * PREVENT_EXP_GAIN
        : 0;

  let preventedCount = 0;
  let estimatedSavedMinutes = 0;
  const events: PauseEvent[] = [];

  if (Array.isArray(data.completedSessions)) {
    for (const raw of data.completedSessions) {
      if (!raw || typeof raw !== "object") continue;
      const s = raw as Record<string, unknown>;
      if (
        typeof s.durationMinutes === "number" &&
        typeof s.completedAt === "string"
      ) {
        preventedCount += 1;
        estimatedSavedMinutes += s.durationMinutes;
        events.push({
          id: typeof s.id === "string" ? s.id : createEventId(),
          type: "prevented",
          targetAppName: "앱",
          minutes: s.durationMinutes,
          createdAt: s.completedAt,
        });
      }
    }
  } else if (typeof data.pauses === "number" && data.pauses > 0) {
    preventedCount = Math.min(data.pauses, 20);
    estimatedSavedMinutes = preventedCount * 5;
  }

  if (typeof data.preventedCount === "number") {
    preventedCount = Math.max(0, data.preventedCount);
  }
  if (typeof data.estimatedSavedMinutes === "number") {
    estimatedSavedMinutes = Math.max(0, data.estimatedSavedMinutes);
  }
  if (Array.isArray(data.recentEvents)) {
    const migrated = data.recentEvents
      .map(normalizeEvent)
      .filter((e): e is PauseEvent => e !== null);
    if (migrated.length > 0) {
      events.splice(0, events.length, ...migrated);
    }
  }

  const todayPrevented =
    typeof data.todayPreventedCount === "number"
      ? Math.max(0, data.todayPreventedCount)
      : events.filter(
          (e) =>
            e.type === "prevented" && localYmd(new Date(e.createdAt)) === today,
        ).length;

  return withPetLevel(
    applyTodayReset(
      {
        preventedCount,
        todayPreventedCount: todayPrevented,
        estimatedSavedMinutes,
        petExp,
        petLevel: 1,
        recentEvents: events.slice(0, MAX_RECENT_EVENTS),
        lastActiveDate:
          typeof data.lastActiveDate === "string" ? data.lastActiveDate : today,
      },
      today,
    ),
  );
}

function normalizeState(raw: unknown): PausePetState {
  const fallback = createDefaultState();
  if (!raw || typeof raw !== "object") {
    return fallback;
  }

  const data = raw as Record<string, unknown>;

  if (
    !("preventedCount" in data) &&
    ("completedSessions" in data || "pauses" in data)
  ) {
    return migrateLegacyState(data);
  }

  const petExp = typeof data.petExp === "number" ? Math.max(0, data.petExp) : 0;
  const recentEvents = Array.isArray(data.recentEvents)
    ? data.recentEvents
        .map(normalizeEvent)
        .filter((e): e is PauseEvent => e !== null)
        .slice(0, MAX_RECENT_EVENTS)
    : [];

  return withPetLevel(
    applyTodayReset(
      {
        preventedCount:
          typeof data.preventedCount === "number"
            ? Math.max(0, data.preventedCount)
            : 0,
        todayPreventedCount:
          typeof data.todayPreventedCount === "number"
            ? Math.max(0, data.todayPreventedCount)
            : 0,
        estimatedSavedMinutes:
          typeof data.estimatedSavedMinutes === "number"
            ? Math.max(0, data.estimatedSavedMinutes)
            : 0,
        petExp,
        petLevel: 1,
        recentEvents,
        lastActiveDate:
          typeof data.lastActiveDate === "string" ? data.lastActiveDate : null,
      },
      localYmd(),
    ),
  );
}

export function getUserSettings(): UserSettings {
  if (!isBrowser()) {
    return createDefaultSettings();
  }

  const raw = window.localStorage.getItem(SETTINGS_STORAGE_KEY);
  if (!raw) {
    return createDefaultSettings();
  }

  try {
    return normalizeSettings(JSON.parse(raw) as unknown);
  } catch {
    return createDefaultSettings();
  }
}

export function saveUserSettings(settings: UserSettings): void {
  if (!isBrowser()) {
    return;
  }
  window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
}

export function getPausePetState(): PausePetState {
  if (!isBrowser()) {
    return createDefaultState();
  }

  const raw = window.localStorage.getItem(STATE_STORAGE_KEY);
  if (!raw) {
    return createDefaultState();
  }

  try {
    return normalizeState(JSON.parse(raw) as unknown);
  } catch {
    return createDefaultState();
  }
}

export function savePausePetState(state: PausePetState): void {
  if (!isBrowser()) {
    return;
  }
  window.localStorage.setItem(
    STATE_STORAGE_KEY,
    JSON.stringify(withPetLevel(state)),
  );
}

export function resetPausePetData(): {
  settings: UserSettings;
  state: PausePetState;
} {
  const settings = createDefaultSettings();
  const state = createDefaultState();

  if (isBrowser()) {
    window.localStorage.removeItem(STATE_STORAGE_KEY);
    window.localStorage.removeItem(SETTINGS_STORAGE_KEY);
  }

  return { settings, state };
}

/** @deprecated Use resetPausePetData */
export function resetPausePetState(): PausePetState {
  return resetPausePetData().state;
}

/** @deprecated Use getPausePetState */
export function loadPausePetState(): PausePetState {
  return getPausePetState();
}

/** @deprecated Use getUserSettings */
export function loadUserSettings(): UserSettings {
  return getUserSettings();
}

function pushEvent(
  state: PausePetState,
  event: Omit<PauseEvent, "id" | "createdAt"> & { createdAt?: string },
): PausePetState {
  const full: PauseEvent = {
    id: createEventId(),
    createdAt: event.createdAt ?? new Date().toISOString(),
    type: event.type,
    targetAppName: event.targetAppName,
    minutes: event.minutes,
  };
  return {
    ...state,
    recentEvents: [full, ...state.recentEvents].slice(0, MAX_RECENT_EVENTS),
  };
}

export function addPreventedEvent(targetAppName: string): PausePetState {
  const settings = getUserSettings();
  const today = localYmd();
  const base = applyTodayReset(getPausePetState(), today);
  const savedMinutes = settings.defaultPauseMinutes;
  const petExp = base.petExp + PREVENT_EXP_GAIN;

  const next = withPetLevel(
    pushEvent(
      {
        ...base,
        preventedCount: base.preventedCount + 1,
        todayPreventedCount: base.todayPreventedCount + 1,
        estimatedSavedMinutes: base.estimatedSavedMinutes + savedMinutes,
        petExp,
        lastActiveDate: today,
      },
      { type: "prevented", targetAppName, minutes: savedMinutes },
    ),
  );

  savePausePetState(next);
  return next;
}

export function addAllowedEvent(
  targetAppName: string,
  minutes: number,
): PausePetState {
  const today = localYmd();
  const next = pushEvent(applyTodayReset(getPausePetState(), today), {
    type: "allowed",
    targetAppName,
    minutes,
  });
  savePausePetState(next);
  return next;
}

export function addReturnedEvent(targetAppName: string): PausePetState {
  const today = localYmd();
  const next = pushEvent(applyTodayReset(getPausePetState(), today), {
    type: "returned",
    targetAppName,
  });
  savePausePetState(next);
  return next;
}

export function addExtendedEvent(
  targetAppName: string,
  minutes: number,
): PausePetState {
  const today = localYmd();
  const next = pushEvent(applyTodayReset(getPausePetState(), today), {
    type: "extended",
    targetAppName,
    minutes,
  });
  savePausePetState(next);
  return next;
}

/** @deprecated Use addPreventedEvent */
export type PreventedResult = { state: PausePetState; expGained: number };

/** @deprecated Use addPreventedEvent */
export function recordPrevented(
  state: PausePetState,
  targetAppName: string,
  _savedMinutes?: number,
): PreventedResult {
  savePausePetState(state);
  const next = addPreventedEvent(targetAppName);
  return { state: next, expGained: PREVENT_EXP_GAIN };
}

/** @deprecated Use addAllowedEvent */
export function recordAllowed(
  state: PausePetState,
  targetAppName: string,
  minutes: number,
): PausePetState {
  savePausePetState(state);
  return addAllowedEvent(targetAppName, minutes);
}

/** @deprecated Use addReturnedEvent */
export function recordReturned(
  state: PausePetState,
  targetAppName: string,
): PausePetState {
  savePausePetState(state);
  return addReturnedEvent(targetAppName);
}

/** @deprecated Use addExtendedEvent */
export function recordExtended(
  state: PausePetState,
  targetAppName: string,
  minutes: number,
): PausePetState {
  savePausePetState(state);
  return addExtendedEvent(targetAppName, minutes);
}

export function eventLabel(event: PauseEvent): string {
  switch (event.type) {
    case "prevented":
      return `${event.targetAppName} 안 열기`;
    case "allowed":
      return `${event.targetAppName} ${event.minutes ?? 0}분 보기`;
    case "returned":
      return `${event.targetAppName}에서 돌아옴`;
    case "extended":
      return `${event.minutes ?? 0}분 더 보기`;
    default:
      return event.targetAppName;
  }
}
