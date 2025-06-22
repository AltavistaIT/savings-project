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
import { MappedTransactions } from "../tables/generic-table";

type RowActionsMenuProps = {
  rowData: MappedTransactions;
};

export function RowActionsMenu({
  rowData,
}: RowActionsMenuProps) {
  const {
    openDialog,
  } = useDialogFormStore();

  const transactionFields = [
    {
      name: "category",
      label: "Categoría",
      type: "select",
      options: ["Debito", "Credito"],
      validation: z.string().min(3, "Mínimo 3 caracteres"),
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
      validation: z.number().min(1, "Debe ser mayor a 0"),
    },
  ];

  const transactionDefaultValues = {
    category: rowData.type_id || "",
    description: rowData.description || "",
    amount: rowData.amount || 0,
  };

  const handleEditOpen = () => {
    openDialog({
      title: "Editar",
      description: "Edita los datos de la TX seleccionada",
      fields: transactionFields,
      initialValues: transactionDefaultValues
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
