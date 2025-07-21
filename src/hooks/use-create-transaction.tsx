import { LocalStorageService } from "@/services/local-storage-service";
import { useTableStore } from "./store/table-store";
import { FormField, useDialogFormStore } from "./store/dialog-form-store";
import { z } from "zod";
import { toast } from "sonner";
import { ApiRouteClient } from "@/services/api/api-route-client";

/**
 * Creates a new transaction based on the form data and the table type selected.
 * If the table doesn't exist, it creates a new one.
 * @returns {function} a function to open the dialog form.
 */
export default function useCreateTransaction() {
  const { table, tableTypeId, monthYear, fetchTable } = useTableStore();
  const { openDialog, closeDialog } = useDialogFormStore.getState();
  const apiRouteClient = new ApiRouteClient();

  /**
   * Asynchronously creates a new transaction. If the table for the transaction does not exist,
   * it first creates a new table. Once the transaction is created, it refreshes the table data,
   * closes the dialog, and displays a success message. If any step fails, it shows an error message.
   * 
   * @param {Record<string, any>} data - The transaction data containing details such as type_id and amount.
   */
  const createTransaction = async (data: Record<string, any>) => {
    if (!data.table_id) {
      const response = await apiRouteClient.fetch("createTable", {
        body: {
          month_year: monthYear,
          user_id: 1,
          type_id: tableTypeId,
        },
      });

      if (!response.success || !response.data) {
        toast.error("An unexpected error occurred. Please try again.");
        return;
      }
      data.table_id = response.data.id;
    }

    const response = await apiRouteClient.fetch("createTransaction", {
      body: {
        ...data,
        type_id: Number(data.type_id),
        amount: Number(data.amount),
      },
    });
    if (!response.success) {
      toast.error("An unexpected error occurred. Please try again.");
      return;
    }

    await fetchTable();
    closeDialog();
    toast.success("Transaction created successfully");
  };

  const openDialogForm = () => {
    const data = LocalStorageService.getItem("config");
    if (!data) {
      return;
    }

    const txTypes = data.transaction_types
      .filter((type) => type.table_type_id === tableTypeId)
      .map((type) => ({
        label: type.description!,
        value: type.id!,
      }));

    const currencies = data.currencies.map((currency) => ({
      label: currency.description!,
      value: currency.id!,
    }));

    const fields: FormField[] = [
      {
        name: "description",
        label: "Description",
        type: "text",
        validation: z.string().min(3, "Mínimo 3 caracteres"),
      },
      {
        name: "type_id",
        label: "Type",
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
        label: "Amount",
        type: "number",
        validation: z
          .string()
          .min(1, "Debe ser mayor a 0")
          .transform((value) => Number(value))
          .refine((value) => value > 0, "Debe ser mayor a 0"),
      },
      {
        name: "currency_id",
        label: "Currency",
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
    ]

    openDialog(
      {
        title: `Create ${data.table_types.find((t) => t.id === tableTypeId)?.description
          }`,
        description: `Create a new transaction`,
        fields,
        initialValues: {
          description: "",
          type_id: String(txTypes[0].value),
          amount: "1",
          currency_id: String(currencies[0].value),
          table_id: table?.id,
        },
      },
      createTransaction
    );
  };

  return {
    openDialogForm,
  };
}
