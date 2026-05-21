"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import AppHeader from "@/components/AppHeader";
import PetDisplay from "@/components/PetDisplay";
import { usePausePetState } from "@/hooks/usePausePetState";
import { useUserSettings } from "@/hooks/useUserSettings";
import { CUSTOM_APP_OPTION } from "@/lib/apps";
import { DEFAULT_PAUSE_MINUTES, EXTEND_MINUTES } from "@/lib/constants";
import { COPY } from "@/lib/copy";
import type { AllowedDurationMinutes, ScreenName } from "@/lib/types";
import type { ZodiacSign } from "@/lib/zodiac";
import InterventionScreen from "@/screens/InterventionScreen";
import PreventedSuccessScreen from "@/screens/PreventedSuccessScreen";
import AllowedDurationScreen from "@/screens/AllowedDurationScreen";
import AllowedTimerScreen from "@/screens/AllowedTimerScreen";
import ReturnReminderScreen from "@/screens/ReturnReminderScreen";
import SummaryScreen from "@/screens/SummaryScreen";
import OnboardingAppSelectScreen from "@/screens/onboarding/OnboardingAppSelectScreen";
import OnboardingZodiacScreen from "@/screens/onboarding/OnboardingZodiacScreen";
import OnboardingRevealScreen from "@/screens/onboarding/OnboardingRevealScreen";
import FutureProtectionScreen from "@/screens/FutureProtectionScreen";
import { FUTURE_UI_COPY } from "@/lib/nativePermissions";

const screenTitles: Partial<Record<ScreenName, string>> = {
  summary: COPY.summary.title,
  futureProtection: FUTURE_UI_COPY.screenTitle,
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
  const {
    state,
    hydrated: stateHydrated,
    applyPrevented,
    applyAllowed,
    applyReturned,
    applyExtended,
  } = usePausePetState();
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
        settings.hasCompletedOnboarding ? "intervention" : "onboardingAppSelect",
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

  const [allowedMinutes, setAllowedMinutes] =
    useState<AllowedDurationMinutes | null>(null);
  const [endsAt, setEndsAt] = useState<string | null>(null);
  const [lastExpGained, setLastExpGained] = useState(0);
  const timerCompleteRef = useRef(false);

  const goToIntervention = useCallback(() => {
    setAllowedMinutes(null);
    setEndsAt(null);
    timerCompleteRef.current = false;
    setScreen("intervention");
  }, []);

  const startAllowedTimer = useCallback((minutes: AllowedDurationMinutes) => {
    const end = new Date(Date.now() + minutes * 60 * 1000).toISOString();
    setAllowedMinutes(minutes);
    setEndsAt(end);
    timerCompleteRef.current = false;
    setScreen("allowedTimer");
  }, []);

  const handleTimerComplete = useCallback(() => {
    if (timerCompleteRef.current) {
      return;
    }
    timerCompleteRef.current = true;
    setEndsAt(null);
    setScreen("returnReminder");
  }, []);

  const onboardingTargetName = useMemo(
    () => resolveTargetAppName(onboardingSelectedApp, onboardingCustomName),
    [onboardingSelectedApp, onboardingCustomName],
  );

  const interventionScreens: ScreenName[] = [
    "intervention",
    "preventedSuccess",
    "allowedDuration",
    "allowedTimer",
    "returnReminder",
  ];

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
    screen === "summary" || screen === "futureProtection";

  const useInterventionFrame = interventionScreens.includes(screen);

  return (
    <main
      className={`app-frame animate-fade-up ${useInterventionFrame ? "app-frame-intervention" : ""}`}
    >
      {showHeader && (
        <AppHeader
          showBrand={screen === "summary"}
          title={screen !== "summary" ? screenTitles[screen] : undefined}
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
            goToIntervention();
          }}
        />
      )}

      {screen === "intervention" && settings.hasCompletedOnboarding && (
        <InterventionScreen
          state={state}
          settings={settings}
          onNotOpen={() => {
            const { expGained } = applyPrevented(
              settings.targetAppName,
              settings.defaultPauseMinutes,
            );
            setLastExpGained(expGained);
            setScreen("preventedSuccess");
          }}
          onWillOpen={() => setScreen("allowedDuration")}
        />
      )}

      {screen === "preventedSuccess" && (
        <PreventedSuccessScreen
          state={state}
          settings={settings}
          expGained={lastExpGained}
          onSummary={() => setScreen("summary")}
          onRetry={goToIntervention}
        />
      )}

      {screen === "allowedDuration" && (
        <AllowedDurationScreen
          state={state}
          settings={settings}
          onConfirm={(minutes) => {
            applyAllowed(settings.targetAppName, minutes);
            startAllowedTimer(minutes);
          }}
        />
      )}

      {screen === "allowedTimer" && endsAt && (
        <AllowedTimerScreen
          state={state}
          settings={settings}
          endsAt={endsAt}
          onLeaveEarly={() => {
            applyReturned(settings.targetAppName);
            setEndsAt(null);
            goToIntervention();
          }}
          onComplete={handleTimerComplete}
        />
      )}

      {screen === "returnReminder" && (
        <ReturnReminderScreen
          state={state}
          settings={settings}
          onReturn={() => {
            applyReturned(settings.targetAppName);
            goToIntervention();
          }}
          onExtend={() => {
            applyExtended(settings.targetAppName, EXTEND_MINUTES);
            startAllowedTimer(EXTEND_MINUTES);
          }}
        />
      )}

      {screen === "summary" && (
        <SummaryScreen
          state={state}
          settings={settings}
          onSimulate={goToIntervention}
          onFutureProtection={() => setScreen("futureProtection")}
        />
      )}

      {screen === "futureProtection" && (
        <FutureProtectionScreen onBack={() => setScreen("summary")} />
      )}
    </main>
  );
}
