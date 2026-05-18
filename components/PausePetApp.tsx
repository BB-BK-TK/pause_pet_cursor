"use client";

import { useCallback, useRef, useState } from "react";
import PetDisplay from "@/components/PetDisplay";
import { usePausePetState } from "@/hooks/usePausePetState";
import { COPY } from "@/lib/copy";
import type { FocusDurationMinutes, ScreenName } from "@/lib/types";
import HomeScreen from "@/screens/HomeScreen";
import FocusSetupScreen from "@/screens/FocusSetupScreen";
import ActiveSessionScreen from "@/screens/ActiveSessionScreen";
import GiveUpConfirmScreen from "@/screens/GiveUpConfirmScreen";
import SuccessScreen from "@/screens/SuccessScreen";

export default function PausePetApp() {
  const { state, hydrated, recordCompletion } = usePausePetState();
  const [screen, setScreen] = useState<ScreenName>("home");
  const [selectedDuration, setSelectedDuration] =
    useState<FocusDurationMinutes | null>(null);
  const [endsAt, setEndsAt] = useState<string | null>(null);
  const [lastExpGained, setLastExpGained] = useState(0);
  const [lastDuration, setLastDuration] = useState<FocusDurationMinutes>(15);
  const completingRef = useRef(false);

  const startSession = useCallback((duration: FocusDurationMinutes) => {
    const end = new Date(Date.now() + duration * 60 * 1000).toISOString();
    setSelectedDuration(duration);
    setLastDuration(duration);
    setEndsAt(end);
    completingRef.current = false;
    setScreen("active");
  }, []);

  const handleTimerComplete = useCallback(() => {
    if (completingRef.current || !selectedDuration) {
      return;
    }
    completingRef.current = true;

    const { expGained } = recordCompletion(selectedDuration);
    setLastExpGained(expGained);
    setEndsAt(null);
    setScreen("success");
  }, [selectedDuration, recordCompletion]);

  if (!hydrated) {
    return (
      <main className="app-shell flex min-h-[100dvh] flex-col items-center justify-center">
        <PetDisplay mood="idle" petLevel={1} petExp={0} showProgress={false} />
        <p className="mt-6 text-sm text-stone-500">{COPY.app.loading}</p>
      </main>
    );
  }

  return (
    <main className="app-shell min-h-[100dvh] animate-fade-up">
      {screen === "home" && (
        <HomeScreen state={state} onStart={() => setScreen("setup")} />
      )}

      {screen === "setup" && (
        <FocusSetupScreen
          state={state}
          selected={selectedDuration}
          onSelect={setSelectedDuration}
          onBack={() => {
            setSelectedDuration(null);
            setScreen("home");
          }}
          onStart={() => {
            if (selectedDuration) {
              startSession(selectedDuration);
            }
          }}
        />
      )}

      {screen === "active" && endsAt && selectedDuration && (
        <ActiveSessionScreen
          state={state}
          endsAt={endsAt}
          durationMinutes={selectedDuration}
          onGiveUp={() => setScreen("giveUpConfirm")}
          onComplete={handleTimerComplete}
        />
      )}

      {screen === "giveUpConfirm" && (
        <GiveUpConfirmScreen
          state={state}
          onContinue={() => setScreen("active")}
          onEnd={() => {
            setEndsAt(null);
            setSelectedDuration(null);
            completingRef.current = false;
            setScreen("home");
          }}
        />
      )}

      {screen === "success" && (
        <SuccessScreen
          state={state}
          expGained={lastExpGained}
          durationMinutes={lastDuration}
          onHome={() => {
            setSelectedDuration(null);
            completingRef.current = false;
            setScreen("home");
          }}
        />
      )}
    </main>
  );
}
