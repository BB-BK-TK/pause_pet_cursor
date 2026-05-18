/** Korean UI copy — warm pet-companion tone */

export const COPY = {
  app: {
    name: "Pause Pet",
    tagline: "집중하는 동안, 펫이 조용히 기다려줄게요.",
    loading: "잠깐만요, 펫을 불러오고 있어요…",
    metaDescription: "집중하는 동안, 펫이 조용히 기다려줄게요.",
  },

  home: {
    statusFirst: "오늘 처음이네요. 같이 조금만 집중해볼까요?",
    statusReturning: "펫이 조용히 기다리고 있어요.",
    ctaStart: "집중 시작하기",
    statMinutes: "함께한 시간",
    statSessions: "집중 횟수",
    statStreak: "연속 일수",
    historyTitle: "최근 같이 한 집중",
    historyEmpty: "아직 기록이 없어요. 펫과 첫 집중을 시작해볼세요.",
    sessionLine: (minutes: number) => `${minutes}분 같이 집중`,
    growthPoints: (points: number) => `+${points} 성장`,
    petGrowth: (level: number, points: number) =>
      `Lv.${level} · 지금까지 ${points}만큼 자랐어요`,
  },

  setup: {
    back: "← 돌아가기",
    title: "얼마나 같이 있을까요?",
    subtitle: "펫이 옆에 앉을 시간을 골라주세요.",
    cta: "이제 같이 집중하기",
  },

  focus: {
    label: "지금 집중 중",
    exit: "잠깐 멈출게요",
  },

  focusMessages: [
    "천천히 해도 괜찮아요. 펫이 조용히 기다리고 있어요.",
    "지금 이 순간, 둘이서만 집중해봐요.",
    "호흡 한 번 하고, 다시 같이 있어봐요.",
    "펫이 옆에서 작게 응원하고 있어요.",
  ] as const,

  giveUp: {
    title: "조금만 더 같이 있어볼까요?",
    body: "괜찮아요. 오늘은 여기까지 해도 돼요.",
    hint: "펫은 언제든 다시 옆에 있을게요.",
    continue: "조금만 더 같이 있어볼게요",
    end: "오늘은 여기까지",
  },

  success: {
    label: "집중을 마쳤어요",
    title: "오늘의 집중을 해냈어요.",
    duration: (minutes: number) =>
      `${minutes}분 동안, 펫과 조용히 함께했어요.`,
    growth: "펫이 아주 조금 더 자랐어요.",
    growthPoints: (points: number) => `+${points} 성장`,
    statStreak: "함께한 날",
    statStreakValue: (days: number) => `${days}일`,
    statMinutes: "모은 시간",
    statMinutesValue: (minutes: number) => `${minutes}분`,
    ctaHome: "돌아가기",
  },

  pet: {
    level: (n: number) => `Lv.${n}`,
    growth: (points: number) => `${points} 성장`,
  },
} as const;
