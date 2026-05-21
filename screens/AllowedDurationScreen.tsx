"use client";

import { useState } from "react";
import AllowedDurationChips from "@/components/AllowedDurationChips";
import InterventionShell from "@/components/InterventionShell";
import PrimaryButton from "@/components/PrimaryButton";
import PetDisplay from "@/components/PetDisplay";
import { COPY } from "@/lib/copy";
import type { PausePetState } from "@/lib/storage";
import type { UserSettings } from "@/lib/settings";
import type { AllowedDurationMinutes } from "@/lib/types";
import { getZodiacCompanion } from "@/lib/zodiac";

type AllowedDurationScreenProps = {
  state: PausePetState;
  settings: UserSettings;
  onConfirm: (minutes: AllowedDurationMinutes) => void;
};

export default function AllowedDurationScreen({
  state,
  settings,
  onConfirm,
}: AllowedDurationScreenProps) {
  const [selected, setSelected] = useState<AllowedDurationMinutes | null>(null);
  const companion = getZodiacCompanion(settings.zodiacSign);

  return (
    <InterventionShell
      footer={
        <PrimaryButton
          onClick={() => selected && onConfirm(selected)}
          disabled={selected === null}
        >
          {COPY.allowed.cta}
        </PrimaryButton>
      }
    >
      <div className="intervention-card w-full px-2 py-4">
        <div className="mb-4 flex justify-center">
          <PetDisplay
            mood="waiting"
            petLevel={state.petLevel}
            petExp={state.petExp}
            size="md"
            showProgress={false}
            companionEmoji={companion.emoji}
          />
        </div>
        <h1 className="text-center text-xl font-bold text-stone-900">
          {COPY.allowed.title}
        </h1>
        <p className="mt-2 text-center text-sm text-stone-600">
          {COPY.allowed.subtitle}
        </p>
        <div className="mt-5">
          <AllowedDurationChips selected={selected} onSelect={setSelected} />
        </div>
      </div>
    </InterventionShell>
  );
}
