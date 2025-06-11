import { GenericFormDialog } from "@/components/dialogs/generic-form-dialog";
import DateSelector from "@/components/selectors/date-selector";
import GeneralBudgetTable from "@/components/tables/general-budget-table";

export const MainDashboardPage = () => {
  return (
    <>
      <div className="w-11/12 grid grid-cols-1 gap-8">
        <DateSelector />
        <GeneralBudgetTable />
        {/* <GeneralBudgetTable />
        <GeneralBudgetTable />
        <GeneralBudgetTable /> */}
      </div>
      <GenericFormDialog />
    </>
  );
}