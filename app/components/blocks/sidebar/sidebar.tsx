"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useSession, signOut, signIn } from "next-auth/react";

import { cn } from "@utilities/tailwind";
import { StackLayersIcon } from "@components/icons/stack-layers";
import { ProcurementRunIcon } from "@components/icons/procurement-run-icon";
import { MiraBulbMini } from "@components/icons/mira-bulb-mini";
import { useDashboardStore } from "@providers/store-provider";

import styles from "./sidebar.module.scss";

type DashboardTab = "rx-deck" | "order-run";

interface Props {
  className?: string;
  activeTab?: DashboardTab;
  onTabChange?: (tab: DashboardTab) => void;
}

function NavItem({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      className={cn(styles.navItem, active && styles.navItemActive)}
      onClick={onClick}
    >
      <span className={styles.navIcon}>{icon}</span>
      <span className={styles.navLabel}>{label}</span>
    </button>
  );
}

function UserAvatar({
  src,
  name,
}: {
  src?: string | null;
  name?: string | null;
}) {
  if (src) {
    return (
      <Image
        src={src}
        alt={name ?? "User"}
        width={30}
        height={30}
        className={styles.avatarImg}
        referrerPolicy="no-referrer"
        unoptimized
      />
    );
  }

  const initials =
    name
      ?.split(" ")
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() ?? "?";

  return <span className={styles.avatarInitials}>{initials}</span>;
}

function isDemo(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie.split(";").some((c) => c.trim() === "pharmchat-demo=1");
}

export function Sidebar({ className, activeTab = "rx-deck", onTabChange }: Props) {
  const { data: session } = useSession();
  const user = session?.user;
  const [demo, setDemo] = useState(false);
  useEffect(() => { setDemo(isDemo()); }, []);
  const openChat = useDashboardStore((state) => state.openChat);
  const askMiraRef = useRef<HTMLButtonElement>(null);

  const handleAskMiraClick = () => {
    if (askMiraRef.current) {
      openChat(askMiraRef.current.getBoundingClientRect());
    }
  };

  return (
    <aside className={cn(styles.sidebar, className)} data-sidebar>
      {/* Brand */}
      <div className={styles.brand}>
        <div className={styles.brandLogoWrap}>
          <Image
            src="/logo.png"
            alt="Pharmchat"
            width={22}
            height={22}
            className={styles.brandLogo}
            unoptimized
          />
        </div>
        <span className={styles.brandName}>Pharmchat</span>
      </div>

      {/* Navigation */}
      <nav className={styles.nav}>
        <NavItem
          icon={<StackLayersIcon className="size-full" />}
          label="Rx Deck"
          active={activeTab === "rx-deck"}
          onClick={() => onTabChange?.("rx-deck")}
        />
        <NavItem
          icon={<ProcurementRunIcon className="size-full" />}
          label="Order Run"
          active={activeTab === "order-run"}
          onClick={() => onTabChange?.("order-run")}
        />
        <button
          ref={askMiraRef}
          type="button"
          className={styles.askMiraBtn}
          onClick={handleAskMiraClick}
          aria-label="Ask Mira"
        >
          <MiraBulbMini className={styles.askMiraBulb} />
          <span className={styles.navLabel}>Ask Mira</span>
        </button>
      </nav>

      <div className={styles.spacer} />

      {/* Footer */}
      <div className={styles.footer}>
        <button type="button" className={styles.footerBtn}>
          <svg
            viewBox="0 0 16 16"
            fill="none"
            className={styles.footerBtnIcon}
            aria-hidden="true"
          >
            <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.3" />
            <path
              d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.42 1.42M11.53 11.53l1.42 1.42M3.05 12.95l1.42-1.42M11.53 4.47l1.42-1.42"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </svg>
          <span className={styles.footerBtnLabel}>Settings</span>
        </button>

        <button type="button" className={styles.footerBtn}>
          <svg
            viewBox="0 0 16 16"
            fill="none"
            className={styles.footerBtnIcon}
            aria-hidden="true"
          >
            <path
              d="M2 3.5A1.5 1.5 0 0 1 3.5 2h9A1.5 1.5 0 0 1 14 3.5v7A1.5 1.5 0 0 1 12.5 12H9l-3 2.5V12H3.5A1.5 1.5 0 0 1 2 10.5v-7Z"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinejoin="round"
            />
          </svg>
          <span className={styles.footerBtnLabel}>Contact</span>
        </button>

        <div className={styles.divider} />

        {/* User */}
        {user ? (
          <div className={styles.user}>
            <div className={styles.avatarWrap}>
              <UserAvatar src={user.image} name={user.name} />
            </div>
            <div className={styles.userText}>
              <p className={styles.userName}>{user.name}</p>
              <p className={styles.userEmail}>{user.email}</p>
            </div>
            <button
              type="button"
              className={styles.signOutBtn}
              title="Sign out"
              onClick={() => signOut({ callbackUrl: "/login?last=1" })}
            >
              <svg
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M10.5 11v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h6.5a1 1 0 0 1 1 1v2"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
                <path
                  d="M7 8h7M11.5 5.5 14 8l-2.5 2.5"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        ) : demo ? (
          <button
            type="button"
            className={styles.signInBtn}
            onClick={() => {
              document.cookie = "pharmchat-demo=1; path=/; max-age=0";
              window.location.href = "/login?last=1";
            }}
          >
            Leave Demo
          </button>
        ) : (
          <button
            type="button"
            className={styles.signInBtn}
            onClick={() =>
              signIn("google", { callbackUrl: window.location.href })
            }
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              aria-hidden="true"
              className={styles.googleIcon}
            >
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
        )}
      </div>
    </aside>
  );
}
