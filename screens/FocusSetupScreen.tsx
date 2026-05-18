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
  return (
    <div className="flex flex-col gap-7">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex w-fit items-center gap-1 rounded-full bg-white/70 px-3 py-1.5 text-sm font-medium text-stone-600 shadow-sm transition hover:bg-white hover:text-stone-800"
      >
        {COPY.setup.back}
      </button>

      <PageHeader
        title={COPY.setup.title}
        subtitle={COPY.setup.subtitle}
        align="left"
        compact
      />

      <SoftCard variant="highlight" className="py-8">
        <PetDisplay
          mood="idle"
          petLevel={state.petLevel}
          petExp={state.petExp}
          size="lg"
        />
      </SoftCard>

      <SoftCard className="!p-5">
        <p className="mb-4 text-center text-xs font-semibold uppercase tracking-wider text-stone-500">
          집중 시간
        </p>
        <DurationChips selected={selected} onSelect={onSelect} />
      </SoftCard>

      <PrimaryButton onClick={onStart} disabled={selected === null}>
        {COPY.setup.cta}
      </PrimaryButton>
    </div>
  );
}
