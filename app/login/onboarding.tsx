"use client";

import { signIn } from "next-auth/react";
import sharedStyles from "@/app/components/blocks/onboarding/shared.module.scss";
import styles from "./onboarding.module.scss";
import { useOnboardingAnimation } from "@/app/hooks/use-onboarding-animation";
import { posMap, BATCH } from "@/utilities/onboarding-timeline";
import { Slide1 } from "@/app/components/blocks/onboarding/slide-1/slide-1";
import { Slide2 } from "@/app/components/blocks/onboarding/slide-2/slide-2";
import { Slide3 } from "@/app/components/blocks/onboarding/slide-3/slide-3";
import { Slide4 } from "@/app/components/blocks/onboarding/slide-4/slide-4";

export function OnboardingPresentation() {
  // Sequential animation for mobile full-screen
  const { pos } = useOnboardingAnimation();
  // Looping animation for desktop left pane (slides 1–3 only)
  const { pos: loopPos } = useOnboardingAnimation({ loop: true });

  function handleSignIn() {
    signIn("google", { callbackUrl: "/" });
  }

  function handleEnterDemo() {
    document.cookie = "pharmchat-demo=1; path=/; max-age=86400";
    window.location.href = "/";
  }

  const by = posMap(pos);
  const loopBy = posMap(loopPos);

  const mobileSlide = (() => {
    if (pos <= BATCH) return <Slide1 by={by} />;

    if (pos <= BATCH * 2) return <Slide2 by={by} />;

    if (pos < BATCH * 3) return <Slide3 by={by} />;

    return <Slide4 onSignIn={handleSignIn} onEnterDemo={handleEnterDemo} />;
  })();

  const loopSlide = (() => {
    if (loopPos <= BATCH) return <Slide1 by={loopBy} />;

    if (loopPos <= BATCH * 2) return <Slide2 by={loopBy} />;

    return <Slide3 by={loopBy} />;
  })();

  return (
    <div className={sharedStyles.page}>
      {/* ── Desktop split layout (hidden on mobile) ──────── */}
      <div className={styles.desktopLayout}>
        {/* Left 60%: looping presentation */}
        <div className={styles.leftPane}>
          {loopSlide}
        </div>

        {/* Right 40%: static auth */}
        <div className={styles.rightPane}>
          <Slide4 onSignIn={handleSignIn} onEnterDemo={handleEnterDemo} />
        </div>
      </div>

      {/* ── Mobile full-screen (hidden on desktop) ───────── */}
      <div className={styles.mobileLayout}>
        {mobileSlide}
      </div>
    </div>
  );
}
