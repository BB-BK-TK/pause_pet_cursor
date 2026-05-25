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
  return (
    <div className="intervention-frame">
      <div className="intervention-gradient intervention-gradient--premium" aria-hidden />
      {softBg ? (
        <div
          className={`intervention-gradient-accent bg-gradient-to-b ${softBg} opacity-30`}
          aria-hidden
        />
      ) : null}
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
