import type { ReactNode } from "react";
import InterventionShell from "@/components/InterventionShell";
import ZodiacCompanionImage from "@/components/ZodiacCompanionImage";
import type { ZodiacPetMood } from "@/components/ZodiacPet";
import { getZodiacCompanion, type ZodiacSign } from "@/lib/zodiac";

type InterventionLayoutProps = {
  zodiacSign: ZodiacSign;
  mood: ZodiacPetMood;
  footer: ReactNode;
  children: ReactNode;
  simulateLine?: string;
  header?: ReactNode;
};

export default function InterventionLayout({
  zodiacSign,
  mood,
  footer,
  children,
  simulateLine,
  header,
}: InterventionLayoutProps) {
  const companion = getZodiacCompanion(zodiacSign);

  return (
    <InterventionShell softBg={companion.softBg} footer={footer}>
      <div className="intervention-stack">
        {header ? (
          <div className="flex w-full justify-center">{header}</div>
        ) : null}
        {simulateLine ? (
          <p className="intervention-simulate-line">{simulateLine}</p>
        ) : null}
        <div className="intervention-pet-wrap">
          <ZodiacCompanionImage
            zodiacSign={zodiacSign}
            preset="intervention"
            mood={mood}
            className="intervention-pet"
          />
        </div>
        <div className="intervention-card">{children}</div>
      </div>
    </InterventionShell>
  );
}
