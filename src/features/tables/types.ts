import { ReactNode } from "react";
import { TransactionEntity } from "@/types/internal-api/models/TransactionEntity";

export type Column = {
  header: string;
  accessor: (row: MappedTransactions) => ReactNode;
};

export type MappedTransactions = TransactionEntity & {
  percentage: number;
};
