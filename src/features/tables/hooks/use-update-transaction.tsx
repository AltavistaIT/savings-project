import { LocalStorageService } from "@/services/local-storage-service";
import { FormField, useDialogFormStore } from "../../../stores/dialog-form-store";
import { z } from "zod";
import { toast } from "sonner";
import { updateTransaction } from "@/features/tables/actions/update-transaction";
import { MappedTransactions } from "../types";
import { normalizeDate } from "@/lib/normalize-date";

interface UseUpdateTransactionParams {
  rowData: MappedTransactions;
  tableTypeId: number;
  refetchTable: () => Promise<void>;
}

export default function useUpdateTransaction({
  rowData,
  tableTypeId,
  refetchTable
}: UseUpdateTransactionParams) {
  const { openDialog, closeDialog } = useDialogFormStore();

  const handleUpdateTransaction = async (payload: Record<string, any>) => {
    const response = await updateTransaction({
      ...payload, transactionId: String(rowData.id)
    })

    if (!response || !response.success) {
      toast.error("An unexpected error occurred. Please try again.");
      return
    }
    await refetchTable();
    toast.success("Transaction updated successfully");
    closeDialog();
  };

  const openDialogForm = () => {
    const configData = LocalStorageService.getItem("config");
    if (!configData || !configData.transaction_types) {
      return;
    }

    const txTypes = configData.transaction_types
      .filter((type) => type.table_type_id === tableTypeId)
      .map((type) => ({
        label: type.description!,
        value: type.id!,
      }));

    const transactionFields: FormField[] = [
      {
        name: "type",
        label: "Tipo",
        type: "select",
        options: txTypes,
        validation: z
          .string()
          .min(1, "Debe seleccionar un tipo")
          .transform((value) => Number(value))
          .refine((value) => value > 0, "Debe ser mayor a 0"),
      },
      {
        name: "description",
        label: "Descripción",
        type: "text",
        validation: z.string().min(3, "Mínimo 3 caracteres"),
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
        name: "date",
        label: "Date",
        type: "date",
        validation: z.date({ message: "Debe seleccionar una fecha" }),
      },
    ];

    const transactionDefaultValues = {
      type: String(rowData.type_id) || "",
      description: rowData.description || "",
      amount: String(rowData.amount) || 0,
      date: normalizeDate(rowData.date)
    };
    console.log("transactionDefaultValues", transactionDefaultValues);
    openDialog({
      title: "Update Transaction",
      fields: transactionFields,
      initialValues: transactionDefaultValues,
    }, handleUpdateTransaction);
  };

  return {
    openDialogForm,
  };
}
