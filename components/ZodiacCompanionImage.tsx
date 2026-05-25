"use client";

import { useState, type CSSProperties } from "react";
import PausePetAssetImage, {
  type AssetLoadState,
} from "@/components/PausePetAssetImage";
import ZodiacPet, { type ZodiacPetMood } from "@/components/ZodiacPet";
import {
  COMPANION_PRESETS,
  getZodiacAssetPath,
  type CompanionPresetKey,
  type ZodiacAssetVariant,
} from "@/lib/zodiacAssets";
import { getZodiacCompanion, type ZodiacSign } from "@/lib/zodiac";

export type CompanionImageSize = "sm" | "md" | "lg" | "xl" | "hero";

type ZodiacCompanionImageProps = {
  zodiacSign: ZodiacSign;
  variant?: ZodiacAssetVariant;
  mood?: ZodiacPetMood;
  size?: CompanionImageSize;
  preset?: CompanionPresetKey;
  showStageOnFallback?: boolean;
  className?: string;
  priority?: boolean;
};

const iconHeights: Record<CompanionImageSize, number> = {
  sm: 72,
  md: 112,
  lg: 152,
  xl: 176,
  hero: 220,
};

const cardHeights: Record<CompanionImageSize, number> = {
  sm: 88,
  md: 140,
  lg: 200,
  xl: 240,
  hero: 280,
};

function resolveProps(props: ZodiacCompanionImageProps) {
  const preset = props.preset ? COMPANION_PRESETS[props.preset] : null;
  return {
    variant: props.variant ?? preset?.variant ?? "icon",
    size: props.size ?? preset?.size ?? "md",
    showStageOnFallback:
      props.showStageOnFallback ?? preset?.showStageOnFallback ?? true,
  };
}

function SvgFallback({
  zodiacSign,
  mood,
  size,
  showStage,
  className,
}: {
  zodiacSign: ZodiacSign;
  mood: ZodiacPetMood;
  size: CompanionImageSize;
  showStage: boolean;
  className: string;
}) {
  const companion = getZodiacCompanion(zodiacSign);
  const svgSize =
    size === "hero" ? "xl" : size === "xl" ? "xl" : size;

  return (
    <div
      className={`companion-present ${showStage ? "companion-present--stage" : ""} ${className}`}
    >
      {showStage ? (
        <>
          <div
            className="companion-stage-glow"
            style={
              { "--companion-accent": companion.accentColor } as CSSProperties
            }
            aria-hidden
          />
          <div className="companion-stage-sparkles" aria-hidden>
            <span className="companion-spark companion-spark--1" />
            <span className="companion-spark companion-spark--2" />
            <span className="companion-spark companion-spark--3" />
          </div>
        </>
      ) : null}
      <ZodiacPet
        zodiacSign={zodiacSign}
        mood={mood}
        size={svgSize}
        embedded={showStage}
        className="companion-present__svg"
      />
    </div>
  );
}

export default function ZodiacCompanionImage(props: ZodiacCompanionImageProps) {
  const {
    zodiacSign,
    mood = "idle",
    className = "",
    priority = false,
  } = props;
  const { variant, size, showStageOnFallback } = resolveProps(props);
  const [loadState, setLoadState] = useState<AssetLoadState>("pending");

  const companion = getZodiacCompanion(zodiacSign);
  const src = getZodiacAssetPath(zodiacSign, variant);
  const height = variant === "card" ? cardHeights[size] : iconHeights[size];
  const imgClass =
    variant === "card"
      ? "companion-present__img companion-present__img--card"
      : "companion-present__img companion-present__img--icon";

  if (loadState === "error") {
    return (
      <SvgFallback
        zodiacSign={zodiacSign}
        mood={mood}
        size={size}
        showStage={showStageOnFallback}
        className={className}
      />
    );
  }

  return (
    <div className={`companion-present companion-present--png ${className}`}>
      <PausePetAssetImage
        src={src}
        alt={`${companion.koreanName} 별자리 친구`}
        fallback={
          <SvgFallback
            zodiacSign={zodiacSign}
            mood={mood}
            size={size}
            showStage={showStageOnFallback}
            className=""
          />
        }
        className="companion-present__asset"
        imgClassName={imgClass}
        height={height}
        priority={priority}
        onLoadStateChange={setLoadState}
      />
    </div>
  );
}
