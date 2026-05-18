/** Korean UI copy — warm pet-companion tone */

import type { PetMood } from "./types";

export const COPY = {
  app: {
    name: "Pause Pet",
    tagline: "집중하는 동안, 펫이 조용히 곁에 있을게요.",
    loading: "잠깐만요, 펫을 불러오고 있어요…",
    metaDescription: "집중하는 동안, 작은 펫이 조용히 기다려주는 집중 친구",
  },

  home: {
    statusFirst: "안녕, 오늘도 나랑 잠깐 집중해볼까?",
    statusReturning: "펫이 포근하게 기다리고 있어요.",
    petWhisper: "나 여기 있을게. 천천히 시작해도 돼.",
    loopHint: "시간 정하기 → 같이 집중 → 펫이 자라요",
    ctaStart: "펫과 집중 시작하기",
    statMinutes: "함께한 시간",
    statSessions: "집중 횟수",
    statStreak: "연속 일수",
    historyTitle: "최근 같이 한 집중",
    historyEmpty: "아직 기록이 없어요. 펫이 첫 집중을 기다리고 있어요.",
    sessionLine: (minutes: number) => `${minutes}분, 같이 집중했어요`,
    growthPoints: (points: number) => `+${points} 성장`,
    petGrowth: (level: number, points: number) =>
      `Lv.${level} · 펫이 ${points}만큼 자랐어요`,
  },

  setup: {
    back: "← 홈",
    title: "얼마나 같이 있을까요?",
    subtitle: "펫이 옆에 앉을 시간을 골라주세요.",
    petReady: "좋아, 나 준비됐어. 같이 가보자!",
    petPick: "시간만 정해주면, 내가 기다릴게.",
    cta: "이제 펫과 집중하기",
  },

  focus: {
    label: "지금 집중 중",
    exit: "잠깐 쉬어볼게요",
  },

  focusMessages: [
    "천천히 해도 괜찮아. 나 옆에서 조용히 있을게.",
    "지금은 둘만의 시간이야. 펫이 함께하고 있어.",
    "호흡 한 번 하고, 다시 천천히 가보자.",
    "조금씩만 해도 괜찮아. 펫이 끝까지 기다릴게.",
  ] as const,

  giveUp: {
    title: "잠깐 쉬어가도 괜찮아요",
    body: "오늘은 여기까지 해도 충분해요.",
    hint: "펫은 언제든 다시 곁에 있을게요. 부담 갖지 않아도 돼요.",
    continue: "조금만 더 같이 있어볼게요",
    end: "오늘은 여기까지 할게요",
    petLine: "괜찮아… 다음에 또 같이 하자.",
  },

  success: {
    label: "집중 완료",
    title: "오늘도 펫과 잘 해냈어요!",
    subtitle: "작은 집중이 모이면, 펫도 조금씩 자라요.",
    duration: (minutes: number) =>
      `${minutes}분 동안, 펫과 조용히 함께했어요.`,
    growth: "펫이 조금 더 자랐어요",
    growthPoints: (points: number) => `+${points} 성장`,
    petLine: "고마워. 오늘도 곁에 있어줘서 행복해.",
    statStreak: "함께한 날",
    statStreakValue: (days: number) => `${days}일`,
    statMinutes: "모은 시간",
    statMinutesValue: (minutes: number) => `${minutes}분`,
    ctaHome: "펫 보러 홈으로",
  },

  pet: {
    level: (n: number) => `Lv.${n}`,
    growth: (points: number) => `${points} 성장`,
    mood: (mood: PetMood): string => {
      const labels: Record<PetMood, string> = {
        idle: "편안히 쉬는 중",
        waiting: "곧 같이 집중할 준비",
        focusing: "집중을 함께하는 중",
        happy: "기뻐하고 있어요",
        comfort: "포근히 위로하는 중",
      };
      return labels[mood];
    },
  },
} as const;
