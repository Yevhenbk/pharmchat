"use client";

import { useCallback } from "react";

import type { VendorOrder, SKULineItem } from "@models/procurement";
import { SKU_STATUSES, RISK_SEVERITIES } from "@models/procurement";
import { useStudioStore } from "@providers/studio-provider";
import { cn } from "@utilities/tailwind";

import { TextField, NumberField, SelectField } from "./editor-field";
import styles from "./editors.module.scss";

// ── Line item row ──────────────────────────────────────

function LineItemRow({
  item,
  onChange,
  onRemove,
}: {
  item: SKULineItem;
  onChange: (updates: Partial<SKULineItem>) => void;
  onRemove: () => void;
}) {
  return (
    <div className={styles.itemCard}>
      <div className={styles.itemBody} style={{ padding: 16 }}>
        <div className={styles.fieldGrid}>
          <TextField
            label="SKU Code"
            value={item.skuCode}
            onChange={(value) => onChange({ skuCode: value })}
          />

          <TextField
            label="Name"
            value={item.name}
            onChange={(value) => onChange({ name: value })}
          />

          <SelectField
            label="Status"
            value={item.status}
            options={SKU_STATUSES}
            onChange={(value) =>
              onChange({
                status: value as SKULineItem["status"],
              })
            }
          />

          <NumberField
            label="Current Inventory"
            value={item.currentInventory}
            onChange={(value) =>
              onChange({ currentInventory: value })
            }
          />

          <TextField
            label="Run-Out Date"
            value={item.runOutDate}
            onChange={(value) =>
              onChange({ runOutDate: value })
            }
          />

          <NumberField
            label="Unit Price ($)"
            value={item.unitPrice}
            onChange={(value) =>
              onChange({ unitPrice: value })
            }
          />

          <NumberField
            label="Recommended Qty"
            value={item.recommendedQuantity}
            onChange={(value) =>
              onChange({ recommendedQuantity: value })
            }
          />

          <div className={styles.field}>
            <span className={styles.fieldLabel}>
              Order Value (derived)
            </span>
            <span className={styles.derivedValue}>
              ${item.orderValue.toLocaleString()}
            </span>
          </div>
        </div>

        <div className={styles.itemActions}>
          <button
            type="button"
            className={styles.removeButton}
            onClick={onRemove}
          >
            Remove SKU
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Vendor card ────────────────────────────────────────

function VendorCard({ vendor }: { vendor: VendorOrder }) {
  const vendors = useStudioStore((state) => state.vendors);
  const setVendors = useStudioStore(
    (state) => state.setVendors,
  );
  const expandedId = useStudioStore(
    (state) => state.expandedId,
  );
  const setExpandedId = useStudioStore(
    (state) => state.setExpandedId,
  );

  const isExpanded = expandedId === vendor.id;

  const updateVendor = useCallback(
    (updates: Partial<VendorOrder>) => {
      setVendors(
        vendors.map((v) =>
          v.id === vendor.id ? { ...v, ...updates } : v,
        ),
      );
    },
    [vendor.id, vendors, setVendors],
  );

  const updateLineItem = useCallback(
    ({
      lineItemId,
      updates,
    }: {
      lineItemId: string;
      updates: Partial<SKULineItem>;
    }) => {
      setVendors(
        vendors.map((v) =>
          v.id === vendor.id
            ? {
                ...v,
                lineItems: v.lineItems.map((li) =>
                  li.id === lineItemId
                    ? { ...li, ...updates }
                    : li,
                ),
              }
            : v,
        ),
      );
    },
    [vendor.id, vendors, setVendors],
  );

  const removeLineItem = useCallback(
    (lineItemId: string) => {
      setVendors(
        vendors.map((v) =>
          v.id === vendor.id
            ? {
                ...v,
                lineItems: v.lineItems.filter(
                  (li) => li.id !== lineItemId,
                ),
              }
            : v,
        ),
      );
    },
    [vendor.id, vendors, setVendors],
  );

  const addLineItem = useCallback(() => {
    const newItem: SKULineItem = {
      id: `li-${Date.now()}`,
      skuCode: "SKU-NEW",
      name: "New SKU",
      status: "normal",
      currentInventory: 0,
      runOutDate: "TBD",
      unitPrice: 0,
      recommendedQuantity: 0,
      orderValue: 0,
    };

    setVendors(
      vendors.map((v) =>
        v.id === vendor.id
          ? { ...v, lineItems: [...v.lineItems, newItem] }
          : v,
      ),
    );
  }, [vendor.id, vendors, setVendors]);

  const removeVendor = useCallback(() => {
    setVendors(vendors.filter((v) => v.id !== vendor.id));
  }, [vendor.id, vendors, setVendors]);

  return (
    <div className={styles.itemCard}>
      <div
        className={styles.itemHeader}
        onClick={() =>
          setExpandedId(isExpanded ? null : vendor.id)
        }
      >
        <div className={styles.itemHeaderLeft}>
          <span className={styles.itemTitle}>
            {vendor.vendorName}
          </span>

          <span className={styles.itemSubtitle}>
            {vendor.skuCount} SKUs &middot; $
            {vendor.value.toLocaleString()}
            {vendor.urgency && (
              <>
                {" "}
                &middot;{" "}
                <span
                  style={{
                    color:
                      vendor.urgency === "out-of-stock"
                        ? "var(--color-critical)"
                        : "var(--color-warning)",
                  }}
                >
                  {vendor.urgency}
                </span>
              </>
            )}
          </span>
        </div>

        <span
          className={cn(
            styles.chevron,
            isExpanded && styles.chevronOpen,
          )}
        >
          &#9654;
        </span>
      </div>

      {isExpanded && (
        <div className={styles.itemBody}>
          <div
            className={styles.fieldGrid}
            style={{ paddingTop: 16 }}
          >
            <TextField
              label="Vendor Name"
              value={vendor.vendorName}
              onChange={(value) =>
                updateVendor({ vendorName: value })
              }
            />

            <TextField
              label="Earliest Stockout"
              value={vendor.earliestStockout}
              onChange={(value) =>
                updateVendor({ earliestStockout: value })
              }
            />

            <div className={styles.field}>
              <span className={styles.fieldLabel}>
                Value (derived)
              </span>
              <span className={styles.derivedValue}>
                ${vendor.value.toLocaleString()}
              </span>
            </div>

            <div className={styles.field}>
              <span className={styles.fieldLabel}>
                SKU Count (derived)
              </span>
              <span className={styles.derivedValue}>
                {vendor.skuCount}
              </span>
            </div>

            <div className={styles.field}>
              <span className={styles.fieldLabel}>
                Urgency (derived)
              </span>
              <span className={styles.derivedValue}>
                {vendor.urgency ?? "none"}
              </span>
            </div>
          </div>

          <div className={styles.nestedSection}>
            <div className={styles.nestedLabel}>
              PO Summary
            </div>

            <div className={styles.fieldGrid}>
              <TextField
                label="PO Number"
                value={vendor.poSummary.poNumber}
                onChange={(value) =>
                  updateVendor({
                    poSummary: {
                      ...vendor.poSummary,
                      poNumber: value,
                    },
                  })
                }
              />

              <NumberField
                label="Lead Time (Days)"
                value={vendor.poSummary.leadTimeDays}
                onChange={(value) =>
                  updateVendor({
                    poSummary: {
                      ...vendor.poSummary,
                      leadTimeDays: value,
                    },
                  })
                }
              />

              <TextField
                label="Lead Time ETA"
                value={vendor.poSummary.leadTimeEta}
                onChange={(value) =>
                  updateVendor({
                    poSummary: {
                      ...vendor.poSummary,
                      leadTimeEta: value,
                    },
                  })
                }
              />

              <NumberField
                label="Confidence %"
                value={vendor.poSummary.confidencePercent}
                onChange={(value) =>
                  updateVendor({
                    poSummary: {
                      ...vendor.poSummary,
                      confidencePercent: value,
                    },
                  })
                }
              />

              <TextField
                label="Confidence Label"
                value={vendor.poSummary.confidenceLabel}
                onChange={(value) =>
                  updateVendor({
                    poSummary: {
                      ...vendor.poSummary,
                      confidenceLabel: value,
                    },
                  })
                }
              />

              <TextField
                label="SKU Note"
                value={vendor.poSummary.skuNote}
                onChange={(value) =>
                  updateVendor({
                    poSummary: {
                      ...vendor.poSummary,
                      skuNote: value,
                    },
                  })
                }
              />
            </div>
          </div>

          <div className={styles.nestedSection}>
            <div className={styles.nestedLabel}>
              Demand Signal
            </div>

            <TextField
              label="Summary"
              value={vendor.demandSignal.summary}
              multiline
              onChange={(value) =>
                updateVendor({
                  demandSignal: { summary: value },
                })
              }
            />
          </div>

          <div className={styles.nestedSection}>
            <div className={styles.nestedLabel}>
              Risk Factors
            </div>

            <div className={styles.nestedList}>
              {vendor.riskFactors.map((rf) => (
                <div key={rf.id} className={styles.nestedItem}>
                  <input
                    type="text"
                    className={styles.fieldInput}
                    value={rf.label}
                    onChange={(event) =>
                      updateVendor({
                        riskFactors: vendor.riskFactors.map(
                          (r) =>
                            r.id === rf.id
                              ? {
                                  ...r,
                                  label: event.target.value,
                                }
                              : r,
                        ),
                      })
                    }
                  />

                  <select
                    className={cn(
                      styles.fieldInput,
                      styles.fieldSelect,
                    )}
                    value={rf.severity}
                    onChange={(event) =>
                      updateVendor({
                        riskFactors: vendor.riskFactors.map(
                          (r) =>
                            r.id === rf.id
                              ? {
                                  ...r,
                                  severity:
                                    event.target
                                      .value as typeof rf.severity,
                                }
                              : r,
                        ),
                      })
                    }
                  >
                    {RISK_SEVERITIES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    className={styles.removeButton}
                    onClick={() =>
                      updateVendor({
                        riskFactors:
                          vendor.riskFactors.filter(
                            (r) => r.id !== rf.id,
                          ),
                      })
                    }
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              className={styles.addButton}
              onClick={() =>
                updateVendor({
                  riskFactors: [
                    ...vendor.riskFactors,
                    {
                      id: `rf-${Date.now()}`,
                      label: "New risk factor",
                      severity: "info",
                    },
                  ],
                })
              }
            >
              + Add Risk Factor
            </button>
          </div>

          <div className={styles.nestedSection}>
            <div className={styles.nestedLabel}>
              Line Items ({vendor.lineItems.length})
            </div>

            <div className={styles.itemList}>
              {vendor.lineItems.map((li) => (
                <LineItemRow
                  key={li.id}
                  item={li}
                  onChange={(updates) =>
                    updateLineItem({
                      lineItemId: li.id,
                      updates,
                    })
                  }
                  onRemove={() => removeLineItem(li.id)}
                />
              ))}
            </div>

            <button
              type="button"
              className={styles.addButton}
              onClick={addLineItem}
            >
              + Add Line Item
            </button>
          </div>

          <div className={styles.itemActions}>
            <button
              type="button"
              className={styles.removeButton}
              onClick={removeVendor}
            >
              Remove Vendor
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main component ─────────────────────────────────────

export function VendorsEditor() {
  const vendors = useStudioStore((state) => state.vendors);
  const setVendors = useStudioStore(
    (state) => state.setVendors,
  );

  function addVendor() {
    const newVendor: VendorOrder = {
      id: `vendor-${Date.now()}`,
      vendorName: "New Vendor",
      value: 0,
      skuCount: 0,
      earliestStockout: "TBD",
      poSummary: {
        poNumber: "PO-NEW",
        value: 0,
        leadTimeDays: 0,
        leadTimeEta: "TBD",
        confidencePercent: 0,
        confidenceLabel: "N/A",
        skuCount: 0,
        skuNote: "",
      },
      demandSignal: { summary: "" },
      riskFactors: [],
      lineItems: [],
    };

    setVendors([...vendors, newVendor]);
  }

  return (
    <div className={styles.editorPanel}>
      <h2 className={styles.sectionTitle}>
        Vendors ({vendors.length})
      </h2>

      <div className={styles.itemList}>
        {vendors.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
      </div>

      <button
        type="button"
        className={styles.addButton}
        onClick={addVendor}
      >
        + Add Vendor
      </button>
    </div>
  );
}
