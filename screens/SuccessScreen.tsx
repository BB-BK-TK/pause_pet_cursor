import AppShell from "@/components/AppShell";
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
    <AppShell
      footer={
        <PrimaryButton onClick={onHome}>{COPY.success.ctaHome}</PrimaryButton>
      }
    >
      <div className="flex flex-col gap-4 pb-2 animate-pop">
        <SoftCard
          variant="celebrate"
          className="relative overflow-hidden px-5 py-7 text-center"
        >
          <span
            className="celebrate-sparkle left-4 top-6"
            aria-hidden
          />
          <span
            className="celebrate-sparkle right-6 top-10"
            style={{ animationDelay: "0.3s" }}
            aria-hidden
          />
          <span
            className="celebrate-sparkle bottom-20 left-8"
            style={{ animationDelay: "0.6s" }}
            aria-hidden
          />

          <p className="relative text-xs font-semibold uppercase tracking-widest text-amber-700">
            {COPY.success.label}
          </p>
          <h1 className="relative mt-3 text-2xl font-bold leading-snug text-stone-900">
            {COPY.success.title}
          </h1>
          <p className="relative mt-2 text-sm text-stone-600">
            {COPY.success.subtitle}
          </p>
          <p className="relative mt-2 text-sm text-stone-500">
            {COPY.success.duration(durationMinutes)}
          </p>

          <div className="relative mt-6">
            <PetDisplay
              mood="happy"
              petLevel={state.petLevel}
              petExp={state.petExp}
              size="hero"
            />
          </div>

          <p className="relative mt-5 text-sm font-medium text-amber-900/90">
            {COPY.success.growth}
          </p>
          <p className="relative mt-2 inline-flex rounded-full bg-gradient-to-r from-amber-200 to-orange-200 px-6 py-2.5 text-xl font-bold text-amber-950 shadow-md">
            {COPY.success.growthPoints(expGained)}
          </p>
          <p className="pet-speech relative mx-auto mt-5 max-w-[16rem]">
            {COPY.success.petLine}
          </p>
        </SoftCard>

        <div className="flex gap-2">
          <StatChip
            label={COPY.success.statStreak}
            value={COPY.success.statStreakValue(state.streak)}
          />
          <StatChip
            label={COPY.success.statMinutes}
            value={COPY.success.statMinutesValue(state.totalFocusMinutes)}
          />
        </div>
      </div>
    </AppShell>
  );
}
