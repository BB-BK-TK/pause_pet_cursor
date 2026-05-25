import OnboardingStep from "@/components/OnboardingStep";
import PrimaryButton from "@/components/PrimaryButton";
import ZodiacCompanionImage from "@/components/ZodiacCompanionImage";
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
        <PrimaryButton variant="premium" onClick={onStart}>
          {COPY.onboarding.reveal.cta}
        </PrimaryButton>
      }
    >
      <div className="premium-reveal-card flex flex-col items-center px-4 py-6 text-center">
        <ZodiacCompanionImage
          zodiacSign={zodiacSign}
          preset="reveal"
          mood="happy"
        />
        <p className="pet-speech pet-speech--premium mt-5 max-w-[18rem] text-sm leading-relaxed">
          {COPY.onboarding.reveal.pausePromise(
            targetAppName,
            DEFAULT_PAUSE_MINUTES,
          )}
        </p>
      </div>
    </OnboardingStep>
  );
}
