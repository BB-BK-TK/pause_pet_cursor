import { COPY } from "@/lib/copy";

type AppHeaderProps = {
  title?: string;
  showBrand?: boolean;
};

export default function AppHeader({ title, showBrand = true }: AppHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      {showBrand ? (
        <div className="flex items-center gap-2">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/80 text-lg shadow-sm"
            aria-hidden
          >
            🐱
          </span>
          <div>
            <p className="text-sm font-bold text-stone-900">{COPY.app.name}</p>
            <p className="text-[11px] text-stone-500">집중 친구</p>
          </div>
        </div>
      ) : null}
      {title ? (
        <p className="text-sm font-medium text-stone-600">{title}</p>
      ) : null}
    </div>
  );
}
