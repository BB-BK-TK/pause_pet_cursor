import type { ReactNode } from "react";

type AppShellProps = {
  children: ReactNode;
  footer?: ReactNode;
  header?: ReactNode;
};

export default function AppShell({ children, footer, header }: AppShellProps) {
  return (
    <>
      {header ? <header className="app-header">{header}</header> : null}
      <div className="app-scroll">{children}</div>
      {footer ? (
        <footer className="app-footer">
          <div className="app-footer-stack">{footer}</div>
        </footer>
      ) : null}
    </>
  );
}
