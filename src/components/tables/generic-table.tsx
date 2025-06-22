"use client"

import { Table, TableBody, TableHeader, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button"
import { GripVertical, Plus } from "lucide-react";
import { RowActionsMenu } from "../dropdown-menus/row-actions-menu";
import { useDialogFormStore } from "@/hooks/store/generic-dialog-form-store";
import * as z from "zod";
import { TransactionEntity } from "@/api";

export type Column = {
  header: string,
  accessor: (row: MappedTransactions) => ReactNode
}

export type MappedTransactions = TransactionEntity & {
  percentage: number
}

type GenericTableProps = {
  title: string,
  columns: Column[];
  transactions: MappedTransactions[];
  totals: {
    amount: number
  }
}

export default function GenericTable({ columns, transactions, title, totals }: GenericTableProps) {
  const { openDialog } = useDialogFormStore();

  const handleOpenNewTx = () => {
    openDialog({
      title: "Nueva Transacción",
      description: "Agrega una nueva transacción",
      fields: [
        {
          name: "category",
          label: "Categoría",
          type: "text",
          validation: z.string().min(3, "Mínimo 3 caracteres"),
        },
        {
          name: "percentage",
          label: "Porcentaje",
          type: "number",
          validation: z
            .number()
            .min(0, "Debe ser positivo")
            .max(100, "Máximo 100%"),
        },
        {
          name: "amount",
          label: "Monto",
          type: "number",
          validation: z.number().min(1, "Debe ser mayor a 0"),
        },
      ],
      initialValues: {
        category: "",
        percentage: 0,
        amount: 0,
      },
    });
  }

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
              {
                columns.map((column, index) => (
                  <TableHead key={index}>{column.header}</TableHead>
                ))
              }
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
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
                  <RowActionsMenu
                    rowData={row}
                  />
                </TableCell>
              </TableRow>
            ))}

            <TableRow className="font-bold">
              <TableCell >Totales</TableCell>
              <TableCell className="text-right">{totals.amount}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={columns.length + 2}>
                <Button variant="outline" onClick={() => handleOpenNewTx()} className="w-full border-dashed">
                  <Plus className="h-4 w-4 mr-2" /> Add Row
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}