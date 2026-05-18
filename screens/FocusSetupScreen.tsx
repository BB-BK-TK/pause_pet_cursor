import AppShell from "@/components/AppShell";
import DurationChips from "@/components/DurationChips";
import PageHeader from "@/components/PageHeader";
import PrimaryButton from "@/components/PrimaryButton";
import PetDisplay from "@/components/PetDisplay";
import SoftCard from "@/components/SoftCard";
import { COPY } from "@/lib/copy";
import type { PausePetState } from "@/lib/storage";
import type { FocusDurationMinutes } from "@/lib/types";

type FocusSetupScreenProps = {
  state: PausePetState;
  selected: FocusDurationMinutes | null;
  onSelect: (minutes: FocusDurationMinutes) => void;
  onBack: () => void;
  onStart: () => void;
};

export default function FocusSetupScreen({
  state,
  selected,
  onSelect,
  onBack,
  onStart,
}: FocusSetupScreenProps) {
  const petMood = selected ? "waiting" : "idle";
  const petLine = selected ? COPY.setup.petReady : COPY.setup.petPick;

  return (
    <AppShell
      footer={
        <PrimaryButton onClick={onStart} disabled={selected === null}>
          {COPY.setup.cta}
        </PrimaryButton>
      }
    >
      <div className="flex flex-col gap-5 pb-2">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex w-fit items-center rounded-full bg-white/80 px-3 py-1.5 text-sm font-medium text-stone-600 shadow-sm"
        >
          {COPY.setup.back}
        </button>

        <PageHeader
          title={COPY.setup.title}
          subtitle={COPY.setup.subtitle}
          align="left"
          compact
        />

        <SoftCard variant="highlight" className="py-6">
          <PetDisplay
            mood={petMood}
            petLevel={state.petLevel}
            petExp={state.petExp}
            size="lg"
          />
          <p className="pet-speech mt-4">{petLine}</p>
        </SoftCard>

        <SoftCard className="!p-4">
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-wider text-stone-500">
            집중 시간
          </p>
          <DurationChips selected={selected} onSelect={onSelect} />
        </SoftCard>
      </div>
    </AppShell>
  );
}
