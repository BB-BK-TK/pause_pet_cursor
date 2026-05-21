import AppShell from "@/components/AppShell";
import PrimaryButton from "@/components/PrimaryButton";
import PetDisplay from "@/components/PetDisplay";
import SoftCard from "@/components/SoftCard";
import { DEFAULT_PAUSE_MINUTES } from "@/lib/constants";
import { COPY } from "@/lib/copy";
import { getZodiacCompanion, type ZodiacSign } from "@/lib/zodiac";

type OnboardingRevealScreenProps = {
  targetAppName: string;
  zodiacSign: ZodiacSign;
  onStart: () => void;
};

export default function OnboardingRevealScreen({
  targetAppName,
  zodiacSign,
  onStart,
}: OnboardingRevealScreenProps) {
  const companion = getZodiacCompanion(zodiacSign);

  return (
    <AppShell
      footer={
        <PrimaryButton onClick={onStart}>
          {COPY.onboarding.reveal.cta}
        </PrimaryButton>
      }
    >
      <div className="screen-stack">
        <SoftCard variant="highlight" className="flex flex-col items-center px-4 py-6 text-center">
          <PetDisplay
            mood="curious"
            petLevel={1}
            petExp={0}
            size="lg"
            showProgress={false}
            companionEmoji={companion.emoji}
          />

          <h1 className="mt-5 text-xl font-bold leading-snug text-stone-900">
            {COPY.onboarding.reveal.friendFrom(companion.koreanName)}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-stone-600">
            {companion.companionPersonality}
          </p>
          <p className="pet-speech mt-4 max-w-[18rem]">
            {COPY.onboarding.reveal.pausePromise(
              targetAppName,
              DEFAULT_PAUSE_MINUTES,
            )}
          </p>
          <p className="mt-2 text-xs text-stone-400">{companion.dateRange}</p>
        </SoftCard>
      </div>
    </AppShell>
  );
}
