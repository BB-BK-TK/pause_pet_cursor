import type { ReactNode } from "react";
import AppShell from "@/components/AppShell";

type OnboardingStepProps = {
  step: 1 | 2 | 3;
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
};

const stepLabels = {
  1: "앱 선택",
  2: "별자리",
  3: "친구 만나기",
} as const;

export default function OnboardingStep({
  step,
  title,
  subtitle,
  children,
  footer,
}: OnboardingStepProps) {
  return (
    <AppShell footer={footer}>
      <div className="onboarding-stack">
        <p className="onboarding-step-label">
          {step} / 3 · {stepLabels[step]}
        </p>
        <header className="onboarding-header">
          <h1 className="onboarding-title">{title}</h1>
          <p className="onboarding-subtitle">{subtitle}</p>
        </header>
        <div className="onboarding-content">{children}</div>
      </div>
    </AppShell>
  );
}
