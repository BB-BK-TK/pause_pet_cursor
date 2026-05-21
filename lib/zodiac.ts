/** Zodiac companion data — character matching, not fortune-telling */

export const ZODIAC_SIGNS = [
  "aries",
  "taurus",
  "gemini",
  "cancer",
  "leo",
  "virgo",
  "libra",
  "scorpio",
  "sagittarius",
  "capricorn",
  "aquarius",
  "pisces",
] as const;

export type ZodiacSign = (typeof ZODIAC_SIGNS)[number];

export type ZodiacCompanion = {
  id: ZodiacSign;
  koreanName: string;
  dateRange: string;
  emoji: string;
  companionPersonality: string;
  homeMessage: string;
  activeFocusMessage: string;
  successMessage: string;
  giveUpComfortMessage: string;
};

export const ZODIAC_COMPANIONS: Record<ZodiacSign, ZodiacCompanion> = {
  aries: {
    id: "aries",
    koreanName: "양자리",
    dateRange: "3월 21일 ~ 4월 19일",
    emoji: "\u{2648}",
    companionPersonality: "용기 있게, 먼저 곁에 와 주는 친구예요.",
    homeMessage: "가볍게 숨 쉬고, 같이 한 걸음만 내딛어 봐요.",
    activeFocusMessage: "지금 이 순간만큼은, 우리 둘이면 충분해요.",
    successMessage: "오늘도 용기 있게, 잘 해냈어요.",
    giveUpComfortMessage: "괜찮아요. 다음에 또 힘내서 같이 가요.",
  },
  taurus: {
    id: "taurus",
    koreanName: "황소자리",
    dateRange: "4월 20일 ~ 5월 20일",
    emoji: "\u{2649}",
    companionPersonality: "천천히, 하지만 꾸준히 옆에 있어주는 친구예요.",
    homeMessage: "급하지 않아도 돼요. 천천히 같이 가요.",
    activeFocusMessage: "천천히 지나가도 괜찮아요. 나 옆에 있을게요.",
    successMessage: "조금씩 쌓인 시간이, 우리를 더 가깝게 했어요.",
    giveUpComfortMessage: "오늘은 여기까지도 충분해요. 편히 쉬어요.",
  },
  gemini: {
    id: "gemini",
    koreanName: "쌍둥이자리",
    dateRange: "5월 21일 ~ 6월 20일",
    emoji: "\u{264A}",
    companionPersonality: "말을 건네며, 마음이 흔들릴 때 길을 잡아주는 친구예요.",
    homeMessage: "머릿속이 복잡해도 괜찮아요. 같이 정리해 봐요.",
    activeFocusMessage: "생각이 많아도, 지금은 잠깐 쉬어가도 돼요.",
    successMessage: "마음이 조금 가벼워졌을 거예요. 잘했어요.",
    giveUpComfortMessage: "다음에 또 이야기해요. 언제든 곁에 있을게요.",
  },
  cancer: {
    id: "cancer",
    koreanName: "게자리",
    dateRange: "6월 21일 ~ 7월 22일",
    emoji: "\u{264B}",
    companionPersonality: "따뜻하게 감싸 주며, 조용히 기다려주는 친구예요.",
    homeMessage: "힘들면 기대도 돼요. 나는 여기 있을게요.",
    activeFocusMessage: "지금 이 자리에, 편안하게 있어도 돼요.",
    successMessage: "오늘도 따뜻하게, 잘 버텨냈어요.",
    giveUpComfortMessage: "괜찮아요. 포근히 쉬었다가 다시 만나요.",
  },
  leo: {
    id: "leo",
    koreanName: "사자자리",
    dateRange: "7월 23일 ~ 8월 22일",
    emoji: "\u{264C}",
    companionPersonality: "밝게 응원하며, 작은 성취도 크게 축하해 주는 친구예요.",
    homeMessage: "오늘도 잘하고 있어요. 같이 빛나 봐요.",
    activeFocusMessage: "지금 이 순간, 당신은 충분히 잘하고 있어요.",
    successMessage: "정말 멋졌어요. 오늘의 당신을 응원해요.",
    giveUpComfortMessage: "쉬어가도 괜찮아요. 내일 또 빛날 거예요.",
  },
  virgo: {
    id: "virgo",
    koreanName: "처녀자리",
    dateRange: "8월 23일 ~ 9월 22일",
    emoji: "\u{264D}",
    companionPersonality: "차분히 정리하며, 작은 걸음을 함께 지켜보는 친구예요.",
    homeMessage: "완벽하지 않아도 돼요. 지금 이대로 괜찮아요.",
    activeFocusMessage: "한 번에 다 하지 않아도, 조금씩이면 돼요.",
    successMessage: "차분히, 그리고 꾸준히 잘 해냈어요.",
    giveUpComfortMessage: "오늘은 편히 마무리해요. 내일 다시 천천히요.",
  },
  libra: {
    id: "libra",
    koreanName: "천칭자리",
    dateRange: "9월 23일 ~ 10월 22일",
    emoji: "\u{264E}",
    companionPersonality: "균형을 찾도록, 부드럽게 곁을 지켜주는 친구예요.",
    homeMessage: "흔들려도 괜찮아요. 다시 가운데로 돌아와요.",
    activeFocusMessage: "지금은 앱보다, 마음의 균형을 먼저 챙겨요.",
    successMessage: "마음의 균형을, 함께 찾아냈어요.",
    giveUpComfortMessage: "무리하지 않아도 돼요. 편한 만큼만 해도 충분해요.",
  },
  scorpio: {
    id: "scorpio",
    koreanName: "전갈자리",
    dateRange: "10월 23일 ~ 11월 21일",
    emoji: "\u{264F}",
    companionPersonality: "깊이 곁에 서서, 흔들릴 때도 끝까지 함께하는 친구예요.",
    homeMessage: "강해 보여도 괜찮아요. 잠깐 쉬어도 돼요.",
    activeFocusMessage: "깊게 숨 쉬고, 충동이 지나가길 같이 기다려요.",
    successMessage: "깊이 버텨낸 시간, 정말 소중해요.",
    giveUpComfortMessage: "오늘은 여기까지. 다음에 더 깊게 같이 가요.",
  },
  sagittarius: {
    id: "sagittarius",
    koreanName: "사수자리",
    dateRange: "11월 22일 ~ 12월 21일",
    emoji: "\u{2650}",
    companionPersonality: "밝은 시선으로, 앞으로 나아가게 응원해 주는 친구예요.",
    homeMessage: "멀리 보기 전에, 지금 발밑을 같이 밟아요.",
    activeFocusMessage: "지금 이 멈춤도, 앞으로 가는 길의 일부예요.",
    successMessage: "한 걸음 더, 멀리 갈 준비가 됐어요.",
    giveUpComfortMessage: "쉬어가는 것도 여행의 일부예요. 괜찮아요.",
  },
  capricorn: {
    id: "capricorn",
    koreanName: "염소자리",
    dateRange: "12월 22일 ~ 1월 19일",
    emoji: "\u{2651}",
    companionPersonality: "묵묵히 곁에 있으며, 꾸준함을 함께 쌓아가는 친구예요.",
    homeMessage: "높이 올라가도, 천천히 같이 가면 돼요.",
    activeFocusMessage: "한 걸음씩, 괜찮은 속도로 가고 있어요.",
    successMessage: "꾸준히 쌓인 시간, 정말 대단해요.",
    giveUpComfortMessage: "오늘은 쉬어도 괜찮아요. 내일 다시 쌓아가요.",
  },
  aquarius: {
    id: "aquarius",
    koreanName: "물병자리",
    dateRange: "1월 20일 ~ 2월 18일",
    emoji: "\u{2652}",
    companionPersonality: "새로운 시선으로, 나만의 리듬을 응원해 주는 친구예요.",
    homeMessage: "남과 달라도 괜찮아요. 당신만의 속도로요.",
    activeFocusMessage: "지금 이 리듬, 당신에게 맞는 시간이에요.",
    successMessage: "당신만의 방식으로, 잘 해냈어요.",
    giveUpComfortMessage: "리듬이 어긋나도 괜찮아요. 다시 맞추면 돼요.",
  },
  pisces: {
    id: "pisces",
    koreanName: "물고기자리",
    dateRange: "2월 19일 ~ 3월 20일",
    emoji: "\u{2653}",
    companionPersonality: "부드럽게 흐르며, 마음을 포근히 감싸 주는 친구예요.",
    homeMessage: "떠다녀도 괜찮아요. 잠깐 이곳에 머물러요.",
    activeFocusMessage: "물결처럼, 천천히 마음이 가라앉을 거예요.",
    successMessage: "포근한 시간, 함께 잘 넘겼어요.",
    giveUpComfortMessage: "괜찮아요. 부드럽게 쉬었다가 다시 만나요.",
  },
};

const DAYS_IN_MONTH = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] as const;

export function isZodiacSign(value: string): value is ZodiacSign {
  return (ZODIAC_SIGNS as readonly string[]).includes(value);
}

export function getZodiacCompanion(sign: ZodiacSign): ZodiacCompanion {
  return ZODIAC_COMPANIONS[sign];
}

export function isValidBirthday(month: number, day: number): boolean {
  if (!Number.isInteger(month) || month < 1 || month > 12) {
    return false;
  }
  if (!Number.isInteger(day) || day < 1) {
    return false;
  }
  return day <= DAYS_IN_MONTH[month - 1];
}

/** Western sun sign from month (1–12) and day. */
export function zodiacFromBirthday(month: number, day: number): ZodiacSign {
  if (!isValidBirthday(month, day)) {
    return "gemini";
  }

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
    return "aries";
  }
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
    return "taurus";
  }
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
    return "gemini";
  }
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
    return "cancer";
  }
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    return "leo";
  }
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    return "virgo";
  }
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
    return "libra";
  }
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
    return "scorpio";
  }
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
    return "sagittarius";
  }
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
    return "capricorn";
  }
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
    return "aquarius";
  }
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) {
    return "pisces";
  }

  return "gemini";
}

export function zodiacListForPicker(): ZodiacCompanion[] {
  return ZODIAC_SIGNS.map((id) => ZODIAC_COMPANIONS[id]);
}
