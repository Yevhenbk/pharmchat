import { cn } from "@utilities/tailwind";
import type { ModalMode } from "@models/modal";
import type { ProcurementRunData } from "@models/procurement";
import type { ActionItemData } from "@models/action-item";
import { POQueueSidebar } from "@components/blocks/po-queue-sidebar/po-queue-sidebar";
import { ActionSidebar } from "@components/blocks/action-sidebar/action-sidebar";
import styles from "./modal-sidebar.module.scss";

interface Props {
  mode: ModalMode;
  procurementData?: ProcurementRunData;
  selectedVendorId?: string;
  onSelectVendor?: (vendorId: string) => void;
  dismissingVendorId?: string;
  onVendorDismissComplete?: () => void;
  actionItems?: readonly ActionItemData[];
  selectedActionId?: string;
  onSelectAction?: (id: string) => void;
  dismissingActionId?: string;
  onDismissComplete?: () => void;
  isWhyOrderCardOpen?: boolean;
  isDeleteModalOpen?: boolean;
  className?: string;
}

function SidebarContent({
  mode,
  procurementData,
  selectedVendorId,
  onSelectVendor,
  dismissingVendorId,
  onVendorDismissComplete,
  actionItems,
  selectedActionId,
  onSelectAction,
  dismissingActionId,
  onDismissComplete,
}: Omit<Props, "isWhyOrderCardOpen" | "isDeleteModalOpen" | "className">) {
  if (
    mode === "po-queue" &&
    procurementData &&
    selectedVendorId &&
    onSelectVendor
  ) {
    return (
      <POQueueSidebar
        data={procurementData}
        selectedVendorId={selectedVendorId}
        onSelectVendor={onSelectVendor}
        dismissingVendorId={dismissingVendorId}
        onDismissComplete={onVendorDismissComplete}
      />
    );
  }

  if (actionItems && selectedActionId && onSelectAction) {
    return (
      <ActionSidebar
        items={actionItems}
        selectedId={selectedActionId}
        onSelectItem={onSelectAction}
        dismissingId={dismissingActionId}
        onDismissComplete={onDismissComplete}
      />
    );
  }

  return null;
}

export function ModalSidebar({
  mode,
  procurementData,
  selectedVendorId,
  onSelectVendor,
  dismissingVendorId,
  onVendorDismissComplete,
  actionItems,
  selectedActionId,
  onSelectAction,
  dismissingActionId,
  onDismissComplete,
  isWhyOrderCardOpen,
  isDeleteModalOpen,
  className,
}: Props) {
  return (
    <aside
      className={cn(
        styles.sidebar,
        mode === "po-queue" && styles.sidebarNoScroll,
        "animate-fade-in",
        (isWhyOrderCardOpen || isDeleteModalOpen) && styles.sidebarBlurred,
        className,
      )}
    >
      <SidebarContent
        mode={mode}
        procurementData={procurementData}
        selectedVendorId={selectedVendorId}
        onSelectVendor={onSelectVendor}
        dismissingVendorId={dismissingVendorId}
        onVendorDismissComplete={onVendorDismissComplete}
        actionItems={actionItems}
        selectedActionId={selectedActionId}
        onSelectAction={onSelectAction}
        dismissingActionId={dismissingActionId}
        onDismissComplete={onDismissComplete}
      />
    </aside>
  );
}
