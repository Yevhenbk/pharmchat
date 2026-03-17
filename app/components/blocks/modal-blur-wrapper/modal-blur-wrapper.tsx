import { cn } from "@utilities/tailwind";
import styles from "./modal-blur-wrapper.module.scss";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function ModalBlurWrapper({
  children,
  className,
}: Props) {
  return (
    <div className={cn(styles.wrapper, className)}>
      {children}
    </div>
  );
}
