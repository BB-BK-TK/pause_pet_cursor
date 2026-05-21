import type { ReactNode } from "react";

type InterventionShellProps = {
  children: ReactNode;
  footer?: ReactNode;
  showOpening?: string;
};

/** Full-screen intervention layer (simulates covering a distracting app). */
export default function InterventionShell({
  children,
  footer,
  showOpening,
}: InterventionShellProps) {
  return (
    <div className="intervention-frame">
      <div className="intervention-gradient" aria-hidden />
      {showOpening ? (
        <p className="intervention-opening animate-intervention-fade">
          {showOpening}
        </p>
      ) : null}
      <div className="intervention-body">{children}</div>
      {footer ? (
        <footer className="intervention-footer">
          <div className="app-footer-stack">{footer}</div>
        </footer>
      ) : null}
    </div>
  );
}
