"use client";

import { useState } from "react";
import AllowedDurationChips from "@/components/AllowedDurationChips";
import InterventionLayout from "@/components/InterventionLayout";
import PrimaryButton from "@/components/PrimaryButton";
import { COPY } from "@/lib/copy";
import type { UserSettings } from "@/lib/settings";
import type { AllowedDurationMinutes } from "@/lib/types";

type AllowedDurationScreenProps = {
  settings: UserSettings;
  onConfirm: (minutes: AllowedDurationMinutes) => void;
};

export default function AllowedDurationScreen({
  settings,
  onConfirm,
}: AllowedDurationScreenProps) {
  const [selected, setSelected] = useState<AllowedDurationMinutes | null>(null);

  return (
    <InterventionLayout
      zodiacSign={settings.zodiacSign}
      mood="idle"
      footer={
        <PrimaryButton
          variant="premium"
          onClick={() => selected && onConfirm(selected)}
          disabled={selected === null}
        >
          {COPY.allowed.cta}
        </PrimaryButton>
      }
    >
      <h1 className="intervention-title">{COPY.allowed.title}</h1>
      <p className="intervention-body-text">{COPY.allowed.subtitle}</p>
      <div className="mt-5">
        <AllowedDurationChips selected={selected} onSelect={setSelected} />
      </div>
    </InterventionLayout>
  );
}
