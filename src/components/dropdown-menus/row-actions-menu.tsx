import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import * as z from "zod";
import { useDialogFormStore } from "@/hooks/store/generic-dialog-form-store";

type RowActionsMenuProps<T extends Record<string, unknown>> = {
  rowData: T;
};

export function RowActionsMenu<T extends Record<string, ReactNode>>({
  rowData,
}: RowActionsMenuProps<T>) {
  const {
    openDialog,
  } = useDialogFormStore();

  const transformedFields = [
    {
      name: "category",
      label: "Categoría",
      type: "text",
      validation: z.string().min(3, "Mínimo 3 caracteres"),
    },
    {
      name: "percentage",
      label: "Porcentaje",
      type: "number",
      validation: z
        .number()
        .min(0, "Debe ser positivo")
        .max(100, "Máximo 100%"),
    },
    {
      name: "amount",
      label: "Monto",
      type: "number",
      validation: z.number().min(1, "Debe ser mayor a 0"),
    },
  ];

  // Extraemos solo los valores que nos interesan del rowData
  const transformedDefaultValues = {
    category: rowData.category || "",
    percentage: rowData.percentage || 0,
    amount: rowData.amount || 0,
  };

  const handleEditOpen = () => {
    openDialog({
      title: "Editar",
      description: "Edita los datos de la TX seleccionada",
      fields: transformedFields,
      initialValues: transformedDefaultValues as z.infer<z.ZodObject<Record<keyof T, z.ZodTypeAny>>>,
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => handleEditOpen()}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => { }}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

    </>
  );
}
