import type { ActivityFeedTemplate } from "@models/activity-feed";
import type { ActivityFeedRepository } from "@models/repository";

export class InMemoryActivityFeedRepository
  implements ActivityFeedRepository
{
  private readonly templates: readonly ActivityFeedTemplate[];

  constructor(templates: readonly ActivityFeedTemplate[]) {
    this.templates = templates;
  }

  async getTemplates(): Promise<readonly ActivityFeedTemplate[]> {
    return this.templates;
  }
}
