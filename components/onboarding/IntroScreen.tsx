"use client";

import { useState } from "react";
import IntroHeroImage from "@/components/IntroHeroImage";
import { SetupButton } from "@/components/onboarding/SetupLayout";
import { setIntroSeen } from "@/lib/storage";

const BENEFITS = [
  "무의식적 앱 열기 잠깐 멈추기",
  "별자리 친구와 부드러운 개입",
  "필요한 설정은 언제든 끌 수 있어요",
] as const;

type IntroScreenProps = {
  onStart: () => void;
};

export default function IntroScreen({ onStart }: IntroScreenProps) {
  const [showDetail, setShowDetail] = useState(false);

  const handleStart = () => {
    setIntroSeen();
    onStart();
  };

  return (
    <div className="premium-frame animate-fade-up">
      <div className="premium-gradient" aria-hidden />
      <div className="premium-scroll">
        <div className="intro-stack">
          <IntroHeroImage />
          <h1 className="premium-title">
            앱을 열기 전,
            <br />
            잠깐 멈춰볼까요?
          </h1>
          <p className="premium-body">
            Pause Pet은 YouTube, Instagram 같은 자꾸 열게 되는 앱 앞에서
            별자리 친구가 잠깐 나타나, 정말 열지 한 번 더 생각할 수 있게
            도와줘요.
          </p>
          <ul className="intro-benefits">
            {BENEFITS.map((line) => (
              <li key={line} className="intro-benefit">
                <span className="intro-benefit-dot" aria-hidden />
                {line}
              </li>
            ))}
          </ul>
          {showDetail ? (
            <div className="premium-detail-card">
              <p>
                Pause Pet은 앱을 완전히 차단하지 않아요. 열기 직전에 잠깐
                멈춰 생각할 시간을 주고, 별자리 친구가 부드럽게 안내해요.
                설정과 데이터는 기기 안에서만 다뤄요.
              </p>
            </div>
          ) : null}
        </div>
      </div>
      <footer className="premium-footer">
        <div className="premium-footer-stack">
          <SetupButton onClick={handleStart}>시작하기</SetupButton>
          <SetupButton
            variant="ghost"
            onClick={() => setShowDetail((v) => !v)}
          >
            자세히 보기
          </SetupButton>
        </div>
      </footer>
    </div>
  );
}
