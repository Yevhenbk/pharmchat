import { NextResponse } from "next/server";

import { ShortageService } from "@services/server/shortage-service";

export async function GET() {
  const shortages = await ShortageService.fetchCurrentShortages();

  return NextResponse.json(shortages);
}
