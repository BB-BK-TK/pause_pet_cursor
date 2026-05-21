import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import PrimaryButton from "@/components/PrimaryButton";
import SoftCard from "@/components/SoftCard";
import {
  FUTURE_UI_COPY,
  NATIVE_PERMISSIONS,
  PROTECTION_MODES,
} from "@/lib/nativePermissions";

type FutureProtectionScreenProps = {
  onBack: () => void;
};

export default function FutureProtectionScreen({
  onBack,
}: FutureProtectionScreenProps) {
  return (
    <AppShell
      footer={
        <PrimaryButton variant="secondary" onClick={onBack}>
          {FUTURE_UI_COPY.back}
        </PrimaryButton>
      }
    >
      <div className="screen-stack">
        <PageHeader
          title={FUTURE_UI_COPY.screenTitle}
          subtitle={FUTURE_UI_COPY.screenSubtitle}
          align="left"
          compact
        />

        <SoftCard className="border-dashed border-amber-200/90 bg-amber-50/40 !p-4">
          <p className="text-sm leading-relaxed text-stone-600">
            {FUTURE_UI_COPY.webNotice}
          </p>
        </SoftCard>

        <SoftCard className="!p-4">
          <h2 className="text-sm font-bold text-stone-800">
            {FUTURE_UI_COPY.modesHeading}
          </h2>
          <ul className="mt-3 space-y-3">
            {PROTECTION_MODES.map((mode) => (
              <li
                key={mode.id}
                className="rounded-2xl bg-white/80 px-3 py-3 text-sm"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-stone-800">
                    {mode.title}
                  </span>
                  {mode.availableOnWeb ? (
                    <span className="shrink-0 rounded-full bg-emerald-100 px-2 py-0.5 text-[0.65rem] font-semibold text-emerald-800">
                      현재 웹
                    </span>
                  ) : (
                    <span className="shrink-0 rounded-full bg-stone-100 px-2 py-0.5 text-[0.65rem] font-semibold text-stone-600">
                      Android
                    </span>
                  )}
                </div>
                <p className="mt-1.5 leading-relaxed text-stone-600">
                  {mode.summary}
                </p>
              </li>
            ))}
          </ul>
        </SoftCard>

        <SoftCard className="!p-4">
          <h2 className="text-sm font-bold text-stone-800">
            {FUTURE_UI_COPY.permissionsHeading}
          </h2>
          <ul className="mt-3 space-y-3">
            {NATIVE_PERMISSIONS.map((perm) => (
              <li
                key={perm.id}
                className="rounded-2xl border border-stone-100 bg-white/90 px-3 py-3 text-sm"
              >
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="font-semibold text-stone-800">
                    {perm.title}
                  </span>
                  {perm.optional && (
                    <span className="rounded-full bg-stone-100 px-2 py-0.5 text-[0.65rem] font-medium text-stone-500">
                      선택
                    </span>
                  )}
                  {perm.sensitive && (
                    <span className="rounded-full bg-violet-100 px-2 py-0.5 text-[0.65rem] font-medium text-violet-800">
                      잠금 모드만
                    </span>
                  )}
                </div>
                <p className="mt-1.5 leading-relaxed text-stone-600">
                  {perm.description}
                </p>
              </li>
            ))}
          </ul>
        </SoftCard>

        <SoftCard variant="calm" className="!p-4">
          <h2 className="text-sm font-bold text-stone-800">
            {FUTURE_UI_COPY.onboardingRoadmapTitle}
          </h2>
          <p className="mt-2 text-sm text-stone-600">
            <span className="font-medium text-stone-700">현재: </span>
            {FUTURE_UI_COPY.onboardingWeb}
          </p>
          <p className="mt-2 text-sm text-stone-600">
            <span className="font-medium text-stone-700">미래: </span>
            {FUTURE_UI_COPY.onboardingAndroid}
          </p>
        </SoftCard>
      </div>
    </AppShell>
  );
}
