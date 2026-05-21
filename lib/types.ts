export type FocusDurationMinutes = 5 | 10 | 15 | 25;

export type ScreenName =
  | "onboardingAppSelect"
  | "onboardingZodiac"
  | "onboardingReveal"
  | "home"
  | "setup"
  | "active"
  | "giveUpConfirm"
  | "success";

/** Pet emotional state across onboarding and pause loop */
export type PetMood =
  | "curious"
  | "waiting"
  | "sitting"
  | "proud"
  | "comforting";

export type { ZodiacSign } from "./zodiac";
