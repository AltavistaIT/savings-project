import {
  CreateTransactionDto,
  ErrorResponse,
  TransactionsPost200Response,
} from "@/api";
import { InternalAPIClient } from "@/services/internal-api-client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const payload: CreateTransactionDto = await request.json();

  const result = await new InternalAPIClient().request<
    TransactionsPost200Response | ErrorResponse
  >("/transactions", "POST", payload);

  return NextResponse.json(result);
}
