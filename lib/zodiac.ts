export type ZodiacSign =
  | "aries"
  | "taurus"
  | "gemini"
  | "cancer"
  | "leo"
  | "virgo"
  | "libra"
  | "scorpio"
  | "sagittarius"
  | "capricorn"
  | "aquarius"
  | "pisces";

export type ZodiacCompanion = {
  id: ZodiacSign;
  koreanName: string;
  englishName: string;
  symbol: string;
  dateRange: string;
  imagePath: string;
  accentColor: string;
  softBg: string;
  personality: string;
  shortTrait: string;

  onboardingTitle: string;
  onboardingDescription: string;

  interceptTitle: string;
  interceptMessage: string;

  preventedTitle: string;
  preventedMessage: string;

  durationTitle: string;
  durationMessage: string;

  comfortTitle: string;
  comfortMessage: string;

  reminderTitle: string;
  reminderMessage: string;

  imagePrompt: string;
};

export const ZODIAC_COMPANIONS: Record<ZodiacSign, ZodiacCompanion> = {
  aries: {
    id: "aries",
    koreanName: "양자리",
    englishName: "Aries",
    symbol: "♈",
    dateRange: "3.21 - 4.19",
    imagePath: "/pets/aries.png",
    accentColor: "#F97373",
    softBg: "from-rose-100 via-orange-50 to-amber-50",
    personality: "씩씩하고 에너지 넘치게 작은 시작을 도와주는 친구",
    shortTrait: "바로 시작하는 용기",
    onboardingTitle: "양자리 친구가 왔어요",
    onboardingDescription:
      "작게라도 바로 시작해보자고 말해주는 씩씩한 친구예요.",
    interceptTitle: "잠깐! 바로 열기 전에",
    interceptMessage:
      "5분만 같이 가볼래요? 지금 멈추는 것도 꽤 멋진 시작이에요.",
    preventedTitle: "좋았어요",
    preventedMessage:
      "바로 반응하지 않고 한 번 멈췄어요. 이번 선택은 꽤 씩씩했어요.",
    durationTitle: "좋아요. 딱 정하고 가요",
    durationMessage:
      "몇 분만 볼지 먼저 정해두면, 다시 돌아오기가 훨씬 쉬워져요.",
    comfortTitle: "괜찮아요",
    comfortMessage:
      "다시 시작하면 돼요. 양자리 친구는 언제든 같이 갈 준비가 되어 있어요.",
    reminderTitle: "약속한 시간이 됐어요",
    reminderMessage: "이제 다시 돌아가볼까요? 작은 약속을 지킬 차례예요.",
    imagePrompt:
      "Create an Aries zodiac companion pet for Pause Pet. A brave, energetic, encouraging soft round mascot with small ram horns, subtle red or coral accent colors, tiny star spark details, cheerful bold motivating expression, cute and approachable, not intense, with a subtle Aries zodiac symbol. Soft pastel, cozy warm, chibi mascot, sticker-like clarity, centered full-body, simple app-friendly illustration.",
  },

  taurus: {
    id: "taurus",
    koreanName: "황소자리",
    englishName: "Taurus",
    symbol: "♉",
    dateRange: "4.20 - 5.20",
    imagePath: "/pets/taurus.png",
    accentColor: "#8FA86B",
    softBg: "from-lime-100 via-stone-50 to-amber-50",
    personality: "천천히, 하지만 꾸준히 옆에 있어주는 안정적인 친구",
    shortTrait: "차분한 꾸준함",
    onboardingTitle: "황소자리 친구가 왔어요",
    onboardingDescription:
      "천천히, 하지만 꾸준히 옆에 있어주는 포근한 친구예요.",
    interceptTitle: "잠깐 쉬어가도 괜찮아요",
    interceptMessage:
      "바로 열기 전에 먼저 5분만 같이 있어볼까요?",
    preventedTitle: "잘했어요",
    preventedMessage:
      "마음이 흔들려도 차분히 지나왔어요. 황소자리 친구가 조용히 기뻐하고 있어요.",
    durationTitle: "좋아요. 편안하게 정해요",
    durationMessage:
      "몇 분만 볼지 정하고 가면, 마음도 조금 더 편해져요.",
    comfortTitle: "오늘은 여기까지여도 괜찮아요",
    comfortMessage:
      "천천히 다시 해봐요. 황소자리 친구는 계속 옆에 있을게요.",
    reminderTitle: "정한 시간이 다 됐어요",
    reminderMessage:
      "이제 천천히 돌아올까요? 급하지 않아도 괜찮아요.",
    imagePrompt:
      "Create a Taurus zodiac companion pet for Pause Pet. A calm, steady, warm, reliable soft round mascot with gentle bull horns, beige, olive, warm brown, muted green accents, cozy grounded mood, patient comforting dependable expression, a little friend that stays beside the user quietly, with a subtle Taurus zodiac symbol. Soft pastel, Korean mobile app aesthetic, sticker-like clarity, centered full-body.",
  },

  gemini: {
    id: "gemini",
    koreanName: "쌍둥이자리",
    englishName: "Gemini",
    symbol: "♊",
    dateRange: "5.21 - 6.21",
    imagePath: "/pets/gemini.png",
    accentColor: "#F5C84B",
    softBg: "from-yellow-100 via-mint-50 to-sky-50",
    personality: "재치 있고 가볍게 충동을 끊어주는 장난스러운 친구",
    shortTrait: "가벼운 전환",
    onboardingTitle: "쌍둥이자리 친구가 왔어요",
    onboardingDescription:
      "딴길로 새기 전에 재치 있게 붙잡아주는 친구예요.",
    interceptTitle: "잠깐만!",
    interceptMessage:
      "바로 열기 전에 나랑 5분만 수다 떨다 갈래요?",
    preventedTitle: "오, 좋았어요",
    preventedMessage:
      "이번엔 충동보다 당신이 더 빨랐네요. 꽤 재밌는 승리예요.",
    durationTitle: "좋아요. 먼저 정해볼까요?",
    durationMessage:
      "몇 분만 보고 올지 정하고 가면, 딴길로 새는 걸 줄일 수 있어요.",
    comfortTitle: "괜찮아요",
    comfortMessage:
      "다음엔 더 가볍게 다시 해봐요. 쌍둥이자리 친구가 또 말을 걸어줄게요.",
    reminderTitle: "시간 끝!",
    reminderMessage:
      "이제 다시 돌아올 타이밍이에요. 너무 멀리 가진 말아요.",
    imagePrompt:
      "Create a Gemini zodiac companion pet for Pause Pet. A playful, curious, witty, lively soft round mascot with twin-inspired details, two small accessories or mirrored ear details, yellow mint or light sky accents, bright talkative playful expression, a curious friend who gently interrupts distraction, with a subtle Gemini zodiac symbol. Cute chibi, soft pastel, centered, app-friendly.",
  },

  cancer: {
    id: "cancer",
    koreanName: "게자리",
    englishName: "Cancer",
    symbol: "♋",
    dateRange: "6.22 - 7.22",
    imagePath: "/pets/cancer.png",
    accentColor: "#8ABBE8",
    softBg: "from-blue-100 via-slate-50 to-cream-50",
    personality: "마음이 흔들릴 때 다정하게 곁을 지켜주는 친구",
    shortTrait: "다정한 보호",
    onboardingTitle: "게자리 친구가 왔어요",
    onboardingDescription:
      "마음이 흔들릴 때 다정하게 곁을 지켜주는 친구예요.",
    interceptTitle: "지금 조금 끌렸죠?",
    interceptMessage:
      "괜찮아요. 바로 열기 전에 나랑 먼저 잠깐만 있어볼까요?",
    preventedTitle: "잘 넘겼어요",
    preventedMessage:
      "마음이 흔들려도 조용히 지나보냈어요. 정말 잘했어요.",
    durationTitle: "좋아요. 부담 없게 정해요",
    durationMessage:
      "몇 분만 볼지 먼저 정해두면 마음이 덜 흔들릴 수 있어요.",
    comfortTitle: "오늘 힘들었죠",
    comfortMessage:
      "여기까지여도 괜찮아요. 게자리 친구는 계속 옆에 있을게요.",
    reminderTitle: "이제 돌아올 시간이에요",
    reminderMessage:
      "게자리 친구가 기다리고 있어요. 천천히 돌아와도 괜찮아요.",
    imagePrompt:
      "Create a Cancer zodiac companion pet for Pause Pet. A caring, gentle, emotionally warm, protective soft round mascot with subtle crab-inspired details, tiny claw-like decorative shapes or shell-like softness, moonlit cream, soft blue, pearl accents, empathetic sweet comforting expression, with a subtle Cancer zodiac symbol. Warm cozy chibi mascot, centered, simple background.",
  },

  leo: {
    id: "leo",
    koreanName: "사자자리",
    englishName: "Leo",
    symbol: "♌",
    dateRange: "7.23 - 8.22",
    imagePath: "/pets/leo.png",
    accentColor: "#F6A73A",
    softBg: "from-orange-100 via-yellow-50 to-amber-50",
    personality: "성공을 크게 축하해주는 자신감 있는 칭찬형 친구",
    shortTrait: "밝은 칭찬",
    onboardingTitle: "사자자리 친구가 왔어요",
    onboardingDescription:
      "해냈을 때 누구보다 크게 칭찬해주는 친구예요.",
    interceptTitle: "잠깐, 멋지게 한 번 넘겨볼까요?",
    interceptMessage:
      "바로 열지 않고 멈추는 것도 충분히 당당한 선택이에요.",
    preventedTitle: "역시 해냈네요",
    preventedMessage:
      "꽤 멋진 선택이었어요. 사자자리 친구가 자랑스러워하고 있어요.",
    durationTitle: "좋아요. 멋지게 정해요",
    durationMessage:
      "딱 정한 시간만 보고 돌아오면 더 멋진 선택이 될 거예요.",
    comfortTitle: "괜찮아요",
    comfortMessage:
      "오늘의 선택이 전부를 정하진 않아요. 다음 선택은 다시 만들 수 있어요.",
    reminderTitle: "약속한 시간이 끝났어요",
    reminderMessage:
      "이제 멋지게 돌아와볼까요? 사자자리 친구가 기다리고 있어요.",
    imagePrompt:
      "Create a Leo zodiac companion pet for Pause Pet. A confident, sunny, proud, praise-giving soft round mascot with a lion-inspired mane, golden yellow apricot warm orange accents, subtle star glow, bright confident celebratory expression, a friend who proudly cheers for the user, with a subtle Leo zodiac symbol. Cute chibi, soft pastel, app icon friendly.",
  },

  virgo: {
    id: "virgo",
    koreanName: "처녀자리",
    englishName: "Virgo",
    symbol: "♍",
    dateRange: "8.23 - 9.22",
    imagePath: "/pets/virgo.png",
    accentColor: "#9BAE7A",
    softBg: "from-green-100 via-stone-50 to-yellow-50",
    personality: "마음을 차분히 정리하고 작은 루틴을 만드는 친구",
    shortTrait: "차분한 정리",
    onboardingTitle: "처녀자리 친구가 왔어요",
    onboardingDescription:
      "마음을 차분히 정리하고 작은 루틴을 함께 만드는 친구예요.",
    interceptTitle: "바로 열기 전에",
    interceptMessage:
      "먼저 5분만 마음을 정리해볼까요?",
    preventedTitle: "좋아요",
    preventedMessage:
      "충동 대신 작은 질서를 선택했어요. 아주 차분한 선택이었어요.",
    durationTitle: "좋아요. 먼저 정하고 가요",
    durationMessage:
      "몇 분만 볼지 정해두면 다시 리듬을 찾기 쉬워져요.",
    comfortTitle: "괜찮아요",
    comfortMessage:
      "흐트러질 수 있어요. 다시 정리하면 돼요.",
    reminderTitle: "정한 시간이 끝났어요",
    reminderMessage:
      "이제 다시 리듬을 찾아볼까요?",
    imagePrompt:
      "Create a Virgo zodiac companion pet for Pause Pet. A neat, thoughtful, calm, organized soft round mascot with clean refined details, wheat leaf or tidy ribbon motifs, soft sage cream dusty yellow muted green accents, calm precise reassuring expression, a companion that brings order and calm, with a subtle Virgo zodiac symbol. Soft pastel, sticker-like, centered.",
  },

  libra: {
    id: "libra",
    koreanName: "천칭자리",
    englishName: "Libra",
    symbol: "♎",
    dateRange: "9.23 - 10.22",
    imagePath: "/pets/libra.png",
    accentColor: "#C8A2E8",
    softBg: "from-purple-100 via-pink-50 to-blue-50",
    personality: "하고 싶은 마음과 멈추고 싶은 마음 사이의 균형을 잡아주는 친구",
    shortTrait: "부드러운 균형",
    onboardingTitle: "천칭자리 친구가 왔어요",
    onboardingDescription:
      "하고 싶은 마음과 쉬고 싶은 마음 사이의 균형을 잡아주는 친구예요.",
    interceptTitle: "바로 열기 전에",
    interceptMessage:
      "균형 있게 한 번만 생각해볼까요?",
    preventedTitle: "좋은 선택이었어요",
    preventedMessage:
      "오늘의 균형을 잘 지켰어요. 천칭자리 친구가 조용히 미소 짓고 있어요.",
    durationTitle: "좋아요. 너무 길지 않게",
    durationMessage:
      "몇 분만 볼지 정해두면 균형을 지키기 쉬워요.",
    comfortTitle: "괜찮아요",
    comfortMessage:
      "균형은 한 번에 완벽해지지 않아요. 다시 맞춰가면 돼요.",
    reminderTitle: "이제 다시 균형을 맞출 시간이에요",
    reminderMessage:
      "정한 시간이 지났어요. 천칭자리 친구가 기다리고 있어요.",
    imagePrompt:
      "Create a Libra zodiac companion pet for Pause Pet. A balanced, graceful, harmonious, kind soft round mascot with symmetrical design details, tiny scale-inspired ornament, blush pink lavender cream light blue accents, peaceful elegant expression, a companion that helps the user choose balance, with a subtle Libra zodiac symbol. Cute pastel chibi, centered.",
  },

  scorpio: {
    id: "scorpio",
    koreanName: "전갈자리",
    englishName: "Scorpio",
    symbol: "♏",
    dateRange: "10.23 - 11.21",
    imagePath: "/pets/scorpio.png",
    accentColor: "#7C5C9E",
    softBg: "from-violet-100 via-indigo-50 to-rose-50",
    personality: "흔들리는 순간을 조용히 붙잡아주는 집중형 친구",
    shortTrait: "깊은 집중",
    onboardingTitle: "전갈자리 친구가 왔어요",
    onboardingDescription:
      "흔들리는 순간을 조용히 붙잡아주는 집중형 친구예요.",
    interceptTitle: "잠깐",
    interceptMessage:
      "지금 이 마음을 바로 따라가지 말고, 같이 바라볼까요?",
    preventedTitle: "좋았어요",
    preventedMessage:
      "충동을 그냥 흘려보내지 않고, 제대로 지나왔어요.",
    durationTitle: "좋아요. 정한 만큼만",
    durationMessage:
      "정한 시간만 보고 다시 돌아와요. 깊게 빠지기 전에 선을 만들어둘게요.",
    comfortTitle: "괜찮아요",
    comfortMessage:
      "오늘의 흔들림도 지나가는 과정이에요. 전갈자리 친구가 조용히 곁에 있어요.",
    reminderTitle: "시간이 다 됐어요",
    reminderMessage:
      "이제 다시 이쪽으로 돌아올까요?",
    imagePrompt:
      "Create a Scorpio zodiac companion pet for Pause Pet. A focused, deep, quiet, gently intense soft round mascot with subtle scorpion-inspired tail detail, plum indigo deep rose accents, starry night mood but cute and warm, observant calm quietly powerful expression, with a subtle Scorpio zodiac symbol. Soft pastel, app-friendly, centered.",
  },

  sagittarius: {
    id: "sagittarius",
    koreanName: "사수자리",
    englishName: "Sagittarius",
    symbol: "♐",
    dateRange: "11.22 - 12.21",
    imagePath: "/pets/sagittarius.png",
    accentColor: "#63A7F2",
    softBg: "from-sky-100 via-indigo-50 to-orange-50",
    personality: "가볍고 산뜻하게 무리 없이 멈추게 도와주는 친구",
    shortTrait: "가벼운 자유",
    onboardingTitle: "사수자리 친구가 왔어요",
    onboardingDescription:
      "가볍고 산뜻하게, 무리 없이 멈추게 도와주는 친구예요.",
    interceptTitle: "바로 열기 전에",
    interceptMessage:
      "나랑 5분만 가볍게 쉬었다 갈래요?",
    preventedTitle: "좋았어요",
    preventedMessage:
      "가볍게 한 번 잘 넘겼네요. 사수자리 친구가 산뜻하게 웃고 있어요.",
    durationTitle: "좋아요. 산뜻하게 정해요",
    durationMessage:
      "몇 분만 보고 돌아올지 정해두면 더 가볍게 즐길 수 있어요.",
    comfortTitle: "괜찮아요",
    comfortMessage:
      "너무 무겁게 생각하지 말아요. 다시보면 돼요.",
    reminderTitle: "시간 끝!",
    reminderMessage:
      "이제 가볍게 돌아와볼까요?",
    imagePrompt:
      "Create a Sagittarius zodiac companion pet for Pause Pet. A free-spirited, optimistic, adventurous, light soft round mascot with arrow or constellation-inspired details, sky blue lilac bright coral accents, lively breezy encouraging expression, a companion that says let's take a light pause together, with a subtle Sagittarius zodiac symbol. Cute pastel, centered, sticker-like.",
  },

  capricorn: {
    id: "capricorn",
    koreanName: "염소자리",
    englishName: "Capricorn",
    symbol: "♑",
    dateRange: "12.22 - 1.19",
    imagePath: "/pets/capricorn.png",
    accentColor: "#7F8794",
    softBg: "from-slate-100 via-stone-50 to-blue-50",
    personality: "작은 선택이 쌓여 큰 차이를 만든다고 믿는 친구",
    shortTrait: "작은 축적",
    onboardingTitle: "염소자리 친구가 왔어요",
    onboardingDescription:
      "작은 선택이 쌓여 큰 차이를 만든다고 믿는 친구예요.",
    interceptTitle: "잠깐 멈출까요?",
    interceptMessage:
      "이런 작은 선택이 진짜 쌓여요. 5분만 같이 버텨볼까요?",
    preventedTitle: "좋아요",
    preventedMessage:
      "오늘의 작은 절제가 하나 더 쌓였어요.",
    durationTitle: "좋아요. 정확히 정해요",
    durationMessage:
      "정한 시간만 보고 돌아오는 것까지가 오늘의 작은 약속이에요.",
    comfortTitle: "괜찮아요",
    comfortMessage:
      "중요한 건 다시 이어가는 거예요. 염소자리 친구는 꾸준히 기다릴게요.",
    reminderTitle: "약속한 시간이 끝났어요",
    reminderMessage:
      "이제 다시 돌아와요. 작은 약속을 지킬 시간이예요.",
    imagePrompt:
      "Create a Capricorn zodiac companion pet for Pause Pet. A disciplined, patient, dependable, quietly ambitious soft round mascot with curved goat-horn details, slate cocoa muted blue warm gray accents, steady strong quietly encouraging expression, a companion that believes small steps add up, with a subtle Capricorn zodiac symbol. Soft pastel, clean mobile app mascot.",
  },

  aquarius: {
    id: "aquarius",
    koreanName: "물병자리",
    englishName: "Aquarius",
    symbol: "♒",
    dateRange: "1.20 - 2.18",
    imagePath: "/pets/aquarius.png",
    accentColor: "#36B6D8",
    softBg: "from-cyan-100 via-blue-50 to-violet-50",
    personality: "충동을 억지로 누르기보다 흥미롭게 관찰하게 도와주는 친구",
    shortTrait: "관찰하는 거리감",
    onboardingTitle: "물병자리 친구가 왔어요",
    onboardingDescription:
      "충동을 억지로 누르기보다, 흥미롭게 관찰하게 도와주는 친구예요.",
    interceptTitle: "재밌는 실험 하나 해볼까요?",
    interceptMessage:
      "지금 이 충동을 5분만 지켜봐요. 바로 따라가지 않아도 괜찮아요.",
    preventedTitle: "좋아요",
    preventedMessage:
      "충동을 바로 따르지 않고 한 번 관찰했어요. 꽤 흥미로운 선택이었어요.",
    durationTitle: "좋아요. 먼저 정해볼까요?",
    durationMessage:
      "몇 분만 보기로 할지 정하고, 그 뒤의 나를 관찰해봐요.",
    comfortTitle: "괜찮아요",
    comfortMessage:
      "데이터 하나 더 쌓였다고 생각해도 좋아요. 다음 선택에 써볼 수 있어요.",
    reminderTitle: "정한 시간이 끝났어요",
    reminderMessage:
      "이제 다시 방향을 바꿔볼까요?",
    imagePrompt:
      "Create an Aquarius zodiac companion pet for Pause Pet. An original, cool, thoughtful, creative soft round mascot with wave-inspired or airy futuristic details, aqua electric blue soft cyan accents, fresh clever slightly quirky expression, a companion that helps the user observe their impulse with curiosity, with a subtle Aquarius zodiac symbol. Cute pastel chibi, app-friendly.",
  },

  pisces: {
    id: "pisces",
    koreanName: "물고기자리",
    englishName: "Pisces",
    symbol: "♓",
    dateRange: "2.19 - 3.20",
    imagePath: "/pets/pisces.png",
    accentColor: "#8BA7F7",
    softBg: "from-blue-100 via-purple-50 to-teal-50",
    personality: "마음이 흔들리는 순간을 부드럽게 감싸주는 친구",
    shortTrait: "몽글한 위로",
    onboardingTitle: "물고기자리 친구가 왔어요",
    onboardingDescription:
      "마음이 흔들리는 순간을 부드럽게 감싸주는 친구예요.",
    interceptTitle: "잠깐만요",
    interceptMessage:
      "바로 열기 전에, 나랑 조용히 5분만 떠 있어볼까요?",
    preventedTitle: "잘했어요",
    preventedMessage:
      "흔들리던 마음이 조금 잔잔해졌어요. 물고기자리 친구가 조용히 기뻐하고 있어요.",
    durationTitle: "좋아요. 먼저 정해요",
    durationMessage:
      "몇 분만 다녀올지 정해두면 마음이 덜 흘러가요.",
    comfortTitle: "괜찮아요",
    comfortMessage:
      "오늘의 흔들림도 자연스러운 거예요. 부드럽게 다시 돌아오면 돼요.",
    reminderTitle: "이제 돌아올 시간이에요",
    reminderMessage:
      "물고기자리 친구가 조용히 기다리고 있어요.",
    imagePrompt:
      "Create a Pisces zodiac companion pet for Pause Pet. A dreamy, soft, sensitive, emotionally soothing soft round mascot with fish-fin or water-drop-inspired details, pastel blue lavender seafoam accents, dreamy sweet gentle expression, a companion that softly helps the user drift away from distraction, with a subtle Pisces zodiac symbol. Soft pastel, cozy, centered full-body.",
  },
};

export const ZODIAC_ORDER: ZodiacSign[] = [
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
];

export function getZodiacCompanion(sign: ZodiacSign): ZodiacCompanion {
  return ZODIAC_COMPANIONS[sign];
}

export function isZodiacSign(value: string): value is ZodiacSign {
  return ZODIAC_ORDER.includes(value as ZodiacSign);
}

const DAYS_IN_MONTH = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] as const;

export function isValidBirthday(month: number, day: number): boolean {
  if (!Number.isInteger(month) || !Number.isInteger(day)) return false;
  if (month < 1 || month > 12 || day < 1) return false;
  return day <= DAYS_IN_MONTH[month - 1];
}

export function getZodiacFromBirthday(
  month: number,
  day: number
): ZodiacSign | null {
  if (!isValidBirthday(month, day)) return null;

  // Western zodiac date ranges
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "aries";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "taurus";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 21)) return "gemini";
  if ((month === 6 && day >= 22) || (month === 7 && day <= 22)) return "cancer";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "leo";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "virgo";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "libra";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "scorpio";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "sagittarius";
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "capricorn";
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "aquarius";
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "pisces";

  return null;
}

export function getAllZodiacCompanions(): ZodiacCompanion[] {
  return ZODIAC_ORDER.map((sign) => ZODIAC_COMPANIONS[sign]);
}

export function getZodiacImagePath(sign: ZodiacSign): string {
  return ZODIAC_COMPANIONS[sign].imagePath;
}

export const ZODIAC_SIGNS = ZODIAC_ORDER;
export function zodiacListForPicker() {
  return getAllZodiacCompanions();
}
export function zodiacFromBirthday(month: number, day: number): ZodiacSign {
  return getZodiacFromBirthday(month, day) ?? "gemini";
}

