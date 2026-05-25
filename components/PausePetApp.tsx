"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ZodiacCompanionImage from "@/components/ZodiacCompanionImage";
import IntroScreen from "@/components/onboarding/IntroScreen";
import { usePausePetState } from "@/hooks/usePausePetState";
import { useUserSettings } from "@/hooks/useUserSettings";
import { CUSTOM_APP_OPTION } from "@/lib/apps";
import { DEFAULT_PAUSE_MINUTES, EXTEND_MINUTES } from "@/lib/constants";
import SetupFlow from "@/components/onboarding/SetupFlow";
import { COPY } from "@/lib/copy";
import { getIntroSeen, needsPermissionSetup } from "@/lib/storage";
import type { AllowedDurationMinutes, ScreenName } from "@/lib/types";
import type { ZodiacSign } from "@/lib/zodiac";
import InterventionScreen from "@/screens/InterventionScreen";
import PreventedSuccessScreen from "@/screens/PreventedSuccessScreen";
import AllowedDurationScreen from "@/screens/AllowedDurationScreen";
import AllowedTimerScreen from "@/screens/AllowedTimerScreen";
import ReturnedSuccessScreen from "@/screens/ReturnedSuccessScreen";
import ReturnReminderScreen from "@/screens/ReturnReminderScreen";
import SummaryScreen from "@/screens/SummaryScreen";
import OnboardingAppSelectScreen from "@/screens/onboarding/OnboardingAppSelectScreen";
import OnboardingZodiacScreen from "@/screens/onboarding/OnboardingZodiacScreen";
import OnboardingRevealScreen from "@/screens/onboarding/OnboardingRevealScreen";

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
    reloadFromStorage,
  } = usePausePetState();
  const {
    settings,
    hydrated: settingsHydrated,
    finishOnboarding,
    clearOnboarding,
  } = useUserSettings();

  const needsOnboarding =
    !settings.hasCompletedOnboarding || !settings.targetAppName.trim();
  const hydrated = stateHydrated && settingsHydrated;

  const [screen, setScreen] = useState<ScreenName>("onboardingAppSelect");
  const [routeReady, setRouteReady] = useState(false);

  const didInitialRoute = useRef(false);
  useEffect(() => {
    if (settingsHydrated && !didInitialRoute.current) {
      didInitialRoute.current = true;
      if (!getIntroSeen()) {
        setScreen("appIntro");
      } else if (needsOnboarding) {
        setScreen("onboardingAppSelect");
      } else if (needsPermissionSetup()) {
        setScreen("permissionSetup");
      } else {
        setScreen("intervention");
      }
      setRouteReady(true);
    }
  }, [settingsHydrated, needsOnboarding]);

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

  const [endsAt, setEndsAt] = useState<string | null>(null);
  const timerCompleteRef = useRef(false);

  const goToIntervention = useCallback(() => {
    setEndsAt(null);
    timerCompleteRef.current = false;
    setScreen("intervention");
  }, []);

  const startAllowedTimer = useCallback((minutes: AllowedDurationMinutes) => {
    const end = new Date(Date.now() + minutes * 60 * 1000).toISOString();
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
    "returnedSuccess",
    "returnReminder",
  ];

  if (!hydrated || !routeReady) {
    return (
      <main className="app-frame">
        <div className="flex flex-1 flex-col items-center justify-center gap-4">
          <ZodiacCompanionImage
            zodiacSign="gemini"
            preset="intervention"
            mood="idle"
            size="md"
          />
          <p className="text-sm text-stone-500">{COPY.app.loading}</p>
        </div>
      </main>
    );
  }

  const useInterventionFrame = interventionScreens.includes(screen);
  const useSetupFrame = screen === "permissionSetup";
  const usePremiumFrame =
    screen === "appIntro" ||
    screen === "onboardingAppSelect" ||
    screen === "onboardingZodiac" ||
    screen === "onboardingReveal";

  return (
    <main
      className={`app-frame animate-fade-up ${useInterventionFrame ? "app-frame-intervention" : ""} ${useSetupFrame ? "app-frame-setup" : ""} ${usePremiumFrame ? "app-frame-premium" : ""}`}
    >
      {screen === "appIntro" && (
        <IntroScreen
          onStart={() => {
            if (needsOnboarding) {
              setScreen("onboardingAppSelect");
            } else if (needsPermissionSetup()) {
              setScreen("permissionSetup");
            } else {
              setScreen("intervention");
            }
          }}
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
            setScreen("permissionSetup");
          }}
        />
      )}

      {screen === "permissionSetup" && (
        <SetupFlow
          zodiacSign={settings.zodiacSign ?? pendingZodiacSign ?? "gemini"}
          targetAppName={
            settings.targetAppName.trim() || pendingTargetApp
          }
          onFinish={goToIntervention}
          onSkip={goToIntervention}
        />
      )}

      {screen === "intervention" && !needsOnboarding && (
        <InterventionScreen
          settings={settings}
          onNotOpen={() => {
            applyPrevented(settings.targetAppName);
            setScreen("preventedSuccess");
          }}
          onWillOpen={() => setScreen("allowedDuration")}
        />
      )}

      {screen === "preventedSuccess" && (
        <PreventedSuccessScreen
          state={state}
          settings={settings}
          onSummary={() => setScreen("summary")}
          onRetry={goToIntervention}
        />
      )}

      {screen === "allowedDuration" && (
        <AllowedDurationScreen
          settings={settings}
          onConfirm={(minutes) => {
            applyAllowed(settings.targetAppName, minutes);
            startAllowedTimer(minutes);
          }}
        />
      )}

      {screen === "allowedTimer" && endsAt && (
        <AllowedTimerScreen
          settings={settings}
          endsAt={endsAt}
          onLeaveEarly={() => {
            applyReturned(settings.targetAppName);
            setEndsAt(null);
            setScreen("returnedSuccess");
          }}
          onComplete={handleTimerComplete}
        />
      )}

      {screen === "returnedSuccess" && (
        <ReturnedSuccessScreen
          settings={settings}
          onRetry={goToIntervention}
        />
      )}

      {screen === "returnReminder" && (
        <ReturnReminderScreen
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
          onResetOnboarding={() => {
            clearOnboarding();
            reloadFromStorage();
            setOnboardingSelectedApp(null);
            setOnboardingCustomName("");
            setPendingTargetApp("");
            setPendingZodiacSign(null);
            setPendingBirthday({});
            setRouteReady(true);
            setScreen(getIntroSeen() ? "onboardingAppSelect" : "appIntro");
          }}
        />
      )}
    </main>
  );
}
