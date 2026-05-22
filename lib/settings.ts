import type { AllowedDurationMinutes } from "./types";
import {
  createDefaultSettings,
  getUserSettings,
  saveUserSettings,
  type UserSettings,
} from "./storage";
import type { ZodiacSign } from "./zodiac";

export type { UserSettings } from "./storage";
export {
  SETTINGS_STORAGE_KEY,
  createDefaultSettings,
  getUserSettings,
  saveUserSettings,
} from "./storage";

/** @deprecated Use getUserSettings */
export const loadUserSettings = getUserSettings;

export type OnboardingCompletePayload = {
  targetAppName: string;
  zodiacSign: ZodiacSign;
  defaultPauseMinutes?: AllowedDurationMinutes;
  birthdayMonth?: number;
  birthdayDay?: number;
};

export function resetOnboarding(): UserSettings {
  return createDefaultSettings();
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

  saveUserSettings(settings);
  return settings;
}
