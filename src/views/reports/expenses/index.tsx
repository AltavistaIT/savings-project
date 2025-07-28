import FilteredTransactionsTable from "@/features/tables/components/filtered-transactions-table";
import { TABLE_TYPES } from "@/config/constants";

export const ExpensesPage = () => {
  return (
    <>
      <div className="w-11/12 grid grid-cols-1 gap-4">
        <FilteredTransactionsTable tableType={TABLE_TYPES.Expenses} />
      </div>
    </>
  )
};