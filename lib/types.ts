export type AllowedDurationMinutes = 5 | 10 | 15 | 30;

export type ScreenName =
  | "onboardingAppSelect"
  | "onboardingZodiac"
  | "onboardingReveal"
  | "permissionSetup"
  | "intervention"
  | "preventedSuccess"
  | "allowedDuration"
  | "allowedTimer"
  | "returnedSuccess"
  | "returnReminder"
  | "summary";

export type { ZodiacSign } from "./zodiac";
