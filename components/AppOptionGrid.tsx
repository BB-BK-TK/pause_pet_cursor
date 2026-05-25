import { ONBOARDING_APP_OPTIONS } from "@/lib/apps";

type AppOptionGridProps = {
  selected: string | null;
  onSelect: (app: string) => void;
};

export default function AppOptionGrid({ selected, onSelect }: AppOptionGridProps) {
  return (
    <div className="app-option-grid app-option-grid--premium">
      {ONBOARDING_APP_OPTIONS.map((app) => {
        const isSelected = selected === app;
        return (
          <button
            key={app}
            type="button"
            onClick={() => onSelect(app)}
            className={`app-option-chip app-option-chip--premium ${isSelected ? "app-option-chip--selected" : ""}`}
          >
            {app}
          </button>
        );
      })}
    </div>
  );
}
