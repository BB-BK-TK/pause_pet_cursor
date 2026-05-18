import AppShell from "@/components/AppShell";
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
      <div className="flex flex-col gap-4 pb-2">
        <SoftCard variant="calm" className="flex flex-col items-center px-5 py-8">
          <PetDisplay
            mood="comfort"
            petLevel={state.petLevel}
            petExp={state.petExp}
            size="hero"
            showProgress={false}
          />

          <div className="mt-6 w-full">
            <PageHeader
              title={COPY.giveUp.title}
              subtitle={COPY.giveUp.body}
              align="center"
              compact
            />
            <p className="mt-3 text-center text-sm leading-relaxed text-stone-500">
              {COPY.giveUp.hint}
            </p>
            <p className="pet-speech mx-auto mt-4 max-w-[16rem]">
              {COPY.giveUp.petLine}
            </p>
          </div>
        </SoftCard>
      </div>
    </AppShell>
  );
}
