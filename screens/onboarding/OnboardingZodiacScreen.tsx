"use client";

import { useMemo, useState } from "react";
import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import PrimaryButton from "@/components/PrimaryButton";
import PetDisplay from "@/components/PetDisplay";
import SoftCard from "@/components/SoftCard";
import ZodiacSignGrid from "@/components/ZodiacSignGrid";
import { COPY } from "@/lib/copy";
import {
  getZodiacCompanion,
  isValidBirthday,
  zodiacFromBirthday,
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
  const [touched, setTouched] = useState(false);

  const birthdayMonth = month ? Number(month) : null;
  const birthdayDay = day ? Number(day) : null;

  const birthdaySign = useMemo(() => {
    if (birthdayMonth === null || birthdayDay === null) {
      return null;
    }
    if (!isValidBirthday(birthdayMonth, birthdayDay)) {
      return null;
    }
    return zodiacFromBirthday(birthdayMonth, birthdayDay);
  }, [birthdayMonth, birthdayDay]);

  const resolvedSign = mode === "select" ? selectedSign : birthdaySign;

  const canContinue = resolvedSign !== null;

  const handleNext = () => {
    setTouched(true);
    if (!resolvedSign) {
      return;
    }

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
    <AppShell
      footer={
        <PrimaryButton onClick={handleNext} disabled={!canContinue}>
          {COPY.onboarding.zodiac.cta}
        </PrimaryButton>
      }
    >
      <div className="screen-stack">
        <PageHeader
          title={COPY.onboarding.zodiac.title}
          subtitle={COPY.onboarding.zodiac.subtitle}
          align="left"
          compact
        />

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setMode("select")}
            className={`flex-1 rounded-full px-3 py-2 text-sm font-semibold transition ${
              mode === "select"
                ? "bg-amber-400 text-white shadow-sm"
                : "bg-white/80 text-stone-600"
            }`}
          >
            {COPY.onboarding.zodiac.tabSelect}
          </button>
          <button
            type="button"
            onClick={() => setMode("birthday")}
            className={`flex-1 rounded-full px-3 py-2 text-sm font-semibold transition ${
              mode === "birthday"
                ? "bg-amber-400 text-white shadow-sm"
                : "bg-white/80 text-stone-600"
            }`}
          >
            {COPY.onboarding.zodiac.tabBirthday}
          </button>
        </div>

        {mode === "select" ? (
          <>
            <div className="flex justify-center">
              <PetDisplay
                mood="curious"
                petLevel={1}
                petExp={0}
                size="md"
                showProgress={false}
                companionEmoji={
                  selectedSign
                    ? getZodiacCompanion(selectedSign).emoji
                    : undefined
                }
              />
            </div>
            <ZodiacSignGrid
              selected={selectedSign}
              onSelect={setSelectedSign}
            />
          </>
        ) : (
          <SoftCard className="!p-4">
            <div className="grid grid-cols-2 gap-3">
              <label className="block text-sm font-medium text-stone-700">
                {COPY.onboarding.zodiac.birthdayMonth}
                <select
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-amber-100 bg-white px-3 py-2.5 text-sm text-stone-800 outline-none focus:border-amber-300"
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
                  className="mt-2 w-full rounded-xl border border-amber-100 bg-white px-3 py-2.5 text-sm text-stone-800 outline-none focus:border-amber-300"
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
              <p className="mt-3 text-center text-sm font-medium text-amber-900/90">
                {COPY.onboarding.zodiac.birthdayHint(
                  getZodiacCompanion(birthdaySign).koreanName,
                )}
              </p>
            )}

            {touched && !canContinue && (
              <p className="mt-2 text-center text-xs text-stone-500">
                생일을 선택해주세요.
              </p>
            )}

            {birthdaySign && (
              <div className="mt-2 flex justify-center">
                <PetDisplay
                  mood="curious"
                  petLevel={1}
                  petExp={0}
                  size="md"
                  showProgress={false}
                  companionEmoji={getZodiacCompanion(birthdaySign).emoji}
                />
              </div>
            )}
          </SoftCard>
        )}
      </div>
    </AppShell>
  );
}
