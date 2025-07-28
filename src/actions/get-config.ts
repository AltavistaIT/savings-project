"use server";

import { auth } from "@/auth";
import { ApiRouteClient } from "@/services/api-route-client";

export async function getConfig() {
  const session = await auth();
  if (!session) {
    return;
  }

  const api = new ApiRouteClient(session?.accessToken);
  const response = await api.fetch("getConfig", {
    options: {
      next: { revalidate: 3600 },
    },
  });
  console.log("getConfig", response);
  return response;
}
