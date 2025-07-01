import { ReactNode } from "react";
import { TransactionEntity } from "@/api";

export type Column = {
  header: string;
  accessor: (row: MappedTransactions) => ReactNode;
};

export type MappedTransactions = TransactionEntity & {
  percentage: number;
};
