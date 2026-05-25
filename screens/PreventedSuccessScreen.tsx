import InterventionLayout from "@/components/InterventionLayout";
import PrimaryButton from "@/components/PrimaryButton";
import StatChip from "@/components/StatChip";
import { COPY } from "@/lib/copy";
import type { PausePetState } from "@/lib/storage";
import type { UserSettings } from "@/lib/settings";
import { getZodiacCompanion } from "@/lib/zodiac";

type PreventedSuccessScreenProps = {
  state: PausePetState;
  settings: UserSettings;
  onSummary: () => void;
  onRetry: () => void;
};

export default function PreventedSuccessScreen({
  state,
  settings,
  onSummary,
  onRetry,
}: PreventedSuccessScreenProps) {
  const companion = getZodiacCompanion(settings.zodiacSign);
  const { targetAppName } = settings;

  return (
    <InterventionLayout
      zodiacSign={settings.zodiacSign}
      mood="happy"
      footer={
        <>
          <PrimaryButton variant="premium" onClick={onRetry}>
            {COPY.prevented.ctaRetry}
          </PrimaryButton>
          <PrimaryButton variant="premium-secondary" onClick={onSummary}>
            {COPY.prevented.ctaSummary}
          </PrimaryButton>
        </>
      }
    >
      <h1 className="intervention-title-lg">{COPY.prevented.title}</h1>
      <p className="intervention-body-text">{COPY.prevented.body(targetAppName)}</p>
      <p className="intervention-accent">
        {COPY.prevented.growth(companion.koreanName)}
      </p>

          <div className="stat-grid stat-grid--3 mt-6 w-full">
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
    </InterventionLayout>
  );
}
