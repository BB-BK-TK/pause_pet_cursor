import { localYmd } from "./date";

export const STORAGE_KEY = "pause-pet-state";

const MAX_RECENT_EVENTS = 30;
const EXP_PER_LEVEL = 100;
const PREVENT_EXP_GAIN = 5;

export type PauseEventType = "prevented" | "allowed" | "returned" | "extended";

export type PauseEvent = {
  id: string;
  type: PauseEventType;
  targetAppName: string;
  minutes?: number;
  createdAt: string;
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

export type PreventedResult = {
  state: PausePetState;
  expGained: number;
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

export function levelFromExp(petExp: number): number {
  return Math.floor(petExp / EXP_PER_LEVEL) + 1;
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

function migrateLegacyState(data: Record<string, unknown>): PausePetState {
  const state = createDefaultState();
  const today = localYmd();

  const petExp =
    typeof data.petExp === "number"
      ? Math.max(0, data.petExp)
      : typeof data.pauses === "number"
        ? Math.min(data.pauses, 20) * 5
        : 0;

  let preventedCount = 0;
  let estimatedSavedMinutes = 0;
  const events: PauseEvent[] = [];

  if (Array.isArray(data.completedSessions)) {
    for (const raw of data.completedSessions) {
      if (!raw || typeof raw !== "object") {
        continue;
      }
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

  return applyTodayReset(
    {
      preventedCount,
      todayPreventedCount: todayPrevented,
      estimatedSavedMinutes,
      petExp,
      petLevel: levelFromExp(petExp),
      recentEvents: events.slice(0, MAX_RECENT_EVENTS),
      lastActiveDate:
        typeof data.lastActiveDate === "string" ? data.lastActiveDate : today,
    },
    today,
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

  const base: PausePetState = {
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
    petLevel: levelFromExp(petExp),
    recentEvents,
    lastActiveDate:
      typeof data.lastActiveDate === "string" ? data.lastActiveDate : null,
  };

  return applyTodayReset(base, localYmd());
}

export function loadPausePetState(): PausePetState {
  if (!isBrowser()) {
    return createDefaultState();
  }
  const raw = window.localStorage.getItem(STORAGE_KEY);
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
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
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

/** User chose not to open the app — primary intervention win. */
export function recordPrevented(
  state: PausePetState,
  targetAppName: string,
  savedMinutes: number,
): PreventedResult {
  const today = localYmd();
  const base = applyTodayReset(state, today);
  const expGained = PREVENT_EXP_GAIN;
  const petExp = base.petExp + expGained;

  const next = pushEvent(
    {
      ...base,
      preventedCount: base.preventedCount + 1,
      todayPreventedCount: base.todayPreventedCount + 1,
      estimatedSavedMinutes: base.estimatedSavedMinutes + savedMinutes,
      petExp,
      petLevel: levelFromExp(petExp),
      lastActiveDate: today,
    },
    { type: "prevented", targetAppName, minutes: savedMinutes },
  );

  return { state: next, expGained };
}

export function recordAllowed(
  state: PausePetState,
  targetAppName: string,
  minutes: number,
): PausePetState {
  const today = localYmd();
  return pushEvent(applyTodayReset(state, today), {
    type: "allowed",
    targetAppName,
    minutes,
  });
}

export function recordReturned(
  state: PausePetState,
  targetAppName: string,
): PausePetState {
  const today = localYmd();
  return pushEvent(applyTodayReset(state, today), {
    type: "returned",
    targetAppName,
  });
}

export function recordExtended(
  state: PausePetState,
  targetAppName: string,
  minutes: number,
): PausePetState {
  const today = localYmd();
  return pushEvent(applyTodayReset(state, today), {
    type: "extended",
    targetAppName,
    minutes,
  });
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
