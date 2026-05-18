import AppShell from "@/components/AppShell";
import PrimaryButton from "@/components/PrimaryButton";
import PetDisplay from "@/components/PetDisplay";
import SoftCard from "@/components/SoftCard";
import StatChip from "@/components/StatChip";
import { COPY } from "@/lib/copy";
import { formatSessionTime } from "@/lib/date";
import { expForDuration, type PausePetState } from "@/lib/storage";

type HomeScreenProps = {
  state: PausePetState;
  onStart: () => void;
};

export default function HomeScreen({ state, onStart }: HomeScreenProps) {
  const recent = state.completedSessions.slice(0, 5);
  const statusText =
    state.completedSessions.length === 0
      ? COPY.home.statusFirst
      : COPY.home.statusReturning;

  return (
    <AppShell
      footer={
        <PrimaryButton onClick={onStart}>{COPY.home.ctaStart}</PrimaryButton>
      }
    >
      <div className="flex flex-col gap-5 pb-2">
        <p className="text-center text-sm leading-relaxed text-stone-600">
          {COPY.app.tagline}
        </p>
        <p className="loop-hint">{COPY.home.loopHint}</p>

        <SoftCard variant="highlight" className="px-5 py-6">
          <p className="mb-4 text-center text-sm font-medium text-stone-700">
            {statusText}
          </p>
          <PetDisplay
            mood="idle"
            petLevel={state.petLevel}
            petExp={state.petExp}
            size="lg"
          />
          <p className="pet-speech mt-4">{COPY.home.petWhisper}</p>
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
            <p className="mt-3 text-sm leading-relaxed text-stone-500">
              {COPY.home.historyEmpty}
            </p>
          ) : (
            <ul className="mt-3 space-y-2">
              {recent.map((session) => (
                <li
                  key={session.id}
                  className="rounded-2xl bg-amber-50/80 px-3 py-2.5 text-sm"
                >
                  <span className="font-semibold text-stone-800">
                    {COPY.home.sessionLine(session.durationMinutes)}
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
