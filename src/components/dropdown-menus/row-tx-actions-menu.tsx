import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import * as z from "zod";
import { FormField, useDialogFormStore } from "@/hooks/store/dialog-form-store";
import { MappedTransactions } from "../tables/types";
import { LocalStorageService } from "@/services/local-storage-service";
import { useTableStore } from "@/hooks/store/table-store";
import useUpdateTransaction from "@/hooks/use-update-transaction";

type RowTxActionsMenuProps = {
  rowData: MappedTransactions;
};

export function RowTxActionsMenu({
  rowData,
}: RowTxActionsMenuProps) {
  const { openDialogForm } = useUpdateTransaction(rowData);

  const handleEditOpen = () => {
    openDialogForm();
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
