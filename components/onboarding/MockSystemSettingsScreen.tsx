"use client";

import { useState } from "react";
import SetupLayout, { SetupButton } from "@/components/onboarding/SetupLayout";

type MockSystemSettingsScreenProps = {
  headerTitle: string;
  appLabel?: string;
  toggleLabel: string;
  explanation: string;
  toastMessage: string;
  onGranted: () => void;
  onBack: () => void;
};

export default function MockSystemSettingsScreen({
  headerTitle,
  appLabel = "Pause Pet",
  toggleLabel,
  explanation,
  toastMessage,
  onGranted,
  onBack,
}: MockSystemSettingsScreenProps) {
  const [enabled, setEnabled] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleToggle = () => {
    if (enabled) {
      return;
    }
    setEnabled(true);
    setShowToast(true);
    onGranted();
  };

  return (
    <SetupLayout
      showDemoBadge={false}
      footer={
        enabled ? (
          <SetupButton onClick={onBack}>앱으로 돌아가기</SetupButton>
        ) : (
          <SetupButton variant="secondary" disabled>
            권한을 켜주세요
          </SetupButton>
        )
      }
    >
      <div className="setup-mock">
        <header className="setup-mock-header">
          <button
            type="button"
            className="setup-mock-back"
            onClick={onBack}
            aria-label="뒤로"
          >
            ←
          </button>
          <h1 className="setup-mock-title">{headerTitle}</h1>
        </header>

        <div className="setup-mock-app-row">
          <div className="setup-mock-app-icon" aria-hidden>
            ★
          </div>
          <div>
            <p className="setup-mock-app-name">{appLabel}</p>
            <p className="setup-mock-app-version">버전 1.0 (웹 데모)</p>
          </div>
        </div>

        <div className="setup-mock-toggle-row">
          <span className="setup-mock-toggle-label">{toggleLabel}</span>
          <button
            type="button"
            role="switch"
            aria-checked={enabled}
            className={`setup-mock-toggle ${enabled ? "setup-mock-toggle--on" : ""}`}
            onClick={handleToggle}
          >
            <span className="setup-mock-toggle-knob" />
          </button>
        </div>

        <p className="setup-mock-explanation">{explanation}</p>

        {showToast ? (
          <p className="setup-mock-toast" role="status">
            {toastMessage}
          </p>
        ) : null}
      </div>
    </SetupLayout>
  );
}
