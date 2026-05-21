"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  createDefaultState,
  loadPausePetState,
  recordAllowed,
  recordExtended,
  recordPrevented,
  recordReturned,
  savePausePetState,
  type PausePetState,
  type PreventedResult,
} from "@/lib/storage";

export function usePausePetState() {
  const [state, setState] = useState<PausePetState>(createDefaultState);
  const [hydrated, setHydrated] = useState(false);
  const stateRef = useRef(state);

  stateRef.current = state;

  useEffect(() => {
    const loaded = loadPausePetState();
    setState(loaded);
    stateRef.current = loaded;
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      savePausePetState(state);
    }
  }, [state, hydrated]);

  const applyPrevented = useCallback(
    (targetAppName: string, savedMinutes: number): PreventedResult => {
      const result = recordPrevented(
        stateRef.current,
        targetAppName,
        savedMinutes,
      );
      stateRef.current = result.state;
      setState(result.state);
      return result;
    },
    [],
  );

  const applyAllowed = useCallback(
    (targetAppName: string, minutes: number): PausePetState => {
      const next = recordAllowed(stateRef.current, targetAppName, minutes);
      stateRef.current = next;
      setState(next);
      return next;
    },
    [],
  );

  const applyReturned = useCallback((targetAppName: string): PausePetState => {
    const next = recordReturned(stateRef.current, targetAppName);
    stateRef.current = next;
    setState(next);
    return next;
  }, []);

  const applyExtended = useCallback(
    (targetAppName: string, minutes: number): PausePetState => {
      const next = recordExtended(stateRef.current, targetAppName, minutes);
      stateRef.current = next;
      setState(next);
      return next;
    },
    [],
  );

  return {
    state,
    hydrated,
    applyPrevented,
    applyAllowed,
    applyReturned,
    applyExtended,
  };
}
