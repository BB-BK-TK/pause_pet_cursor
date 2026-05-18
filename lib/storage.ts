import { localYmd, yesterdayYmd } from "./date";

export const STORAGE_KEY = "pause-pet-state";

const MAX_STORED_SESSIONS = 50;
const EXP_PER_LEVEL = 100;

export type FocusSession = {
  id: string;
  durationMinutes: number;
  completedAt: string;
};

export type PausePetState = {
  completedSessions: FocusSession[];
  totalFocusMinutes: number;
  streak: number;
  petExp: number;
  petLevel: number;
  lastCompletedDate: string | null;
};

export type SessionCompletionResult = {
  state: PausePetState;
  session: FocusSession;
  expGained: number;
};

/** Default state when localStorage is missing or invalid. */
export function createDefaultState(): PausePetState {
  return {
    completedSessions: [],
    totalFocusMinutes: 0,
    streak: 0,
    petExp: 0,
    petLevel: 1,
    lastCompletedDate: null,
  };
}

/** EXP from focus duration: 5 EXP per 5 minutes, minimum 5. */
export function expForDuration(durationMinutes: number): number {
  return Math.max(5, Math.floor(durationMinutes / 5) * 5);
}

/** Pet level from total EXP. */
export function levelFromExp(petExp: number): number {
  return Math.floor(petExp / EXP_PER_LEVEL) + 1;
}

/** Streak after a successful completion on `today` (local calendar day). */
export function computeStreak(
  currentStreak: number,
  lastCompletedDate: string | null,
  today: string = localYmd(),
): number {
  if (lastCompletedDate === today) {
    return currentStreak > 0 ? currentStreak : 1;
  }
  if (lastCompletedDate === yesterdayYmd()) {
    return currentStreak + 1;
  }
  return 1;
}

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function createSessionId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `session-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function normalizeSession(raw: unknown): FocusSession | null {
  if (!raw || typeof raw !== "object") {
    return null;
  }

  const session = raw as Partial<FocusSession>;
  if (
    typeof session.id !== "string" ||
    typeof session.durationMinutes !== "number" ||
    typeof session.completedAt !== "string" ||
    !Number.isFinite(session.durationMinutes) ||
    session.durationMinutes <= 0
  ) {
    return null;
  }

  return {
    id: session.id,
    durationMinutes: session.durationMinutes,
    completedAt: session.completedAt,
  };
}

function normalizeState(raw: unknown): PausePetState {
  const fallback = createDefaultState();

  if (!raw || typeof raw !== "object") {
    return fallback;
  }

  const data = raw as Record<string, unknown>;

  if (!Array.isArray(data.completedSessions)) {
    return migrateLegacyState(data);
  }

  const completedSessions = data.completedSessions
    .map(normalizeSession)
    .filter((session): session is FocusSession => session !== null);

  const petExp = typeof data.petExp === "number" ? Math.max(0, data.petExp) : 0;

  return {
    completedSessions,
    totalFocusMinutes:
      typeof data.totalFocusMinutes === "number"
        ? Math.max(0, data.totalFocusMinutes)
        : 0,
    streak: typeof data.streak === "number" ? Math.max(0, data.streak) : 0,
    petExp,
    petLevel: levelFromExp(petExp),
    lastCompletedDate:
      typeof data.lastCompletedDate === "string" ? data.lastCompletedDate : null,
  };
}

function migrateLegacyState(data: Record<string, unknown>): PausePetState {
  const state = createDefaultState();

  if (typeof data.pauses !== "number" || data.pauses <= 0) {
    return state;
  }

  const count = Math.min(data.pauses, 20);
  for (let i = 0; i < count; i++) {
    state.completedSessions.push({
      id: `legacy-${i}`,
      durationMinutes: 15,
      completedAt: new Date(Date.now() - i * 86_400_000).toISOString(),
    });
  }

  state.totalFocusMinutes = count * 15;
  state.petExp = count * 15;
  state.petLevel = levelFromExp(state.petExp);
  state.streak = 1;
  state.lastCompletedDate = localYmd();

  return state;
}

function parseStoredJson(raw: string): PausePetState {
  try {
    return normalizeState(JSON.parse(raw) as unknown);
  } catch {
    return createDefaultState();
  }
}

/**
 * Load state from localStorage. Safe during SSR — returns default state on the server.
 */
export function loadPausePetState(): PausePetState {
  if (!isBrowser()) {
    return createDefaultState();
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return createDefaultState();
  }

  return parseStoredJson(raw);
}

/**
 * Persist state to localStorage. No-op during SSR.
 */
export function savePausePetState(state: PausePetState): void {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

/**
 * Pure update: record a completed focus session and return the new state.
 */
export function completeFocusSession(
  state: PausePetState,
  durationMinutes: number,
  completedAt: string = new Date().toISOString(),
): SessionCompletionResult {
  const today = localYmd(new Date(completedAt));
  const expGained = expForDuration(durationMinutes);

  const session: FocusSession = {
    id: createSessionId(),
    durationMinutes,
    completedAt,
  };

  const petExp = state.petExp + expGained;
  const streak = computeStreak(state.streak, state.lastCompletedDate, today);

  const nextState: PausePetState = {
    completedSessions: [session, ...state.completedSessions].slice(
      0,
      MAX_STORED_SESSIONS,
    ),
    totalFocusMinutes: state.totalFocusMinutes + durationMinutes,
    streak,
    petExp,
    petLevel: levelFromExp(petExp),
    lastCompletedDate: today,
  };

  return { state: nextState, session, expGained };
}
