import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GripVertical, Plus } from "lucide-react";
import { RowTxActionsMenu } from "./row-tx-actions-menu";
import { Button } from "../../../components/ui/button";
import { Column, MappedTransactions } from "../types";
import { TableEntity } from "@/types/internal-api/models";
import { TABLE_TYPES } from "@/config/constants";

interface DefaultTransactionsTableProps {
  tableTypeId: TABLE_TYPES
  columns: Column[];
  transactions: MappedTransactions[]
  table: TableEntity
  handleCreateTransaction: () => void
  refetchTable: () => Promise<void>
}

export const GenericTransactionsTable = ({ tableTypeId, columns, transactions, table, handleCreateTransaction, refetchTable }: DefaultTransactionsTableProps) => {
  return (
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column, index) => (
              <TableHead key={index}>{column.header}</TableHead>
            ))}
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            transactions.length === 0 ?
              <TableRow>
                <TableCell colSpan={columns.length + 2} className="h-24 text-center">
                  No hay transacciones registradas
                </TableCell>
              </TableRow>
              :
              <>
                {transactions.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {columns.map((column, columnIndex) => (
                      <TableCell key={columnIndex}>
                        {column.accessor(row)}
                      </TableCell>
                    ))}
                    <TableCell className="text-right">
                      <RowTxActionsMenu rowData={row} tableTypeId={tableTypeId} refetchTable={refetchTable} />
                    </TableCell>
                  </TableRow>
                ))}

                <TableRow className="font-bold">
                  <TableCell>Totals</TableCell>
                  <TableCell className="text-right">{table?.amount}</TableCell>
                </TableRow>
              </>
          }

          <TableRow>
            <TableCell colSpan={columns.length + 2}>
              <Button
                variant="outline"
                onClick={() => handleCreateTransaction()}
                className="w-full border-dashed"
              >
                <Plus className="h-4 w-4 mr-2" /> Add Row
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
  )
};