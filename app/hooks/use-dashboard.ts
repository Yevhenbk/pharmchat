"use client";

import { useCallback, useMemo } from "react";
import { useShallow } from "zustand/react/shallow";

import type { ModalMode } from "@models/modal";
import { useDashboardStore } from "@providers/store-provider";

export function useDashboard() {
  const {
    modalState,
    procurementData,
    actionItems,
    dismissedActionIds,
    confirmedVendorIds,
    selectedVendorId,
    selectedActionId,
    selectedSkuId,
    dismissingActionId,
    dismissingVendorId,
    skuSidebarOpen,
    isDeleteModalOpen,
    openModal,
    closeModal,
    selectVendor,
    setDismissingVendorId,
    completeVendorDismiss,
    selectAction,
    startDismissAction,
    completeDismissAction,
    openSkuSidebar,
    closeSkuSidebar,
    setDeleteModalOpen,
    openChat,
  } = useDashboardStore(
    useShallow((state) => ({
      modalState: state.modalState,
      procurementData: state.procurementData,
      actionItems: state.actionItems,
      dismissedActionIds: state.dismissedActionIds,
      confirmedVendorIds: state.confirmedVendorIds,
      selectedVendorId: state.selectedVendorId,
      selectedActionId: state.selectedActionId,
      selectedSkuId: state.selectedSkuId,
      dismissingActionId: state.dismissingActionId,
      dismissingVendorId: state.dismissingVendorId,
      skuSidebarOpen: state.skuSidebarOpen,
      isDeleteModalOpen: state.isDeleteModalOpen,
      openModal: state.openModal,
      closeModal: state.closeModal,
      selectVendor: state.selectVendor,
      setDismissingVendorId: state.setDismissingVendorId,
      completeVendorDismiss: state.completeVendorDismiss,
      selectAction: state.selectAction,
      startDismissAction: state.startDismissAction,
      completeDismissAction: state.completeDismissAction,
      openSkuSidebar: state.openSkuSidebar,
      closeSkuSidebar: state.closeSkuSidebar,
      setDeleteModalOpen: state.setDeleteModalOpen,
      openChat: state.openChat,
    })),
  );

  // ── Derived data ────────────────────────────────────

  const visibleActionItems = useMemo(
    () =>
      actionItems.filter(
        (item) => !dismissedActionIds.has(item.id),
      ),
    [actionItems, dismissedActionIds],
  );

  const remainingVendors = useMemo(
    () =>
      procurementData
        ? procurementData.vendors.filter(
            (vendor) => !confirmedVendorIds.has(vendor.id),
          )
        : [],
    [procurementData, confirmedVendorIds],
  );

  const activeProcurementData = useMemo(() => {
    if (!procurementData) {
      return null;
    }

    return {
      ...procurementData,
      stats: {
        ...procurementData.stats,
        purchaseOrderCount: remainingVendors.length,
        supplierCount: remainingVendors.length,
      },
      vendors: remainingVendors,
    };
  }, [procurementData, remainingVendors]);

  const currentVendor = useMemo(
    () =>
      remainingVendors.find(
        (vendor) => vendor.id === selectedVendorId,
      ) ?? remainingVendors[0],
    [remainingVendors, selectedVendorId],
  );

  const isOpen = modalState.mode !== "closed";
  const currentMode = isOpen ? modalState.mode : undefined;
  const currentActionId = isOpen ? modalState.actionId : undefined;

  // ── Handlers ────────────────────────────────────────

  const handleOpenPOQueue = useCallback(() => {
    openModal({ mode: "po-queue" });

    const firstRemaining = remainingVendors[0];

    if (firstRemaining) {
      selectVendor(firstRemaining.id);
    }
  }, [openModal, remainingVendors, selectVendor]);

  const handleOpenAction = useCallback(
    ({
      mode,
      actionId,
    }: {
      mode: ModalMode;
      actionId?: string;
    }) => {
      if (actionId) {
        selectAction(actionId);

        return;
      }

      openModal({ mode });
    },
    [selectAction, openModal],
  );

  const handleNextVendor = useCallback(() => {
    if (!selectedVendorId) {
      return;
    }

    setDismissingVendorId(selectedVendorId);

    const nextVendor = remainingVendors.find(
      (vendor) => vendor.id !== selectedVendorId,
    );

    if (!nextVendor) {
      closeModal();

      return;
    }

    selectVendor(nextVendor.id);
  }, [
    selectedVendorId,
    remainingVendors,
    setDismissingVendorId,
    selectVendor,
    closeModal,
  ]);

  return {
    // Modal
    modalState,
    isOpen,
    currentMode,
    currentActionId,
    closeModal,

    // Procurement
    activeProcurementData,
    remainingVendors,
    currentVendor,
    selectedVendorId,
    selectVendor,
    dismissingVendorId,
    completeVendorDismiss,

    // Action items
    visibleActionItems,
    selectedActionId,
    dismissedActionIds,
    dismissingActionId,
    completeDismissAction,
    startDismissAction,

    // SKU sidebar
    skuSidebarOpen,
    selectedSkuId,
    openSkuSidebar,
    closeSkuSidebar,

    // UI
    isDeleteModalOpen,
    setDeleteModalOpen,
    openChat,

    // Handlers
    handleOpenPOQueue,
    handleOpenAction,
    handleNextVendor,
    selectAction,
  };
}
