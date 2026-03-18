"use client";

import { useState } from "react";

import { useDashboard } from "@hooks/use-dashboard";

import { Sidebar } from "@components/blocks/sidebar/sidebar";
import { PageHeader } from "@components/blocks/page-header/page-header";
import { ActionPanel } from "@components/blocks/action-panel/action-panel";
import { ActivityFeed } from "@components/blocks/activity-feed/activity-feed";
import { StatsPanel } from "@components/blocks/stats-panel/stats-panel";
import { AskMiraWidget } from "@components/blocks/ask-mira-widget/ask-mira-widget";
import { DeckModal } from "@components/blocks/deck-modal/deck-modal";
import { MiraChat } from "@components/blocks/mira-chat/mira-chat";
import { ModalSidebar } from "@components/blocks/modal-sidebar/modal-sidebar";
import { ModalContent } from "@components/blocks/modal-content/modal-content";
import { SKUReasoningSidebar } from "@components/blocks/sku-reasoning-sidebar/sku-reasoning-sidebar";

export function DashboardContent() {
  const [activeTab, setActiveTab] = useState<"rx-deck" | "order-run">("rx-deck");

  const {
    modalState,
    isOpen,
    currentMode,
    currentActionId,
    closeModal,
    activeProcurementData,
    remainingVendors,
    currentVendor,
    selectedVendorId,
    selectVendor,
    dismissingVendorId,
    completeVendorDismiss,
    visibleActionItems,
    selectedActionId,
    dismissedActionIds,
    dismissingActionId,
    completeDismissAction,
    startDismissAction,
    skuSidebarOpen,
    selectedSkuId,
    openSkuSidebar,
    closeSkuSidebar,
    isDeleteModalOpen,
    setDeleteModalOpen,
    openChat,
    handleOpenPOQueue,
    handleOpenAction,
    handleNextVendor,
    selectAction,
  } = useDashboard();

  return (
    <div className="flex h-screen overflow-hidden bg-page-bg">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex min-w-0 flex-1 flex-col overflow-y-auto pb-16 lg:overflow-hidden lg:pb-0">
        <PageHeader />

        <main className="flex flex-col gap-3 px-3 py-3 sm:px-5 sm:py-4 md:px-6 lg:min-h-0 lg:flex-1 lg:flex-row lg:flex-nowrap lg:gap-4 lg:overflow-hidden lg:px-[30px] lg:py-6">
          <div className="flex w-full shrink-0 flex-col gap-3 sm:flex-row lg:order-last lg:w-auto lg:shrink lg:flex-col lg:min-h-0">
            <StatsPanel className="min-h-0 sm:flex-1 lg:flex-1" />
            <AskMiraWidget
              className="sm:flex-[0.4] sm:opacity-0 sm:animate-[fade-in_1000ms_ease_1200ms_forwards] lg:flex-1 lg:min-h-0"
              onClick={(rect) => openChat(rect)}
            />
          </div>

          <ActionPanel
            className="lg:min-h-0 lg:flex-1 lg:overflow-y-auto"
            activeTab={activeTab}
            poCount={remainingVendors.length}
            onOpenPOQueue={handleOpenPOQueue}
            onOpenAction={handleOpenAction}
            onDismissAction={startDismissAction}
            dismissedIds={dismissedActionIds}
          />

          <ActivityFeed className="opacity-0 animate-[fade-in_800ms_ease_500ms_forwards]" />
        </main>
      </div>

      <DeckModal
        state={modalState}
        onClose={closeModal}
        hideCloseButton={skuSidebarOpen}
      >
        {isOpen && currentMode && activeProcurementData ? (
          <>
            <ModalSidebar
              mode={currentMode}
              procurementData={activeProcurementData}
              selectedVendorId={selectedVendorId ?? undefined}
              onSelectVendor={selectVendor}
              dismissingVendorId={dismissingVendorId ?? undefined}
              onVendorDismissComplete={completeVendorDismiss}
              actionItems={visibleActionItems}
              selectedActionId={selectedActionId ?? currentActionId}
              onSelectAction={selectAction}
              dismissingActionId={dismissingActionId ?? undefined}
              onDismissComplete={completeDismissAction}
              isWhyOrderCardOpen={skuSidebarOpen}
              isDeleteModalOpen={isDeleteModalOpen}
            />
            <ModalContent
              mode={currentMode}
              actionId={currentActionId}
              selectedVendor={
                currentMode === "po-queue" ? currentVendor : undefined
              }
              isWhyOrderCardOpen={skuSidebarOpen}
              onSKUInfoClick={openSkuSidebar}
              onDismissAction={startDismissAction}
              onDeleteModalOpenChange={setDeleteModalOpen}
              onNextVendor={handleNextVendor}
            >
              <SKUReasoningSidebar
                open={skuSidebarOpen}
                onClose={closeSkuSidebar}
                skuId={selectedSkuId}
                vendor={currentMode === "po-queue" ? currentVendor : undefined}
              />
            </ModalContent>
          </>
        ) : null}
      </DeckModal>

      <MiraChat />
    </div>
  );
}
