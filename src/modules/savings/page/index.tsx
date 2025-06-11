import { GenericFormDialog } from "@/components/dialogs/generic-form-dialog"
import DateSelector from "@/components/selectors/date-selector"
import SavingsTable from "@/components/tables/savings-table"

export const SavingsPage = () => {
  return (
    <>
      <div className="w-11/12 grid grid-cols-1 gap-8">
        <DateSelector />
        <SavingsTable />
      </div>
      <GenericFormDialog />
    </>
  )
}