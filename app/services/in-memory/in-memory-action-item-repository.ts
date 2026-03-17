import type { ActionItemData } from "@models/action-item";
import type { ActionContentEntry } from "@models/action-content";
import type { ActionItemRepository } from "@models/repository";

export class InMemoryActionItemRepository
  implements ActionItemRepository
{
  private readonly items: readonly ActionItemData[];
  private readonly contentMap: ReadonlyMap<string, ActionContentEntry>;
  private readonly dismissedIds = new Set<string>();

  constructor({
    items,
    contentMap,
  }: {
    items: readonly ActionItemData[];
    contentMap: Record<string, ActionContentEntry>;
  }) {
    this.items = items;
    this.contentMap = new Map(Object.entries(contentMap));
  }

  async getAll(): Promise<readonly ActionItemData[]> {
    return this.items;
  }

  async getById(id: string): Promise<ActionItemData | undefined> {
    return this.items.find((item) => item.id === id);
  }

  async dismiss(id: string): Promise<void> {
    this.dismissedIds.add(id);
  }

  async getDismissedIds(): Promise<ReadonlySet<string>> {
    return new Set(this.dismissedIds);
  }

  async getContent(
    id: string,
  ): Promise<ActionContentEntry | undefined> {
    return this.contentMap.get(id);
  }

  async getContentMap(): Promise<
    Record<string, ActionContentEntry>
  > {
    return Object.fromEntries(this.contentMap);
  }

  async hasContent(id: string): Promise<boolean> {
    return this.contentMap.has(id);
  }
}
