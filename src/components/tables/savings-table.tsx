// import GenericTransactionsTable, { Column } from "./generic-transactions-table";

// type SavingsItem = {
//   id: string;
//   description: string;
//   category: string;
//   percentage: number;
//   amount: number;
//   date: string;
// }

// const savingsData: SavingsItem[] = [
//   {
//     id: "1",
//     description: "Ahorro 1",
//     category: "Necesidades",
//     percentage: 50,
//     amount: 500,
//     date: "2021-10-01"
//   },
//   {
//     id: "2",
//     description: "Ahorro 2",
//     category: "Deseos",
//     percentage: 30,
//     amount: 300,
//     date: "2021-10-02"
//   },
//   {
//     id: "3",
//     description: "Ahorro 3",
//     category: "Ahorros",
//     percentage: 20,
//     amount: 200,
//     date: "2021-10-03"
//   },
//   {
//     id: "4",
//     description: "Total",
//     category: "",
//     percentage: 100,
//     amount: 1000,
//     date: ""
//   }
// ]

// const columns: Column<SavingsItem>[] = [
//   {
//     header: "Description",
//     accessor: "description",
//   },
//   {
//     header: "Category",
//     accessor: "category",
//   },
//   {
//     header: "Percentage",
//     accessor: "percentage",
//   },
//   {
//     header: "Amount",
//     accessor: "amount",
//   },
//   {
//     header: "Date",
//     accessor: "date",
//   },
// ]

// export default function SavingsTable() {
//   return (
//     <>
//       <GenericTransactionsTable title="Ahorros" columns={columns} data={savingsData} />
//     </>
//   )
// }