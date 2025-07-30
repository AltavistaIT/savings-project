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

  if (!response || !response.success) {
    return;
  }

  const { table, transactions } = response.data;

  let amount = 0;
  const mappedTransactions = transactions.map((tx) => {
    amount += tx.amount;
    return { ...tx };
  });
  table.amount = amount;

  const finalTransactions = mappedTransactions.map((tx) => ({
    ...tx,
    percentage: amount > 0 ? (tx.amount / amount) * 100 : 0,
  }));

  return { table, transactions: finalTransactions };
}
