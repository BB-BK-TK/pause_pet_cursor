import { SetupDemoBadge } from "@/components/onboarding/SetupLayout";
import InterventionLayout from "@/components/InterventionLayout";
import PrimaryButton from "@/components/PrimaryButton";
import { COPY } from "@/lib/copy";
import type { UserSettings } from "@/lib/settings";
import { getPermissionSetupState } from "@/lib/storage";

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
  const permission = getPermissionSetupState();
  const showDemoBadge =
    permission.setupSkipped ||
    !permission.accessibilityGrantedMock ||
    !permission.usageAccessGrantedMock;

  return (
    <InterventionLayout
      zodiacSign={settings.zodiacSign}
      mood="intercept"
      simulateLine={COPY.intervention.opening(targetAppName)}
      header={showDemoBadge ? <SetupDemoBadge /> : undefined}
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
