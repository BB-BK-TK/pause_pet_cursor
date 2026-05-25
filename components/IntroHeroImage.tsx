"use client";

import { useState } from "react";
import PausePetAssetImage from "@/components/PausePetAssetImage";
import ZodiacCompanionImage from "@/components/ZodiacCompanionImage";
import { INTRO_HERO_PATH } from "@/lib/zodiacAssets";

type IntroHeroImageProps = {
  className?: string;
  /** True when the full intro artwork PNG loaded (hides duplicate HTML copy). */
  onArtworkLoad?: (loaded: boolean) => void;
};

export default function IntroHeroImage({
  className = "",
  onArtworkLoad,
}: IntroHeroImageProps) {
  const [pngLoaded, setPngLoaded] = useState(false);

  const handleLoadState = (state: "pending" | "loaded" | "error") => {
    const loaded = state === "loaded";
    setPngLoaded(loaded);
    onArtworkLoad?.(loaded);
  };

  return (
    <div
      className={`intro-hero-wrap ${pngLoaded ? "intro-hero-wrap--artwork" : ""} ${className}`}
    >
      <PausePetAssetImage
        src={INTRO_HERO_PATH}
        alt="Pause Pet 소개"
        className="intro-hero-asset"
        imgClassName="intro-hero-img"
        priority
        onLoadStateChange={handleLoadState}
        fallback={
          <div className="intro-hero-fallback">
            <ZodiacCompanionImage
              zodiacSign="gemini"
              preset="reveal"
              mood="idle"
              priority
            />
          </div>
        }
      />
    </div>
  );
}
