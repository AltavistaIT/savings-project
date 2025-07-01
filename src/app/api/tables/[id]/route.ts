import { ErrorResponse, TablesIdGet200Response } from "@/api";
import { InternalAPIClient } from "@/services/internal-api-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const result = await new InternalAPIClient().request<
    TablesIdGet200Response | ErrorResponse
  >(`/tables/${id}`, "GET");

  return NextResponse.json(result);
}
