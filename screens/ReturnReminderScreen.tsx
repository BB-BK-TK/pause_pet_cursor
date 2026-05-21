import InterventionShell from "@/components/InterventionShell";
import PrimaryButton from "@/components/PrimaryButton";
import PetDisplay from "@/components/PetDisplay";
import { COPY } from "@/lib/copy";
import type { PausePetState } from "@/lib/storage";
import type { UserSettings } from "@/lib/settings";
import { getZodiacCompanion } from "@/lib/zodiac";

type ReturnReminderScreenProps = {
  state: PausePetState;
  settings: UserSettings;
  onReturn: () => void;
  onExtend: () => void;
};

export default function ReturnReminderScreen({
  state,
  settings,
  onReturn,
  onExtend,
}: ReturnReminderScreenProps) {
  const companion = getZodiacCompanion(settings.zodiacSign);
  const { targetAppName } = settings;

  return (
    <InterventionShell
      footer={
        <>
          <PrimaryButton onClick={onReturn}>
            {COPY.returnReminder.goBack}
          </PrimaryButton>
          <PrimaryButton variant="secondary" onClick={onExtend}>
            {COPY.returnReminder.extend}
          </PrimaryButton>
        </>
      }
    >
      <div className="intervention-card flex flex-col items-center px-3 py-6 text-center">
        <h1 className="text-2xl font-bold text-stone-900">
          {COPY.returnReminder.title}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-stone-600">
          {COPY.returnReminder.body(targetAppName)}
        </p>
        <p className="mt-2 text-sm font-medium text-stone-700">
          {COPY.returnReminder.companion(companion.koreanName)}
        </p>
        <div className="mt-6">
          <PetDisplay
            mood="waiting"
            petLevel={state.petLevel}
            petExp={state.petExp}
            size="hero"
            showProgress={false}
            companionEmoji={companion.emoji}
          />
        </div>
      </div>
    </InterventionShell>
  );
}
