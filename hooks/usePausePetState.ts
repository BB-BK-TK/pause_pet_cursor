"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  addAllowedEvent,
  addExtendedEvent,
  addPreventedEvent,
  addReturnedEvent,
  createDefaultState,
  getPausePetState,
  savePausePetState,
  type PausePetState,
} from "@/lib/storage";

const PREVENT_EXP_GAIN = 5;

export function usePausePetState() {
  const [state, setState] = useState<PausePetState>(createDefaultState);
  const [hydrated, setHydrated] = useState(false);
  const stateRef = useRef(state);

  stateRef.current = state;

  useEffect(() => {
    const loaded = getPausePetState();
    setState(loaded);
    stateRef.current = loaded;
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      savePausePetState(state);
    }
  }, [state, hydrated]);

  const applyPrevented = useCallback((targetAppName: string) => {
    const next = addPreventedEvent(targetAppName);
    stateRef.current = next;
    setState(next);
    return { state: next, expGained: PREVENT_EXP_GAIN };
  }, []);

  const applyAllowed = useCallback(
    (targetAppName: string, minutes: number): PausePetState => {
      const next = addAllowedEvent(targetAppName, minutes);
      stateRef.current = next;
      setState(next);
      return next;
    },
    [],
  );

  const applyReturned = useCallback((targetAppName: string): PausePetState => {
    const next = addReturnedEvent(targetAppName);
    stateRef.current = next;
    setState(next);
    return next;
  }, []);

  const applyExtended = useCallback(
    (targetAppName: string, minutes: number): PausePetState => {
      const next = addExtendedEvent(targetAppName, minutes);
      stateRef.current = next;
      setState(next);
      return next;
    },
    [],
  );

  const reloadFromStorage = useCallback(() => {
    const loaded = getPausePetState();
    stateRef.current = loaded;
    setState(loaded);
    return loaded;
  }, []);

  return {
    state,
    hydrated,
    applyPrevented,
    applyAllowed,
    applyReturned,
    applyExtended,
    reloadFromStorage,
  };
}
