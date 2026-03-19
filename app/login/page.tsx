"use client";

import dynamic from "next/dynamic";

const OnboardingPresentation = dynamic(
  () => import("./onboarding").then((m) => m.OnboardingPresentation),
  { ssr: false },
);

export default function LoginPage() {
  return <OnboardingPresentation />;
}
