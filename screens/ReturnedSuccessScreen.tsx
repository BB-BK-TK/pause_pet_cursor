import InterventionLayout from "@/components/InterventionLayout";
import PrimaryButton from "@/components/PrimaryButton";
import { COPY } from "@/lib/copy";
import type { UserSettings } from "@/lib/settings";

type ReturnedSuccessScreenProps = {
  settings: UserSettings;
  onRetry: () => void;
};

export default function ReturnedSuccessScreen({
  settings,
  onRetry,
}: ReturnedSuccessScreenProps) {
  return (
    <InterventionLayout
      zodiacSign={settings.zodiacSign}
      mood="happy"
      footer={
        <PrimaryButton onClick={onRetry}>{COPY.returned.cta}</PrimaryButton>
      }
    >
      <h1 className="intervention-title-lg">{COPY.returned.title}</h1>
      <p className="intervention-body-text">
        {COPY.returned.body(settings.targetAppName)}
      </p>
    </InterventionLayout>
  );
}
