"use client";

import type { SchemaData } from "@models/schema";
import { useStudioStore } from "@providers/studio-provider";
import { cn } from "@utilities/tailwind";
import {
  DATA_SECTION_LABELS,
  type DataSection,
  type StudioTab,
} from "@stores/studio-store";

import { StatsEditor } from "./editors/stats-editor";
import { VendorsEditor } from "./editors/vendors-editor";
import { ActionItemsEditor } from "./editors/action-items-editor";
import { ActionContentEditor } from "./editors/action-content-editor";
import { ChatEditor } from "./editors/chat-editor";
import { ActivityEditor } from "./editors/activity-editor";
import { DataSchema } from "./data-schema";

import styles from "./studio-shell.module.scss";

const TABS: readonly { id: StudioTab; label: string }[] = [
  { id: "data", label: "Data" },
  { id: "schema", label: "Schema" },
];

const DATA_SECTIONS: readonly DataSection[] = [
  "stats",
  "vendors",
  "action-items",
  "action-content",
  "chat",
  "activity",
];

const SECTION_EDITOR: Record<DataSection, React.FC> = {
  stats: StatsEditor,
  vendors: VendorsEditor,
  "action-items": ActionItemsEditor,
  "action-content": ActionContentEditor,
  chat: ChatEditor,
  activity: ActivityEditor,
};

interface Props {
  schema: SchemaData;
}

export function StudioShell({ schema }: Props) {
  const activeTab = useStudioStore((state) => state.activeTab);
  const setActiveTab = useStudioStore((state) => state.setActiveTab);
  const dataSection = useStudioStore((state) => state.dataSection);
  const setDataSection = useStudioStore((state) => state.setDataSection);
  const reset = useStudioStore((state) => state.reset);

  const Editor = SECTION_EDITOR[dataSection];

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>
            Burnt <span className={styles.titleAccent}>Studio</span>
          </h1>
        </div>

        <button type="button" className={styles.resetButton} onClick={reset}>
          Reset to defaults
        </button>
      </header>

      <nav className={styles.tabBar}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={cn(styles.tab, activeTab === tab.id && styles.tabActive)}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {activeTab === "data" ? (
        <nav className={styles.subTabBar}>
          {DATA_SECTIONS.map((section) => (
            <button
              key={section}
              type="button"
              className={cn(
                styles.subTab,
                dataSection === section && styles.subTabActive
              )}
              onClick={() => setDataSection(section)}
            >
              {DATA_SECTION_LABELS[section]}
            </button>
          ))}
        </nav>
      ) : null}

      <main className={styles.content}>
        {activeTab === "data" ? <Editor /> : <DataSchema schema={schema} />}
      </main>
    </div>
  );
}
