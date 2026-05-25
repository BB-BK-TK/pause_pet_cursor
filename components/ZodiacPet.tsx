import { getZodiacCompanion, type ZodiacSign } from "@/lib/zodiac";

export type ZodiacPetMood = "idle" | "intercept" | "happy" | "comfort" | "focus";

type ZodiacPetProps = {
  zodiacSign: ZodiacSign;
  mood?: ZodiacPetMood;
  size?: "sm" | "md" | "lg" | "xl";
  /** Hide SVG ground shadow + symbol when parent provides stage (e.g. ZodiacCompanionImage). */
  embedded?: boolean;
  className?: string;
};

const pixelSize = { sm: 72, md: 112, lg: 152, xl: 176 } as const;

function lighten(hex: string, amount: number): string {
  const n = hex.replace("#", "");
  if (n.length !== 6) return "#fde68a";
  const r = Math.min(255, parseInt(n.slice(0, 2), 16) + amount);
  const g = Math.min(255, parseInt(n.slice(2, 4), 16) + amount);
  const b = Math.min(255, parseInt(n.slice(4, 6), 16) + amount);
  return `rgb(${r},${g},${b})`;
}

function Eyes({ mood }: { mood: ZodiacPetMood }) {
  if (mood === "happy") {
    return (
      <>
        <path d="M38 46 Q42 50 46 46" stroke="#5c4a3a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M54 46 Q58 50 62 46" stroke="#5c4a3a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </>
    );
  }
  if (mood === "comfort") {
    return (
      <>
        <ellipse cx="42" cy="48" rx="3" ry="2" fill="#5c4a3a" opacity="0.7" />
        <ellipse cx="58" cy="48" rx="3" ry="2" fill="#5c4a3a" opacity="0.7" />
      </>
    );
  }
  if (mood === "focus") {
    return (
      <>
        <circle cx="42" cy="47" r="4" fill="#fff" />
        <circle cx="58" cy="47" r="4" fill="#fff" />
        <circle cx="43" cy="47" r="2" fill="#5c4a3a" />
        <circle cx="59" cy="47" r="2" fill="#5c4a3a" />
      </>
    );
  }
  if (mood === "intercept") {
    return (
      <>
        <circle cx="42" cy="47" r="5" fill="#fff" />
        <circle cx="58" cy="47" r="5" fill="#fff" />
        <circle cx="43" cy="46" r="2.5" fill="#5c4a3a" />
        <circle cx="59" cy="46" r="2.5" fill="#5c4a3a" />
        <circle cx="44" cy="45" r="1" fill="#fff" />
        <circle cx="60" cy="45" r="1" fill="#fff" />
      </>
    );
  }
  return (
    <>
      <circle cx="42" cy="47" r="4" fill="#fff" />
      <circle cx="58" cy="47" r="4" fill="#fff" />
      <circle cx="43" cy="47" r="2" fill="#5c4a3a" />
      <circle cx="59" cy="47" r="2" fill="#5c4a3a" />
    </>
  );
}

function Mouth({ mood }: { mood: ZodiacPetMood }) {
  if (mood === "happy") {
    return <path d="M44 58 Q50 64 56 58" stroke="#5c4a3a" strokeWidth="2" fill="none" strokeLinecap="round" />;
  }
  if (mood === "comfort") {
    return <path d="M46 60 Q50 58 54 60" stroke="#5c4a3a" strokeWidth="2" fill="none" strokeLinecap="round" />;
  }
  return <ellipse cx="50" cy="58" rx="4" ry="3" fill="#e8b4a0" opacity="0.6" />;
}

function SignDetail({ sign, accent }: { sign: ZodiacSign; accent: string }) {
  switch (sign) {
    case "aries":
      return (
        <g fill={accent} opacity="0.85">
          <path d="M34 28 L38 22 L42 28 Z" />
          <path d="M58 28 L62 22 L66 28 Z" />
        </g>
      );
    case "taurus":
      return (
        <g fill={accent} opacity="0.8">
          <ellipse cx="36" cy="30" rx="5" ry="3" transform="rotate(-25 36 30)" />
          <ellipse cx="64" cy="30" rx="5" ry="3" transform="rotate(25 64 30)" />
        </g>
      );
    case "gemini":
      return (
        <g fill={accent} opacity="0.75">
          <circle cx="32" cy="32" r="4" />
          <circle cx="68" cy="32" r="4" />
          <rect x="30" y="24" width="4" height="10" rx="2" />
          <rect x="66" y="24" width="4" height="10" rx="2" />
        </g>
      );
    case "cancer":
      return (
        <g fill={accent} opacity="0.8">
          <path d="M28 38 Q24 42 28 46" stroke={accent} strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M72 38 Q76 42 72 46" stroke={accent} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </g>
      );
    case "leo":
      return (
        <g fill={accent} opacity="0.5">
          <path d="M30 34 Q50 18 70 34 Q62 28 50 26 Q38 28 30 34" />
        </g>
      );
    case "virgo":
      return (
        <g fill={accent} opacity="0.85">
          <path d="M48 22 L50 14 L52 22" />
          <path d="M44 24 Q50 20 56 24" stroke={accent} strokeWidth="2" fill="none" />
        </g>
      );
    case "libra":
      return (
        <g stroke={accent} strokeWidth="2" fill="none" opacity="0.85">
          <line x1="42" y1="26" x2="58" y2="26" />
          <path d="M46 26 L50 20 L54 26" />
        </g>
      );
    case "scorpio":
      return (
        <path
          d="M72 62 Q78 70 74 78 Q70 72 68 66"
          stroke={accent}
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          opacity="0.85"
        />
      );
    case "sagittarius":
      return (
        <g fill={accent} opacity="0.85">
          <path d="M62 24 L68 18 L66 28 Z" />
          <circle cx="66" cy="20" r="2" fill="#fff" opacity="0.8" />
        </g>
      );
    case "capricorn":
      return (
        <g fill={accent} opacity="0.85">
          <path d="M32 28 Q28 22 34 20 Q40 24 36 30 Z" />
          <path d="M64 28 Q68 22 62 20 Q56 24 60 30 Z" />
        </g>
      );
    case "aquarius":
      return (
        <g fill="none" stroke={accent} strokeWidth="2" opacity="0.8">
          <path d="M32 30 Q38 26 44 30 T56 30" strokeLinecap="round" />
          <path d="M44 30 Q50 34 56 30" strokeLinecap="round" />
        </g>
      );
    case "pisces":
      return (
        <g fill={accent} opacity="0.75">
          <ellipse cx="34" cy="72" rx="6" ry="4" transform="rotate(-20 34 72)" />
          <ellipse cx="66" cy="72" rx="6" ry="4" transform="rotate(20 66 72)" />
          <circle cx="50" cy="24" r="3" fill="#fff" opacity="0.6" />
        </g>
      );
    default:
      return null;
  }
}

export default function ZodiacPet({
  zodiacSign,
  mood = "idle",
  size = "md",
  embedded = false,
  className = "",
}: ZodiacPetProps) {
  const companion = getZodiacCompanion(zodiacSign);
  const accent = companion.accentColor;
  const bodyFill = lighten(accent, 80);
  const bodyStroke = lighten(accent, 40);
  const dim = pixelSize[size];
  const floatClass = mood === "idle" || mood === "intercept" ? "animate-gentle-float" : "";

  return (
    <svg
      viewBox="0 0 100 100"
      width={dim}
      height={dim}
      className={`zodiac-pet shrink-0 ${floatClass} ${className}`}
      role="img"
      aria-label={`${companion.koreanName} 별자리 친구`}
    >
      {!embedded ? (
        <ellipse cx="50" cy="88" rx="28" ry="6" fill="#000" opacity="0.06" />
      ) : null}
      <circle cx="50" cy="58" r="34" fill={bodyFill} stroke={bodyStroke} strokeWidth="1.5" />
      <circle cx="50" cy="58" r="34" fill={`url(#shine-${zodiacSign})`} opacity="0.35" />
      <defs>
        <radialGradient id={`shine-${zodiacSign}`} cx="40%" cy="35%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <SignDetail sign={zodiacSign} accent={accent} />
      <ellipse cx="50" cy="52" rx="18" ry="14" fill="#fff" opacity="0.35" />
      <Eyes mood={mood} />
      <Mouth mood={mood} />
      <ellipse cx="38" cy="56" rx="5" ry="3" fill="#ffb4a2" opacity="0.35" />
      <ellipse cx="62" cy="56" rx="5" ry="3" fill="#ffb4a2" opacity="0.35" />
      {!embedded ? (
        <text
          x="50"
          y="94"
          textAnchor="middle"
          fontSize="10"
          fill={accent}
          opacity="0.7"
          fontWeight="600"
        >
          {companion.symbol}
        </text>
      ) : null}
    </svg>
  );
}
