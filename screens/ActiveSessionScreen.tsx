"use client";

import AppShell from "@/components/AppShell";
import PrimaryButton from "@/components/PrimaryButton";
import PetDisplay from "@/components/PetDisplay";
import SoftCard from "@/components/SoftCard";
import { COPY } from "@/lib/copy";
import { useFocusTimer } from "@/hooks/useFocusTimer";
import type { PausePetState } from "@/lib/storage";
import type { UserSettings } from "@/lib/settings";
import { getZodiacCompanion } from "@/lib/zodiac";

type ActiveSessionScreenProps = {
  state: PausePetState;
  settings: UserSettings;
  endsAt: string;
  onGiveUp: () => void;
  onComplete: () => void;
};

export default function ActiveSessionScreen({
  state,
  settings,
  endsAt,
  onGiveUp,
  onComplete,
}: ActiveSessionScreenProps) {
  const { display } = useFocusTimer(endsAt, onComplete);
  const companion = getZodiacCompanion(settings.zodiacSign);
  const { targetAppName } = settings;

  return (
    <AppShell
      footer={
        <PrimaryButton variant="ghost" onClick={onGiveUp}>
          {COPY.focus.exit}
        </PrimaryButton>
      }
    >
      <div className="screen-stack">
        <SoftCard variant="highlight" className="flex flex-col items-center px-4 py-6">
          <span className="rounded-full bg-amber-200/90 px-4 py-1.5 text-xs font-semibold text-amber-900">
            {COPY.focus.label}
          </span>

          <p className="mt-4 text-center text-sm font-medium leading-relaxed text-stone-700">
            {COPY.focus.headline(targetAppName, companion.koreanName)}
          </p>

          <p className="timer-display mt-4" aria-live="polite">
            {display}
          </p>

          <p className="pet-speech mt-4 max-w-[18rem]">
            {companion.activeFocusMessage}
          </p>
        </SoftCard>

        <div className="flex justify-center py-1">
          <PetDisplay
            mood="sitting"
            petLevel={state.petLevel}
            petExp={state.petExp}
            size="hero"
            showProgress={false}
            companionEmoji={companion.emoji}
          />
        </div>
      </div>
    </AppShell>
  );
}
