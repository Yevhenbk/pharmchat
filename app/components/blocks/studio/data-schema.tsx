"use client";

import { useState, useMemo } from "react";

import type { SchemaData, SchemaModel, SchemaProperty } from "@models/schema";
import { cn } from "@utilities/tailwind";

import styles from "./data-schema.module.scss";

// ── Data flow ─────────────────────────────────────────

const FLOW_STEPS = [
  { label: "Studio (localStorage)", muted: false },
  { label: "Demo Data (fallback)", muted: true },
  { label: "Repositories", muted: false },
  { label: "Zustand Store", muted: false },
  { label: "Hooks", muted: true },
  { label: "Components", muted: true },
];

// ── Graph constants ───────────────────────────────────

const GRAPH_COLS = 4;
const GRAPH_NODE_W = 164;
const GRAPH_NODE_H = 38;
const GRAPH_COL_GAP = 48;
const GRAPH_ROW_GAP = 72;
const GRAPH_PAD = 44;

const DOMAIN_HUES = [270, 220, 180, 150, 30, 330, 60];

// ── Types ─────────────────────────────────────────────

interface Connection {
  readonly source: string;
  readonly target: string;
  readonly relation: string;
}

interface GraphNode {
  readonly name: string;
  readonly x: number;
  readonly y: number;
  readonly hue: number;
}

// ── Type guard ────────────────────────────────────────

function hasRelationTarget(
  property: SchemaProperty
): property is SchemaProperty & {
  readonly relation: string;
  readonly relationTarget: string;
} {
  return (
    property.relation !== undefined && property.relationTarget !== undefined
  );
}

// ── Connection helpers ────────────────────────────────

function buildConnections(schema: SchemaData): readonly Connection[] {
  return schema.domains.flatMap((domain) =>
    domain.models.flatMap((model) =>
      model.properties.filter(hasRelationTarget).map((property) => ({
        source: model.name,
        target: property.relationTarget,
        relation: property.relation,
      }))
    )
  );
}

function deduplicateConnections(
  connections: readonly Connection[]
): readonly Connection[] {
  const seen = new Set<string>();

  return connections.filter((connection) => {
    const key = `${connection.source}→${connection.target}`;

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);

    return true;
  });
}

function getConnectedModels({
  modelName,
  connections,
}: {
  modelName: string;
  connections: readonly Connection[];
}): ReadonlySet<string> {
  const connected = new Set<string>();

  for (const connection of connections) {
    if (connection.source === modelName) {
      connected.add(connection.target);
    }

    if (connection.target === modelName) {
      connected.add(connection.source);
    }
  }

  return connected;
}

// ── Graph layout ──────────────────────────────────────

function buildGraphNodes({
  schema,
  connections,
}: {
  schema: SchemaData;
  connections: readonly Connection[];
}): readonly GraphNode[] {
  const connectedNames = new Set(
    connections.flatMap((connection) => [connection.source, connection.target])
  );

  const result = schema.domains.reduce<{
    nodes: readonly GraphNode[];
    col: number;
    row: number;
  }>(
    (outer, domain, domainIndex) => {
      const hue = DOMAIN_HUES[domainIndex % DOMAIN_HUES.length];

      const connectedModels = domain.models.filter((model) =>
        connectedNames.has(model.name)
      );

      if (connectedModels.length === 0) {
        return outer;
      }

      const startCol = outer.col > 0 ? 0 : outer.col;

      const startRow = outer.col > 0 ? outer.row + 1 : outer.row;

      return connectedModels.reduce(
        (inner, model) => {
          const node: GraphNode = {
            name: model.name,
            x: GRAPH_PAD + inner.col * (GRAPH_NODE_W + GRAPH_COL_GAP),
            y: GRAPH_PAD + inner.row * (GRAPH_NODE_H + GRAPH_ROW_GAP),
            hue,
          };

          const nextCol = inner.col + 1;
          const shouldWrap = nextCol >= GRAPH_COLS;

          return {
            nodes: [...inner.nodes, node],
            col: shouldWrap ? 0 : nextCol,
            row: shouldWrap ? inner.row + 1 : inner.row,
          };
        },
        {
          nodes: outer.nodes,
          col: startCol,
          row: startRow,
        }
      );
    },
    { nodes: [], col: 0, row: 0 }
  );

  return result.nodes;
}

function computeEdgePath({
  source,
  target,
}: {
  source: GraphNode;
  target: GraphNode;
}): string {
  const sx = source.x + GRAPH_NODE_W / 2;
  const tx = target.x + GRAPH_NODE_W / 2;
  const sameRow = source.y === target.y;

  if (sameRow) {
    const amplitude = 20 + Math.abs(tx - sx) * 0.06;

    return [
      `M ${sx} ${source.y}`,
      `C ${sx} ${source.y - amplitude},`,
      `${tx} ${source.y - amplitude},`,
      `${tx} ${source.y}`,
    ].join(" ");
  }

  const goingDown = source.y < target.y;
  const sy = goingDown ? source.y + GRAPH_NODE_H : source.y;
  const ty = goingDown ? target.y : target.y + GRAPH_NODE_H;
  const midY = (sy + ty) / 2;

  return `M ${sx} ${sy} C ${sx} ${midY}, ${tx} ${midY}, ${tx} ${ty}`;
}

function computeLabelPosition({
  source,
  target,
}: {
  source: GraphNode;
  target: GraphNode;
}): { x: number; y: number } {
  const mx = (source.x + GRAPH_NODE_W / 2 + target.x + GRAPH_NODE_W / 2) / 2;

  const sameRow = source.y === target.y;

  if (sameRow) {
    const amplitude = 20 + Math.abs(target.x - source.x + GRAPH_NODE_W) * 0.06;

    return { x: mx, y: source.y - amplitude + 4 };
  }

  const my = (source.y + GRAPH_NODE_H / 2 + target.y + GRAPH_NODE_H / 2) / 2;

  return { x: mx, y: my - 4 };
}

// ── RelationshipGraph ─────────────────────────────────

function RelationshipGraph({
  schema,
  connections,
  focusedModel,
  onFocusModel,
}: {
  schema: SchemaData;
  connections: readonly Connection[];
  focusedModel: string | null;
  onFocusModel: (name: string | null) => void;
}) {
  const graphConnections = useMemo(
    () => deduplicateConnections(connections),
    [connections]
  );

  const nodes = useMemo(
    () => buildGraphNodes({ schema, connections }),
    [schema, connections]
  );

  const nodeMap = useMemo(
    () => new Map(nodes.map((node) => [node.name, node])),
    [nodes]
  );

  const connectedSet = useMemo(() => {
    if (!focusedModel) {
      return new Set<string>();
    }

    return getConnectedModels({
      modelName: focusedModel,
      connections,
    });
  }, [focusedModel, connections]);

  if (nodes.length === 0) {
    return null;
  }

  const svgWidth =
    Math.max(...nodes.map((node) => node.x)) + GRAPH_NODE_W + GRAPH_PAD;

  const svgHeight =
    Math.max(...nodes.map((node) => node.y)) + GRAPH_NODE_H + GRAPH_PAD;

  function getNodeOpacity(name: string): number {
    if (!focusedModel) {
      return 1;
    }

    if (name === focusedModel || connectedSet.has(name)) {
      return 1;
    }

    return 0.15;
  }

  function isActiveEdge(connection: Connection): boolean {
    return (
      focusedModel !== null &&
      (connection.source === focusedModel || connection.target === focusedModel)
    );
  }

  function getEdgeOpacity(connection: Connection): number {
    if (!focusedModel) {
      return 0.25;
    }

    if (isActiveEdge(connection)) {
      return 0.85;
    }

    return 0.06;
  }

  return (
    <div className={styles.graphSection}>
      <div className={styles.graphHeader}>
        <div className={styles.domainLabel}>Relationships</div>

        {focusedModel ? (
          <button
            type="button"
            className={styles.graphClear}
            onClick={() => onFocusModel(null)}
          >
            Clear selection
          </button>
        ) : null}
      </div>

      <div className={styles.graphCanvas}>
        <svg
          width={svgWidth}
          height={svgHeight}
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        >
          <defs>
            <marker
              id="rel-arrow"
              markerWidth="7"
              markerHeight="5"
              refX="7"
              refY="2.5"
              orient="auto"
            >
              <polygon
                points="0 0, 7 2.5, 0 5"
                fill="rgba(135, 79, 255, 0.4)"
              />
            </marker>

            <marker
              id="rel-arrow-active"
              markerWidth="7"
              markerHeight="5"
              refX="7"
              refY="2.5"
              orient="auto"
            >
              <polygon
                points="0 0, 7 2.5, 0 5"
                fill="rgba(135, 79, 255, 0.9)"
              />
            </marker>
          </defs>

          {graphConnections.map((connection) => {
            const source = nodeMap.get(connection.source);
            const target = nodeMap.get(connection.target);

            if (!source || !target) {
              return null;
            }

            const active = isActiveEdge(connection);
            const opacity = getEdgeOpacity(connection);

            return (
              <path
                key={`${connection.source}→${connection.target}`}
                d={computeEdgePath({ source, target })}
                fill="none"
                stroke={`hsla(270, 100%, 66%, ${active ? 0.7 : 0.35})`}
                strokeWidth={active ? 2 : 1}
                strokeDasharray={
                  connection.relation === "has one" ? "4 3" : "none"
                }
                opacity={opacity}
                markerEnd={
                  active ? "url(#rel-arrow-active)" : "url(#rel-arrow)"
                }
                className={styles.graphEdge}
              />
            );
          })}

          {focusedModel
            ? graphConnections
                .filter(
                  (connection) =>
                    connection.source === focusedModel ||
                    connection.target === focusedModel
                )
                .map((connection) => {
                  const source = nodeMap.get(connection.source);
                  const target = nodeMap.get(connection.target);

                  if (!source || !target) {
                    return null;
                  }

                  const position = computeLabelPosition({
                    source,
                    target,
                  });

                  return (
                    <text
                      key={`lbl-${connection.source}→${connection.target}`}
                      x={position.x}
                      y={position.y}
                      textAnchor="middle"
                      className={styles.graphEdgeLabel}
                    >
                      {connection.relation}
                    </text>
                  );
                })
            : null}

          {nodes.map((node) => {
            const isFocused = node.name === focusedModel;
            const opacity = getNodeOpacity(node.name);

            return (
              <g
                key={node.name}
                opacity={opacity}
                className={styles.graphNode}
                onClick={(event) => {
                  event.stopPropagation();

                  onFocusModel(isFocused ? null : node.name);
                }}
              >
                <rect
                  x={node.x}
                  y={node.y}
                  width={GRAPH_NODE_W}
                  height={GRAPH_NODE_H}
                  rx={GRAPH_NODE_H / 2}
                  fill={
                    isFocused
                      ? `hsla(${node.hue}, 60%, 60%, 0.18)`
                      : `hsla(${node.hue}, 60%, 60%, 0.08)`
                  }
                  stroke={
                    isFocused
                      ? `hsla(${node.hue}, 60%, 60%, 0.6)`
                      : `hsla(${node.hue}, 60%, 60%, 0.2)`
                  }
                  strokeWidth={isFocused ? 2 : 1}
                />

                <text
                  x={node.x + GRAPH_NODE_W / 2}
                  y={node.y + GRAPH_NODE_H / 2 + 1}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className={cn(
                    styles.graphNodeLabel,
                    isFocused && styles.graphNodeLabelFocused
                  )}
                  style={
                    isFocused
                      ? {
                          fill: `hsl(${node.hue}, 60%, 65%)`,
                        }
                      : undefined
                  }
                >
                  {node.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className={styles.graphLegend}>
        <span className={styles.legendItem}>
          <svg width="20" height="8" aria-hidden="true">
            <line
              x1="0"
              y1="4"
              x2="20"
              y2="4"
              stroke="rgba(135, 79, 255, 0.5)"
              strokeWidth="1.5"
            />
          </svg>
          has many
        </span>

        <span className={styles.legendItem}>
          <svg width="20" height="8" aria-hidden="true">
            <line
              x1="0"
              y1="4"
              x2="20"
              y2="4"
              stroke="rgba(135, 79, 255, 0.5)"
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />
          </svg>
          has one
        </span>

        <span className={styles.legendHint}>
          Click a model to explore connections
        </span>
      </div>
    </div>
  );
}

// ── PropertyType ──────────────────────────────────────

function PropertyType({
  property,
  onFocusModel,
}: {
  property: SchemaProperty;
  onFocusModel: (name: string) => void;
}) {
  const target = property.relationTarget;

  if (target) {
    return (
      <button
        type="button"
        className={styles.propertyTypeLink}
        onClick={(event) => {
          event.stopPropagation();
          onFocusModel(target);
        }}
      >
        {property.type}
      </button>
    );
  }

  return <span className={styles.propertyType}>{property.type}</span>;
}

// ── ModelCard ─────────────────────────────────────────

function ModelCard({
  model,
  isFocused,
  isConnected,
  isDimmed,
  onFocus,
  onFocusModel,
}: {
  model: SchemaModel;
  isFocused: boolean;
  isConnected: boolean;
  isDimmed: boolean;
  onFocus: () => void;
  onFocusModel: (name: string) => void;
}) {
  return (
    <div
      className={cn(
        styles.card,
        isFocused && styles.cardFocused,
        isConnected && styles.cardConnected,
        isDimmed && styles.cardDimmed
      )}
      onClick={(event) => {
        event.stopPropagation();
        onFocus();
      }}
    >
      <div
        className={cn(
          styles.cardHeader,
          !model.badge && styles.cardHeaderPrimary
        )}
      >
        <span className={styles.cardTitle}>{model.name}</span>

        {model.badge ? (
          <span className={styles.cardBadge}>{model.badge}</span>
        ) : null}
      </div>

      <div className={styles.cardBody}>
        {model.properties.map((property) => (
          <div key={property.name} className={styles.property}>
            <span className={styles.propertyName}>
              {property.name}

              {property.optional ? (
                <span className={styles.propertyOptional}>?</span>
              ) : null}
            </span>

            <PropertyType property={property} onFocusModel={onFocusModel} />

            {property.relation ? (
              <span className={styles.relationTag}>{property.relation}</span>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── DataSchema ────────────────────────────────────────

interface Props {
  schema: SchemaData;
}

export function DataSchema({ schema }: Props) {
  const [focusedModel, setFocusedModel] = useState<string | null>(null);

  const connections = useMemo(() => buildConnections(schema), [schema]);

  const connectedSet = useMemo(() => {
    if (!focusedModel) {
      return new Set<string>();
    }

    return getConnectedModels({
      modelName: focusedModel,
      connections,
    });
  }, [focusedModel, connections]);

  return (
    <div className={styles.schema} onClick={() => setFocusedModel(null)}>
      <div className={styles.flowSection}>
        <div className={styles.flowTitle}>Data Flow</div>

        <div className={styles.flowDiagram}>
          {FLOW_STEPS.map((step, index) => (
            <div key={step.label} className="contents">
              {index > 0 ? (
                <span className={styles.flowArrow}>&#8594;</span>
              ) : null}

              <span
                className={cn(
                  styles.flowNode,
                  step.muted && styles.flowNodeMuted
                )}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <RelationshipGraph
        schema={schema}
        connections={connections}
        focusedModel={focusedModel}
        onFocusModel={setFocusedModel}
      />

      {schema.domains.map((domain) => (
        <div key={domain.label} className={styles.domain}>
          <div className={styles.domainLabel}>{domain.label}</div>

          <div className={styles.cardGrid}>
            {domain.models.map((model) => {
              const isFocused = focusedModel === model.name;

              const isConnected =
                focusedModel !== null && connectedSet.has(model.name);

              const isDimmed =
                focusedModel !== null && !isFocused && !isConnected;

              return (
                <ModelCard
                  key={model.name}
                  model={model}
                  isFocused={isFocused}
                  isConnected={isConnected}
                  isDimmed={isDimmed}
                  onFocus={() => setFocusedModel(isFocused ? null : model.name)}
                  onFocusModel={setFocusedModel}
                />
              );
            })}
          </div>
        </div>
      ))}

      {schema.enums.length > 0 ? (
        <div className={styles.domain}>
          <div className={styles.domainLabel}>Enums &amp; Literals</div>

          <div className={styles.cardGrid}>
            {schema.enums.map((item) => (
              <div
                key={item.name}
                className={cn(styles.card, focusedModel && styles.cardDimmed)}
              >
                <div className={styles.cardHeader}>
                  <span className={styles.cardTitle}>{item.name}</span>

                  <span className={styles.cardBadge}>as const</span>
                </div>

                <div className={styles.cardBody}>
                  <span
                    className={styles.propertyType}
                    style={{ lineHeight: 1.8 }}
                  >
                    {item.values}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
