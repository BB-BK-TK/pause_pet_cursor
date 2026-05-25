"use client";

import { useCallback, useState } from "react";
import AccessibilityGuideScreen from "@/components/onboarding/AccessibilityGuideScreen";
import AccessibilityIntroScreen from "@/components/onboarding/AccessibilityIntroScreen";
import BatteryOptimizationScreen from "@/components/onboarding/BatteryOptimizationScreen";
import MockSystemSettingsScreen from "@/components/onboarding/MockSystemSettingsScreen";
import PermissionIntroScreen from "@/components/onboarding/PermissionIntroScreen";
import SetupCompleteScreen from "@/components/onboarding/SetupCompleteScreen";
import UsageAccessGuideScreen from "@/components/onboarding/UsageAccessGuideScreen";
import UsageAccessIntroScreen from "@/components/onboarding/UsageAccessIntroScreen";
import {
  markAccessibilityGrantedMock,
  markUsageAccessGrantedMock,
} from "@/lib/storage";
import type { ZodiacSign } from "@/lib/zodiac";

export type SetupFlowStep =
  | "permissionIntro"
  | "accessibilityIntro"
  | "accessibilityGuide"
  | "mockAccessibility"
  | "usageAccessIntro"
  | "usageAccessGuide"
  | "mockUsageAccess"
  | "batteryOptimization"
  | "setupComplete";

type SetupFlowProps = {
  zodiacSign: ZodiacSign;
  targetAppName: string;
  onFinish: () => void;
  onSkip: () => void;
};

export default function SetupFlow({
  zodiacSign,
  targetAppName,
  onFinish,
  onSkip,
}: SetupFlowProps) {
  const [step, setStep] = useState<SetupFlowStep>("permissionIntro");

  const goUsageIntro = useCallback(() => setStep("usageAccessIntro"), []);
  const goBattery = useCallback(() => setStep("batteryOptimization"), []);
  const goComplete = useCallback(() => setStep("setupComplete"), []);

  switch (step) {
    case "permissionIntro":
      return (
        <PermissionIntroScreen
          zodiacSign={zodiacSign}
          onStart={() => setStep("accessibilityIntro")}
          onSkip={onSkip}
        />
      );

    case "accessibilityIntro":
      return (
        <AccessibilityIntroScreen
          zodiacSign={zodiacSign}
          onContinue={() => setStep("accessibilityGuide")}
        />
      );

    case "accessibilityGuide":
      return (
        <AccessibilityGuideScreen
          targetAppName={targetAppName}
          onAllow={() => setStep("mockAccessibility")}
        />
      );

    case "mockAccessibility":
      return (
        <MockSystemSettingsScreen
          headerTitle="접근성 권한 허용"
          toggleLabel="권한 허용"
          explanation="앱에서 어떤 다른 앱을 얼마나 자주 사용하는지 모니터하고 서비스 공급자, 언어 설정 및 기타 사용 데이터를 확인합니다."
          toastMessage="Pause Pet 권한을 허용했어요."
          onGranted={markAccessibilityGrantedMock}
          onBack={goUsageIntro}
        />
      );

    case "usageAccessIntro":
      return (
        <UsageAccessIntroScreen
          onAllow={() => setStep("usageAccessGuide")}
          onLater={goBattery}
        />
      );

    case "usageAccessGuide":
      return (
        <UsageAccessGuideScreen
          onContinue={() => setStep("mockUsageAccess")}
        />
      );

    case "mockUsageAccess":
      return (
        <MockSystemSettingsScreen
          headerTitle="사용정보 접근 허용"
          toggleLabel="권한 허용"
          explanation="선택한 앱이 열리는 순간을 감지하기 위한 권한이에요."
          toastMessage="Pause Pet 권한을 허용했어요."
          onGranted={markUsageAccessGrantedMock}
          onBack={goBattery}
        />
      );

    case "batteryOptimization":
      return (
        <BatteryOptimizationScreen
          onDisable={goComplete}
          onLater={goComplete}
        />
      );

    case "setupComplete":
      return (
        <SetupCompleteScreen zodiacSign={zodiacSign} onComplete={onFinish} />
      );

    default:
      return null;
  }
}
