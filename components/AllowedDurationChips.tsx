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
    <div className="duration-chip-grid">
      {ALLOWED_DURATIONS.map((minutes) => {
        const isSelected = selected === minutes;
        return (
          <button
            key={minutes}
            type="button"
            onClick={() => onSelect(minutes)}
            className={`duration-chip ${isSelected ? "duration-chip--selected" : ""}`}
          >
            <span className="duration-chip-value">{minutes}</span>
            <span className="duration-chip-unit">분</span>
          </button>
        );
      })}
    </div>
  );
}
