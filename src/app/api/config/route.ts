import { ConfigGet200Response, ErrorResponse } from "@/api";
import { InternalAPIClient } from "@/services/internal-api-client";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await new InternalAPIClient().request<
    ConfigGet200Response | ErrorResponse
  >("/config", "GET", null, {
    revalidate: 3600,
  });

  return NextResponse.json(result);
}
