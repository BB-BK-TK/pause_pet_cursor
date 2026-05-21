"use client";

import InterventionShell from "@/components/InterventionShell";
import PrimaryButton from "@/components/PrimaryButton";
import PetDisplay from "@/components/PetDisplay";
import { COPY } from "@/lib/copy";
import { useFocusTimer } from "@/hooks/useFocusTimer";
import type { PausePetState } from "@/lib/storage";
import type { UserSettings } from "@/lib/settings";
import { getZodiacCompanion } from "@/lib/zodiac";

type AllowedTimerScreenProps = {
  state: PausePetState;
  settings: UserSettings;
  endsAt: string;
  onLeaveEarly: () => void;
  onComplete: () => void;
};

export default function AllowedTimerScreen({
  state,
  settings,
  endsAt,
  onLeaveEarly,
  onComplete,
}: AllowedTimerScreenProps) {
  const { display } = useFocusTimer(endsAt, onComplete);
  const companion = getZodiacCompanion(settings.zodiacSign);
  const { targetAppName } = settings;

  return (
    <InterventionShell
      footer={
        <PrimaryButton variant="secondary" onClick={onLeaveEarly}>
          {COPY.allowed.leaveEarly}
        </PrimaryButton>
      }
    >
      <div className="intervention-card flex flex-col items-center px-3 py-6 text-center">
        <p className="text-sm font-semibold text-amber-900/90">
          {COPY.allowed.watching(targetAppName)}
        </p>
        <p className="timer-display mt-4" aria-live="polite">
          {display}
        </p>
        <p className="mt-3 text-sm text-stone-600">{COPY.allowed.timerHint}</p>
        <div className="mt-6">
          <PetDisplay
            mood="sitting"
            petLevel={state.petLevel}
            petExp={state.petExp}
            size="lg"
            showProgress={false}
            companionEmoji={companion.emoji}
          />
        </div>
      </div>
    </InterventionShell>
  );
}
