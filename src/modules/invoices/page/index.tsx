import { GenericFormDialog } from "@/components/dialogs/generic-form-dialog"
import DateSelector from "@/components/selectors/date-selector"
import InvoicesTable from "@/components/tables/invoices-table"

export const InvoicesPage = () => {
  return (
    <>
      <div className="w-11/12 grid grid-cols-1 gap-8">
        <DateSelector />
        <InvoicesTable />
      </div>
      <GenericFormDialog />
    </>
  )
}