"use client";
import GenericTable, { Column } from "./generic-table";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { GetTableUsecase } from "@/usecases/get-table-uc";
import { TableClientImpl } from "@/infraestructure/http/table-client-impl";
import { HttpClientImpl } from "@/infraestructure/http/http-client-impl";
import { InternalApiClientImpl } from "@/infraestructure/http/internal-api-client-impl";
import { TableEntity, TableWithTransactionsAggregate, TransactionEntity } from "@/api";
import { table } from "console";

type MappedTransactions = TransactionEntity & {
  percentage: number
}

// TODO: Devulve las txs en string nomas...

const columns: Column<MappedTransactions>[] = [
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
    accessor: (row) => `${row.percentage.toFixed(2)}%`
  },
  {
    header: "Amount",
    accessor: (row) => `${row.amount?.toFixed(2)}`
  },
  {
    header: "Date",
    accessor: (row) => row.created_at ? new Date(row.created_at).toLocaleDateString() : "-"
  }
]


export default function GeneralBudgetTable() {
  const [table, setTable] = useState<TableEntity>()
  const [transactions, setTransactions] = useState<TransactionEntity[]>()
  const [mappedTransactions, setMappedTransactions] = useState<MappedTransactions[]>([])

  useEffect(() => {
    handlerGetTable()
  }, [])

  const handlerGetTable = async () => {
    const response = await new GetTableUsecase(
      new TableClientImpl(
        new InternalApiClientImpl()
      )
    ).handler("4");

    if (!response) {
      return
    }

    const { table, transactions } = response
    setTable(table);

    if (!transactions || transactions.length === 0) {
      return
    }

    const mappedTransactions = transactions.map((tx) => {
      const percentage = (tx.amount && table?.amount)
        ? (tx.amount / table.amount) * 100
        : 0
      return {
        ...tx,
        percentage
      }
    })
    setTransactions(transactions)
    setMappedTransactions(mappedTransactions)
  }

  return (
    <>
      {
        !transactions && <p>Loading...</p>
      }
      <GenericTable title="General Budget" columns={columns} data={mappedTransactions} />
    </>
  );
}