import PageHeader from "@/components/PageHeader";
import PrimaryButton from "@/components/PrimaryButton";
import PetDisplay from "@/components/PetDisplay";
import SoftCard from "@/components/SoftCard";
import { COPY } from "@/lib/copy";
import type { PausePetState } from "@/lib/storage";

type GiveUpConfirmScreenProps = {
  state: PausePetState;
  onContinue: () => void;
  onEnd: () => void;
};

export default function GiveUpConfirmScreen({
  state,
  onContinue,
  onEnd,
}: GiveUpConfirmScreenProps) {
  return (
    <div className="flex min-h-[calc(100dvh-5rem)] flex-col justify-center gap-7 py-4">
      <SoftCard variant="calm" className="flex flex-col items-center px-6 py-10">
        <PetDisplay
          mood="comfort"
          petLevel={state.petLevel}
          petExp={state.petExp}
          size="hero"
          showProgress={false}
        />

        <div className="mt-8 w-full">
          <PageHeader
            title={COPY.giveUp.title}
            subtitle={COPY.giveUp.body}
            align="center"
            compact
          />
          <p className="mt-3 text-center text-sm text-stone-500">
            {COPY.giveUp.hint}
          </p>
        </div>
      </SoftCard>

      <div className="flex flex-col gap-3">
        <PrimaryButton onClick={onContinue}>{COPY.giveUp.continue}</PrimaryButton>
        <PrimaryButton variant="secondary" onClick={onEnd}>
          {COPY.giveUp.end}
        </PrimaryButton>
      </div>
    </div>
  );
}
