import ZodiacCompanionImage from "@/components/ZodiacCompanionImage";
import { zodiacListForPicker, type ZodiacSign } from "@/lib/zodiac";

type ZodiacSignGridProps = {
  selected: ZodiacSign | null;
  onSelect: (sign: ZodiacSign) => void;
};

export default function ZodiacSignGrid({ selected, onSelect }: ZodiacSignGridProps) {
  const signs = zodiacListForPicker();

  return (
    <div className="zodiac-grid zodiac-grid--premium">
      {signs.map((sign) => {
        const isSelected = selected === sign.id;
        return (
          <button
            key={sign.id}
            type="button"
            onClick={() => onSelect(sign.id)}
            className={`zodiac-grid-item zodiac-grid-item--premium ${isSelected ? "zodiac-grid-item--selected" : ""}`}
          >
            <ZodiacCompanionImage
              zodiacSign={sign.id}
              preset="selection"
              className="zodiac-grid-card"
            />
            {/* Card PNGs include the sign name — avoid duplicate label */}
          </button>
        );
      })}
    </div>
  );
}
