"use client"

import { Table, TableBody, TableHeader, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button"
import { GripVertical, Plus } from "lucide-react";
import { RowActionsMenu } from "../dropdown-menus/row-actions-menu";
import { useDialogFormStore } from "@/hooks/store/generic-dialog-form-store";
import * as z from "zod";

export type Column<T> = {
  header: string,
  accessor: (row: T) => ReactNode
}

type GenericTableProps<T> = {
  title: string,
  columns: Column<T>[];
  data: T[];
}

export default function GenericTable<T extends object>({ columns, data, title }: GenericTableProps<T>) {
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
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex} className={rowIndex === data.length - 1 ? "font-bold" : ""}>
                <TableCell>
                  {
                    rowIndex !== data.length - 1
                      ?
                      <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                      : ""
                  }
                </TableCell>
                {/* {columns.map((column, columnIndex) => (
                  <TableCell key={columnIndex}>
                    {typeof column.accessor === "function" ? column.accessor(row) : row[column.accessor]}
                  </TableCell>
                ))} */}
                {columns.map((column, columnIndex) => (
                  <TableCell key={columnIndex}>
                    {column.accessor(row)}
                  </TableCell>
                ))}
                {/* <TableCell className="text-right">
                  {
                    rowIndex !== data.length - 1
                      ?
                      <RowActionsMenu
                        rowData={row}
                      />
                      : ""
                  }
                </TableCell> */}
              </TableRow>
            ))}

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