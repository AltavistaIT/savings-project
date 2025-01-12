import { Table, TableBody, TableHeader, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { ReactNode } from "react";

export type Column<T> = {
  header: string,
  accesor: keyof T | ((row: T) => React.ReactNode)
}

type GenericTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  classname?: string
}

export default function GenericTable<T extends Record<string, ReactNode>>({ columns, data, classname }: GenericTableProps<T>) {
  return (
    <div className={classname}>
      <Table>
        <TableHeader>
          <TableRow>
            {
              columns.map((column, index) => (
                <TableHead key={index}>{column.header}</TableHead>
              ))
            }
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {
                  columns.map((column, columnIndex) => (
                    <TableCell key={columnIndex}>{typeof column.accesor === "function" ? column.accesor(row) : row[column.accesor]}</TableCell>
                  ))
                }
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  )
}