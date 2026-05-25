import InterventionLayout from "@/components/InterventionLayout";
import PrimaryButton from "@/components/PrimaryButton";
import { COPY } from "@/lib/copy";
import type { UserSettings } from "@/lib/settings";
import { getZodiacCompanion } from "@/lib/zodiac";

type ReturnReminderScreenProps = {
  settings: UserSettings;
  onReturn: () => void;
  onExtend: () => void;
};

export default function ReturnReminderScreen({
  settings,
  onReturn,
  onExtend,
}: ReturnReminderScreenProps) {
  const companion = getZodiacCompanion(settings.zodiacSign);
  const { targetAppName } = settings;

  return (
    <InterventionLayout
      zodiacSign={settings.zodiacSign}
      mood="comfort"
      footer={
        <>
          <PrimaryButton variant="premium" onClick={onReturn}>
            {COPY.returnReminder.goBack}
          </PrimaryButton>
          <PrimaryButton variant="premium-secondary" onClick={onExtend}>
            {COPY.returnReminder.extend}
          </PrimaryButton>
        </>
      }
    >
      <h1 className="intervention-title-lg">{COPY.returnReminder.title}</h1>
      <p className="intervention-body-text">
        {COPY.returnReminder.body(targetAppName)}
      </p>
      <p className="intervention-accent">
        {COPY.returnReminder.companion(companion.koreanName)}
      </p>
    </InterventionLayout>
  );
}
