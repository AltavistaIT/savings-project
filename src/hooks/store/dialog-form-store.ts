import { create } from "zustand";
import * as z from "zod";
import { ApiRouteClient } from "@/services/api/api-route-client";

type FormFieldType = "text" | "number" | "select" | "hidden";
export type FormField = {
  name: string;
  label: string;
  type: FormFieldType;
  validation?: z.ZodTypeAny;
  options?: Array<{ label: string; value: string | number }>;
};

interface DialogFormState {
  isDialogOpen: boolean;
  formConfig: {
    title: string;
    description?: string;
    fields: FormField[];
    initialValues: Record<string, string | number | undefined>;
  };
  handleSubmit?: (data: Record<string, any>) => void;
  openDialog: (
    config: DialogFormState["formConfig"],
    submitHandler: (data: Record<string, any>) => void
  ) => void;
  closeDialog: () => void;
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
  handleSubmit: undefined,
  openDialog: (config, submitHandler) => {
    set({
      isDialogOpen: true,
      formConfig: config,
      handleSubmit: submitHandler,
    });
  },
  closeDialog: () => set({ isDialogOpen: false }),
}));
