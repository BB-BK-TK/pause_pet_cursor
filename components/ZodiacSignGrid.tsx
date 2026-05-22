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
    <div className="zodiac-grid">
      {signs.map((sign) => {
        const isSelected = selected === sign.id;
        return (
          <button
            key={sign.id}
            type="button"
            onClick={() => onSelect(sign.id)}
            className={`zodiac-grid-item ${isSelected ? "zodiac-grid-item--selected" : ""}`}
          >
            <span className="text-xl leading-none" aria-hidden>
              {sign.symbol}
            </span>
            <span className="zodiac-grid-label">
              {getZodiacCompanion(sign.id).koreanName}
            </span>
          </button>
        );
      })}
    </div>
  );
}
