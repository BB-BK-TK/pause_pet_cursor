import { FOCUS_DURATIONS } from "@/lib/constants";
import type { FocusDurationMinutes } from "@/lib/types";

type DurationChipsProps = {
  selected: FocusDurationMinutes | null;
  onSelect: (minutes: FocusDurationMinutes) => void;
};

export default function DurationChips({ selected, onSelect }: DurationChipsProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {FOCUS_DURATIONS.map((minutes) => {
        const isSelected = selected === minutes;
        return (
          <button
            key={minutes}
            type="button"
            onClick={() => onSelect(minutes)}
            className={`rounded-2xl border-2 px-4 py-4 text-center transition focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 ${
              isSelected
                ? "border-amber-400 bg-gradient-to-b from-amber-50 to-amber-100/90 text-amber-950 shadow-md shadow-amber-200/50"
                : "border-transparent bg-white/80 text-stone-700 shadow-sm hover:border-amber-200 hover:bg-amber-50/50"
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
