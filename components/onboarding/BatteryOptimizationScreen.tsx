"use client";

import SetupLayout, {
  SetupButton,
  SetupIllustration,
  TrustBullets,
} from "@/components/onboarding/SetupLayout";
import {
  markBatteryOptimizationDisabledMock,
  markBatteryOptimizationIntroSeen,
  markSetupSkipped,
} from "@/lib/storage";

function BatteryIcon() {
  return (
    <svg
      className="setup-icon-svg"
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden
    >
      <rect
        x="24"
        y="36"
        width="64"
        height="48"
        rx="10"
        fill="rgba(167,139,250,0.25)"
        stroke="rgba(196,181,253,0.85)"
        strokeWidth="3"
      />
      <rect
        x="88"
        y="50"
        width="10"
        height="20"
        rx="3"
        fill="rgba(196,181,253,0.85)"
      />
      <rect
        x="34"
        y="46"
        width="36"
        height="28"
        rx="6"
        fill="rgba(167,139,250,0.55)"
      />
    </svg>
  );
}

type BatteryOptimizationScreenProps = {
  onDisable: () => void;
  onLater: () => void;
};

export default function BatteryOptimizationScreen({
  onDisable,
  onLater,
}: BatteryOptimizationScreenProps) {
  return (
    <SetupLayout
      footer={
        <>
          <SetupButton
            onClick={() => {
              markBatteryOptimizationIntroSeen();
              markBatteryOptimizationDisabledMock();
              onDisable();
            }}
          >
            배터리 최적화 끄기
          </SetupButton>
          <SetupButton
            variant="ghost"
            onClick={() => {
              markBatteryOptimizationIntroSeen();
              onLater();
            }}
          >
            나중에
          </SetupButton>
        </>
      }
    >
      <div className="setup-stack">
        <SetupIllustration>
          <BatteryIcon />
        </SetupIllustration>
        <h1 className="setup-title">친구가 중간에 잠들지 않게</h1>
        <p className="setup-body">
          배터리 최적화가 켜져 있으면 Pause Pet이 백그라운드에서 멈출 수
          있어요. 안정적으로 작동하려면 최적화 제외가 필요해요.
        </p>
        <TrustBullets
          items={[
            "선택한 앱 감지를 안정적으로 유지해요",
            "타이머 알림을 놓치지 않게 해요",
            "언제든 다시 켤 수 있어요",
          ]}
        />
      </div>
    </SetupLayout>
  );
}
