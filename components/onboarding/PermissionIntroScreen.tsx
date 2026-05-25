"use client";

import ZodiacCompanionImage from "@/components/ZodiacCompanionImage";
import SetupLayout, {
  SetupButton,
  SetupIllustration,
  TrustBullets,
} from "@/components/onboarding/SetupLayout";
import { markSetupSkipped } from "@/lib/storage";
import type { ZodiacSign } from "@/lib/zodiac";

type PermissionIntroScreenProps = {
  zodiacSign: ZodiacSign;
  onStart: () => void;
  onSkip: () => void;
};

export default function PermissionIntroScreen({
  zodiacSign,
  onStart,
  onSkip,
}: PermissionIntroScreenProps) {
  return (
    <SetupLayout
      footer={
        <>
          <SetupButton onClick={onStart}>설정 시작하기</SetupButton>
          <SetupButton
            variant="ghost"
            onClick={() => {
              markSetupSkipped();
              onSkip();
            }}
          >
            나중에 할게요
          </SetupButton>
        </>
      }
    >
      <div className="setup-stack">
        <SetupIllustration>
          <ZodiacCompanionImage
            zodiacSign={zodiacSign}
            preset="setupHero"
            mood="idle"
          />
        </SetupIllustration>
        <h1 className="setup-title">
          Pause Pet이 나타나려면
          <br />
          준비가 필요해요
        </h1>
        <p className="setup-body">
          선택한 앱을 열려고 할 때, 별자리 친구가 잠깐 멈춤 화면을 보여줄 수
          있도록 몇 가지 설정을 도와드릴게요.
        </p>
        <TrustBullets
          items={[
            "사용 데이터는 기기 안에서만 확인돼요",
            "선택한 앱 사용 순간만 감지해요",
            "언제든 설정에서 끌 수 있어요",
          ]}
        />
      </div>
    </SetupLayout>
  );
}
