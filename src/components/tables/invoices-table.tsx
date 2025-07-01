// import GenericTransactionsTable, { Column } from "./generic-transactions-table";

// type InvoiceItem = {
//   id: string;
//   description: string;
//   category: string;
//   percentage: number;
//   amount: number;
//   date: string;
// }

// const invoicesData: InvoiceItem[] = [
//   {
//     id: "1",
//     description: "Ingreso 1",
//     category: "Necesidades",
//     percentage: 50,
//     amount: 500,
//     date: "2021-10-01"
//   },
//   {
//     id: "2",
//     description: "Ingreso 2",
//     category: "Deseos",
//     percentage: 30,
//     amount: 300,
//     date: "2021-10-02"
//   },
//   {
//     id: "3",
//     description: "Ingreso 3",
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

// const columns: Column<InvoiceItem>[] = [
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

// export default function InvoicesTable() {
//   return (
//     <>
//       <GenericTransactionsTable title="Ingresos" columns={columns} data={invoicesData} />
//     </>
//   )
// }