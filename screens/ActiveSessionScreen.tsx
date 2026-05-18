"use client";

import { useMemo } from "react";
import AppShell from "@/components/AppShell";
import PrimaryButton from "@/components/PrimaryButton";
import PetDisplay from "@/components/PetDisplay";
import SoftCard from "@/components/SoftCard";
import { COPY } from "@/lib/copy";
import { useFocusTimer } from "@/hooks/useFocusTimer";
import type { PausePetState } from "@/lib/storage";

type ActiveSessionScreenProps = {
  state: PausePetState;
  endsAt: string;
  durationMinutes: number;
  onGiveUp: () => void;
  onComplete: () => void;
};

export default function ActiveSessionScreen({
  state,
  endsAt,
  durationMinutes,
  onGiveUp,
  onComplete,
}: ActiveSessionScreenProps) {
  const { display } = useFocusTimer(endsAt, onComplete);

  const message = useMemo(
    () => COPY.focusMessages[durationMinutes % COPY.focusMessages.length],
    [durationMinutes],
  );

  return (
    <AppShell
      footer={
        <PrimaryButton variant="ghost" onClick={onGiveUp}>
          {COPY.focus.exit}
        </PrimaryButton>
      }
    >
      <div className="flex flex-col gap-4 pb-2">
        <SoftCard variant="highlight" className="flex flex-col items-center px-4 py-8">
          <span className="rounded-full bg-amber-200/90 px-4 py-1.5 text-xs font-semibold text-amber-900">
            {COPY.focus.label}
          </span>

          <p className="timer-display mt-6" aria-live="polite">
            {display}
          </p>

          <p className="pet-speech mt-6 max-w-[18rem]">{message}</p>
        </SoftCard>

        <div className="flex justify-center py-2">
          <PetDisplay
            mood="focusing"
            petLevel={state.petLevel}
            petExp={state.petExp}
            size="hero"
            showProgress={false}
          />
        </div>
      </div>
    </AppShell>
  );
}
