import { MiraSparkleIcon } from "@components/icons/mira-sparkle-icon";

interface Props {
  onClose: () => void;
}

export function MiraChatHeader({ onClose }: Props) {
  return (
    <header className="flex items-center justify-between pb-4">
      <h1 className="flex items-center gap-2 font-display text-3xl font-light text-text-primary">
        <MiraSparkleIcon />
        Ask Mira
      </h1>

      <button
        type="button"
        onClick={onClose}
        className="flex size-8 items-center justify-center rounded-full text-text-muted transition-colors hover:text-text-primary"
        aria-label="Close chat"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <path
            d="M12 4L4 12M4 4l8 8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </header>
  );
}
