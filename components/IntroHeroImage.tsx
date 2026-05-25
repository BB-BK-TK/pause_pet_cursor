"use client";

import { useState } from "react";
import PausePetAssetImage from "@/components/PausePetAssetImage";
import ZodiacCompanionImage from "@/components/ZodiacCompanionImage";
import { INTRO_HERO_PATH } from "@/lib/zodiacAssets";

type IntroHeroImageProps = {
  className?: string;
};

export default function IntroHeroImage({ className = "" }: IntroHeroImageProps) {
  const [pngLoaded, setPngLoaded] = useState(false);

  return (
    <div className={`intro-hero-wrap ${className}`}>
      {!pngLoaded ? <div className="intro-hero-glow" aria-hidden /> : null}
      <PausePetAssetImage
        src={INTRO_HERO_PATH}
        alt="Pause Pet 별자리 친구들"
        className="intro-hero-asset"
        imgClassName="intro-hero-img"
        priority
        onLoadStateChange={(state) => setPngLoaded(state === "loaded")}
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
