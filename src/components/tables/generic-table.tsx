"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, TableBody, TableHeader, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode, useEffect, useState } from "react";
import TableCellInput from "./table-cell-input";
import { Button } from "@/components/ui/button"
import { GripVertical, Plus } from "lucide-react";

export type Column<T> = {
  header: string,
  accessor: keyof T | ((row: T, onChange: (value: any) => void) => React.ReactNode)
}

type GenericTableProps<T> = {
  title: string,
  columns: Column<T>[];
  data: T[];
}

export default function GenericTable<T extends Record<string, ReactNode>>({ columns, data, title }: GenericTableProps<T>) {

  const [editableData, setEditableData] = useState(data)

  // Sincroniza editableData cuando data cambia
  useEffect(() => {
    setEditableData(data)
  }, [data])

  const handleInputChange = (rowIndex: number, key: keyof T, value: any) => {
    setEditableData((prevData) =>
      prevData.map((row, index) => (index === rowIndex ? { ...row, [key]: value } : row))
    )

    console.log('editableData => ', editableData)
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              editableData.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableCell>
                    <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                  </TableCell>
                  {
                    columns.map((column, columnIndex) => (
                      <TableCell key={columnIndex}>
                        <TableCellInput row={row} rowIndex={rowIndex} column={column} handleInputChange={handleInputChange} />
                      </TableCell>
                    ))
                  }
                </TableRow>
              ))
            }
            <TableRow>
              <TableCell colSpan={4}>
                <Button variant="outline" className="w-full border-dashed">
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