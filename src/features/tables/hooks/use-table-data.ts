import { useEffect, useState } from "react";
import { getTable } from "@/features/tables/actions/get-table";
import { TableEntity } from "@/types/internal-api/models";
import { MappedTransactions } from "../types";

export const useTableData = (monthYear: string, typeId: number) => {
  const [table, setTable] = useState<TableEntity>({});
  const [transactions, setTransactions] = useState<MappedTransactions[]>([]);

  const fetchData = async () => {
    if (!monthYear || !typeId) return;
    const response = await getTable(monthYear, typeId);
    if (!response) {
      setTable({});
      setTransactions([]);
      return;
    }
    const { table, transactions } = response;
    setTable(table);
    setTransactions(transactions);
  };

  useEffect(() => {
    fetchData();
  }, [monthYear, typeId]);

  return { table, transactions, refetch: fetchData };
};
