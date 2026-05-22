import OnboardingStep from "@/components/OnboardingStep";
import PrimaryButton from "@/components/PrimaryButton";
import SoftCard from "@/components/SoftCard";
import ZodiacPet from "@/components/ZodiacPet";
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
    <OnboardingStep
      step={3}
      title={COPY.onboarding.reveal.friendFrom(companion.koreanName)}
      subtitle={companion.personality}
      footer={
        <PrimaryButton onClick={onStart}>
          {COPY.onboarding.reveal.cta}
        </PrimaryButton>
      }
    >
      <SoftCard
        variant="highlight"
        className="flex flex-col items-center px-4 py-6 text-center"
      >
        <ZodiacPet zodiacSign={zodiacSign} mood="happy" size="lg" />
        <p className="pet-speech mt-5 max-w-[18rem] text-sm leading-relaxed">
          {COPY.onboarding.reveal.pausePromise(
            targetAppName,
            DEFAULT_PAUSE_MINUTES,
          )}
        </p>
      </SoftCard>
    </OnboardingStep>
  );
}
