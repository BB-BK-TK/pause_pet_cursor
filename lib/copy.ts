/** Korean UI copy — zodiac companion app-reduction tone */

import type { PetMood } from "./types";

export const COPY = {
  app: {
    name: "Pause Pet",
    tagline: "앱을 열기 전, 별자리 친구와 잠깐 멈춰볼까요?",
    loading: "잠깐만요, 별자리 친구를 불러오고 있어요…",
    metaDescription:
      "딴짓 앱을 열고 싶을 때, 별자리 친구가 잠깐 곁에서 기다려주는 멈춤 동반자",
  },

  onboarding: {
    appSelect: {
      title: "요즘 어떤 앱을 조금 덜 쓰고 싶나요?",
      subtitle:
        "그 앱을 열고 싶어지는 순간, 별자리 친구가 잠깐 옆에서 기다려줄게요.",
      customLabel: "앱 이름을 적어주세요",
      customPlaceholder: "예: Twitter, 카카오톡",
      cta: "다음",
    },
    zodiac: {
      title: "당신의 별자리 친구를 찾아볼게요.",
      subtitle:
        "별자리를 알고 있다면 선택하고, 잘 모르겠다면 생일을 알려주세요.",
      tabSelect: "별자리 선택",
      tabBirthday: "생일 입력",
      birthdayMonth: "월",
      birthdayDay: "일",
      birthdayHint: (signName: string) => `생일로 보면 ${signName} 친구예요.`,
      cta: "다음",
    },
    reveal: {
      friendFrom: (zodiacName: string) =>
        `당신의 친구는 ${zodiacName}에서 왔어요.`,
      pausePromise: (appName: string, minutes: number) =>
        `${appName}를 열고 싶을 때, 먼저 ${minutes}분만 같이 있어줄게요.`,
      cta: "별자리 친구와 시작하기",
    },
  },

  home: {
    companionWaiting: (zodiacName: string) => `${zodiacName} 친구가 기다리고 있어요.`,
    prompt: (appName: string, minutes: number) =>
      `${appName} 열기 전, ${minutes}분만 같이 있어볼까요?`,
    targetBadge: (appName: string) => `지금 줄이는 앱 · ${appName}`,
    loopHint: "멈추기 → 별자리 친구와 함께 → 충동 지나가기",
    ctaPause: (minutes: number) => `별자리 친구와 ${minutes}분 멈추기`,
    ctaOtherDuration: "다른 시간으로 멈추기",
    statMinutes: "함께 멈춘 시간",
    statSessions: "멈춤 횟수",
    statStreak: "연속 일수",
    historyTitle: "최근 같이 넘긴 순간",
    historyEmpty: "아직 기록이 없어요. 별자리 친구가 첫 멈춤을 기다리고 있어요.",
    sessionLine: (minutes: number, appName: string) =>
      `${appName} 대신 ${minutes}분, 같이 있었어요`,
    growthPoints: (points: number) => `+${points} 성장`,
  },

  setup: {
    back: "← 홈",
    title: "얼마나 같이 멈출까요?",
    subtitle: (appName: string) =>
      `${appName}을(를) 열기 전, 별자리 친구와 잠깐 쉬는 시간이에요.`,
    petReady: "좋아, 나 옆에 있을게. 같이 버텨보자!",
    petPick: "시간만 정해주면, 내가 기다릴게.",
    durationLabel: "멈춤 시간",
    cta: "이제 별자리 친구와 멈추기",
  },

  focus: {
    label: "지금 멈춤 중",
    headline: (appName: string, zodiacName: string) =>
      `지금은 ${appName} 대신, ${zodiacName} 친구와 잠깐 쉬는 시간이에요.`,
    exit: "잠깐 쉬어볼게요",
  },

  giveUp: {
    title: "괜찮아요. 오늘은 여기까지 해도 돼요.",
    body: "별자리 친구는 언제든 다시 옆에 있을게요.",
    continue: "조금만 더 같이 있어볼게요",
    end: "오늘은 여기까지",
  },

  success: {
    title: "잘 넘겼어요.",
    body: (appName: string, minutes: number) =>
      `방금 ${appName}을(를) 열고 싶은 마음을 ${minutes}분 동안 같이 지나보냈어요.`,
    growth: (zodiacName: string) => `${zodiacName} 친구가 조금 더 가까워졌어요.`,
    growthPoints: (points: number) => `+${points} 성장`,
    ctaContinue: "조금 더 이어가기",
    ctaDone: "오늘은 여기까지",
    statStreak: "함께한 날",
    statStreakValue: (days: number) => `${days}일`,
    statMinutes: "모은 시간",
    statMinutesValue: (minutes: number) => `${minutes}분`,
  },

  pet: {
    level: (n: number) => `Lv.${n}`,
    growth: (points: number) => `${points} 성장`,
    mood: (mood: PetMood): string => {
      const labels: Record<PetMood, string> = {
        curious: "호기심 가득",
        waiting: "곁에서 기다리는 중",
        sitting: "옆에 앉아 있는 중",
        proud: "자랑스러워하고 있어요",
        comforting: "포근히 위로하는 중",
      };
      return labels[mood];
    },
  },
} as const;
