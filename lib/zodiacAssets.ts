import type { ZodiacSign } from "./zodiac";

export const INTRO_HERO_PATH = "/assets/intro/pause-pet-intro-screen.png";

export const ZODIAC_SIGNS = [
  "aries",
  "taurus",
  "gemini",
  "cancer",
  "leo",
  "virgo",
  "libra",
  "scorpio",
  "sagittarius",
  "capricorn",
  "aquarius",
  "pisces",
] as const satisfies readonly ZodiacSign[];

export type ZodiacAssetVariant = "icon" | "card";

/** Full companion card art (selection grid, reveal). PNG includes orbit/pedestal. */
export function getZodiacCardPath(sign: ZodiacSign): string {
  return `/assets/zodiac/cards/${sign}_card.png`;
}

/** Compact companion icon (intervention, timer, summary). PNG includes orbit/pedestal. */
export function getZodiacIconPath(sign: ZodiacSign): string {
  return `/assets/zodiac/icons/${sign}_icon.png`;
}

export function getZodiacAssetPath(
  sign: ZodiacSign,
  variant: ZodiacAssetVariant,
): string {
  return variant === "card" ? getZodiacCardPath(sign) : getZodiacIconPath(sign);
}

/** Shared layout presets — PNG art already includes the stage; no extra orbit SVG. */
export const COMPANION_PRESETS = {
  /** Zodiac picker grid */
  selection: {
    variant: "card" as const,
    size: "sm" as const,
    showStageOnFallback: true,
  },
  /** Large preview while picking sign */
  selectionPreview: {
    variant: "card" as const,
    size: "lg" as const,
    showStageOnFallback: true,
  },
  /** Companion reveal after onboarding */
  reveal: {
    variant: "card" as const,
    size: "lg" as const,
    showStageOnFallback: true,
  },
  /** Intervention, timer, success flows */
  intervention: {
    variant: "icon" as const,
    size: "xl" as const,
    showStageOnFallback: true,
  },
  /** Summary / compact header */
  summary: {
    variant: "icon" as const,
    size: "sm" as const,
    showStageOnFallback: false,
  },
  /** Permission setup hero */
  setupHero: {
    variant: "icon" as const,
    size: "lg" as const,
    showStageOnFallback: true,
  },
} as const;

export type CompanionPresetKey = keyof typeof COMPANION_PRESETS;
