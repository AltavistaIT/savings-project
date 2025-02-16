"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect } from "react";
import * as z from "zod";
import { DefaultValues, Path, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDialogFormStore } from "@/hooks/store/generic-dialog-form-store";

export function GenericFormDialog<T extends Record<string, any>>() {
  const {
    formConfig,
    isDialogOpen,
    closeDialog,
    handleSubmit,
  } = useDialogFormStore()

  useEffect(() => {
    console.log('isDialogOpen => ', isDialogOpen)
    console.log('formConfig => ', formConfig)
  }, [isDialogOpen, formConfig])

  const schema: z.ZodObject<Record<keyof T, z.ZodTypeAny>> = z.object(
    Object.fromEntries(
      formConfig.fields.map((field) => [field.name, field.validation])
    ) as Record<keyof T, z.ZodTypeAny>
  );

  const form = useForm<T>({
    resolver: zodResolver(schema) as any,
    defaultValues: formConfig.initialValues as DefaultValues<T>,
  });

  return (
    <Dialog open={isDialogOpen} onOpenChange={(open) => !open && closeDialog()} >
      <DialogContent >
        <DialogHeader>
          <DialogTitle>{formConfig.title}</DialogTitle>
          <DialogDescription>{formConfig.description}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            {formConfig.fields.map((field) => (
              <FormField
                key={field.name}
                control={form.control}
                name={field.name as Path<T>}
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel>{field.label}</FormLabel>
                    <FormControl>
                      <Input type={field.type} defaultValue={formConfig.initialValues[field.name]} {...formField} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <DialogFooter>
              <Button type="submit">Guardar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
