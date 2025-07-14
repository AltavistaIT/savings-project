import { create } from "zustand";
import * as z from "zod";
import { ApiRouteClient } from "@/services/api-route-client";
import { useTableStore } from "./table-store";

type FormFieldType = "text" | "number" | "select" | "hidden";
type FormAction = "create-tx" | "update-tx";
export type FormField = {
  name: string;
  label: string;
  type: FormFieldType;
  validation?: z.ZodTypeAny;
  options?: Array<{ label: string; value: string | number }>;
};
type DialogFormCallbacks = {
  onSuccess?: () => void;
  onError?: (message: string) => void;
};

interface DialogFormState {
  isDialogOpen: boolean;
  formConfig: {
    title: string;
    description: string;
    fields: FormField[];
    initialValues: Record<string, string | number | undefined>;
    action: FormAction;
  };
  openDialog: (
    config: DialogFormState["formConfig"],
    callbacks?: DialogFormCallbacks
  ) => void;
  closeDialog: () => void;
  handleSubmit: (data: Record<string, unknown>) => void;

  callbacks?: DialogFormCallbacks;
}

export const useDialogFormStore = create<DialogFormState>((set, get) => ({
  isDialogOpen: false,
  formConfig: {
    title: "",
    description: "",
    fields: [],
    initialValues: {},
    action: "create-tx",
  },
  openDialog: (config, callbacks) => {
    set({ isDialogOpen: true, formConfig: config, callbacks });
  },
  closeDialog: () => set({ isDialogOpen: false }),
  handleSubmit: async (data) => {
    const state = get();
    const apiRouteClient = new ApiRouteClient();
    switch (state.formConfig.action) {
      case "create-tx":
        console.log("data", data);
        if (!data.table_id) {
          console.log("creating table");
          const tableTypeid = useTableStore.getState().typeId;
          const monthYear = useTableStore.getState().monthYear;
          console.log({ tableTypeid, monthYear });
          const response = await apiRouteClient.fetch("createTable", {
            body: {
              month_year: monthYear,
              user_id: 1,
              type_id: tableTypeid,
            },
          });

          if (!response.success || !response.data) {
            state.callbacks?.onError?.(response.message || "");
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
          state.callbacks?.onError?.(response.message || "");
        } else {
          state.callbacks?.onSuccess?.();
          set({ isDialogOpen: false });
        }
        break;
      case "update-tx":
        return { isDialogOpen: false };
    }
  },

  callbacks: undefined,
}));
