import { ErrorResponse, TransactionsPost200Response } from "@/api";
import { InternalAPIClient } from "@/services/internal-api-client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const payload = await request.json();
  console.log("payload", payload);
  const result = await new InternalAPIClient().request<
    TransactionsPost200Response | ErrorResponse
  >("/transactions", "POST", payload);

  return NextResponse.json(result);
}
