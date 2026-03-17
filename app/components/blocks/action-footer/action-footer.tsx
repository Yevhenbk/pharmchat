import { cn } from "@utilities/tailwind";
import { ModalButton } from "@components/ui/modal-button";
import styles from "./action-footer.module.scss";

interface ApproveRejectFooterProps {
  variant: "approve-reject";
  onApprove?: () => void;
  onReject?: () => void;
  className?: string;
}

interface AcknowledgeFooterProps {
  variant: "acknowledge";
  acknowledgeLabel: string;
  onAcknowledge?: () => void;
  className?: string;
}

type Props =
  | ApproveRejectFooterProps
  | AcknowledgeFooterProps;

export function ActionFooter(props: Props) {
  return (
    <div className={cn(styles.footer, props.className)}>
      {props.variant === "approve-reject" ? (
        <>
          <ModalButton variant="reject" onClick={props.onReject}>
            Reject
          </ModalButton>

          <ModalButton variant="approve" onClick={props.onApprove}>
            Approve
          </ModalButton>
        </>
      ) : (
        <ModalButton
          variant="acknowledge"
          onClick={props.onAcknowledge}
        >
          {props.acknowledgeLabel}
        </ModalButton>
      )}
    </div>
  );
}
