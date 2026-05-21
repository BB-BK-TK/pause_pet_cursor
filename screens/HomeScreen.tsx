import AppShell from "@/components/AppShell";
import PrimaryButton from "@/components/PrimaryButton";
import PetDisplay from "@/components/PetDisplay";
import SoftCard from "@/components/SoftCard";
import StatChip from "@/components/StatChip";
import { COPY } from "@/lib/copy";
import { formatSessionTime } from "@/lib/date";
import { expForDuration, type PausePetState } from "@/lib/storage";
import type { UserSettings } from "@/lib/settings";
import { getZodiacCompanion } from "@/lib/zodiac";

type HomeScreenProps = {
  state: PausePetState;
  settings: UserSettings;
  onQuickPause: () => void;
  onChooseDuration: () => void;
};

export default function HomeScreen({
  state,
  settings,
  onQuickPause,
  onChooseDuration,
}: HomeScreenProps) {
  const recent = state.completedSessions.slice(0, 5);
  const { targetAppName, defaultPauseMinutes, zodiacSign } = settings;
  const companion = getZodiacCompanion(zodiacSign);

  return (
    <AppShell
      footer={
        <>
          <PrimaryButton onClick={onQuickPause}>
            {COPY.home.ctaPause(defaultPauseMinutes)}
          </PrimaryButton>
          <button
            type="button"
            onClick={onChooseDuration}
            className="w-full py-2 text-center text-sm font-medium text-stone-500 underline-offset-2 hover:text-stone-700 hover:underline"
          >
            {COPY.home.ctaOtherDuration}
          </button>
        </>
      }
    >
      <div className="screen-stack">
        <p className="text-center text-sm leading-relaxed text-stone-600">
          {COPY.app.tagline}
        </p>
        <p className="loop-hint">{COPY.home.loopHint}</p>

        <SoftCard variant="highlight" className="px-4 py-5">
          <div className="mb-3 flex justify-center">
            <span className="target-app-badge">
              {COPY.home.targetBadge(targetAppName)}
            </span>
          </div>
          <p className="mb-1 text-center text-base font-bold leading-snug text-stone-900">
            {COPY.home.companionWaiting(companion.koreanName)}
          </p>
          <p className="mb-3 text-center text-sm leading-relaxed text-stone-700">
            {COPY.home.prompt(targetAppName, defaultPauseMinutes)}
          </p>
          <PetDisplay
            mood="waiting"
            petLevel={state.petLevel}
            petExp={state.petExp}
            size="lg"
            companionEmoji={companion.emoji}
          />
          <p className="pet-speech mt-3">{companion.homeMessage}</p>
        </SoftCard>

        <div className="flex gap-2">
          <StatChip
            label={COPY.home.statMinutes}
            value={`${state.totalFocusMinutes}분`}
          />
          <StatChip
            label={COPY.home.statSessions}
            value={`${state.completedSessions.length}회`}
          />
          <StatChip label={COPY.home.statStreak} value={`${state.streak}일`} />
        </div>

        <SoftCard className="!p-4">
          <h2 className="text-sm font-bold text-stone-800">
            {COPY.home.historyTitle}
          </h2>
          {recent.length === 0 ? (
            <p className="mt-2 text-sm leading-relaxed text-stone-500">
              {COPY.home.historyEmpty}
            </p>
          ) : (
            <ul className="mt-2 space-y-2">
              {recent.map((session) => (
                <li
                  key={session.id}
                  className="rounded-2xl bg-amber-50/80 px-3 py-2 text-sm"
                >
                  <span className="font-semibold text-stone-800">
                    {COPY.home.sessionLine(
                      session.durationMinutes,
                      targetAppName,
                    )}
                  </span>
                  <span className="mt-0.5 block text-xs text-stone-500">
                    {COPY.home.growthPoints(
                      expForDuration(session.durationMinutes),
                    )}{" "}
                    · {formatSessionTime(session.completedAt)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </SoftCard>
      </div>
    </AppShell>
  );
}

