import { cn } from "@utilities/tailwind";
import { StaggerFadeInWrapper } from "@components/animations/stagger-fade-in-wrapper/stagger-fade-in-wrapper";
import styles from "./sidebar-card.module.scss";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function CardList({ children, className }: Props) {
  return (
    <StaggerFadeInWrapper className={cn(styles.cardList, className)}>
      {children}
    </StaggerFadeInWrapper>
  );
}
