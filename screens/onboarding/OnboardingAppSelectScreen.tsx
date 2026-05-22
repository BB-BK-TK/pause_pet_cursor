"use client";

import { useState } from "react";
import AppOptionGrid from "@/components/AppOptionGrid";
import OnboardingStep from "@/components/OnboardingStep";
import PrimaryButton from "@/components/PrimaryButton";
import SoftCard from "@/components/SoftCard";
import { CUSTOM_APP_OPTION } from "@/lib/apps";
import { COPY } from "@/lib/copy";

type OnboardingAppSelectScreenProps = {
  selectedApp: string | null;
  customAppName: string;
  onSelectApp: (app: string) => void;
  onCustomAppNameChange: (name: string) => void;
  onNext: () => void;
};

export default function OnboardingAppSelectScreen({
  selectedApp,
  customAppName,
  onSelectApp,
  onCustomAppNameChange,
  onNext,
}: OnboardingAppSelectScreenProps) {
  const [touched, setTouched] = useState(false);
  const isCustom = selectedApp === CUSTOM_APP_OPTION;
  const resolvedName = isCustom ? customAppName.trim() : selectedApp?.trim() ?? "";
  const canContinue = resolvedName.length > 0;

  return (
    <OnboardingStep
      step={1}
      title={COPY.onboarding.appSelect.title}
      subtitle={COPY.onboarding.appSelect.subtitle}
      footer={
        <PrimaryButton
          onClick={() => {
            setTouched(true);
            if (canContinue) onNext();
          }}
          disabled={!canContinue}
        >
          {COPY.onboarding.appSelect.cta}
        </PrimaryButton>
      }
    >
      <AppOptionGrid selected={selectedApp} onSelect={onSelectApp} />

      {isCustom && (
        <SoftCard className="!p-4">
          <label className="block text-sm font-medium text-stone-700">
            {COPY.onboarding.appSelect.customLabel}
            <input
              type="text"
              value={customAppName}
              onChange={(e) => onCustomAppNameChange(e.target.value)}
              placeholder={COPY.onboarding.appSelect.customPlaceholder}
              className="mt-2 w-full rounded-xl border border-amber-100 bg-white px-3 py-2.5 text-sm text-stone-800 outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-200"
              maxLength={32}
            />
          </label>
          {touched && !canContinue && (
            <p className="mt-2 text-xs text-stone-500">앱 이름을 입력해주세요.</p>
          )}
        </SoftCard>
      )}
    </OnboardingStep>
  );
}
