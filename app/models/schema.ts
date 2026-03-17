export interface SchemaProperty {
  readonly name: string;
  readonly type: string;
  readonly optional?: boolean;
  readonly relation?: string;
  readonly relationTarget?: string;
}

export interface SchemaModel {
  readonly name: string;
  readonly badge?: string;
  readonly properties: readonly SchemaProperty[];
}

export interface SchemaDomain {
  readonly label: string;
  readonly models: readonly SchemaModel[];
}

export interface SchemaEnumItem {
  readonly name: string;
  readonly values: string;
}

export interface SchemaData {
  readonly domains: readonly SchemaDomain[];
  readonly enums: readonly SchemaEnumItem[];
}
