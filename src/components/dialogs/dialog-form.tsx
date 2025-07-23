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
import { useDialogFormStore } from "@/hooks/store/dialog-form-store";
import { useEffect } from "react";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export function DialogForm<T extends Record<string, any>>() {
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
            onSubmit={form.handleSubmit(async (data) => {
              if (handleSubmit) {
                await handleSubmit(data)
              }
            })}
            className="space-y-4"
          >
            {formConfig.fields.map((field) => (
              <FormField
                key={field.name}
                control={form.control}
                name={field.name as Path<T>}
                render={({ field: formField }) => (
                  <FormItem>
                    {
                      field.type !== "hidden" ?
                        <FormLabel>{field.label}</FormLabel>
                        : null
                    }
                    <FormControl>
                      {field.type === "select" ? (
                        <select
                          {...formField}
                          className="w-full border border-input bg-background px-3 py-2 text-sm rounded-md" // o usa un componente UI si tienes
                        >
                          {(field.options || []).map((option) => (
                            <option key={option.label} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      ) : field.type === "date" ? (
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !formField.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {formField.value ? format(formField.value, "dd/MM/yyyy") : "Chose a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={formField.value}
                              onSelect={formField.onChange}
                              initialFocus

                            />
                          </PopoverContent>
                        </Popover>
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
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Saving..." : "Save changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
