import { TableEntity } from "@/api";
import { ApiRouteClient } from "@/services/api/api-route-client";
import { create } from "zustand";
import { MappedTransactions } from "@/components/tables/types";

interface TableState {
  monthYear: string;
  tableTypeId: number;
  table: TableEntity;
  transactions: MappedTransactions[];

  setMonthYear: (monthYear: string) => void;
  setTypeId: (typeId: number) => void;
  fetchTable: () => Promise<void>;
}

export const useTableStore = create<TableState>((set, get) => ({
  monthYear: "",
  tableTypeId: 0,
  table: {},
  transactions: [],

  setMonthYear: (value) => {
    set({ monthYear: value });
    const { tableTypeId: typeId } = get();
    if (typeId) {
      get().fetchTable();
    }
  },

  setTypeId: (value) => {
    set({ tableTypeId: value });
    const { monthYear } = get();
    if (monthYear) {
      get().fetchTable();
    }
  },

  fetchTable: async () => {
    const { monthYear, tableTypeId: typeId } = get();
    if (!monthYear || !typeId) {
      return;
    }

    const api = new ApiRouteClient();
    const response = await api.fetch("getTableByParams", {
      queryParams: { month_year: monthYear, type_id: typeId, user_id: 1 },
    });

    if (!response || !response.success) {
      set({ table: {}, transactions: [] });
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

    set({ table, transactions: finalTransactions });
  },
}));
