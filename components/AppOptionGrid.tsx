import { ONBOARDING_APP_OPTIONS } from "@/lib/apps";

type AppOptionGridProps = {
  selected: string | null;
  onSelect: (app: string) => void;
};

export default function AppOptionGrid({ selected, onSelect }: AppOptionGridProps) {
  return (
    <div className="app-option-grid">
      {ONBOARDING_APP_OPTIONS.map((app) => {
        const isSelected = selected === app;
        return (
          <button
            key={app}
            type="button"
            onClick={() => onSelect(app)}
            className={`app-option-chip ${isSelected ? "app-option-chip--selected" : ""}`}
          >
            {app}
          </button>
        );
      })}
    </div>
  );
}
