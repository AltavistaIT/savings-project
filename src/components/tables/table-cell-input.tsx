

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input"
import { Column } from "./generic-table"
import { ReactNode } from "react"

type TableCellInputProps<T> = {
  row: T
  rowIndex: number
  column: Column<T>
  handleInputChange: (rowIndex: number, key: keyof T, value: any) => void
}

export default function TableCellInput<T extends Record<string, ReactNode>>({ row, rowIndex, column, handleInputChange }: TableCellInputProps<T>) {
  if (typeof column.accessor === "function") {
    return <>{column.accessor(row, (value) => handleInputChange(rowIndex, "" as keyof T, value))}</>
  }

  return (
    <Input
      value={row[column.accessor] as string}
      onChange={(e) => {
        if (typeof column.accessor === "string") {
          handleInputChange(rowIndex, column.accessor, e.target.value)
        }
      }}
    />
  )
}