import type { ReactNode } from "react";

type InterventionShellProps = {
  children: ReactNode;
  footer?: ReactNode;
  softBg?: string;
};

/** Full-screen intervention layer (simulates covering a distracting app). */
export default function InterventionShell({
  children,
  footer,
  softBg,
}: InterventionShellProps) {
  const gradientClass = softBg
    ? `bg-gradient-to-b ${softBg}`
    : "intervention-gradient-default";

  return (
    <div className="intervention-frame">
      <div className={`intervention-gradient ${gradientClass}`} aria-hidden />
      <div className="intervention-scroll">
        <div className="intervention-scroll-inner">{children}</div>
      </div>
      {footer ? (
        <footer className="intervention-footer">
          <div className="app-footer-stack">{footer}</div>
        </footer>
      ) : null}
    </div>
  );
}
