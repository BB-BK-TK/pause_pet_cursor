import type { AllowedDurationMinutes } from "./types";
import { isZodiacSign, type ZodiacSign } from "./zodiac";

export const SETTINGS_STORAGE_KEY = "pause-pet-settings";

export type UserSettings = {
  hasCompletedOnboarding: boolean;
  targetAppName: string;
  defaultPauseMinutes: AllowedDurationMinutes;
  zodiacSign: ZodiacSign;
  birthdayMonth?: number;
  birthdayDay?: number;
};

export type OnboardingCompletePayload = {
  targetAppName: string;
  zodiacSign: ZodiacSign;
  defaultPauseMinutes?: AllowedDurationMinutes;
  birthdayMonth?: number;
  birthdayDay?: number;
};

export function createDefaultSettings(): UserSettings {
  return {
    hasCompletedOnboarding: false,
    targetAppName: "",
    defaultPauseMinutes: 5,
    zodiacSign: "gemini",
  };
}

const VALID_DURATIONS = new Set<AllowedDurationMinutes>([5, 10, 15, 30]);

function isValidDuration(value: number): value is AllowedDurationMinutes {
  return VALID_DURATIONS.has(value as AllowedDurationMinutes);
}

function normalizeSettings(raw: unknown): UserSettings {
  const fallback = createDefaultSettings();

  if (!raw || typeof raw !== "object") {
    return fallback;
  }

  const data = raw as Record<string, unknown>;
  const defaultPauseMinutes =
    typeof data.defaultPauseMinutes === "number" &&
    isValidDuration(data.defaultPauseMinutes)
      ? data.defaultPauseMinutes
      : 5;

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
    defaultPauseMinutes,
    zodiacSign,
    birthdayMonth,
    birthdayDay,
  };
}

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function loadUserSettings(): UserSettings {
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

export function completeOnboarding(
  payload: OnboardingCompletePayload,
): UserSettings {
  const settings: UserSettings = {
    hasCompletedOnboarding: true,
    targetAppName: payload.targetAppName.trim(),
    defaultPauseMinutes: payload.defaultPauseMinutes ?? 5,
    zodiacSign: payload.zodiacSign,
  };

  if (payload.birthdayMonth !== undefined) {
    settings.birthdayMonth = payload.birthdayMonth;
  }
  if (payload.birthdayDay !== undefined) {
    settings.birthdayDay = payload.birthdayDay;
  }

  return settings;
}
