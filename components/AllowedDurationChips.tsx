import { ALLOWED_DURATIONS } from "@/lib/constants";
import type { AllowedDurationMinutes } from "@/lib/types";

type AllowedDurationChipsProps = {
  selected: AllowedDurationMinutes | null;
  onSelect: (minutes: AllowedDurationMinutes) => void;
};

export default function AllowedDurationChips({
  selected,
  onSelect,
}: AllowedDurationChipsProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {ALLOWED_DURATIONS.map((minutes) => {
        const isSelected = selected === minutes;
        return (
          <button
            key={minutes}
            type="button"
            onClick={() => onSelect(minutes)}
            className={`rounded-2xl border-2 px-4 py-5 text-center transition focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 ${
              isSelected
                ? "border-amber-400 bg-white text-amber-950 shadow-lg shadow-amber-200/60"
                : "border-white/60 bg-white/70 text-stone-700 hover:border-amber-200"
            }`}
          >
            <span className="block text-2xl font-bold tabular-nums">{minutes}</span>
            <span className="mt-0.5 block text-xs font-medium text-stone-500">
              분
            </span>
          </button>
        );
      })}
    </div>
  );
}
