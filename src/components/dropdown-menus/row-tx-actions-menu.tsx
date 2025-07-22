import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { MappedTransactions } from "../tables/types";
import useUpdateTransaction from "@/hooks/use-update-transaction";
import { ApiRouteClient } from "@/services/api/api-route-client";
import { toast } from "sonner";
import { useTableStore } from "@/hooks/store/table-store";

type RowTxActionsMenuProps = {
  rowData: MappedTransactions;
};

export function RowTxActionsMenu({
  rowData,
}: RowTxActionsMenuProps) {
  const { openDialogForm } = useUpdateTransaction(rowData);
  const { fetchTable } = useTableStore()
  const apiRouteClient = new ApiRouteClient();

  const handleEditOpen = () => {
    openDialogForm();
  };

  const handleDeleteTx = async () => {
    const response = await apiRouteClient.fetch("deleteTransaction", {
      pathVariables: { id: String(rowData.id) }
    })

    if (!response.success) {
      toast.error("An unexpected error occurred. Please try again.");
    }

    toast.success("Transaction deleted successfully");
    await fetchTable();
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
          <DropdownMenuItem onSelect={() => handleEditOpen()}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => handleDeleteTx()}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
