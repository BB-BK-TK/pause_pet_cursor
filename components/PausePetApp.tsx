"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import AppHeader from "@/components/AppHeader";
import PetDisplay from "@/components/PetDisplay";
import { usePausePetState } from "@/hooks/usePausePetState";
import { useUserSettings } from "@/hooks/useUserSettings";
import { CUSTOM_APP_OPTION } from "@/lib/apps";
import { DEFAULT_PAUSE_MINUTES } from "@/lib/constants";
import { COPY } from "@/lib/copy";
import type { FocusDurationMinutes, ScreenName } from "@/lib/types";
import type { ZodiacSign } from "@/lib/zodiac";
import HomeScreen from "@/screens/HomeScreen";
import FocusSetupScreen from "@/screens/FocusSetupScreen";
import ActiveSessionScreen from "@/screens/ActiveSessionScreen";
import GiveUpConfirmScreen from "@/screens/GiveUpConfirmScreen";
import SuccessScreen from "@/screens/SuccessScreen";
import OnboardingAppSelectScreen from "@/screens/onboarding/OnboardingAppSelectScreen";
import OnboardingZodiacScreen from "@/screens/onboarding/OnboardingZodiacScreen";
import OnboardingRevealScreen from "@/screens/onboarding/OnboardingRevealScreen";

const screenTitles: Partial<Record<ScreenName, string>> = {
  setup: "멈춤 준비",
  active: "멈춤 중",
  giveUpConfirm: "잠깐 쉬어가기",
  success: "잘 넘겼어요",
};

function resolveTargetAppName(
  selectedApp: string | null,
  customAppName: string,
): string {
  if (!selectedApp) {
    return "";
  }
  if (selectedApp === CUSTOM_APP_OPTION) {
    return customAppName.trim();
  }
  return selectedApp;
}

export default function PausePetApp() {
  const { state, hydrated: stateHydrated, recordCompletion } = usePausePetState();
  const {
    settings,
    hydrated: settingsHydrated,
    finishOnboarding,
  } = useUserSettings();

  const hydrated = stateHydrated && settingsHydrated;

  const [screen, setScreen] = useState<ScreenName>("onboardingAppSelect");

  const didInitialRoute = useRef(false);
  useEffect(() => {
    if (settingsHydrated && !didInitialRoute.current) {
      didInitialRoute.current = true;
      setScreen(
        settings.hasCompletedOnboarding ? "home" : "onboardingAppSelect",
      );
    }
  }, [settingsHydrated, settings.hasCompletedOnboarding]);

  const [onboardingSelectedApp, setOnboardingSelectedApp] = useState<
    string | null
  >(null);
  const [onboardingCustomName, setOnboardingCustomName] = useState("");
  const [pendingTargetApp, setPendingTargetApp] = useState("");
  const [pendingZodiacSign, setPendingZodiacSign] = useState<ZodiacSign | null>(
    null,
  );
  const [pendingBirthday, setPendingBirthday] = useState<{
    month?: number;
    day?: number;
  }>({});

  const [selectedDuration, setSelectedDuration] =
    useState<FocusDurationMinutes | null>(null);
  const [endsAt, setEndsAt] = useState<string | null>(null);
  const [lastExpGained, setLastExpGained] = useState(0);
  const [lastDuration, setLastDuration] = useState<FocusDurationMinutes>(
    DEFAULT_PAUSE_MINUTES,
  );
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

  const resetSession = useCallback(() => {
    setEndsAt(null);
    setSelectedDuration(null);
    completingRef.current = false;
  }, []);

  const onboardingTargetName = useMemo(
    () => resolveTargetAppName(onboardingSelectedApp, onboardingCustomName),
    [onboardingSelectedApp, onboardingCustomName],
  );

  if (!hydrated) {
    return (
      <main className="app-frame">
        <div className="flex flex-1 flex-col items-center justify-center">
          <PetDisplay
            mood="curious"
            petLevel={1}
            petExp={0}
            showProgress={false}
          />
          <p className="mt-4 text-sm text-stone-500">{COPY.app.loading}</p>
        </div>
      </main>
    );
  }

  const showHeader =
    screen !== "onboardingAppSelect" &&
    screen !== "onboardingZodiac" &&
    screen !== "onboardingReveal";

  return (
    <main className="app-frame animate-fade-up">
      {showHeader && (
        <AppHeader
          showBrand={screen === "home"}
          title={screen !== "home" ? screenTitles[screen] : undefined}
        />
      )}

      {screen === "onboardingAppSelect" && (
        <OnboardingAppSelectScreen
          selectedApp={onboardingSelectedApp}
          customAppName={onboardingCustomName}
          onSelectApp={setOnboardingSelectedApp}
          onCustomAppNameChange={setOnboardingCustomName}
          onNext={() => {
            setPendingTargetApp(onboardingTargetName);
            setScreen("onboardingZodiac");
          }}
        />
      )}

      {screen === "onboardingZodiac" && (
        <OnboardingZodiacScreen
          onNext={({ zodiacSign, birthdayMonth, birthdayDay }) => {
            setPendingZodiacSign(zodiacSign);
            setPendingBirthday({ month: birthdayMonth, day: birthdayDay });
            setScreen("onboardingReveal");
          }}
        />
      )}

      {screen === "onboardingReveal" && pendingZodiacSign && (
        <OnboardingRevealScreen
          targetAppName={pendingTargetApp}
          zodiacSign={pendingZodiacSign}
          onStart={() => {
            finishOnboarding({
              targetAppName: pendingTargetApp,
              zodiacSign: pendingZodiacSign,
              defaultPauseMinutes: DEFAULT_PAUSE_MINUTES,
              birthdayMonth: pendingBirthday.month,
              birthdayDay: pendingBirthday.day,
            });
            setScreen("home");
          }}
        />
      )}

      {screen === "home" && settings.hasCompletedOnboarding && (
        <HomeScreen
          state={state}
          settings={settings}
          onQuickPause={() => startSession(settings.defaultPauseMinutes)}
          onChooseDuration={() => {
            setSelectedDuration(settings.defaultPauseMinutes);
            setScreen("setup");
          }}
        />
      )}

      {screen === "setup" && (
        <FocusSetupScreen
          state={state}
          settings={settings}
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
          settings={settings}
          endsAt={endsAt}
          onGiveUp={() => setScreen("giveUpConfirm")}
          onComplete={handleTimerComplete}
        />
      )}

      {screen === "giveUpConfirm" && (
        <GiveUpConfirmScreen
          state={state}
          settings={settings}
          onContinue={() => setScreen("active")}
          onEnd={() => {
            resetSession();
            setScreen("home");
          }}
        />
      )}

      {screen === "success" && (
        <SuccessScreen
          state={state}
          settings={settings}
          expGained={lastExpGained}
          durationMinutes={lastDuration}
          onContinue={() => {
            resetSession();
            startSession(lastDuration);
          }}
          onDone={() => {
            resetSession();
            setScreen("home");
          }}
        />
      )}
    </main>
  );
}
