/** Korean UI copy — intervention-first companion tone */

export const COPY = {
  app: {
    name: "Pause Pet",
    loading: "잠깐만요, 별자리 친구를 불러오고 있어요…",
    metaDescription:
      "딴짓 앱을 열기 전, 별자리 친구가 잠깐 물어봐 주는 멈춤 동반자",
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

  intervention: {
    opening: (appName: string) => `${appName}를 열려고 했어요`,
    askWait: "잠깐만요. 별자리 친구가 먼저 물어볼게요.",
    askOpen: "지금 정말 열까요?",
    notOpen: "지금은 안 열래요",
    willOpen: "조금만 볼래요",
  },

  prevented: {
    title: "잘 넘겼어요.",
    body: (appName: string) =>
      `방금 ${appName}를 열고 싶은 마음을 한 번 지나보냈어요.`,
    growth: (zodiacName: string) => `${zodiacName} 친구가 조금 더 가까워졌어요.`,
    statToday: "오늘 멈춘 횟수",
    statSaved: "아낀 시간",
    statGrowth: "펫 성장",
    ctaSummary: "오늘 요약 보기",
    ctaRetry: "다시 테스트하기",
  },

  allowed: {
    title: "좋아요. 그럼 몇 분만 볼까요?",
    subtitle: "시간이 지나면 별자리 친구가 조용히 알려줄게요.",
    cta: "이 시간만 보고 올게요",
    watching: (appName: string) => `${appName} 보는 중`,
    timerHint: "정한 시간이 지나면 별자리 친구가 알려줄게요.",
    leaveEarly: "지금 돌아갈래요",
  },

  returned: {
    title: "잘 돌아왔어요.",
    body: (appName: string) => `${appName}에서 빠르게 돌아왔어요.`,
    cta: "다시 테스트하기",
  },

  returnReminder: {
    title: "돌아올 시간이에요.",
    body: (appName: string) => `${appName} 보기로 한 시간이 지났어요.`,
    companion: (zodiacName: string) => `${zodiacName} 친구가 기다리고 있어요.`,
    goBack: "돌아갈게요",
    extend: "5분만 더",
  },

  summary: {
    title: "오늘 요약",
    targetApp: "줄이고 싶은 앱",
    companion: "별자리 친구",
    todayPrevented: "오늘 멈춘 횟수",
    savedMinutes: "아낀 시간",
    totalPrevented: "총 멈춘 횟수",
    petLevel: "펫 레벨",
    petExp: "펫 경험치",
    recentTitle: "최근 기록",
    recentEmpty: "아직 기록이 없어요.",
    simulate: "다시 열기 시뮬레이션",
    resetOnboarding: "처음부터 설정하기",
  },

  pet: {
    level: (n: number) => `Lv.${n}`,
    growth: (points: number) => `${points} EXP`,
  },
} as const;
