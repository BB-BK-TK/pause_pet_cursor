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
  idle: {
    emoji: "\u{1F431}",
    halo: "bg-amber-200/60",
    cushion: "pet-cushion-idle",
    ear: "bg-amber-200/90",
    float: true,
    pulse: false,
    focusGlow: false,
    badge: "bg-amber-100 text-amber-800",
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
  focusing: {
    emoji: "??",
    halo: "bg-amber-300/80",
    cushion: "pet-cushion-focusing",
    ear: "bg-amber-300/90",
    float: true,
    pulse: true,
    focusGlow: true,
    badge: "bg-amber-200 text-amber-900",
  },
  happy: {
    emoji: "\u{1F31F}",
    halo: "bg-yellow-300/80",
    cushion: "pet-cushion-happy",
    ear: "bg-amber-300/90",
    float: false,
    pulse: false,
    focusGlow: false,
    badge: "bg-yellow-100 text-amber-900",
  },
  comfort: {
    emoji: "\u{1F49C}",
    halo: "bg-violet-200/50",
    cushion: "pet-cushion-comfort",
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
};

export default function PetDisplay({
  mood,
  petLevel,
  petExp,
  expPerLevel = 100,
  size = "md",
  showProgress = true,
  showMoodLabel = true,
}: PetDisplayProps) {
  const visual = moodConfig[mood];
  const expInLevel = petExp % expPerLevel;
  const progress = Math.min(100, (expInLevel / expPerLevel) * 100);

  const stageSize = {
    md: "h-[9.5rem] w-[9.5rem]",
    lg: "h-[11.5rem] w-[11.5rem]",
    hero: "h-[12.5rem] w-[12.5rem]",
  }[size];

  const cushionSize = {
    md: "h-28 w-28 text-6xl",
    lg: "h-32 w-32 text-7xl",
    hero: "h-32 w-32 text-7xl sm:h-36 sm:w-36 sm:text-7xl",
  }[size];

  const animClass = [
    visual.float ? "animate-gentle-float" : "",
    visual.focusGlow ? "animate-focus-glow" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="flex flex-col items-center gap-3">
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
            {visual.emoji}
          </span>
          {mood === "happy" && (
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
          {mood === "focusing" && (
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
          <div className="progress-track mx-auto mt-2.5">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-2 text-xs text-stone-500">{COPY.pet.growth(petExp)}</p>
        </div>
      )}
    </div>
  );
}
