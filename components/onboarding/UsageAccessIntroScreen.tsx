"use client";

import SetupLayout, {
  SetupButton,
  SetupIllustration,
} from "@/components/onboarding/SetupLayout";
import { markUsageAccessIntroSeen } from "@/lib/storage";

function UsageLockIcon() {
  return (
    <svg
      className="setup-icon-svg"
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden
    >
      <rect
        x="28"
        y="52"
        width="64"
        height="48"
        rx="12"
        fill="rgba(167,139,250,0.35)"
        stroke="rgba(196,181,253,0.9)"
        strokeWidth="3"
      />
      <path
        d="M44 52V40a16 16 0 0 1 32 0v12"
        stroke="rgba(196,181,253,0.95)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="60" cy="76" r="6" fill="rgba(224,231,255,0.9)" />
    </svg>
  );
}

type UsageAccessIntroScreenProps = {
  onAllow: () => void;
  onLater: () => void;
};

export default function UsageAccessIntroScreen({
  onAllow,
  onLater,
}: UsageAccessIntroScreenProps) {
  return (
    <SetupLayout
      footer={
        <>
          <SetupButton
            onClick={() => {
              markUsageAccessIntroSeen();
              onAllow();
            }}
          >
            권한 허용
          </SetupButton>
          <SetupButton variant="ghost" onClick={onLater}>
            나중에
          </SetupButton>
        </>
      }
    >
      <div className="setup-stack">
        <SetupIllustration>
          <UsageLockIcon />
        </SetupIllustration>
        <h1 className="setup-title">앱 사용 권한</h1>
        <p className="setup-body">
          앱 사용 권한을 주면, Pause Pet이 선택한 앱을 열 때 잠깐 멈추라고
          알려줄 수 있어요.
        </p>
      </div>
    </SetupLayout>
  );
}
