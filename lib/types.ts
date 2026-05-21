export type AllowedDurationMinutes = 5 | 10 | 15 | 30;

export type ScreenName =
  | "onboardingAppSelect"
  | "onboardingZodiac"
  | "onboardingReveal"
  | "intervention"
  | "preventedSuccess"
  | "allowedDuration"
  | "allowedTimer"
  | "returnReminder"
  | "summary"
  | "futureProtection";

/** Pet emotional state across intervention flow */
export type PetMood =
  | "curious"
  | "waiting"
  | "sitting"
  | "proud"
  | "comforting";

export type { ZodiacSign } from "./zodiac";
