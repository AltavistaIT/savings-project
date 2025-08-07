"use server";

import { ApiRouteClient } from "@/services/api-route-client";
import { RegisterDto } from "@/types/internal-api";

export default async function registerAction(payload: RegisterDto) {
  const api = new ApiRouteClient();

  const response = await api.fetch("register", {
    body: payload,
  });
  console.log("register", response);
  return response;
}
