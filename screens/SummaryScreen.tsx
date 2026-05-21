import AppShell from "@/components/AppShell";
import PrimaryButton from "@/components/PrimaryButton";
import PetDisplay from "@/components/PetDisplay";
import SoftCard from "@/components/SoftCard";
import StatChip from "@/components/StatChip";
import { COPY } from "@/lib/copy";
import { formatSessionTime } from "@/lib/date";
import { FUTURE_UI_COPY } from "@/lib/nativePermissions";
import type { PausePetState } from "@/lib/storage";
import { eventLabel } from "@/lib/storage";
import type { UserSettings } from "@/lib/settings";
import { getZodiacCompanion } from "@/lib/zodiac";

type SummaryScreenProps = {
  state: PausePetState;
  settings: UserSettings;
  onSimulate: () => void;
  onFutureProtection: () => void;
};

export default function SummaryScreen({
  state,
  settings,
  onSimulate,
  onFutureProtection,
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
      <div className="screen-stack">
        <h1 className="text-xl font-bold text-stone-900">{COPY.summary.title}</h1>
        <p className="text-sm text-stone-600">
          {companion.koreanName} 친구 · {settings.targetAppName}
        </p>

        <SoftCard variant="highlight" className="py-4">
          <PetDisplay
            mood="waiting"
            petLevel={state.petLevel}
            petExp={state.petExp}
            size="lg"
            companionEmoji={companion.emoji}
          />
        </SoftCard>

        <div className="grid grid-cols-2 gap-2">
          <StatChip
            label={COPY.summary.todayPrevented}
            value={`${state.todayPreventedCount}회`}
          />
          <StatChip
            label={COPY.summary.savedMinutes}
            value={`${state.estimatedSavedMinutes}분`}
          />
          <StatChip
            label={COPY.summary.totalPrevented}
            value={`${state.preventedCount}회`}
          />
          <StatChip
            label={COPY.summary.petLevel}
            value={COPY.pet.level(state.petLevel)}
          />
        </div>

        <SoftCard className="!p-4">
          <h2 className="text-sm font-bold text-stone-800">
            {COPY.summary.recentTitle}
          </h2>
          {recent.length === 0 ? (
            <p className="mt-2 text-sm text-stone-500">
              {COPY.summary.recentEmpty}
            </p>
          ) : (
            <ul className="mt-2 space-y-2">
              {recent.map((event) => (
                <li
                  key={event.id}
                  className="rounded-xl bg-amber-50/80 px-3 py-2 text-sm text-stone-700"
                >
                  <span className="font-medium">{eventLabel(event)}</span>
                  <span className="mt-0.5 block text-xs text-stone-500">
                    {formatSessionTime(event.createdAt)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </SoftCard>

        <button
          type="button"
          onClick={onFutureProtection}
          className="text-center text-sm text-stone-500 underline-offset-2 hover:text-stone-700 hover:underline"
        >
          {FUTURE_UI_COPY.homeLink}
        </button>
      </div>
    </AppShell>
  );
}
