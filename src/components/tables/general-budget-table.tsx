import GenericTable, { Column } from "./generic-table";

type GeneralBudgetItem = {
  id: string,
  category: string,
  percentage: number,
  amount: number,
  date: string
}

const generalBudgetData: GeneralBudgetItem[] = [
  {
    id: "1",
    category: "Necesidades",
    percentage: 50,
    amount: 500,
    date: "2021-10-01"
  },
  {
    id: "2",
    category: "Deseos",
    percentage: 30,
    amount: 300,
    date: "2021-10-02"
  },
  {
    id: "3",
    category: "Ahorros",
    percentage: 20,
    amount: 200,
    date: "2021-10-03"
  },
]

const columns: Column<GeneralBudgetItem>[] = [
  {
    header: "Category",
    accessor: "category",
  },
  {
    header: "Percentage",
    accessor: "percentage"
  },
  {
    header: "Amount",
    accessor: "amount"
  },
  {
    header: "Date",
    accessor: "date"
  }
]


export default function GeneralBudgetTable() {
  return (
    <>
      <GenericTable title="General Budget" columns={columns} data={generalBudgetData} />
    </>
  );
}