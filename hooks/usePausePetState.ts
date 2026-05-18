"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  completeFocusSession,
  createDefaultState,
  loadPausePetState,
  savePausePetState,
  type PausePetState,
  type SessionCompletionResult,
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

  const recordCompletion = useCallback(
    (durationMinutes: number): SessionCompletionResult => {
      const result = completeFocusSession(stateRef.current, durationMinutes);
      stateRef.current = result.state;
      setState(result.state);
      return result;
    },
    [],
  );

  return {
    state,
    hydrated,
    recordCompletion,
  };
}
