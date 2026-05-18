"use client";

import { useCallback, useEffect, useRef, useState } from "react";

function formatRemaining(ms: number): string {
  const total = Math.max(0, Math.ceil(ms / 1000));
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function useFocusTimer(endsAt: string | null, onComplete: () => void) {
  const [display, setDisplay] = useState("00:00");
  const completedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);

  onCompleteRef.current = onComplete;

  const tick = useCallback(() => {
    if (!endsAt) {
      return;
    }
    const ms = new Date(endsAt).getTime() - Date.now();
    setDisplay(formatRemaining(ms));
    if (ms <= 0 && !completedRef.current) {
      completedRef.current = true;
      onCompleteRef.current();
    }
  }, [endsAt]);

  useEffect(() => {
    completedRef.current = false;
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [endsAt, tick]);

  useEffect(() => {
    const onVisible = () => tick();
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [tick]);

  return { display };
}
