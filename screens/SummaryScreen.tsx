import AppShell from "@/components/AppShell";
import PrimaryButton from "@/components/PrimaryButton";
import SoftCard from "@/components/SoftCard";
import StatChip from "@/components/StatChip";
import ZodiacPet from "@/components/ZodiacPet";
import { COPY } from "@/lib/copy";
import { formatSessionTime } from "@/lib/date";
import type { PausePetState } from "@/lib/storage";
import { eventLabel } from "@/lib/storage";
import type { UserSettings } from "@/lib/settings";
import { getZodiacCompanion } from "@/lib/zodiac";

type SummaryScreenProps = {
  state: PausePetState;
  settings: UserSettings;
  onSimulate: () => void;
  onResetOnboarding?: () => void;
};

export default function SummaryScreen({
  state,
  settings,
  onSimulate,
  onResetOnboarding,
}: SummaryScreenProps) {
  const companion = getZodiacCompanion(settings.zodiacSign);
  const recent = state.recentEvents.slice(0, 8);

  return (
    <AppShell
      footer={
        <PrimaryButton onClick={onSimulate}>
          {COPY.summary.simulate}
        </PrimaryButton>
      }
    >
      <div className="summary-stack">
        <header>
          <p className="text-sm font-medium text-stone-500">
            {COPY.summary.title}
          </p>
          <h1 className="mt-1 text-xl font-bold text-stone-900">
            오늘의 기록
          </h1>
        </header>

        <SoftCard variant="highlight" className="summary-companion-card">
          <ZodiacPet zodiacSign={settings.zodiacSign} mood="idle" size="sm" />
          <div className="min-w-0 flex-1 text-left">
            <p className="text-base font-semibold text-stone-800">
              {companion.koreanName}
            </p>
            <p className="mt-0.5 text-sm text-stone-600">
              {settings.targetAppName}
            </p>
          </div>
        </SoftCard>

        <div className="stat-grid">
          <StatChip
            label={COPY.summary.todayPrevented}
            value={`${state.todayPreventedCount}회`}
          />
          <StatChip
            label={COPY.summary.totalPrevented}
            value={`${state.preventedCount}회`}
          />
          <StatChip
            label={COPY.summary.savedMinutes}
            value={`${state.estimatedSavedMinutes}분`}
          />
          <StatChip
            label={COPY.summary.petLevel}
            value={COPY.pet.level(state.petLevel)}
          />
        </div>

        <p className="text-center text-sm text-stone-500">
          {COPY.summary.petExp} {state.petExp}
        </p>

        {recent.length > 0 ? (
          <SoftCard className="summary-events-card">
            <h2 className="text-base font-bold text-stone-800">
              {COPY.summary.recentTitle}
            </h2>
            <ul className="mt-3 space-y-2.5">
              {recent.map((event) => (
                <li key={event.id} className="summary-event-item">
                  <span className="font-medium text-stone-800">
                    {eventLabel(event)}
                  </span>
                  <span className="mt-0.5 block text-xs text-stone-500">
                    {formatSessionTime(event.createdAt)}
                  </span>
                </li>
              ))}
            </ul>
          </SoftCard>
        ) : (
          <p className="py-2 text-center text-sm text-stone-500">
            {COPY.summary.recentEmpty}
          </p>
        )}

        {onResetOnboarding ? (
          <button
            type="button"
            onClick={onResetOnboarding}
            className="summary-reset-link"
          >
            {COPY.summary.resetOnboarding}
          </button>
        ) : null}
      </div>
    </AppShell>
  );
}
