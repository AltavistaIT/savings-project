import FilteredTransactionsTable from "@/features/tables/components/filtered-transactions-table";
import { TABLE_TYPES } from "@/config/constants";

export const ReportsMainPage = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        <FilteredTransactionsTable tableType={TABLE_TYPES.Invoices} />
        <FilteredTransactionsTable tableType={TABLE_TYPES.Expenses} />
        {/* <FilteredTransactionsTable tableType={TABLE_TYPES.Savings} /> */}
      </div>
    </>
  );
}