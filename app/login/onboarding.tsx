"use client";

import { signIn } from "next-auth/react";
import sharedStyles from "@/app/components/blocks/onboarding/shared.module.scss";
import { useOnboardingAnimation } from "@/app/hooks/use-onboarding-animation";
import { posMap } from "@/utilities/onboarding-timeline";
import { BATCH, MAX } from "@/utilities/onboarding-timeline";
import { Slide1 } from "@/app/components/blocks/onboarding/slide-1/slide-1";
import { Slide2 } from "@/app/components/blocks/onboarding/slide-2/slide-2";
import { Slide3 } from "@/app/components/blocks/onboarding/slide-3/slide-3";
import { Slide4 } from "@/app/components/blocks/onboarding/slide-4/slide-4";

export function OnboardingPresentation() {
  const { pos, progress } = useOnboardingAnimation();

  function handleSignIn() {
    signIn("google", { callbackUrl: "/" });
  }

  function handleEnterDemo() {
    document.cookie = "pharmchat-demo=1; path=/; max-age=86400";
    window.location.href = "/";
  }

  const by = posMap(pos);

  // Green slides: Slide1 (pos 0-30) and Slide3 (pos 60-90)
  const isGreen = pos <= BATCH || (pos >= BATCH * 2 && pos < BATCH * 3);

  const slide = (() => {
    if (pos <= BATCH) return <Slide1 by={by} />;
    if (pos <= BATCH * 2) return <Slide2 by={by} />;
    if (pos < BATCH * 3) return <Slide3 by={by} />;
    return <Slide4 onSignIn={handleSignIn} onEnterDemo={handleEnterDemo} />;
  })();

  return (
    <div className={sharedStyles.page}>
      {/* Progress bar */}
      <div className={sharedStyles.progressBar}>
        <div className={sharedStyles.progressFill} style={{ width: `${progress}%` }} />
      </div>

      {/* Logo with dynamic styling */}
      <div
        className={`${sharedStyles.logoWrap} ${isGreen ? sharedStyles.logoOnGreen : sharedStyles.logoOnDark}`}
      >
        <span className={sharedStyles.logoText}>Pharmchat</span>
      </div>

      {slide}
    </div>
  );
}
