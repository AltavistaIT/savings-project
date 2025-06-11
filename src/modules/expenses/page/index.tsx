import { GenericFormDialog } from "@/components/dialogs/generic-form-dialog"
import DateSelector from "@/components/selectors/date-selector"
import ExpensesTable from "@/components/tables/expenses-table"

export const ExpensesPage = () => {
  return (
    <>
      <div className="w-11/12 grid grid-cols-1 gap-8">
        <DateSelector />
        <ExpensesTable />
      </div>
      <GenericFormDialog />
    </>
  )
}