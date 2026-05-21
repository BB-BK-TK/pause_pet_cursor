import { CUSTOM_APP_OPTION, PRESET_APPS } from "@/lib/apps";

type AppOptionGridProps = {
  selected: string | null;
  onSelect: (app: string) => void;
};

export default function AppOptionGrid({ selected, onSelect }: AppOptionGridProps) {
  const options = [...PRESET_APPS, CUSTOM_APP_OPTION];

  return (
    <div className="grid grid-cols-2 gap-2.5">
      {options.map((app) => {
        const isSelected = selected === app;
        return (
          <button
            key={app}
            type="button"
            onClick={() => onSelect(app)}
            className={`rounded-2xl border-2 px-3 py-3.5 text-center text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 ${
              isSelected
                ? "border-amber-400 bg-gradient-to-b from-amber-50 to-amber-100/90 text-amber-950 shadow-md shadow-amber-200/50"
                : "border-transparent bg-white/80 text-stone-700 shadow-sm hover:border-amber-200 hover:bg-amber-50/50"
            }`}
          >
            {app}
          </button>
        );
      })}
    </div>
  );
}
