"use client";

import InterventionLayout from "@/components/InterventionLayout";
import PrimaryButton from "@/components/PrimaryButton";
import { COPY } from "@/lib/copy";
import { useFocusTimer } from "@/hooks/useFocusTimer";
import type { UserSettings } from "@/lib/settings";

type AllowedTimerScreenProps = {
  settings: UserSettings;
  endsAt: string;
  onLeaveEarly: () => void;
  onComplete: () => void;
};

export default function AllowedTimerScreen({
  settings,
  endsAt,
  onLeaveEarly,
  onComplete,
}: AllowedTimerScreenProps) {
  const { display } = useFocusTimer(endsAt, onComplete);
  const { targetAppName } = settings;

  return (
    <InterventionLayout
      zodiacSign={settings.zodiacSign}
      mood="focus"
      footer={
        <PrimaryButton variant="secondary" onClick={onLeaveEarly}>
          {COPY.allowed.leaveEarly}
        </PrimaryButton>
      }
    >
      <h1 className="intervention-title">
        {COPY.allowed.watching(targetAppName)}
      </h1>
      <p className="timer-display" aria-live="polite">
        {display}
      </p>
      <p className="intervention-body-text intervention-body-text--tight">
        {COPY.allowed.timerHint}
      </p>
    </InterventionLayout>
  );
}
