import DateSelector from "@/components/selectors/date-selector";
import FilteredTransactionsTable from "@/components/tables/filtered-transactions-table";
import { TABLE_TYPES } from "@/domain/constants";

export const ExpensesPage = () => {
  return (
    <>
      <div className="w-11/12 grid grid-cols-1 gap-4">
        <DateSelector />
        <FilteredTransactionsTable tableType={TABLE_TYPES.Expenses} />
      </div>
    </>
  )
};