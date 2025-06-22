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
import * as z from "zod";
import { DefaultValues, Path, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDialogFormStore } from "@/hooks/store/generic-dialog-form-store";
import { useEffect } from "react";

export function GenericFormDialog<T extends Record<string, any>>() {
  const {
    formConfig,
    isDialogOpen,
    closeDialog,
    handleSubmit,
  } = useDialogFormStore()

  const schema: z.ZodObject<Record<keyof T, z.ZodTypeAny>> = z.object(
    Object.fromEntries(
      formConfig.fields.map((field) => [field.name, field.validation])
    ) as Record<keyof T, z.ZodTypeAny>
  )

  const form = useForm<T>({
    resolver: zodResolver(schema) as any,
    defaultValues: formConfig.initialValues as DefaultValues<T>,
  })

  useEffect(() => {
    form.reset(formConfig.initialValues as DefaultValues<T>)
  }, [formConfig.initialValues, form])


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
                      {field.type === "select" ? (
                        <select
                          {...formField}
                          className="w-full border border-input bg-background px-3 py-2 text-sm rounded-md" // o usa un componente UI si tienes
                        >
                          {(field.options as string[]).map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <Input type={field.type} {...formField} />
                      )}
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
