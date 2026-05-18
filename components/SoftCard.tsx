import type { ReactNode } from "react";

type SoftCardVariant = "default" | "highlight" | "calm" | "celebrate";

const variantClass: Record<SoftCardVariant, string> = {
  default: "soft-card",
  highlight: "soft-card-highlight",
  calm: "soft-card-calm",
  celebrate: "soft-card-celebrate",
};

type SoftCardProps = {
  children: ReactNode;
  variant?: SoftCardVariant;
  className?: string;
};

export default function SoftCard({
  children,
  variant = "default",
  className = "",
}: SoftCardProps) {
  return (
    <section className={`${variantClass[variant]} ${className}`.trim()}>
      {children}
    </section>
  );
}
