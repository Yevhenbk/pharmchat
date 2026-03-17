import type { Metadata } from "next";
import { StudioProvider } from "@providers/studio-provider";
import { StudioShell } from "@components/blocks/studio/studio-shell";
import SchemaService from "@services/server/schema-service";

export const metadata: Metadata = {
  title: "Pharmchat Studio",
};

export default async function StudioPage() {
  const schema = await SchemaService.parseModels();

  return (
    <StudioProvider>
      <StudioShell schema={schema} />
    </StudioProvider>
  );
}
