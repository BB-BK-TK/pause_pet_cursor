import type { ReactNode } from "react";
import AppShell from "@/components/AppShell";

type OnboardingStepProps = {
  step: 1 | 2 | 3;
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
  theme?: "premium" | "warm";
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
  theme = "premium",
}: OnboardingStepProps) {
  const header = (
    <>
      <p className="onboarding-step-label">
        {step} / 3 · {stepLabels[step]}
      </p>
      <header className="onboarding-header">
        <h1 className="onboarding-title">{title}</h1>
        <p className="onboarding-subtitle">{subtitle}</p>
      </header>
    </>
  );

  const content = (
    <div className="onboarding-stack">
      {header}
      <div className="onboarding-content">{children}</div>
    </div>
  );

  if (theme === "premium") {
    return (
      <div className="premium-frame premium-frame--onboarding flex min-h-0 flex-1 flex-col">
        <div className="premium-gradient" aria-hidden />
        <div className="premium-scroll">{content}</div>
        <footer className="premium-footer">
          <div className="premium-footer-stack">{footer}</div>
        </footer>
      </div>
    );
  }

  return (
    <AppShell footer={footer}>
      <div className="onboarding-stack">
        {header}
        <div className="onboarding-content">{children}</div>
      </div>
    </AppShell>
  );
}
