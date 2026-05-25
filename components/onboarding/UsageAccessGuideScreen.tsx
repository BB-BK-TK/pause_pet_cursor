"use client";

import SetupLayout, { SetupButton } from "@/components/onboarding/SetupLayout";

type UsageAccessGuideScreenProps = {
  onContinue: () => void;
};

export default function UsageAccessGuideScreen({
  onContinue,
}: UsageAccessGuideScreenProps) {
  return (
    <SetupLayout
      footer={<SetupButton onClick={onContinue}>다음</SetupButton>}
    >
      <div className="setup-stack">
        <h1 className="setup-title">앱 사용 권한 부여 방법</h1>

        <div className="setup-card setup-card--info">
          <p className="setup-card-body">
            사용 정보 접근은 선택한 앱이 열리는 순간만 확인해요. 기록은
            기기 안에만 남아요.
          </p>
        </div>

        <ol className="setup-steps">
          <li className="setup-step">
            <span className="setup-step-num">1</span>
            <p>다음 화면에서 Pause Pet을 찾아 눌러주세요.</p>
          </li>
          <li className="setup-step">
            <span className="setup-step-num">2</span>
            <p>권한 허용 스위치를 켜주세요.</p>
          </li>
        </ol>
      </div>
    </SetupLayout>
  );
}
