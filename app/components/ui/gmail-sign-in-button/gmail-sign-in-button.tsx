"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export function GmailSignInButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center justify-between gap-2 rounded-xl border border-[var(--color-border-subtle)] bg-[rgba(0,0,0,0.02)] px-3 py-2">
        <div className="min-w-0">
          <p className="truncate text-[11px] font-500 text-[var(--color-text-primary)]">
            {session.user?.email}
          </p>
          <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wide">
            Gmail connected
          </p>
        </div>
        <button
          onClick={() => signOut()}
          className="flex-shrink-0 rounded-lg px-2 py-1 text-[10px] font-500 uppercase tracking-wide text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() =>
        signIn("google", { callbackUrl: window.location.href })
      }
      className="flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--color-border-subtle)] bg-[rgba(0,0,0,0.02)] px-3 py-2.5 text-[11px] font-500 text-[var(--color-text-muted)] hover:bg-[rgba(0,0,0,0.04)] hover:text-[var(--color-text-primary)] transition-colors"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </svg>
      Sign in with Google
    </button>
  );
}
