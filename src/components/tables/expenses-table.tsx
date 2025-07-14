"use client";
import { use, useEffect, useState } from "react";
import { TableEntity, CreateTransactionModel, ConfigGet200Response } from "@/api";
import { Column, MappedTransactions } from "./types";

import { DefaultTransactionsTable } from "./default-transactions-table";
import { useTableStore } from "@/hooks/store/table-store";

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
      row.created_at ? new Date(row.created_at).toLocaleDateString() : "-",
  },
];

export default function ExpensesTable() {
  const { table, transactions, createTransaction, setTypeId } = useTableStore()

  useEffect(() => {
    setTypeId(3)
  }, [])

  return (
    <DefaultTransactionsTable columns={columns} transactions={transactions} table={table!} handleCreateTransaction={createTransaction} />
  );
}
