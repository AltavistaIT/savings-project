import {
  ErrorResponse,
  TransactionsIdDelete200Response,
  TransactionsIdPatchRequest,
  TransactionsPost200Response,
  UpdateTransactionDto,
} from "@/api";
import { InternalAPIClient } from "@/services/internal-api-client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const payload: UpdateTransactionDto = await request.json();

  const result = await new InternalAPIClient().request<
    TransactionsPost200Response | ErrorResponse
  >(`/transactions/${id}`, "PATCH", payload);
  return NextResponse.json(result);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const result = await new InternalAPIClient().request<
    TransactionsIdDelete200Response | ErrorResponse
  >(`/transactions/${id}`, "DELETE");
  return NextResponse.json(result);
}
