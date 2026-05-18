"use client";

import { useMemo } from "react";
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
    <div className="flex min-h-[calc(100dvh-5rem)] flex-col justify-center gap-6 py-4">
      <SoftCard variant="highlight" className="flex flex-col items-center px-6 py-10">
        <span className="rounded-full bg-amber-100/90 px-4 py-1.5 text-xs font-semibold text-amber-800">
          {COPY.focus.label}
        </span>

        <p className="timer-display mt-8" aria-live="polite">
          {display}
        </p>

        <p className="mt-8 max-w-[16rem] text-center text-sm leading-relaxed text-stone-600">
          {message}
        </p>
      </SoftCard>

      <div className="flex justify-center py-2">
        <PetDisplay
          mood="waiting"
          petLevel={state.petLevel}
          petExp={state.petExp}
          size="hero"
          showProgress={false}
        />
      </div>

      <div className="mt-auto pt-2">
        <PrimaryButton variant="ghost" onClick={onGiveUp}>
          {COPY.focus.exit}
        </PrimaryButton>
      </div>
    </div>
  );
}
