/**
 * Future Android native permission model — docs + UI placeholders only.
 * Not used by any native code in the web/PWA prototype.
 */

export type ProtectionMode = "softPause" | "detect" | "lock";

export type NativePermissionId =
  | "usageAccess"
  | "notification"
  | "batteryOptimization"
  | "accessibility"
  | "overlay";

export type NativePermissionInfo = {
  id: NativePermissionId;
  title: string;
  description: string;
  requiredFor: ProtectionMode[];
  optional?: boolean;
  sensitive?: boolean;
};

export type ProtectionModeInfo = {
  id: ProtectionMode;
  title: string;
  summary: string;
  availableOnWeb: boolean;
  permissions: NativePermissionId[];
};

/** Korean permission explanations for future Android onboarding */
export const NATIVE_PERMISSION_COPY = {
  usageAccess:
    "앱을 열고 싶어지는 순간을 알아차리려면 앱 사용 권한이 필요해요. 사용 기록은 기기 안에서만 확인돼요.",
  notification:
    "5분이 지나면 별자리 친구가 조용히 알려줄게요.",
  batteryOptimization:
    "별자리 친구가 중간에 잠들지 않도록 배터리 최적화에서 제외해주세요.",
  accessibility:
    "더 확실히 막고 싶다면 접근성 권한이 필요해요. 선택한 앱을 열 때 별자리 친구가 바로 멈춤 화면을 보여줄 수 있어요.",
  overlay:
    "선택한 앱 위에 멈춤 화면을 띄우려면 다른 앱 위에 표시 권한이 필요해요. (선택 사항)",
} as const;

export const PROTECTION_MODES: ProtectionModeInfo[] = [
  {
    id: "softPause",
    title: "소프트 멈춤",
    summary:
      "지금 웹/PWA처럼, 사용자가 직접 5분 멈춤을 시작해요. 앱 차단 없이 별자리 친구와 함께하는 방식이에요.",
    availableOnWeb: true,
    permissions: [],
  },
  {
    id: "detect",
    title: "감지 모드",
    summary:
      "선택한 앱을 열거나 사용할 때를 감지해, 별자리 친구가 부드럽게 멈춤을 제안해요.",
    availableOnWeb: false,
    permissions: ["usageAccess", "notification", "batteryOptimization"],
  },
  {
    id: "lock",
    title: "잠금 모드",
    summary:
      "선택한 앱을 열 때 별자리 친구가 바로 멈춤 화면을 보여줘요. 가장 강한 보호 모드예요.",
    availableOnWeb: false,
    permissions: [
      "usageAccess",
      "notification",
      "batteryOptimization",
      "accessibility",
    ],
  },
];

export const NATIVE_PERMISSIONS: NativePermissionInfo[] = [
  {
    id: "usageAccess",
    title: "앱 사용 권한 (Usage Access)",
    description: NATIVE_PERMISSION_COPY.usageAccess,
    requiredFor: ["detect", "lock"],
  },
  {
    id: "notification",
    title: "알림 권한",
    description: NATIVE_PERMISSION_COPY.notification,
    requiredFor: ["detect", "lock"],
  },
  {
    id: "batteryOptimization",
    title: "배터리 최적화 제외",
    description: NATIVE_PERMISSION_COPY.batteryOptimization,
    requiredFor: ["detect", "lock"],
  },
  {
    id: "accessibility",
    title: "접근성 서비스",
    description: NATIVE_PERMISSION_COPY.accessibility,
    requiredFor: ["lock"],
    sensitive: true,
  },
  {
    id: "overlay",
    title: "다른 앱 위에 표시 (선택)",
    description: NATIVE_PERMISSION_COPY.overlay,
    requiredFor: [],
    optional: true,
  },
];

export const FUTURE_UI_COPY = {
  screenTitle: "Android 보호 기능 (준비 중)",
  screenSubtitle:
    "Pause Pet은 나중에 Android 앱으로, 선택한 앱을 열 때 별자리 친구가 멈춤을 걸어주는 집중 동반자가 될 예정이에요.",
  webNotice:
    "지금은 웹/PWA 프로토타입이라 실제 권한 요청은 없어요. 아래는 미래 Android 앱 설계안이에요.",
  modesHeading: "보호 모드",
  permissionsHeading: "Android 권한 안내",
  onboardingRoadmapTitle: "온보딩 로드맵",
  onboardingWeb:
    "현재 P1 (웹): 앱 선택 → 별자리 친구 → 앱 열기 시뮬레이션(개입 화면)",
  onboardingAndroid:
    "미래 Android: 줄이고 싶은 앱 선택 → 별자리 친구 → 보호 수준 선택 → 권한 설정",
  back: "← 요약으로",
  homeLink: "Android 보호 기능 미리보기 (준비 중)",
} as const;
