import { TableEntity } from "@/types/internal-api/models";
import { create } from "zustand";
import { MappedTransactions } from "../types";
import { getTable } from "@/features/tables/actions/get-table";

// TODO: ELIMINAR

interface TableState {
  monthYear: string;
  tableTypeId: number;
  table: TableEntity;
  transactions: MappedTransactions[];

  setTableMonthYear: (monthYear: string) => void;
  setTypeId: (typeId: number) => void;
  fetchTable: () => Promise<void>;
}

export const useTableStore = create<TableState>((set, get) => ({
  monthYear: "",
  tableTypeId: 0,
  table: {},
  transactions: [],

  setTableMonthYear: (value) => {
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

    const response = await getTable(monthYear, typeId);

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
