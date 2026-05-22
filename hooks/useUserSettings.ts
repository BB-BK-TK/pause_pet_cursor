"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  completeOnboarding,
  createDefaultSettings,
  getUserSettings,
  saveUserSettings,
  type OnboardingCompletePayload,
  type UserSettings,
} from "@/lib/settings";
import { resetPausePetData } from "@/lib/storage";

export function useUserSettings() {
  const [settings, setSettings] = useState<UserSettings>(createDefaultSettings);
  const [hydrated, setHydrated] = useState(false);
  const settingsRef = useRef(settings);

  settingsRef.current = settings;

  useEffect(() => {
    const loaded = getUserSettings();
    setSettings(loaded);
    settingsRef.current = loaded;
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      saveUserSettings(settings);
    }
  }, [settings, hydrated]);

  const finishOnboarding = useCallback(
    (payload: OnboardingCompletePayload): UserSettings => {
      const next = completeOnboarding(payload);
      settingsRef.current = next;
      setSettings(next);
      return next;
    },
    [],
  );

  const updateSettings = useCallback((patch: Partial<UserSettings>) => {
    const next = { ...settingsRef.current, ...patch };
    settingsRef.current = next;
    setSettings(next);
    return next;
  }, []);

  const clearOnboarding = useCallback((): UserSettings => {
    const { settings: next } = resetPausePetData();
    settingsRef.current = next;
    setSettings(next);
    return next;
  }, []);

  return {
    settings,
    hydrated,
    finishOnboarding,
    updateSettings,
    clearOnboarding,
  };
}
