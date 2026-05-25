"use client";

import { useState } from "react";
import ZodiacPet from "@/components/ZodiacPet";
import SetupLayout, {
  SetupButton,
  SetupIllustration,
  TrustBullets,
} from "@/components/onboarding/SetupLayout";
import { markAccessibilityIntroSeen } from "@/lib/storage";
import type { ZodiacSign } from "@/lib/zodiac";

type AccessibilityIntroScreenProps = {
  zodiacSign: ZodiacSign;
  onContinue: () => void;
};

export default function AccessibilityIntroScreen({
  zodiacSign,
  onContinue,
}: AccessibilityIntroScreenProps) {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <SetupLayout
      footer={
        <>
          <SetupButton
            onClick={() => {
              markAccessibilityIntroSeen();
              onContinue();
            }}
          >
            계속
          </SetupButton>
          <SetupButton
            variant="ghost"
            onClick={() => setShowDetail((v) => !v)}
          >
            자세히
          </SetupButton>
        </>
      }
    >
      <div className="setup-stack">
        <SetupIllustration>
          <ZodiacPet zodiacSign={zodiacSign} mood="focus" size="lg" />
        </SetupIllustration>
        <h1 className="setup-title">접근성 권한</h1>
        <p className="setup-body">
          Pause Pet이 선택한 앱 위에 잠깐 나타나려면 접근성 권한이 필요해요.
        </p>
        <div className="setup-card">
          <p className="setup-card-label">내 데이터는 항상</p>
          <TrustBullets items={["비공개", "오프라인", "기기 내"]} />
        </div>
        {showDetail ? (
          <p className="setup-detail-text">
            Android는 앱이 화면 위에 개입하려면 접근성 권한을 요구해요. Pause
            Pet은 선택한 앱을 열 때 멈춤 화면을 보여주기 위한 목적으로만
            사용해요.
          </p>
        ) : null}
      </div>
    </SetupLayout>
  );
}
