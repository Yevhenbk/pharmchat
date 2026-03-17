"use client";

import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { ModalState } from "@models/modal";
import { DeckModal } from "./deck-modal";
import { ModalSidebar } from "@components/blocks/modal-sidebar/modal-sidebar";
import { ModalContent } from "@components/blocks/modal-content/modal-content";
import { SKUReasoningSidebar } from "@components/blocks/sku-reasoning-sidebar/sku-reasoning-sidebar";
import { DEMO_PROCUREMENT_RUN } from "@demo/procurement-run-data";
import { DEMO_ACTION_ITEMS } from "@demo/action-items-data";

const firstVendorId = DEMO_PROCUREMENT_RUN.vendors[0].id;

function DeckModalWithState() {
  const [modalState, setModalState] = useState<ModalState>({
    mode: "po-queue",
  });
  const [selectedVendorId, setSelectedVendorId] = useState<string | null>(
    firstVendorId,
  );
  const [selectedSkuId, setSelectedSkuId] = useState<string | null>(null);
  const [skuSidebarOpen, setSkuSidebarOpen] = useState(false);

  const currentVendor =
    DEMO_PROCUREMENT_RUN.vendors.find(
      (vendor) => vendor.id === selectedVendorId,
    ) ?? DEMO_PROCUREMENT_RUN.vendors[0];

  const handleClose = () => {
    setModalState({ mode: "closed" });
    setSkuSidebarOpen(false);
    setSelectedSkuId(null);
    setSelectedVendorId(null);
  };

  const handleSKUInfoClick = (skuId: string) => {
    setSelectedSkuId(skuId);
    setSkuSidebarOpen(true);
  };

  const handleCloseWhyOrder = () => {
    setSkuSidebarOpen(false);
    setSelectedSkuId(null);
  };

  return (
    <DeckModal state={modalState} onClose={handleClose}>
      <ModalSidebar
        mode="po-queue"
        procurementData={DEMO_PROCUREMENT_RUN}
        selectedVendorId={selectedVendorId ?? undefined}
        onSelectVendor={setSelectedVendorId}
        actionItems={DEMO_ACTION_ITEMS}
        selectedActionId={undefined}
        onSelectAction={() => {}}
        isWhyOrderCardOpen={skuSidebarOpen}
      />
      <ModalContent
        mode="po-queue"
        selectedVendor={currentVendor}
        isWhyOrderCardOpen={skuSidebarOpen}
        onSKUInfoClick={handleSKUInfoClick}
      >
        <SKUReasoningSidebar
          open={skuSidebarOpen}
          onClose={handleCloseWhyOrder}
          skuId={selectedSkuId}
          vendor={currentVendor}
        />
      </ModalContent>
    </DeckModal>
  );
}

const firstActionId = DEMO_ACTION_ITEMS[0]?.id ?? "po-1099";

function DeckModalReplaceOrderState() {
  const [modalState] = useState<ModalState>({
    mode: "critical",
    actionId: firstActionId,
  });

  const [selectedActionId, setSelectedActionId] = useState<string>(
    firstActionId,
  );

  const handleSelectAction = (id: string) => {
    setSelectedActionId(id);
  };

  const handleClose = () => {
    // no-op for Storybook; modal remains visible
  };

  return (
    <DeckModal state={modalState} onClose={handleClose}>
      <ModalSidebar
        mode="critical"
        actionItems={DEMO_ACTION_ITEMS}
        selectedActionId={selectedActionId}
        onSelectAction={handleSelectAction}
      />
      <ModalContent mode="critical" actionId={selectedActionId} />
    </DeckModal>
  );
}

const meta: Meta<typeof DeckModal> = {
  title: "Blocks/PO Modal",
  component: DeckModal,
  decorators: [
    (Story) => (
      <div
        style={{
          minHeight: "100vh",
          background: "var(--color-page-bg, #f0f0f0)",
          padding: 24,
        }}
      >
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof DeckModal>;

/** Entire PO (Purchase Order) queue modal: sidebar, vendor content, SKU table, and Why order card. */
export const Default: Story = {
  render: () => <DeckModalWithState />,
};

/** Entire Replace Order modal for PO 1099: sidebar action list + OrderCancelledContent. */
export const ReplaceOrder: Story = {
  render: () => <DeckModalReplaceOrderState />,
};
