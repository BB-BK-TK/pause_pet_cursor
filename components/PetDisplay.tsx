import { COPY } from "@/lib/copy";
import type { PetMood } from "@/lib/types";

const moodConfig: Record<
  PetMood,
  { emoji: string; halo: string; float: boolean; pulse: boolean }
> = {
  idle: { emoji: "🐱", halo: "bg-amber-200/70", float: true, pulse: false },
  waiting: { emoji: "😺", halo: "bg-orange-200/80", float: true, pulse: true },
  happy: { emoji: "😸", halo: "bg-amber-300/80", float: false, pulse: false },
  comfort: { emoji: "🐱", halo: "bg-stone-200/70", float: false, pulse: false },
};

type PetDisplayProps = {
  mood: PetMood;
  petLevel: number;
  petExp: number;
  expPerLevel?: number;
  size?: "md" | "lg" | "hero";
  showProgress?: boolean;
};

export default function PetDisplay({
  mood,
  petLevel,
  petExp,
  expPerLevel = 100,
  size = "md",
  showProgress = true,
}: PetDisplayProps) {
  const { emoji, halo, float, pulse } = moodConfig[mood];
  const expInLevel = petExp % expPerLevel;
  const progress = Math.min(100, (expInLevel / expPerLevel) * 100);

  const stageSize = {
    md: "h-[9.5rem] w-[9.5rem]",
    lg: "h-[11.5rem] w-[11.5rem]",
    hero: "h-[13rem] w-[13rem]",
  }[size];

  const cushionSize = {
    md: "h-28 w-28 text-6xl",
    lg: "h-32 w-32 text-7xl",
    hero: "h-36 w-36 text-7xl",
  }[size];

  return (
    <div className="flex flex-col items-center gap-4">
      <div className={`pet-stage ${stageSize}`}>
        <div
          className={`pet-halo ${halo} ${pulse ? "animate-soft-pulse" : ""}`}
          aria-hidden
        />
        <div
          className={`pet-cushion ${cushionSize} ${float ? "animate-gentle-float" : ""}`}
        >
          <span className="pet-ear -left-1 -rotate-12" aria-hidden />
          <span className="pet-ear -right-1 rotate-12" aria-hidden />
          <span className="relative z-10 select-none" aria-hidden>{emoji}</span>
          <span
            className="absolute bottom-3 left-1/2 h-2 w-12 -translate-x-1/2 rounded-full bg-amber-200/50"
            aria-hidden
          />
        </div>
      </div>

      {showProgress && (
        <div className="w-full max-w-[12rem] text-center">
          <p className="text-sm font-semibold text-amber-900/90">{COPY.pet.level(petLevel)}</p>
          <div className="progress-track mx-auto mt-2.5">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-2 text-xs text-stone-500">{COPY.pet.growth(petExp)}</p>
        </div>
      )}
    </div>
  );
}
