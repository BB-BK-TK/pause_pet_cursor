import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import PrimaryButton from "@/components/PrimaryButton";
import PetDisplay from "@/components/PetDisplay";
import SoftCard from "@/components/SoftCard";
import { COPY } from "@/lib/copy";
import type { PausePetState } from "@/lib/storage";
import type { UserSettings } from "@/lib/settings";
import { getZodiacCompanion } from "@/lib/zodiac";

type GiveUpConfirmScreenProps = {
  state: PausePetState;
  settings: UserSettings;
  onContinue: () => void;
  onEnd: () => void;
};

export default function GiveUpConfirmScreen({
  state,
  settings,
  onContinue,
  onEnd,
}: GiveUpConfirmScreenProps) {
  const companion = getZodiacCompanion(settings.zodiacSign);

  return (
    <AppShell
      footer={
        <>
          <PrimaryButton onClick={onContinue}>
            {COPY.giveUp.continue}
          </PrimaryButton>
          <PrimaryButton variant="secondary" onClick={onEnd}>
            {COPY.giveUp.end}
          </PrimaryButton>
        </>
      }
    >
      <div className="screen-stack">
        <SoftCard variant="calm" className="flex flex-col items-center px-4 py-6">
          <PetDisplay
            mood="comforting"
            petLevel={state.petLevel}
            petExp={state.petExp}
            size="hero"
            showProgress={false}
            companionEmoji={companion.emoji}
          />

          <div className="mt-4 w-full">
            <PageHeader
              title={COPY.giveUp.title}
              subtitle={COPY.giveUp.body}
              align="center"
              compact
            />
            <p className="pet-speech mx-auto mt-4 max-w-[16rem]">
              {companion.giveUpComfortMessage}
            </p>
          </div>
        </SoftCard>
      </div>
    </AppShell>
  );
}
