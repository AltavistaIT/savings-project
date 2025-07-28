"use server";

import { auth } from "@/auth";
import { ApiRouteClient } from "@/services/api-route-client";

export async function deleteTransaction(transactionId: string) {
  const session = await auth();
  if (!session) {
    return;
  }

  const api = new ApiRouteClient(session?.accessToken);

  const response = await api.fetch("deleteTransaction", {
    pathVariables: { id: transactionId },
  });
  console.log("deleteTransaction", response);
  return response;
}
