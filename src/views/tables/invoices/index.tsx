import FilteredTransactionsTable from "@/features/tables/components/filtered-transactions-table";
import { TABLE_TYPES } from "@/config/constants";

export const InvoicesPage = () => {
  return (
    <>
      <div className=" grid grid-cols-1 gap-4">
        <FilteredTransactionsTable tableType={TABLE_TYPES.Invoices} />
      </div>
    </>
  )
};