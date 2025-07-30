import { LocalStorageService } from "@/services/local-storage-service";
import { FormField, useDialogFormStore } from "@/stores/dialog-form-store";
import { z } from "zod";
import { toast } from "sonner";
import { createTable } from "@/features/tables/actions/create-table";
import { createTransaction } from "@/features/tables/actions/create-transaction";

interface UseCreateTransactionParams {
  monthYear: string;
  tableTypeId: number;
  tableId?: number;
  onTransactionCreated: () => Promise<void>;
}

/**
 * Creates a new transaction based on the form data and the table type selected.
 * If the table doesn't exist, it creates a new one.
 */
export default function useCreateTransaction({ monthYear, tableTypeId, tableId, onTransactionCreated }: UseCreateTransactionParams) {
  const { openDialog, closeDialog } = useDialogFormStore.getState();

  /**
   * Asynchronously creates a new transaction. If the table for the transaction does not exist,
   * it first creates a new table. Once the transaction is created, it refreshes the table data,
   * closes the dialog, and displays a success message. If any step fails, it shows an error message.
   * 
   * @param {Record<string, any>} data - The transaction data containing details such as type_id and amount.
   */
  const handleCreateTransaction = async (data: Record<string, any>) => {
    try {
      if (!data.table_id) {
        const response = await createTable(monthYear, tableTypeId);

        if (!response || !response.success) {
          toast.error("An unexpected error occurred. Please try again.");
          return;
        }
        data.table_id = response.data.id;
      }

      const response = await createTransaction({
        ...data,
        type_id: Number(data.type_id),
        amount: Number(data.amount),
      });

      if (!response || !response.success) {
        toast.error("An unexpected error occurred. Please try again.");
        return;
      }

      await onTransactionCreated();
      toast.success("Transaction created successfully");
      closeDialog();
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
      throw error;
    }
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
        name: "date",
        label: "Date",
        type: "date",
        validation: z.date({ message: "Debe seleccionar una fecha" }),
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
          table_id: tableId,
        },
      },
      handleCreateTransaction
    );
  };

  return {
    openDialogForm,
  };
}
