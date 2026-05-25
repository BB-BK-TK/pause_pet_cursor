import type { ReactNode } from "react";

type SetupLayoutProps = {
  children: ReactNode;
  footer: ReactNode;
  showDemoBadge?: boolean;
};

export function SetupDemoBadge() {
  return (
    <span className="setup-demo-badge" aria-label="웹 데모 모드">
      웹 데모 모드
    </span>
  );
}

export default function SetupLayout({
  children,
  footer,
  showDemoBadge = true,
}: SetupLayoutProps) {
  return (
    <div className="setup-frame animate-fade-up">
      <div className="setup-gradient" aria-hidden />
      {showDemoBadge ? (
        <div className="setup-top-bar">
          <SetupDemoBadge />
        </div>
      ) : null}
      <div className="setup-scroll">{children}</div>
      <footer className="setup-footer">
        <div className="setup-footer-stack">{footer}</div>
      </footer>
    </div>
  );
}

type SetupButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  disabled?: boolean;
};

export function SetupButton({
  children,
  onClick,
  variant = "primary",
  disabled,
}: SetupButtonProps) {
  const classes = {
    primary: "setup-btn setup-btn--primary",
    secondary: "setup-btn setup-btn--secondary",
    ghost: "setup-btn setup-btn--ghost",
  };
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={classes[variant]}
    >
      {children}
    </button>
  );
}

type TrustBulletsProps = {
  items: string[];
};

export function TrustBullets({ items }: TrustBulletsProps) {
  return (
    <ul className="setup-trust-list">
      {items.map((item) => (
        <li key={item} className="setup-trust-item">
          <span className="setup-trust-dot" aria-hidden />
          {item}
        </li>
      ))}
    </ul>
  );
}

type SetupIllustrationProps = {
  children: ReactNode;
};

export function SetupIllustration({ children }: SetupIllustrationProps) {
  return <div className="setup-illustration">{children}</div>;
}
