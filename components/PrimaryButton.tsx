import type { ReactNode } from "react";

type PrimaryButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "ghost";
  type?: "button" | "submit";
};

const variants = {
  primary:
    "bg-gradient-to-b from-amber-400 to-amber-500 text-white shadow-[0_4px_14px_rgba(245,158,11,0.35)] hover:from-amber-500 hover:to-amber-600 active:scale-[0.98] focus:ring-amber-300",
  secondary:
    "border border-amber-200/90 bg-white text-stone-800 shadow-sm hover:bg-amber-50/80 active:scale-[0.98] focus:ring-amber-200",
  ghost:
    "bg-transparent text-stone-500 hover:bg-stone-100/60 hover:text-stone-700 focus:ring-stone-200",
};

export default function PrimaryButton({
  children,
  onClick,
  disabled,
  variant = "primary",
  type = "button",
}: PrimaryButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full rounded-2xl px-6 py-4 text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-45 disabled:shadow-none ${variants[variant]}`}
    >
      {children}
    </button>
  );
}
