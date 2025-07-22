"use client";

import { Column } from "./types";
import { GenericTransactionsTable } from "./generic-transactions-table";
import { useTableStore } from "@/hooks/store/table-store";
import { useEffect } from "react";
import { TABLE_TYPES } from "@/domain/constants";
import { DialogForm } from "../dialogs/dialog-form";
import useCreateTransaction from "@/hooks/use-create-transaction";

const columns: Column[] = [
  {
    header: "Category",
    accessor: (row) => row.type_id,
  },
  {
    header: "Description",
    accessor: (row) => row.description,
  },
  {
    header: "Percentage",
    accessor: (row) => `${row.percentage.toFixed(2)}%`,
  },
  {
    header: "Amount",
    accessor: (row) => `${row.amount?.toFixed(2)}`,
  },
  {
    header: "Date",
    accessor: (row) =>
      row.date ? new Date(row.date).toLocaleDateString("en-US", { timeZone: "UTC" }) : "-",
  },
];

interface FilteredTransactionsTableProps {
  tableType: TABLE_TYPES;
}

export default function FilteredTransactionsTable({ tableType }: FilteredTransactionsTableProps) {
  const { table, transactions, setTypeId } = useTableStore()
  const { openDialogForm } = useCreateTransaction()

  useEffect(() => {
    setTypeId(tableType)
  }, [tableType])

  return (
    <>
      <GenericTransactionsTable title={TABLE_TYPES[tableType]} columns={columns} transactions={transactions} table={table!} handleCreateTransaction={openDialogForm} />
      <DialogForm />
    </>
  );
}
