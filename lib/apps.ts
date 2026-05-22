/** Preset distracting apps for onboarding (order matches onboarding UI) */
export const PRESET_APPS = [
  "YouTube",
  "Instagram",
  "TikTok",
  "Netflix",
  "웹툰",
  "쇼핑",
  "게임",
] as const;

export type PresetAppName = (typeof PRESET_APPS)[number];

export const CUSTOM_APP_OPTION = "직접 입력" as const;

export const ONBOARDING_APP_OPTIONS = [...PRESET_APPS, CUSTOM_APP_OPTION] as const;
