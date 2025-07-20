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
import { RowTxActionsMenu } from "../dropdown-menus/row-tx-actions-menu";
import { Button } from "../ui/button";
import { Column, MappedTransactions } from "./types";
import { TableEntity } from "@/api";

interface DefaultTransactionsTableProps {
  title: string
  columns: Column[];
  transactions: MappedTransactions[]
  table: TableEntity
  handleCreateTransaction: () => void
}

export const GenericTransactionsTable = ({ title, columns, transactions, table, handleCreateTransaction }: DefaultTransactionsTableProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
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
                      <TableCell>
                        <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                      </TableCell>
                      {columns.map((column, columnIndex) => (
                        <TableCell key={columnIndex}>
                          {column.accessor(row)}
                        </TableCell>
                      ))}
                      <TableCell className="text-right">
                        <RowTxActionsMenu rowData={row} />
                      </TableCell>
                    </TableRow>
                  ))}

                  <TableRow className="font-bold">
                    <TableCell>Totales</TableCell>
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
    </Card>
  )
};