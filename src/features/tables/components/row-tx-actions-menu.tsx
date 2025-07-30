import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { MappedTransactions } from "../types";
import useUpdateTransaction from "@/features/tables/hooks/use-update-transaction";
import { toast } from "sonner";
import { deleteTransaction } from "@/features/tables/actions/delete-transaction";
import { TABLE_TYPES } from "@/config/constants";

type RowTxActionsMenuProps = {
  rowData: MappedTransactions;
  tableTypeId: TABLE_TYPES;
  refetchTable: () => Promise<void>;
};

export function RowTxActionsMenu({
  rowData,
  tableTypeId,
  refetchTable
}: RowTxActionsMenuProps) {
  const { openDialogForm } = useUpdateTransaction({
    rowData,
    tableTypeId,
    refetchTable
  });

  const handleEditTx = () => {
    openDialogForm();
  };

  const handleDeleteTx = async () => {
    const response = await deleteTransaction(String(rowData.id));

    if (!response || response.success) {
      toast.error("An unexpected error occurred. Please try again.");
    }

    toast.success("Transaction deleted successfully");
    await refetchTable();
  }

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
          <DropdownMenuItem onSelect={() => handleEditTx()}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => handleDeleteTx()}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
