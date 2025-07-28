"use server";

import { auth } from "@/auth";
import { ApiRouteClient } from "@/services/api-route-client";

export async function getTable(monthYear: string, typeId: number) {
  const session = await auth();
  if (!session) {
    return;
  }

  const api = new ApiRouteClient(session?.accessToken);

  const response = await api.fetch("getTableByParams", {
    queryParams: {
      month_year: monthYear,
      type_id: typeId,
      user_id: session.user.id,
    },
  });
  console.log("getTable", response);
  return response;
}
