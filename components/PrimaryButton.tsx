import type { ReactNode } from "react";

type PrimaryButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "ghost" | "premium" | "premium-secondary";
  type?: "button" | "submit";
};

const variants = {
  primary:
    "bg-gradient-to-b from-amber-400 to-amber-500 text-white shadow-[0_4px_14px_rgba(245,158,11,0.35)] hover:from-amber-500 hover:to-amber-600 active:scale-[0.98] focus:ring-amber-300",
  secondary:
    "border-2 border-amber-200/90 bg-white text-stone-800 shadow-sm hover:bg-amber-50/80 active:scale-[0.98] focus:ring-amber-200",
  ghost:
    "bg-transparent text-stone-500 hover:bg-stone-100/60 hover:text-stone-700 focus:ring-stone-200",
  premium:
    "rounded-full bg-gradient-to-b from-violet-400 to-indigo-600 text-white shadow-[0_6px_24px_rgba(99,102,241,0.4)] active:scale-[0.98] focus:ring-violet-400/50 focus:ring-offset-[#0c0c14]",
  "premium-secondary":
    "rounded-full border border-violet-300/35 bg-violet-500/15 text-violet-50 active:scale-[0.98] focus:ring-violet-400/40 focus:ring-offset-[#0c0c14]",
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
      className={`btn-touch w-full px-5 text-[1.0625rem] font-semibold leading-snug transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-45 disabled:shadow-none ${variant === "premium" || variant === "premium-secondary" ? "rounded-full py-3.5" : "rounded-2xl"} ${variants[variant]}`}
    >
      {children}
    </button>
  );
}
