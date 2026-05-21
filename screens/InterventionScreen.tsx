import InterventionShell from "@/components/InterventionShell";
import PrimaryButton from "@/components/PrimaryButton";
import PetDisplay from "@/components/PetDisplay";
import { COPY } from "@/lib/copy";
import type { PausePetState } from "@/lib/storage";
import type { UserSettings } from "@/lib/settings";
import { getZodiacCompanion } from "@/lib/zodiac";

type InterventionScreenProps = {
  state: PausePetState;
  settings: UserSettings;
  onNotOpen: () => void;
  onWillOpen: () => void;
};

export default function InterventionScreen({
  state,
  settings,
  onNotOpen,
  onWillOpen,
}: InterventionScreenProps) {
  const companion = getZodiacCompanion(settings.zodiacSign);
  const { targetAppName } = settings;

  return (
    <InterventionShell
      showOpening={COPY.intervention.opening(targetAppName)}
      footer={
        <>
          <PrimaryButton onClick={onNotOpen}>
            {COPY.intervention.notOpen}
          </PrimaryButton>
          <PrimaryButton variant="secondary" onClick={onWillOpen}>
            {COPY.intervention.willOpen}
          </PrimaryButton>
        </>
      }
    >
      <div className="intervention-card flex flex-col items-center px-2 py-4 text-center">
        <PetDisplay
          mood="curious"
          petLevel={state.petLevel}
          petExp={state.petExp}
          size="hero"
          showProgress={false}
          companionEmoji={companion.emoji}
        />
        <p className="mt-5 text-base font-semibold text-stone-800">
          {COPY.intervention.askWait}
        </p>
        <p className="mt-2 text-lg font-bold text-stone-900">
          {COPY.intervention.askOpen}
        </p>
      </div>
    </InterventionShell>
  );
}
