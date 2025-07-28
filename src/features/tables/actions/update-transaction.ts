"use server";

import { auth } from "@/auth";
import { ApiRouteClient } from "@/services/api-route-client";
import { UpdateTransactionDto } from "@/types/internal-api/models";

export async function updateTransaction(
  payload: UpdateTransactionDto & { transactionId: string }
) {
  const session = await auth();
  if (!session) {
    return;
  }

  const api = new ApiRouteClient(session?.accessToken);

  const response = await api.fetch("updateTransaction", {
    body: payload,
    pathVariables: { id: payload.transactionId },
  });
  console.log("updateTransaction", response);
  return response;
}
