import { DialogForm } from "@/components/dialogs/dialog-form";
import DateSelector from "@/components/selectors/date-selector";
import ExpensesTable from "@/components/tables/expenses-table";
import Config from "@/components/utils/config";

export const ReportsMainPage = () => {
  return (
    <>
      <Config />

      <div className="w-11/12 grid grid-cols-1 gap-8">
        <DateSelector />
        <ExpensesTable />
      </div>
      <DialogForm />
    </>
  );
}