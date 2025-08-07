"use server";

import { ApiRouteClient } from "@/services/api-route-client";
import { LoginDto } from "@/types/internal-api/models";

export async function loginAction(payload: LoginDto) {
  const api = new ApiRouteClient();

  const response = await api.fetch("login", {
    body: payload,
  });
  console.log("login", response);
  return response;
}
