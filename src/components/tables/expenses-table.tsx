"use client";

import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { use, useEffect, useState } from "react";
import { TableEntity, CreateTransactionModel, ConfigGet200Response } from "@/api";
import { Column, MappedTransactions } from "./types";
import { GripVertical, Plus } from "lucide-react";
import { RowTxActionsMenu } from "../dropdown-menus/row-tx-actions-menu";
import { Button } from "../ui/button";
import { z } from "zod";
import { useDialogFormStore } from "@/hooks/store/dialog-form-store";
import { useToastStore } from "@/hooks/store/toast-store";
import { ApiRouteClient } from "@/services/api-route-client";
import { LocalStorageService } from "@/services/local-storage-service";

const columns: Column[] = [
  {
    header: "Category",
    accessor: (row) => row.type_id,
  },
  {
    header: "Description",
    accessor: (row) => row.description,
  },
  {
    header: "Percentage",
    accessor: (row) => `${row.percentage.toFixed(2)}%`,
  },
  {
    header: "Amount",
    accessor: (row) => `${row.amount?.toFixed(2)}`,
  },
  {
    header: "Date",
    accessor: (row) =>
      row.created_at ? new Date(row.created_at).toLocaleDateString() : "-",
  },
];

export default function ExpensesTable() {
  const [table, setTable] = useState<TableEntity>();
  const [transactions, setTransactions] = useState<MappedTransactions[]>([]);
  const [txTypes, setTxTypes] = useState<Array<{ label: string; value: string }>>([]);
  const { openDialog } = useDialogFormStore();
  const { showToast } = useToastStore();
  const apiRouteClient = new ApiRouteClient()

  const handleCreateTx = async () => {
    await handlerGetTxTypes();

    openDialog({
      title: "Nuevo Gasto",
      description: "Ingresa los datos del gasto",
      action: "create",
      fields: [
        {
          name: "description",
          label: "Descripción",
          type: "text",
          validation: z.string().min(3, "Mínimo 3 caracteres"),
        },
        {
          name: "type_id",
          label: "Tipo de Gasto",
          type: "select",
          options: txTypes,
          validation: z.string().min(3, "Mínimo 3 caracteres"),
        },
        {
          name: "amount",
          label: "Monto",
          type: "number",
          validation: z
            .string()
            .min(1, "Debe tener al menos un digito")
            .transform((value) => Number(value))
            .refine((value) => value > 0, "Debe ser mayor a 0"),
        },
        {
          name: "currency",
          label: "Moneda",
          type: "select",
          options: [
            { label: "ARS", value: "ARS" },
            { label: "USD", value: "USD" },
          ],
          validation: z.string().min(3, "Mínimo 3 caracteres"),
        },
      ],
      initialValues: {
        description: "",
        type_id: "",
        amount: 0,
        currency: "ARS",
      },
    }, {
      onError: (message) => {
        showToast("Error", message, { position: "top-center", type: "error" });
      }
    });
  };

  useEffect(() => {
    handlerGetTable();
  }, []);

  const handlerGetTable = async () => {
    const response = await apiRouteClient.fetch("getTable", { id: 4 });
    if (!response || !response.success) {
      showToast("Error", response.message, { position: "top-center", type: "error" });
      return;
    }

    const { table, transactions } = response.data!
    setTable(table);

    if (!transactions || transactions.length === 0) {
      return;
    }

    const mappedTransactions = transactions.map((tx) => {
      const percentage =
        tx.amount && table?.amount ? (tx.amount / table.amount) * 100 : 0;
      return {
        ...tx,
        percentage,
      };
    });
    setTransactions(mappedTransactions);
  };

  const handlerGetTxTypes = async () => {
    const data = LocalStorageService.getItem("config")
    if (!data || !data.transaction_types) {
      return;
    }
    console.log('data', data);

    const txTypes = data.transaction_types.map((type) => ({ label: type.description!, value: String(type.id!) }))
    console.log('txTypes', txTypes);
    setTxTypes(txTypes)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gastos</CardTitle>
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

            <TableRow>
              <TableCell colSpan={columns.length + 2}>
                <Button
                  variant="outline"
                  onClick={async () => await handleCreateTx()}
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
  );
}
