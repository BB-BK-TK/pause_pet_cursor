"use client";

import ZodiacPet from "@/components/ZodiacPet";
import SetupLayout, {
  SetupButton,
  SetupIllustration,
} from "@/components/onboarding/SetupLayout";
import { markSetupCompleted } from "@/lib/storage";
import type { ZodiacSign } from "@/lib/zodiac";

type SetupCompleteScreenProps = {
  zodiacSign: ZodiacSign;
  onComplete: () => void;
};

export default function SetupCompleteScreen({
  zodiacSign,
  onComplete,
}: SetupCompleteScreenProps) {
  return (
    <SetupLayout
      footer={
        <SetupButton
          onClick={() => {
            markSetupCompleted();
            onComplete();
          }}
        >
          완료
        </SetupButton>
      }
    >
      <div className="setup-stack setup-stack--center">
        <SetupIllustration>
          <ZodiacPet zodiacSign={zodiacSign} mood="happy" size="lg" />
        </SetupIllustration>
        <h1 className="setup-title">모두 완료!</h1>
        <p className="setup-body">
          Pause Pet 설정이 끝났어요. 이제 선택한 앱을 열 때 별자리 친구가
          잠깐 멈춤 화면을 보여줄 수 있어요.
        </p>
      </div>
    </SetupLayout>
  );
}
