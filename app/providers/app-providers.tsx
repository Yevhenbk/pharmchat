"use client";

import { useState } from "react";

import type { Repositories } from "@models/repository";
import { createInMemoryRepositories } from "@services/in-memory";

import { StoreProvider } from "./store-provider";

interface Props {
  children: React.ReactNode;
}

export function AppProviders({ children }: Props) {
  const [repositories] = useState<Repositories>(
    createInMemoryRepositories,
  );

  return (
    <StoreProvider repositories={repositories}>
      {children}
    </StoreProvider>
  );
}
