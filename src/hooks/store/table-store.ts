import { TableEntity, TransactionEntity } from "@/api";
import { ApiRouteClient } from "@/services/api-route-client";
import { create } from "zustand";
import { toast } from "sonner";
import { useDialogFormStore } from "./dialog-form-store";
import { LocalStorageService } from "@/services/local-storage-service";
import { z } from "zod";

type MappedTransactions = TransactionEntity & {
  percentage: number;
};

interface TableState {
  monthYear: string;
  typeId: number;
  table: TableEntity;
  transactions: MappedTransactions[];

  setMonthYear: (monthYear: string) => void;
  setTypeId: (typeId: number) => void;
  fetchTable: () => Promise<void>;
  createTransaction: () => void;
}

export const useTableStore = create<TableState>((set, get) => ({
  monthYear: "",
  typeId: 0,
  table: {},
  transactions: [],

  setMonthYear: (value) => {
    set({ monthYear: value });
    const { typeId } = get();
    if (typeId) {
      get().fetchTable();
    }
  },

  setTypeId: (value) => {
    set({ typeId: value });
    const { monthYear } = get();
    if (monthYear) {
      get().fetchTable();
    }
  },

  fetchTable: async () => {
    const { monthYear, typeId } = get();
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

    const { table, transactions } = response.data!;

    const mappedTransactions = transactions?.map((tx) => {
      const percentage =
        tx.amount && table?.amount ? (tx.amount / table.amount) * 100 : 0;
      return {
        ...tx,
        percentage,
      };
    });
    set({ table, transactions: mappedTransactions });
  },

  createTransaction: () => {
    const { table, fetchTable } = get();
    const openDialog = useDialogFormStore.getState().openDialog;

    const data = LocalStorageService.getItem("config");
    if (!data || !data.transaction_types || !data.currencies) {
      return;
    }

    const txTypes = data.transaction_types.map((type) => ({
      label: type.description!,
      value: type.id!,
    }));
    const currencies = data.currencies.map((currency) => ({
      label: currency.description!,
      value: currency.id!,
    }));

    openDialog(
      {
        title: "Nuevo Gasto",
        description: "Ingresa los datos del gasto",
        action: "create-tx",
        fields: [
          {
            name: "description",
            label: "Descripción",
            type: "text",
            validation: z.string().min(3, "Mínimo 3 caracteres"),
          },
          {
            name: "type_id",
            label: "Tipo de Gasto",
            type: "select",
            options: txTypes,
            validation: z
              .string()
              .min(1, "Debe seleccionar un tipo")
              .transform((value) => Number(value))
              .refine((value) => value > 0, "Debe ser mayor a 0"),
          },
          {
            name: "amount",
            label: "Monto",
            type: "number",
            validation: z
              .string()
              .min(1, "Debe ser mayor a 0")
              .transform((value) => Number(value))
              .refine((value) => value > 0, "Debe ser mayor a 0"),
          },
          {
            name: "currency_id",
            label: "Moneda",
            type: "select",
            options: currencies,
            validation: z
              .string()
              .min(1, "Debe seleccionar una moneda")
              .transform((value) => Number(value))
              .refine((value) => value > 0, "Debe ser mayor a 0"),
          },
          {
            name: "table_id",
            label: "Table",
            type: "hidden",
            validation: z.any(),
          },
        ],
        initialValues: {
          description: "",
          type_id: String(txTypes[0].value),
          amount: "1",
          currency_id: String(currencies[0].value),
          table_id: table?.id,
        },
      },
      {
        onError: (message) => {
          toast.error(message);
        },
        onSuccess: async () => {
          await fetchTable();
          toast.success("Transaction created");
        },
      }
    );
  },
}));
