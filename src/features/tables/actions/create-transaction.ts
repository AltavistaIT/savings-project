"use server";

import { auth } from "@/auth";
import { ApiRouteClient } from "@/services/api-route-client";
import { CreateTransactionDto } from "@/types/internal-api/models";

export async function createTransaction(payload: CreateTransactionDto) {
  const session = await auth();
  if (!session) {
    return;
  }

  const api = new ApiRouteClient(session?.accessToken);

  const response = await api.fetch("createTransaction", {
    body: payload,
  });
  console.log("createTable", response);
  return response;
}
