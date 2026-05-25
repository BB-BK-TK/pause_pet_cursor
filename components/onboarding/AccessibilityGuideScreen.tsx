"use client";

import SetupLayout, { SetupButton } from "@/components/onboarding/SetupLayout";

type AccessibilityGuideScreenProps = {
  targetAppName: string;
  onAllow: () => void;
};

export default function AccessibilityGuideScreen({
  targetAppName,
  onAllow,
}: AccessibilityGuideScreenProps) {
  const warningTarget = targetAppName.trim() || "YouTube";

  return (
    <SetupLayout
      footer={<SetupButton onClick={onAllow}>허용</SetupButton>}
    >
      <div className="setup-stack">
        <h1 className="setup-title">접근성 권한 부여 방법</h1>

        <div className="setup-card setup-card--info">
          <p className="setup-card-body">
            Android는 모든 접근성 서비스에 일반적인 보안 알림을 보여줘요.
            Pause Pet은 개인정보를 추적하거나 수집하지 않아요. 언제든 꺼도
            돼요.
          </p>
        </div>

        <ol className="setup-steps">
          <li className="setup-step">
            <span className="setup-step-num">1</span>
            <p>
              다음 화면에서 목록에서 Pause Pet을 찾아 눌러주세요.
            </p>
          </li>
          <li className="setup-step">
            <span className="setup-step-num">2</span>
            <p>
              Use Pause Pet을 켜고 Pause Pet 바로가기는 꺼진 상태로
              두세요.
            </p>
          </li>
          <li className="setup-step">
            <span className="setup-step-num">3</span>
            <p>여기서 타깃 앱을 선택하지 마세요.</p>
          </li>
        </ol>

        <div className="setup-card setup-card--warn">
          <p className="setup-card-body">
            여기서 {warningTarget}나 Instagram을 선택하지 마세요. Pause
            Pet만 켜주세요.
          </p>
        </div>
      </div>
    </SetupLayout>
  );
}
