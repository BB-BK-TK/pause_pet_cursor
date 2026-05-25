"use client";

import { useMemo, useState } from "react";
import OnboardingStep from "@/components/OnboardingStep";
import PrimaryButton from "@/components/PrimaryButton";
import ZodiacCompanionImage from "@/components/ZodiacCompanionImage";
import ZodiacSignGrid from "@/components/ZodiacSignGrid";
import { COPY } from "@/lib/copy";
import {
  getZodiacCompanion,
  getZodiacFromBirthday,
  type ZodiacSign,
} from "@/lib/zodiac";

type InputMode = "select" | "birthday";

type OnboardingZodiacScreenProps = {
  onNext: (result: {
    zodiacSign: ZodiacSign;
    birthdayMonth?: number;
    birthdayDay?: number;
  }) => void;
};

export default function OnboardingZodiacScreen({ onNext }: OnboardingZodiacScreenProps) {
  const [mode, setMode] = useState<InputMode>("select");
  const [selectedSign, setSelectedSign] = useState<ZodiacSign | null>(null);
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  const birthdayMonth = month ? Number(month) : null;
  const birthdayDay = day ? Number(day) : null;

  const birthdaySign = useMemo(() => {
    if (birthdayMonth === null || birthdayDay === null) return null;
    return getZodiacFromBirthday(birthdayMonth, birthdayDay);
  }, [birthdayMonth, birthdayDay]);

  const resolvedSign = mode === "select" ? selectedSign : birthdaySign;
  const previewSign = resolvedSign;

  const handleNext = () => {
    if (!resolvedSign) return;

    if (mode === "birthday" && birthdayMonth && birthdayDay) {
      onNext({
        zodiacSign: resolvedSign,
        birthdayMonth,
        birthdayDay,
      });
      return;
    }

    onNext({ zodiacSign: resolvedSign });
  };

  return (
    <OnboardingStep
      step={2}
      title={COPY.onboarding.zodiac.title}
      subtitle={COPY.onboarding.zodiac.subtitle}
      footer={
        <PrimaryButton variant="premium" onClick={handleNext} disabled={!resolvedSign}>
          {COPY.onboarding.zodiac.cta}
        </PrimaryButton>
      }
    >
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setMode("select")}
          className={`flex-1 rounded-full px-3 py-2 text-sm font-semibold transition ${
            mode === "select"
              ? "bg-violet-500 text-white shadow-sm"
              : "bg-violet-500/10 text-violet-200/80"
          }`}
        >
          {COPY.onboarding.zodiac.tabSelect}
        </button>
        <button
          type="button"
          onClick={() => setMode("birthday")}
          className={`flex-1 rounded-full px-3 py-2 text-sm font-semibold transition ${
            mode === "birthday"
              ? "bg-violet-500 text-white shadow-sm"
              : "bg-violet-500/10 text-violet-200/80"
          }`}
        >
          {COPY.onboarding.zodiac.tabBirthday}
        </button>
      </div>

      {previewSign && (
        <div className="flex justify-center py-1">
          <ZodiacCompanionImage
            zodiacSign={previewSign}
            preset="selectionPreview"
            mood="idle"
          />
        </div>
      )}

      {mode === "select" ? (
        <ZodiacSignGrid selected={selectedSign} onSelect={setSelectedSign} />
      ) : (
        <div className="premium-input-card !p-4">
          <div className="grid grid-cols-2 gap-3">
            <label className="block text-sm font-medium text-violet-100">
              {COPY.onboarding.zodiac.birthdayMonth}
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="premium-input mt-2 w-full"
              >
                <option value="">월</option>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <option key={m} value={m}>
                    {m}월
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm font-medium text-stone-700">
              {COPY.onboarding.zodiac.birthdayDay}
              <select
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="premium-input mt-2 w-full"
              >
                <option value="">일</option>
                {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                  <option key={d} value={d}>
                    {d}일
                  </option>
                ))}
              </select>
            </label>
          </div>

          {birthdaySign && (
            <p className="mt-3 text-center text-sm font-medium text-violet-200/90">
              {COPY.onboarding.zodiac.birthdayHint(
                getZodiacCompanion(birthdaySign).koreanName,
              )}
            </p>
          )}
        </div>
      )}
    </OnboardingStep>
  );
}
