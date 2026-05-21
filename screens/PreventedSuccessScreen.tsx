import InterventionShell from "@/components/InterventionShell";
import PrimaryButton from "@/components/PrimaryButton";
import PetDisplay from "@/components/PetDisplay";
import StatChip from "@/components/StatChip";
import { COPY } from "@/lib/copy";
import type { PausePetState } from "@/lib/storage";
import type { UserSettings } from "@/lib/settings";
import { getZodiacCompanion } from "@/lib/zodiac";

type PreventedSuccessScreenProps = {
  state: PausePetState;
  settings: UserSettings;
  expGained: number;
  onSummary: () => void;
  onRetry: () => void;
};

export default function PreventedSuccessScreen({
  state,
  settings,
  expGained,
  onSummary,
  onRetry,
}: PreventedSuccessScreenProps) {
  const companion = getZodiacCompanion(settings.zodiacSign);
  const { targetAppName } = settings;

  return (
    <InterventionShell
      footer={
        <>
          <PrimaryButton onClick={onSummary}>
            {COPY.prevented.ctaSummary}
          </PrimaryButton>
          <PrimaryButton variant="secondary" onClick={onRetry}>
            {COPY.prevented.ctaRetry}
          </PrimaryButton>
        </>
      }
    >
      <div className="intervention-card flex flex-col items-center px-3 py-5 text-center">
        <h1 className="text-2xl font-bold text-stone-900">
          {COPY.prevented.title}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-stone-600">
          {COPY.prevented.body(targetAppName)}
        </p>
        <p className="mt-2 text-sm font-medium text-amber-900/90">
          {COPY.prevented.growth(companion.koreanName)}
        </p>

        <div className="relative mt-5">
          <PetDisplay
            mood="proud"
            petLevel={state.petLevel}
            petExp={state.petExp}
            size="lg"
            companionEmoji={companion.emoji}
          />
        </div>

        <p className="mt-3 inline-flex rounded-full bg-amber-200/90 px-5 py-2 text-lg font-bold text-amber-950">
          {COPY.prevented.growthPoints(expGained)}
        </p>

        <div className="mt-5 grid w-full grid-cols-3 gap-2">
          <StatChip
            label={COPY.prevented.statToday}
            value={`${state.todayPreventedCount}회`}
          />
          <StatChip
            label={COPY.prevented.statSaved}
            value={`${state.estimatedSavedMinutes}분`}
          />
          <StatChip
            label={COPY.prevented.statGrowth}
            value={COPY.pet.level(state.petLevel)}
          />
        </div>
      </div>
    </InterventionShell>
  );
}
