import InterventionLayout from "@/components/InterventionLayout";
import PrimaryButton from "@/components/PrimaryButton";
import { COPY } from "@/lib/copy";
import type { UserSettings } from "@/lib/settings";

type InterventionScreenProps = {
  settings: UserSettings;
  onNotOpen: () => void;
  onWillOpen: () => void;
};

export default function InterventionScreen({
  settings,
  onNotOpen,
  onWillOpen,
}: InterventionScreenProps) {
  const { targetAppName } = settings;

  return (
    <InterventionLayout
      zodiacSign={settings.zodiacSign}
      mood="intercept"
      simulateLine={COPY.intervention.opening(targetAppName)}
      footer={
        <>
          <PrimaryButton onClick={onNotOpen}>
            {COPY.intervention.notOpen}
          </PrimaryButton>
          <PrimaryButton variant="secondary" onClick={onWillOpen}>
            {COPY.intervention.willOpen}
          </PrimaryButton>
        </>
      }
    >
      <p className="intervention-body-text">{COPY.intervention.askWait}</p>
      <p className="intervention-question">{COPY.intervention.askOpen}</p>
    </InterventionLayout>
  );
}
