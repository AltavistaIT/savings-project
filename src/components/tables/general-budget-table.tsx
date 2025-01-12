import GenericTable, { Column } from "./generic-table";
import { generalView } from "@/core/static-data/general-view";

type GeneralBudgetItem = {
  id: string,
  category: string,
  percentage: number,
  amount: number
}

const generalBudgetData: GeneralBudgetItem[] = [
  {
    id: "1",
    category: "Necesidades",
    percentage: 50,
    amount: 500
  },
  {
    id: "2",
    category: "Deseos",
    percentage: 30,
    amount: 300
  },
  {
    id: "3",
    category: "Ahorros",
    percentage: 20,
    amount: 200
  }
]

const columns: Column<GeneralBudgetItem>[] = [
  {
    header: "Category",
    accesor: "category"
  },
  {
    header: "Percentage",
    accesor: "percentage"
  },
  {
    header: "Amount",
    accesor: "amount"
  }
]


export default function GeneralBudgetTable() {
  return (
    <>
      <GenericTable columns={columns} data={generalBudgetData} />
    </>
  );
}