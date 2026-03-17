"use client";

import { useCallback, useRef } from "react";

import type {
  ActionContentEntry,
  OrderCancelledData,
  DemandSurgeData,
  DeliveryDelayData,
  EarlyArrivalData,
  EmailData,
  OrderSnapshot,
  DemandSurgeSKURow,
  AffectedSKU,
  InTransitItem,
} from "@models/action-content";
import { useStudioStore } from "@providers/studio-provider";
import { cn } from "@utilities/tailwind";

import { TextField, NumberField } from "./editor-field";
import styles from "./editors.module.scss";

const CONTENT_TYPES = [
  "order-cancelled",
  "demand-surge",
  "delivery-delay",
  "early-arrival",
  "partial-fill",
  "sku-backordered",
  "not-confirmed",
  "price-increase",
  "live-email",
] as const;

type ContentType = (typeof CONTENT_TYPES)[number];

// ── Email fields ──────────────────────────────────────

function EmailFields({
  email,
  onChange,
}: {
  email: EmailData;
  onChange: (updates: Partial<EmailData>) => void;
}) {
  return (
    <div className={styles.nestedSection}>
      <div className={styles.nestedLabel}>Email</div>

      <div className={styles.fieldGrid}>
        <TextField
          label="From"
          value={email.from}
          onChange={(value) => onChange({ from: value })}
        />

        {email.to !== undefined ? (
          <TextField
            label="To"
            value={email.to ?? ""}
            onChange={(value) => onChange({ to: value })}
          />
        ) : null}

        <TextField
          label="Subject"
          value={email.subject}
          onChange={(value) => onChange({ subject: value })}
        />
      </div>

      <TextField
        label="Body"
        value={email.body}
        multiline
        onChange={(value) => onChange({ body: value })}
      />
    </div>
  );
}

// ── Order snapshot fields ─────────────────────────────

function OrderSnapshotFields({
  label,
  snapshot,
  onChange,
}: {
  label: string;
  snapshot: OrderSnapshot;
  onChange: (updates: Partial<OrderSnapshot>) => void;
}) {
  return (
    <div className={styles.nestedSection}>
      <div className={styles.nestedLabel}>{label}</div>

      <div className={styles.fieldGrid}>
        <TextField
          label="Vendor"
          value={snapshot.vendor}
          onChange={(value) => onChange({ vendor: value })}
        />

        <TextField
          label="SKU"
          value={snapshot.sku}
          onChange={(value) => onChange({ sku: value })}
        />

        <TextField
          label="Product"
          value={snapshot.product}
          onChange={(value) => onChange({ product: value })}
        />

        <TextField
          label="Quantity"
          value={snapshot.quantity}
          onChange={(value) => onChange({ quantity: value })}
        />

        <NumberField
          label="Total Cost ($)"
          value={snapshot.totalCost}
          onChange={(value) =>
            onChange({ totalCost: value })
          }
        />

        <TextField
          label="Lead Time"
          value={snapshot.leadTime}
          onChange={(value) =>
            onChange({ leadTime: value })
          }
        />
      </div>
    </div>
  );
}

// ── String list editor ────────────────────────────────

function StringListEditor({
  label,
  items,
  onChange,
}: {
  label: string;
  items: readonly string[];
  onChange: (items: readonly string[]) => void;
}) {
  return (
    <div className={styles.nestedSection}>
      <div className={styles.nestedLabel}>{label}</div>

      <div className={styles.nestedList}>
        {items.map((item, index) => (
          <div
            key={index}
            className={cn(
              styles.nestedItem,
              styles.nestedItemWide,
            )}
          >
            <input
              type="text"
              className={styles.fieldInput}
              value={item}
              onChange={(event) => {
                const updated = [...items];
                updated[index] = event.target.value;
                onChange(updated);
              }}
            />

            <button
              type="button"
              className={styles.removeButton}
              onClick={() =>
                onChange(
                  items.filter((_, itemIndex) => itemIndex !== index),
                )
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
        onClick={() => onChange([...items, ""])}
      >
        + Add {label}
      </button>
    </div>
  );
}

// ── Order Cancelled editor ────────────────────────────

function OrderCancelledEditor({
  data,
  onChange,
}: {
  data: OrderCancelledData;
  onChange: (data: OrderCancelledData) => void;
}) {
  return (
    <>
      <EmailFields
        email={data.email}
        onChange={(updates) =>
          onChange({
            ...data,
            email: { ...data.email, ...updates },
          })
        }
      />

      <OrderSnapshotFields
        label="Original Order"
        snapshot={data.originalOrder}
        onChange={(updates) =>
          onChange({
            ...data,
            originalOrder: {
              ...data.originalOrder,
              ...updates,
            },
          })
        }
      />

      <OrderSnapshotFields
        label="Proposed Replacement"
        snapshot={data.proposedReplacement}
        onChange={(updates) =>
          onChange({
            ...data,
            proposedReplacement: {
              ...data.proposedReplacement,
              ...updates,
            },
          })
        }
      />

      <div className={styles.nestedSection}>
        <div className={styles.nestedLabel}>Delta</div>

        <div className={styles.fieldGrid}>
          <NumberField
            label="Cost Delta ($)"
            value={data.costDelta}
            onChange={(value) =>
              onChange({ ...data, costDelta: value })
            }
          />

          <TextField
            label="Lead Time Delta"
            value={data.leadTimeDelta}
            onChange={(value) =>
              onChange({ ...data, leadTimeDelta: value })
            }
          />
        </div>
      </div>

      <StringListEditor
        label="If Rejected — Consequences"
        items={data.ifRejected.consequences}
        onChange={(consequences) =>
          onChange({
            ...data,
            ifRejected: {
              ...data.ifRejected,
              consequences,
            },
          })
        }
      />

      <StringListEditor
        label="If Rejected — Tags"
        items={data.ifRejected.tags}
        onChange={(tags) =>
          onChange({
            ...data,
            ifRejected: { ...data.ifRejected, tags },
          })
        }
      />

      <div className={styles.nestedSection}>
        <div className={styles.nestedLabel}>
          If Approved
        </div>

        <TextField
          label="Summary"
          value={data.ifApproved.summary}
          multiline
          onChange={(value) =>
            onChange({
              ...data,
              ifApproved: {
                ...data.ifApproved,
                summary: value,
              },
            })
          }
        />
      </div>

      <StringListEditor
        label="If Approved — Tags"
        items={data.ifApproved.tags ?? []}
        onChange={(tags) =>
          onChange({
            ...data,
            ifApproved: { ...data.ifApproved, tags },
          })
        }
      />
    </>
  );
}

// ── Demand Surge editor ───────────────────────────────

type DemandSurgeRow = DemandSurgeSKURow & {
  readonly quantityDelta?: number;
};

function DemandSurgeSKURowEditor({
  rows,
  onChange,
  showDelta,
}: {
  rows: readonly DemandSurgeRow[];
  onChange: (rows: readonly DemandSurgeRow[]) => void;
  showDelta?: boolean;
}) {
  return (
    <div className={styles.nestedList}>
      {rows.map((row, index) => (
        <div
          key={index}
          className={styles.fieldGrid}
          style={{ paddingTop: 8 }}
        >
          <TextField
            label="SKU"
            value={row.sku}
            onChange={(value) => {
              const updated = [...rows];
              updated[index] = { ...row, sku: value };
              onChange(updated);
            }}
          />

          <TextField
            label="Name"
            value={row.name}
            onChange={(value) => {
              const updated = [...rows];
              updated[index] = { ...row, name: value };
              onChange(updated);
            }}
          />

          <NumberField
            label="Quantity"
            value={row.quantity}
            onChange={(value) => {
              const updated = [...rows];
              updated[index] = { ...row, quantity: value };
              onChange(updated);
            }}
          />

          {showDelta ? (
            <NumberField
              label="Qty Delta"
              value={row.quantityDelta ?? 0}
              onChange={(value) => {
                const updated = [...rows];
                updated[index] = {
                  ...row,
                  quantityDelta: value,
                };
                onChange(updated);
              }}
            />
          ) : null}

          <NumberField
            label="Subtotal ($)"
            value={row.subtotal}
            onChange={(value) => {
              const updated = [...rows];
              updated[index] = { ...row, subtotal: value };
              onChange(updated);
            }}
          />

          <div className={styles.field}>
            <span className={styles.fieldLabel}>&nbsp;</span>

            <button
              type="button"
              className={styles.removeButton}
              onClick={() =>
                onChange(
                  rows.filter(
                    (_, rowIndex) => rowIndex !== index,
                  ),
                )
              }
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function DemandSurgeEditor({
  data,
  onChange,
}: {
  data: DemandSurgeData;
  onChange: (data: DemandSurgeData) => void;
}) {
  return (
    <>
      <TextField
        label="Demand Signal"
        value={data.demandSignal}
        multiline
        onChange={(value) =>
          onChange({ ...data, demandSignal: value })
        }
      />

      <div className={styles.nestedSection}>
        <div className={styles.nestedLabel}>
          Current Order
        </div>

        <div className={styles.fieldGrid}>
          <TextField
            label="Vendor"
            value={data.currentOrder.vendor}
            onChange={(value) =>
              onChange({
                ...data,
                currentOrder: {
                  ...data.currentOrder,
                  vendor: value,
                },
              })
            }
          />

          <NumberField
            label="Total ($)"
            value={data.currentOrder.total}
            onChange={(value) =>
              onChange({
                ...data,
                currentOrder: {
                  ...data.currentOrder,
                  total: value,
                },
              })
            }
          />
        </div>

        <DemandSurgeSKURowEditor
          rows={data.currentOrder.rows}
          onChange={(rows) =>
            onChange({
              ...data,
              currentOrder: {
                ...data.currentOrder,
                rows,
              },
            })
          }
        />

        <button
          type="button"
          className={styles.addButton}
          onClick={() =>
            onChange({
              ...data,
              currentOrder: {
                ...data.currentOrder,
                rows: [
                  ...data.currentOrder.rows,
                  {
                    sku: "",
                    name: "",
                    quantity: 0,
                    subtotal: 0,
                  },
                ],
              },
            })
          }
        >
          + Add Row
        </button>
      </div>

      <div className={styles.nestedSection}>
        <div className={styles.nestedLabel}>
          Optimized Order
        </div>

        <div className={styles.fieldGrid}>
          <TextField
            label="Vendor"
            value={data.optimizedOrder.vendor}
            onChange={(value) =>
              onChange({
                ...data,
                optimizedOrder: {
                  ...data.optimizedOrder,
                  vendor: value,
                },
              })
            }
          />

          <NumberField
            label="Total ($)"
            value={data.optimizedOrder.total}
            onChange={(value) =>
              onChange({
                ...data,
                optimizedOrder: {
                  ...data.optimizedOrder,
                  total: value,
                },
              })
            }
          />

          <NumberField
            label="Total Delta ($)"
            value={data.optimizedOrder.totalDelta}
            onChange={(value) =>
              onChange({
                ...data,
                optimizedOrder: {
                  ...data.optimizedOrder,
                  totalDelta: value,
                },
              })
            }
          />
        </div>

        <DemandSurgeSKURowEditor
          rows={data.optimizedOrder.rows}
          showDelta
          onChange={(rows) =>
            onChange({
              ...data,
              optimizedOrder: {
                ...data.optimizedOrder,
                rows: rows.map((row) => ({
                  ...row,
                  quantityDelta: row.quantityDelta ?? 0,
                })),
              },
            })
          }
        />

        <button
          type="button"
          className={styles.addButton}
          onClick={() =>
            onChange({
              ...data,
              optimizedOrder: {
                ...data.optimizedOrder,
                rows: [
                  ...data.optimizedOrder.rows,
                  {
                    sku: "",
                    name: "",
                    quantity: 0,
                    quantityDelta: 0,
                    subtotal: 0,
                  },
                ],
              },
            })
          }
        >
          + Add Row
        </button>
      </div>

      <div className={styles.nestedSection}>
        <div className={styles.nestedLabel}>Coverage</div>

        <div className={styles.fieldGrid}>
          <NumberField
            label="Current Coverage (Days)"
            value={data.currentCoverage.stockCoverageDays}
            onChange={(value) =>
              onChange({
                ...data,
                currentCoverage: {
                  ...data.currentCoverage,
                  stockCoverageDays: value,
                },
              })
            }
          />

          <NumberField
            label="Current PO Revenue ($)"
            value={data.currentCoverage.poRevenue}
            onChange={(value) =>
              onChange({
                ...data,
                currentCoverage: {
                  ...data.currentCoverage,
                  poRevenue: value,
                },
              })
            }
          />

          <NumberField
            label="Optimized Coverage (Days)"
            value={
              data.optimizedCoverage.stockCoverageDays
            }
            onChange={(value) =>
              onChange({
                ...data,
                optimizedCoverage: {
                  ...data.optimizedCoverage,
                  stockCoverageDays: value,
                },
              })
            }
          />

          <NumberField
            label="Optimized PO Revenue ($)"
            value={data.optimizedCoverage.poRevenue}
            onChange={(value) =>
              onChange({
                ...data,
                optimizedCoverage: {
                  ...data.optimizedCoverage,
                  poRevenue: value,
                },
              })
            }
          />
        </div>
      </div>
    </>
  );
}

// ── Delivery Delay editor ─────────────────────────────

function AffectedSKUList({
  skus,
  onChange,
}: {
  skus: readonly AffectedSKU[];
  onChange: (skus: readonly AffectedSKU[]) => void;
}) {
  return (
    <div className={styles.nestedSection}>
      <div className={styles.nestedLabel}>
        Affected SKUs ({skus.length})
      </div>

      {skus.map((sku, index) => (
        <div
          key={index}
          className={styles.fieldGrid}
          style={{ paddingTop: 8 }}
        >
          <TextField
            label="SKU"
            value={sku.sku}
            onChange={(value) => {
              const updated = [...skus];
              updated[index] = { ...sku, sku: value };
              onChange(updated);
            }}
          />

          <TextField
            label="Name"
            value={sku.name}
            onChange={(value) => {
              const updated = [...skus];
              updated[index] = { ...sku, name: value };
              onChange(updated);
            }}
          />

          <TextField
            label="Ordered Quantity"
            value={sku.orderedQuantity}
            onChange={(value) => {
              const updated = [...skus];
              updated[index] = {
                ...sku,
                orderedQuantity: value,
              };
              onChange(updated);
            }}
          />

          <NumberField
            label="Days on Hand"
            value={sku.daysOnHand}
            onChange={(value) => {
              const updated = [...skus];
              updated[index] = {
                ...sku,
                daysOnHand: value,
              };
              onChange(updated);
            }}
          />

          <TextField
            label="Safe Through"
            value={sku.safeThrough}
            onChange={(value) => {
              const updated = [...skus];
              updated[index] = {
                ...sku,
                safeThrough: value,
              };
              onChange(updated);
            }}
          />

          <div className={styles.field}>
            <span className={styles.fieldLabel}>
              &nbsp;
            </span>

            <button
              type="button"
              className={styles.removeButton}
              onClick={() =>
                onChange(
                  skus.filter(
                    (_, skuIndex) => skuIndex !== index,
                  ),
                )
              }
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        className={styles.addButton}
        onClick={() =>
          onChange([
            ...skus,
            {
              sku: "",
              name: "",
              orderedQuantity: "",
              daysOnHand: 0,
              safeThrough: "",
            },
          ])
        }
      >
        + Add Affected SKU
      </button>
    </div>
  );
}

function DeliveryDelayEditor({
  data,
  onChange,
}: {
  data: DeliveryDelayData;
  onChange: (data: DeliveryDelayData) => void;
}) {
  return (
    <>
      <EmailFields
        email={data.email}
        onChange={(updates) =>
          onChange({
            ...data,
            email: { ...data.email, ...updates },
          })
        }
      />

      <div className={styles.nestedSection}>
        <div className={styles.nestedLabel}>
          Delay Details
        </div>

        <div className={styles.fieldGrid}>
          <TextField
            label="Vendor"
            value={data.vendor}
            onChange={(value) =>
              onChange({ ...data, vendor: value })
            }
          />

          <TextField
            label="Original ETA"
            value={data.originalEta}
            onChange={(value) =>
              onChange({ ...data, originalEta: value })
            }
          />

          <TextField
            label="Revised ETA"
            value={data.revisedEta}
            onChange={(value) =>
              onChange({ ...data, revisedEta: value })
            }
          />

          <TextField
            label="Delay Duration"
            value={data.delayDuration}
            onChange={(value) =>
              onChange({ ...data, delayDuration: value })
            }
          />

          <TextField
            label="Stockout Risk"
            value={data.stockoutRisk}
            onChange={(value) =>
              onChange({ ...data, stockoutRisk: value })
            }
          />
        </div>
      </div>

      <AffectedSKUList
        skus={data.affectedSkus}
        onChange={(affectedSkus) =>
          onChange({ ...data, affectedSkus })
        }
      />
    </>
  );
}

// ── Early Arrival editor ──────────────────────────────

function InTransitItemList({
  items,
  onChange,
}: {
  items: readonly InTransitItem[];
  onChange: (items: readonly InTransitItem[]) => void;
}) {
  return (
    <div className={styles.nestedSection}>
      <div className={styles.nestedLabel}>
        In-Transit Items ({items.length})
      </div>

      {items.map((item, index) => (
        <div
          key={index}
          className={styles.fieldGrid}
          style={{ paddingTop: 8 }}
        >
          <TextField
            label="SKU"
            value={item.sku}
            onChange={(value) => {
              const updated = [...items];
              updated[index] = { ...item, sku: value };
              onChange(updated);
            }}
          />

          <TextField
            label="Name"
            value={item.name}
            onChange={(value) => {
              const updated = [...items];
              updated[index] = { ...item, name: value };
              onChange(updated);
            }}
          />

          <NumberField
            label="Quantity"
            value={item.quantity}
            onChange={(value) => {
              const updated = [...items];
              updated[index] = {
                ...item,
                quantity: value,
              };
              onChange(updated);
            }}
          />

          <NumberField
            label="Subtotal ($)"
            value={item.subtotal}
            onChange={(value) => {
              const updated = [...items];
              updated[index] = {
                ...item,
                subtotal: value,
              };
              onChange(updated);
            }}
          />

          <div className={styles.field}>
            <span className={styles.fieldLabel}>
              &nbsp;
            </span>

            <button
              type="button"
              className={styles.removeButton}
              onClick={() =>
                onChange(
                  items.filter(
                    (_, itemIndex) => itemIndex !== index,
                  ),
                )
              }
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        className={styles.addButton}
        onClick={() =>
          onChange([
            ...items,
            { sku: "", name: "", quantity: 0, subtotal: 0 },
          ])
        }
      >
        + Add Item
      </button>
    </div>
  );
}

function EarlyArrivalEditor({
  data,
  onChange,
}: {
  data: EarlyArrivalData;
  onChange: (data: EarlyArrivalData) => void;
}) {
  return (
    <>
      <EmailFields
        email={data.email}
        onChange={(updates) =>
          onChange({
            ...data,
            email: { ...data.email, ...updates },
          })
        }
      />

      <div className={styles.nestedSection}>
        <div className={styles.nestedLabel}>
          Arrival Details
        </div>

        <div className={styles.fieldGrid}>
          <TextField
            label="Original ETA"
            value={data.originalEta}
            onChange={(value) =>
              onChange({ ...data, originalEta: value })
            }
          />

          <TextField
            label="New ETA"
            value={data.newEta}
            onChange={(value) =>
              onChange({ ...data, newEta: value })
            }
          />

          <NumberField
            label="Hours Early"
            value={data.hoursEarly}
            onChange={(value) =>
              onChange({ ...data, hoursEarly: value })
            }
          />

          <NumberField
            label="Total ($)"
            value={data.total}
            onChange={(value) =>
              onChange({ ...data, total: value })
            }
          />
        </div>
      </div>

      <div className={styles.nestedSection}>
        <div className={styles.nestedLabel}>
          Recommended Actions
        </div>

        <div className={styles.nestedList}>
          {data.recommendedActions.map((action, index) => (
            <div
              key={index}
              className={cn(
                styles.nestedItem,
                styles.nestedItemWide,
              )}
            >
              <input
                type="text"
                className={styles.fieldInput}
                value={action.label}
                onChange={(event) => {
                  const updated = [
                    ...data.recommendedActions,
                  ];
                  updated[index] = {
                    ...action,
                    label: event.target.value,
                  };
                  onChange({
                    ...data,
                    recommendedActions: updated,
                  });
                }}
              />

              <button
                type="button"
                className={styles.removeButton}
                onClick={() =>
                  onChange({
                    ...data,
                    recommendedActions:
                      data.recommendedActions.filter(
                        (_, actionIndex) =>
                          actionIndex !== index,
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
            onChange({
              ...data,
              recommendedActions: [
                ...data.recommendedActions,
                { label: "", checked: false },
              ],
            })
          }
        >
          + Add Action
        </button>
      </div>

      <InTransitItemList
        items={data.inTransitItems}
        onChange={(inTransitItems) =>
          onChange({ ...data, inTransitItems })
        }
      />
    </>
  );
}

// ── Content entry card ────────────────────────────────

const TYPE_LABELS: Record<ContentType, string> = {
  "order-cancelled": "Order Cancelled",
  "demand-surge": "Demand Surge",
  "delivery-delay": "Delivery Delay",
  "early-arrival": "Early Arrival",
  "partial-fill": "Partial Fill",
  "sku-backordered": "SKU Backordered",
  "not-confirmed": "Not Confirmed",
  "price-increase": "Price Increase",
  "live-email": "Live Email",
};

const TYPE_BADGE_STYLE: Record<ContentType, string> = {
  "order-cancelled": styles.badgeCritical,
  "demand-surge": styles.badgeWarning,
  "delivery-delay": styles.badgeWarning,
  "early-arrival": styles.badgeFyi,
  "partial-fill": styles.badgeCritical,
  "sku-backordered": styles.badgeCritical,
  "not-confirmed": styles.badgeCritical,
  "price-increase": styles.badgeFyi,
  "live-email": styles.badgeInfo,
};

function buildDefaultContent(
  type: ContentType,
): ActionContentEntry {
  if (type === "order-cancelled") {
    return {
      type: "order-cancelled",
      data: {
        email: {
          from: "",
          to: "",
          subject: "",
          body: "",
        },
        originalOrder: {
          vendor: "",
          sku: "",
          product: "",
          quantity: "",
          totalCost: 0,
          leadTime: "",
        },
        proposedReplacement: {
          vendor: "",
          sku: "",
          product: "",
          quantity: "",
          totalCost: 0,
          leadTime: "",
        },
        costDelta: 0,
        leadTimeDelta: "",
        isDosageChange: false,
        ifRejected: { consequences: [], tags: [] },
        ifApproved: { summary: "" },
      },
    };
  }

  if (type === "demand-surge") {
    return {
      type: "demand-surge",
      data: {
        demandSignal: "",
        currentOrder: {
          vendor: "",
          rows: [],
          total: 0,
        },
        optimizedOrder: {
          vendor: "",
          rows: [],
          total: 0,
          totalDelta: 0,
        },
        currentCoverage: {
          stockCoverageDays: 0,
          poRevenue: 0,
        },
        optimizedCoverage: {
          stockCoverageDays: 0,
          poRevenue: 0,
        },
      },
    };
  }

  if (type === "delivery-delay") {
    return {
      type: "delivery-delay",
      data: {
        email: { from: "", subject: "", body: "" },
        vendor: "",
        originalEta: "",
        revisedEta: "",
        delayDuration: "",
        stockoutRisk: "",
        affectedSkus: [],
      },
    };
  }

  if (type === "partial-fill") {
    return {
      type: "partial-fill",
      data: {
        email: { from: "", subject: "", body: "" },
        vendor: "",
        backorderEta: "",
        skus: [],
        miraInsight: "",
        ifAccepted: { summary: "" },
        ifRejected: { consequences: [], tags: [] },
      },
    };
  }

  if (type === "sku-backordered") {
    return {
      type: "sku-backordered",
      data: {
        email: { from: "", subject: "", body: "" },
        vendor: "",
        availableDate: "",
        backordered: [],
        miraInsight: "",
        ifActioned: { summary: "" },
        ifIgnored: { consequences: [], tags: [] },
      },
    };
  }

  if (type === "not-confirmed") {
    return {
      type: "not-confirmed",
      data: {
        vendor: "",
        poNumber: "",
        poValue: 0,
        expectedBy: "",
        hoursOverdue: 0,
        scheduledDelivery: "",
        skus: [],
        miraInsight: "",
      },
    };
  }

  if (type === "price-increase") {
    return {
      type: "price-increase",
      data: {
        vendor: "",
        effectiveDate: "",
        skus: [],
        totalMonthlyImpact: 0,
        miraInsight: "",
      },
    };
  }

  if (type === "live-email") {
    return {
      type: "live-email",
      data: {
        email: { from: "", subject: "", body: "" },
        classifiedAs: "order-cancelled",
        miraInsight: "",
        footerVariant: "acknowledge",
      },
    };
  }

  return {
    type: "early-arrival",
    data: {
      email: { from: "", subject: "", body: "" },
      originalEta: "",
      newEta: "",
      hoursEarly: 0,
      recommendedActions: [],
      inTransitItems: [],
      total: 0,
    },
  };
}

function ContentEntryCard({
  actionId,
  entry,
}: {
  actionId: string;
  entry: ActionContentEntry;
}) {
  const actionContentMap = useStudioStore(
    (state) => state.actionContentMap,
  );
  const setActionContentMap = useStudioStore(
    (state) => state.setActionContentMap,
  );
  const expandedId = useStudioStore(
    (state) => state.expandedId,
  );
  const setExpandedId = useStudioStore(
    (state) => state.setExpandedId,
  );

  const isExpanded = expandedId === actionId;

  const updateEntry = useCallback(
    (updated: ActionContentEntry) => {
      setActionContentMap({
        ...actionContentMap,
        [actionId]: updated,
      });
    },
    [actionId, actionContentMap, setActionContentMap],
  );

  const removeEntry = useCallback(() => {
    const updated = { ...actionContentMap };
    delete updated[actionId];
    setActionContentMap(updated);
  }, [actionId, actionContentMap, setActionContentMap]);

  return (
    <div className={styles.itemCard}>
      <div
        className={styles.itemHeader}
        onClick={() =>
          setExpandedId(isExpanded ? null : actionId)
        }
      >
        <div className={styles.itemHeaderLeft}>
          <span
            className={cn(
              styles.itemBadge,
              TYPE_BADGE_STYLE[entry.type],
            )}
          >
            {TYPE_LABELS[entry.type]}
          </span>

          <span className={styles.itemTitle}>
            {actionId}
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

      {isExpanded ? (
        <div className={styles.itemBody}>
          {entry.type === "order-cancelled" ? (
            <OrderCancelledEditor
              data={entry.data}
              onChange={(data) =>
                updateEntry({
                  type: "order-cancelled",
                  data,
                })
              }
            />
          ) : null}

          {entry.type === "demand-surge" ? (
            <DemandSurgeEditor
              data={entry.data}
              onChange={(data) =>
                updateEntry({ type: "demand-surge", data })
              }
            />
          ) : null}

          {entry.type === "delivery-delay" ? (
            <DeliveryDelayEditor
              data={entry.data}
              onChange={(data) =>
                updateEntry({
                  type: "delivery-delay",
                  data,
                })
              }
            />
          ) : null}

          {entry.type === "early-arrival" ? (
            <EarlyArrivalEditor
              data={entry.data}
              onChange={(data) =>
                updateEntry({
                  type: "early-arrival",
                  data,
                })
              }
            />
          ) : null}

          <div className={styles.itemActions}>
            <button
              type="button"
              className={styles.removeButton}
              onClick={removeEntry}
            >
              Remove Content
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

// ── Main component ────────────────────────────────────

export function ActionContentEditor() {
  const actionContentMap = useStudioStore(
    (state) => state.actionContentMap,
  );
  const setActionContentMap = useStudioStore(
    (state) => state.setActionContentMap,
  );
  const actionItems = useStudioStore(
    (state) => state.actionItems,
  );

  const entries = Object.entries(actionContentMap);

  const availableActionIds = actionItems
    .map((item) => item.id)
    .filter((id) => !(id in actionContentMap));

  function addContent({
    actionId,
    type,
  }: {
    actionId: string;
    type: ContentType;
  }) {
    setActionContentMap({
      ...actionContentMap,
      [actionId]: buildDefaultContent(type),
    });
  }

  return (
    <div className={styles.editorPanel}>
      <h2 className={styles.sectionTitle}>
        Action Content ({entries.length})
      </h2>

      <p className={styles.derivedNote}>
        Each entry maps an action item ID to its detail
        content — the email, order data, and context shown
        in the modal when the action is opened.
      </p>

      <div className={styles.itemList}>
        {entries.map(([actionId, entry]) => (
          <ContentEntryCard
            key={actionId}
            actionId={actionId}
            entry={entry}
          />
        ))}
      </div>

      {availableActionIds.length > 0 ? (
        <AddContentForm
          availableIds={availableActionIds}
          onAdd={addContent}
        />
      ) : null}
    </div>
  );
}

const CONTENT_TYPE_SET: ReadonlySet<string> = new Set(
  CONTENT_TYPES,
);

function isContentType(
  value: string,
): value is ContentType {
  return CONTENT_TYPE_SET.has(value);
}

function AddContentForm({
  availableIds,
  onAdd,
}: {
  availableIds: readonly string[];
  onAdd: (params: {
    actionId: string;
    type: ContentType;
  }) => void;
}) {
  const actionIdRef = useRef<HTMLSelectElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);

  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        marginTop: 8,
      }}
    >
      <select
        ref={actionIdRef}
        className={cn(
          styles.fieldInput,
          styles.fieldSelect,
        )}
        defaultValue={availableIds[0]}
      >
        {availableIds.map((id) => (
          <option key={id} value={id}>
            {id}
          </option>
        ))}
      </select>

      <select
        ref={typeRef}
        className={cn(
          styles.fieldInput,
          styles.fieldSelect,
        )}
        defaultValue="order-cancelled"
      >
        {CONTENT_TYPES.map((type) => (
          <option key={type} value={type}>
            {TYPE_LABELS[type]}
          </option>
        ))}
      </select>

      <button
        type="button"
        className={styles.addButton}
        style={{ width: "auto", flexShrink: 0 }}
        onClick={() => {
          const actionId = actionIdRef.current?.value;
          const selectedType = typeRef.current?.value;

          if (
            actionId &&
            selectedType &&
            isContentType(selectedType)
          ) {
            onAdd({
              actionId,
              type: selectedType,
            });
          }
        }}
      >
        + Add Content
      </button>
    </div>
  );
}
