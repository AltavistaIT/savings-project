"use client";
import { GenericTransactionsTable } from "./generic-transactions-table";
import { TABLE_TYPES } from "@/config/constants";
import useCreateTransaction from "@/features/tables/hooks/use-create-transaction";
import { Column } from "../types";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useTableData } from "../hooks/use-table-data";
import { useDateSelectorStore } from "@/stores/date-selector-store";

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
  const { selectedMonth, selectedYear } = useDateSelectorStore();

  const monthYear =
    selectedMonth && selectedYear
      ? `${selectedYear}-${selectedMonth.toString().padStart(2, "0")}`
      : "";

  const { table, transactions, refetch } = useTableData(monthYear, tableType);

  const { openDialogForm } = useCreateTransaction({
    monthYear,
    tableTypeId: tableType,
    tableId: table.id,
    onTransactionCreated: refetch,
  });

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{TABLE_TYPES[tableType]}</CardTitle>
        </CardHeader>
        <GenericTransactionsTable tableTypeId={tableType} columns={columns} table={table} transactions={transactions} handleCreateTransaction={openDialogForm} refetchTable={refetch} />
      </Card>
    </>
  );
}
