"use server";

import { auth } from "@/auth";
import { ApiRouteClient } from "@/services/api-route-client";

export async function createTable(monthYear: string, typeId: number) {
  const session = await auth();
  if (!session) {
    return;
  }

  const api = new ApiRouteClient(session?.accessToken);

  const response = await api.fetch("createTable", {
    body: {
      month_year: monthYear,
      user_id: Number(session.user.id),
      type_id: typeId,
    },
  });
  console.log("createTable", response);
  return response;
}
