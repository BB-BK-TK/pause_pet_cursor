export type FocusDurationMinutes = 5 | 15 | 25 | 45;

export type ScreenName =
  | "home"
  | "setup"
  | "active"
  | "giveUpConfirm"
  | "success";

/** Pet emotional state across the focus loop */
export type PetMood =
  | "idle"
  | "waiting"
  | "focusing"
  | "happy"
  | "comfort";
