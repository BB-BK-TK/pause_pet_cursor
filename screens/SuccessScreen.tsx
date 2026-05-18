import PrimaryButton from "@/components/PrimaryButton";
import PetDisplay from "@/components/PetDisplay";
import SoftCard from "@/components/SoftCard";
import StatChip from "@/components/StatChip";
import { COPY } from "@/lib/copy";
import type { PausePetState } from "@/lib/storage";

type SuccessScreenProps = {
  state: PausePetState;
  expGained: number;
  durationMinutes: number;
  onHome: () => void;
};

export default function SuccessScreen({
  state,
  expGained,
  durationMinutes,
  onHome,
}: SuccessScreenProps) {
  return (
    <div className="flex flex-col gap-7 py-2">
      <SoftCard variant="celebrate" className="relative overflow-hidden px-6 py-8 text-center">
        <div
          className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-amber-200/40 blur-2xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-6 -left-6 h-28 w-28 rounded-full bg-orange-200/30 blur-2xl"
          aria-hidden
        />

        <p className="relative text-xs font-semibold uppercase tracking-widest text-amber-700">
          {COPY.success.label}
        </p>
        <h1 className="relative mt-4 text-2xl font-bold leading-snug text-stone-900">
          {COPY.success.title}
        </h1>
        <p className="relative mt-3 text-sm leading-relaxed text-stone-600">
          {COPY.success.duration(durationMinutes)}
        </p>

        <div className="relative mt-8">
          <PetDisplay
            mood="happy"
            petLevel={state.petLevel}
            petExp={state.petExp}
            size="hero"
          />
        </div>

        <div className="relative mt-8">
          <p className="text-sm font-medium text-stone-700">{COPY.success.growth}</p>
          <p className="mt-2 inline-flex items-center rounded-full bg-gradient-to-r from-amber-100 to-orange-100 px-5 py-2 text-lg font-bold text-amber-900 shadow-sm">
            {COPY.success.growthPoints(expGained)}
          </p>
        </div>
      </SoftCard>

      <div className="flex gap-2.5">
        <StatChip
          label={COPY.success.statStreak}
          value={COPY.success.statStreakValue(state.streak)}
        />
        <StatChip
          label={COPY.success.statMinutes}
          value={COPY.success.statMinutesValue(state.totalFocusMinutes)}
        />
      </div>

      <PrimaryButton onClick={onHome}>{COPY.success.ctaHome}</PrimaryButton>
    </div>
  );
}
