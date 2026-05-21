import { COPY } from "@/lib/copy";
import type { PetMood } from "@/lib/types";

type MoodVisual = {
  emoji: string;
  halo: string;
  cushion: string;
  ear: string;
  float: boolean;
  pulse: boolean;
  focusGlow: boolean;
  badge: string;
};

const moodConfig: Record<PetMood, MoodVisual> = {
  curious: {
    emoji: "\u{1F63C}",
    halo: "bg-sky-200/60",
    cushion: "pet-cushion-curious",
    ear: "bg-sky-200/90",
    float: true,
    pulse: true,
    focusGlow: false,
    badge: "bg-sky-100 text-sky-900",
  },
  waiting: {
    emoji: "\u{1F440}",
    halo: "bg-orange-200/70",
    cushion: "pet-cushion-waiting",
    ear: "bg-orange-200/90",
    float: true,
    pulse: true,
    focusGlow: false,
    badge: "bg-orange-100 text-orange-900",
  },
  sitting: {
    emoji: "\u{1F60C}",
    halo: "bg-amber-300/80",
    cushion: "pet-cushion-sitting",
    ear: "bg-amber-300/90",
    float: true,
    pulse: true,
    focusGlow: true,
    badge: "bg-amber-200 text-amber-900",
  },
  proud: {
    emoji: "\u{1F31F}",
    halo: "bg-yellow-300/80",
    cushion: "pet-cushion-proud",
    ear: "bg-amber-300/90",
    float: false,
    pulse: false,
    focusGlow: false,
    badge: "bg-yellow-100 text-amber-900",
  },
  comforting: {
    emoji: "\u{1F49C}",
    halo: "bg-violet-200/50",
    cushion: "pet-cushion-comforting",
    ear: "bg-stone-200/90",
    float: false,
    pulse: false,
    focusGlow: false,
    badge: "bg-violet-100/80 text-stone-600",
  },
};

type PetDisplayProps = {
  mood: PetMood;
  petLevel: number;
  petExp: number;
  expPerLevel?: number;
  size?: "md" | "lg" | "hero";
  showProgress?: boolean;
  showMoodLabel?: boolean;
  /** Zodiac companion emoji overrides default mood emoji */
  companionEmoji?: string;
};

export default function PetDisplay({
  mood,
  petLevel,
  petExp,
  expPerLevel = 100,
  size = "md",
  showProgress = true,
  showMoodLabel = true,
  companionEmoji,
}: PetDisplayProps) {
  const visual = moodConfig[mood];
  const displayEmoji = companionEmoji ?? visual.emoji;
  const expInLevel = petExp % expPerLevel;
  const progress = Math.min(100, (expInLevel / expPerLevel) * 100);

  const stageSize = {
    md: "h-[8.5rem] w-[8.5rem]",
    lg: "h-[10rem] w-[10rem]",
    hero: "h-[11rem] w-[11rem] sm:h-[12rem] sm:w-[12rem]",
  }[size];

  const cushionSize = {
    md: "h-24 w-24 text-5xl",
    lg: "h-28 w-28 text-6xl",
    hero: "h-28 w-28 text-6xl sm:h-32 sm:w-32 sm:text-7xl",
  }[size];

  const animClass = [
    visual.float ? "animate-gentle-float" : "",
    visual.focusGlow ? "animate-focus-glow" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="flex flex-col items-center gap-2.5">
      {showMoodLabel && (
        <span className={`pet-mood-badge ${visual.badge}`}>
          {COPY.pet.mood(mood)}
        </span>
      )}

      <div className={`pet-stage ${stageSize}`}>
        <div
          className={`pet-halo ${visual.halo} ${visual.pulse ? "animate-soft-pulse" : ""}`}
          aria-hidden
        />
        <div className={`pet-cushion ${visual.cushion} ${cushionSize} ${animClass}`}>
          <span
            className={`pet-ear -left-1 -rotate-12 ${visual.ear}`}
            aria-hidden
          />
          <span
            className={`pet-ear -right-1 rotate-12 ${visual.ear}`}
            aria-hidden
          />
          <span className="relative z-10 select-none" aria-hidden>
            {displayEmoji}
          </span>
          {mood === "proud" && (
            <>
              <span
                className="celebrate-sparkle -right-1 top-0 animate-soft-pulse"
                aria-hidden
              />
              <span
                className="celebrate-sparkle -left-2 top-4 animate-soft-pulse"
                style={{ animationDelay: "0.4s" }}
                aria-hidden
              />
            </>
          )}
          {mood === "sitting" && (
            <span
              className="absolute -bottom-1 left-1/2 flex -translate-x-1/2 gap-1"
              aria-hidden
            >
              <span className="h-1.5 w-1.5 animate-soft-pulse rounded-full bg-amber-400" />
              <span
                className="h-1.5 w-1.5 animate-soft-pulse rounded-full bg-amber-400"
                style={{ animationDelay: "0.2s" }}
              />
              <span
                className="h-1.5 w-1.5 animate-soft-pulse rounded-full bg-amber-400"
                style={{ animationDelay: "0.4s" }}
              />
            </span>
          )}
          <span
            className="absolute bottom-3 left-1/2 h-2 w-12 -translate-x-1/2 rounded-full bg-black/5"
            aria-hidden
          />
        </div>
      </div>

      {showProgress && (
        <div className="w-full max-w-[12rem] text-center">
          <p className="text-sm font-semibold text-amber-900/90">
            {COPY.pet.level(petLevel)}
          </p>
          <div className="progress-track mx-auto mt-2">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-1.5 text-xs text-stone-500">{COPY.pet.growth(petExp)}</p>
        </div>
      )}
    </div>
  );
}
