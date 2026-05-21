import AppShell from "@/components/AppShell";
import DurationChips from "@/components/DurationChips";
import PageHeader from "@/components/PageHeader";
import PrimaryButton from "@/components/PrimaryButton";
import PetDisplay from "@/components/PetDisplay";
import SoftCard from "@/components/SoftCard";
import { COPY } from "@/lib/copy";
import type { PausePetState } from "@/lib/storage";
import type { UserSettings } from "@/lib/settings";
import type { FocusDurationMinutes } from "@/lib/types";
import { getZodiacCompanion } from "@/lib/zodiac";

type FocusSetupScreenProps = {
  state: PausePetState;
  settings: UserSettings;
  selected: FocusDurationMinutes | null;
  onSelect: (minutes: FocusDurationMinutes) => void;
  onBack: () => void;
  onStart: () => void;
};

export default function FocusSetupScreen({
  state,
  settings,
  selected,
  onSelect,
  onBack,
  onStart,
}: FocusSetupScreenProps) {
  const companion = getZodiacCompanion(settings.zodiacSign);
  const petLine = selected ? COPY.setup.petReady : COPY.setup.petPick;

  return (
    <AppShell
      footer={
        <PrimaryButton onClick={onStart} disabled={selected === null}>
          {COPY.setup.cta}
        </PrimaryButton>
      }
    >
      <div className="screen-stack">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex w-fit items-center rounded-full bg-white/80 px-3 py-1.5 text-sm font-medium text-stone-600 shadow-sm"
        >
          {COPY.setup.back}
        </button>

        <PageHeader
          title={COPY.setup.title}
          subtitle={COPY.setup.subtitle(settings.targetAppName)}
          align="left"
          compact
        />

        <SoftCard variant="highlight" className="py-4">
          <PetDisplay
            mood="waiting"
            petLevel={state.petLevel}
            petExp={state.petExp}
            size="lg"
            companionEmoji={companion.emoji}
          />
          <p className="pet-speech mt-3">{petLine}</p>
        </SoftCard>

        <SoftCard className="!p-4">
          <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wider text-stone-500">
            {COPY.setup.durationLabel}
          </p>
          <DurationChips selected={selected} onSelect={onSelect} />
        </SoftCard>
      </div>
    </AppShell>
  );
}
