import { create } from "zustand";
import * as z from "zod";
import { useToastStore } from "./toast-store";
import { toast } from "sonner";
import { ApiRouteClient } from "@/services/api-route-client";

type FormFieldType = "text" | "number" | "select" | "hidden";
export type FormField = {
  name: string;
  label: string;
  type: FormFieldType;
  validation: z.ZodTypeAny;
  options?: Array<{ label: string; value: string }>;
};

type FormAction = "create" | "update";

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
    action: "create",
  },
  openDialog: (config, callbacks) => {
    set({ isDialogOpen: true, formConfig: config, callbacks });
  },
  closeDialog: () => set({ isDialogOpen: false }),
  handleSubmit: async (data) => {
    const state = get();
    const apiRouteClient = new ApiRouteClient();
    switch (state.formConfig.action) {
      case "create":
        console.log("data", data);
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
          set({ isDialogOpen: false });
        }
        break;
      case "update":
        return { isDialogOpen: false };
    }
  },

  callbacks: undefined,
}));
