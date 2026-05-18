import PageHeader from "@/components/PageHeader";
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
    <div className="flex flex-col gap-7">
      <PageHeader title={COPY.app.name} subtitle={COPY.app.tagline} />

      <SoftCard variant="highlight" className="px-6 py-8">
        <p className="mb-6 text-center text-sm leading-relaxed text-stone-600">
          {statusText}
        </p>
        <PetDisplay
          mood="idle"
          petLevel={state.petLevel}
          petExp={state.petExp}
          size="lg"
        />
      </SoftCard>

      <div className="flex gap-2.5">
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

      <div className="pt-1">
        <PrimaryButton onClick={onStart}>{COPY.home.ctaStart}</PrimaryButton>
      </div>

      <SoftCard className="!p-5">
        <h2 className="text-sm font-bold text-stone-800">
          {COPY.home.historyTitle}
        </h2>
        {recent.length === 0 ? (
          <p className="mt-4 text-sm leading-relaxed text-stone-500">
            {COPY.home.historyEmpty}
          </p>
        ) : (
          <ul className="mt-4 space-y-2.5">
            {recent.map((session) => (
              <li
                key={session.id}
                className="flex flex-col gap-0.5 rounded-2xl bg-amber-50/70 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="font-semibold text-stone-800">
                  {COPY.home.sessionLine(session.durationMinutes)}
                </span>
                <span className="text-xs text-stone-500 sm:text-sm">
                  {COPY.home.growthPoints(
                    expForDuration(session.durationMinutes),
                  )}{" "}
                  · {formatSessionTime(session.completedAt)}
                </span>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-5 border-t border-stone-100/80 pt-4 text-center text-xs text-stone-500">
          {COPY.home.petGrowth(state.petLevel, state.petExp)}
        </p>
      </SoftCard>
    </div>
  );
}
