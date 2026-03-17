"use client";

import { useCallback } from "react";

import type { CannedResponse } from "@models/chat";
import { useStudioStore } from "@providers/studio-provider";
import { cn } from "@utilities/tailwind";

import { TextField } from "./editor-field";
import styles from "./editors.module.scss";

function ResponseCard({
  response,
}: {
  response: CannedResponse;
}) {
  const cannedResponses = useStudioStore(
    (state) => state.cannedResponses,
  );
  const setCannedResponses = useStudioStore(
    (state) => state.setCannedResponses,
  );
  const expandedId = useStudioStore(
    (state) => state.expandedId,
  );
  const setExpandedId = useStudioStore(
    (state) => state.setExpandedId,
  );

  const isExpanded = expandedId === response.id;

  const updateResponse = useCallback(
    (updates: Partial<CannedResponse>) => {
      setCannedResponses(
        cannedResponses.map((item) =>
          item.id === response.id
            ? { ...item, ...updates }
            : item,
        ),
      );
    },
    [response.id, cannedResponses, setCannedResponses],
  );

  const removeResponse = useCallback(() => {
    setCannedResponses(
      cannedResponses.filter(
        (item) => item.id !== response.id,
      ),
    );
  }, [response.id, cannedResponses, setCannedResponses]);

  const keywordPreview = response.keywords
    .split(",")
    .map((keyword) => keyword.trim())
    .filter(Boolean)
    .slice(0, 3)
    .join(", ");

  return (
    <div className={styles.itemCard}>
      <div
        className={styles.itemHeader}
        onClick={() =>
          setExpandedId(isExpanded ? null : response.id)
        }
      >
        <div className={styles.itemHeaderLeft}>
          <span
            className={cn(
              styles.itemBadge,
              styles.badgeInfo,
            )}
          >
            match
          </span>

          <span className={styles.itemTitle}>
            {keywordPreview || "No keywords"}
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
          <div
            className={styles.fieldGrid}
            style={{ paddingTop: 16 }}
          >
            <TextField
              label="Keywords (comma-separated)"
              value={response.keywords}
              onChange={(value) =>
                updateResponse({ keywords: value })
              }
            />
          </div>

          <TextField
            label="Response"
            value={response.response}
            multiline
            onChange={(value) =>
              updateResponse({ response: value })
            }
          />

          <div className={styles.itemActions}>
            <button
              type="button"
              className={styles.removeButton}
              onClick={removeResponse}
            >
              Remove Response
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function ChatEditor() {
  const cannedResponses = useStudioStore(
    (state) => state.cannedResponses,
  );
  const setCannedResponses = useStudioStore(
    (state) => state.setCannedResponses,
  );
  const defaultResponse = useStudioStore(
    (state) => state.defaultResponse,
  );
  const setDefaultResponse = useStudioStore(
    (state) => state.setDefaultResponse,
  );

  function addResponse() {
    const newResponse: CannedResponse = {
      id: `cr-${Date.now()}`,
      keywords: "",
      response: "",
    };

    setCannedResponses([...cannedResponses, newResponse]);
  }

  return (
    <div className={styles.editorPanel}>
      <h2 className={styles.sectionTitle}>
        Chat Responses ({cannedResponses.length})
      </h2>

      <p className={styles.derivedNote}>
        Configure what Mira responds when the user types
        matching keywords. The first matching response wins.
        If no keywords match, the default response is used.
      </p>

      <div className={styles.itemList}>
        {cannedResponses.map((response) => (
          <ResponseCard
            key={response.id}
            response={response}
          />
        ))}
      </div>

      <button
        type="button"
        className={styles.addButton}
        onClick={addResponse}
      >
        + Add Response
      </button>

      <div style={{ marginTop: 32 }}>
        <h2 className={styles.sectionTitle}>
          Default Response
        </h2>

        <p className={styles.derivedNote}>
          Used when the user&apos;s message doesn&apos;t
          match any keywords above.
        </p>

        <TextField
          label="Default response"
          value={defaultResponse}
          multiline
          onChange={setDefaultResponse}
        />
      </div>
    </div>
  );
}
