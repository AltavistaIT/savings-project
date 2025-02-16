import { create } from "zustand";
import * as z from "zod";

type FormField = {
  name: string;
  label: string;
  type: string;
  validation: z.ZodTypeAny;
};

interface DialogFormState {
  isDialogOpen: boolean;
  formConfig: {
    title: string;
    description: string;
    fields: FormField[];
    initialValues: Record<string, string | number | undefined>;
  };
  openDialog: (config: DialogFormState["formConfig"]) => void;
  closeDialog: () => void;
  handleSubmit: (data: Record<string, unknown>) => void;
}

export const useDialogFormStore = create<DialogFormState>((set) => ({
  isDialogOpen: false,
  formConfig: {
    title: "",
    description: "",
    fields: [],
    initialValues: {},
  },
  openDialog: (config) => {
    set({ isDialogOpen: true, formConfig: config });
  },
  closeDialog: () => set({ isDialogOpen: false }),
  handleSubmit: (data) => {
    console.log("Formulario enviado =>", data);
    set({ isDialogOpen: false });
  },
}));
