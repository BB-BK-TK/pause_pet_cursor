import {
  getZodiacCompanion,
  zodiacListForPicker,
  type ZodiacSign,
} from "@/lib/zodiac";

type ZodiacSignGridProps = {
  selected: ZodiacSign | null;
  onSelect: (sign: ZodiacSign) => void;
};

export default function ZodiacSignGrid({ selected, onSelect }: ZodiacSignGridProps) {
  const signs = zodiacListForPicker();

  return (
    <div className="grid grid-cols-3 gap-2">
      {signs.map((sign) => {
        const isSelected = selected === sign.id;
        return (
          <button
            key={sign.id}
            type="button"
            onClick={() => onSelect(sign.id)}
            className={`flex flex-col items-center rounded-2xl border-2 px-1 py-2.5 transition focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 ${
              isSelected
                ? "border-amber-400 bg-gradient-to-b from-amber-50 to-amber-100/90 shadow-md shadow-amber-200/50"
                : "border-transparent bg-white/80 shadow-sm hover:border-amber-200 hover:bg-amber-50/50"
            }`}
          >
            <span className="text-xl leading-none" aria-hidden>
              {sign.emoji}
            </span>
            <span className="mt-1 text-[0.65rem] font-semibold leading-tight text-stone-800">
              {getZodiacCompanion(sign.id).koreanName}
            </span>
          </button>
        );
      })}
    </div>
  );
}
