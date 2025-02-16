import { GenericFormDialog } from "@/components/dialogs/generic-form-dialog";
import GeneralBudgetTable from "@/components/tables/general-budget-table";

export const MainDashboardPage = () => {
  return (
    <div className="flex justify-center w-full py-8">
      {/* <div className=""></div> */}
      <div className="w-2/3">
        <div>

        </div>
        <div className="grid grid-cols-1 gap-8">
          <GeneralBudgetTable />
          <GeneralBudgetTable />
          <GeneralBudgetTable />
          <GeneralBudgetTable />
        </div>
      </div>
      {/* <div className="col-span-1"></div> */}
      <GenericFormDialog />
    </div>
  );
}