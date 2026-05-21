import AppShell from "@/components/AppShell";
import PrimaryButton from "@/components/PrimaryButton";
import PetDisplay from "@/components/PetDisplay";
import SoftCard from "@/components/SoftCard";
import StatChip from "@/components/StatChip";
import { COPY } from "@/lib/copy";
import type { PausePetState } from "@/lib/storage";
import type { UserSettings } from "@/lib/settings";
import { getZodiacCompanion } from "@/lib/zodiac";

type SuccessScreenProps = {
  state: PausePetState;
  settings: UserSettings;
  expGained: number;
  durationMinutes: number;
  onContinue: () => void;
  onDone: () => void;
};

export default function SuccessScreen({
  state,
  settings,
  expGained,
  durationMinutes,
  onContinue,
  onDone,
}: SuccessScreenProps) {
  const companion = getZodiacCompanion(settings.zodiacSign);
  const { targetAppName } = settings;

  return (
    <AppShell
      footer={
        <>
          <PrimaryButton onClick={onContinue}>
            {COPY.success.ctaContinue}
          </PrimaryButton>
          <PrimaryButton variant="secondary" onClick={onDone}>
            {COPY.success.ctaDone}
          </PrimaryButton>
        </>
      }
    >
      <div className="screen-stack animate-pop">
        <SoftCard
          variant="celebrate"
          className="relative overflow-hidden px-4 py-6 text-center"
        >
          <span className="celebrate-sparkle left-4 top-6" aria-hidden />
          <span
            className="celebrate-sparkle right-6 top-10"
            style={{ animationDelay: "0.3s" }}
            aria-hidden
          />

          <h1 className="relative text-2xl font-bold leading-snug text-stone-900">
            {COPY.success.title}
          </h1>
          <p className="relative mt-3 text-sm leading-relaxed text-stone-600">
            {COPY.success.body(targetAppName, durationMinutes)}
          </p>

          <div className="relative mt-5">
            <PetDisplay
              mood="proud"
              petLevel={state.petLevel}
              petExp={state.petExp}
              size="hero"
              companionEmoji={companion.emoji}
            />
          </div>

          <p className="relative mt-4 text-sm font-medium text-amber-900/90">
            {COPY.success.growth(companion.koreanName)}
          </p>
          <p className="relative mt-2 inline-flex rounded-full bg-gradient-to-r from-amber-200 to-orange-200 px-6 py-2.5 text-xl font-bold text-amber-950 shadow-md">
            {COPY.success.growthPoints(expGained)}
          </p>
          <p className="pet-speech relative mx-auto mt-4 max-w-[16rem]">
            {companion.successMessage}
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

