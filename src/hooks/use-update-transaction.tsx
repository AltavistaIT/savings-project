import { LocalStorageService } from "@/services/local-storage-service";
import { FormField, useDialogFormStore } from "./store/dialog-form-store";
import { useTableStore } from "./store/table-store";
import { z } from "zod";
import { MappedTransactions } from "@/components/tables/types";
import { ApiRouteClient } from "@/services/api/api-route-client";
import { toast } from "sonner";

export default function useUpdateTransaction(rowData: MappedTransactions) {
  const { openDialog, closeDialog } = useDialogFormStore();
  const { tableTypeId, fetchTable } = useTableStore();
  const apiRouteClient = new ApiRouteClient();

  const updateTransaction = async (payload: Record<string, any>) => {
    const response = await apiRouteClient.fetch("updateTransaction", {
      body: {
        amount: payload.amount,
        description: payload.description,
        type_id: payload.type,
      },
      pathVariables: { id: String(rowData.id) },
    });

    if (!response.success) {
      toast.error("An unexpected error occurred. Please try again.");
      return
    }
    await fetchTable();
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
    ];

    const transactionDefaultValues = {
      type: String(rowData.type_id) || "",
      description: rowData.description || "",
      amount: String(rowData.amount) || 0,
    };

    openDialog({
      title: "Update Transaction",
      fields: transactionFields,
      initialValues: transactionDefaultValues,
    }, updateTransaction);
  };

  return {
    openDialogForm,
  };
}
