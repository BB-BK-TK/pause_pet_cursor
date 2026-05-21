/** Preset distracting apps for onboarding selection */
export const PRESET_APPS = [
  "Instagram",
  "YouTube",
  "TikTok",
  "Netflix",
  "웹툰",
  "쇼핑",
  "게임",
] as const;

export type PresetAppName = (typeof PRESET_APPS)[number];

export const CUSTOM_APP_OPTION = "직접 입력" as const;
