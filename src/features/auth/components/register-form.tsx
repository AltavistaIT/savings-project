"use client"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import registerAction from "../actions/register";
import { toast } from "sonner";
import { routes } from "@/lib/routes";
import { redirect } from "next/navigation";

const registerSchema = z.object({
  name: z.string().min(2, "Nombre requerido"),
  surname: z.string().min(2, "Apellido requerido"),
  email: z.string().email("Correo inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

type RegisterForm = z.infer<typeof registerSchema>;

export const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<RegisterForm>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data: RegisterForm) => {
    setIsLoading(true);
    console.log("Register data", data);

    const response = await registerAction(data);
    if (!response?.success) {
      setIsLoading(false);
      toast.error("An unexpected error occurred. Please try again.");
      return
    }

    reset();
    toast.success("Registered successfully");
    setIsLoading(false);

    setTimeout(() => {
      redirect(routes.public.login);
    }, 3000);
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-center">Crear Cuenta</h1>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-1">
          <Label htmlFor="name">Nombre</Label>
          <Input id="name" {...register("name")} />
          {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
        </div>
        <div className="space-y-1">
          <Label htmlFor="surname">Apellido</Label>
          <Input id="surname" {...register("surname")} />
          {errors.surname && <p className="text-sm text-red-500">{errors.surname.message}</p>}
        </div>
        <div className="space-y-1">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input id="email" type="email" {...register("email")} />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">Contraseña</Label>
          <Input id="password" type="password" {...register("password")} />
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        </div>
        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading ? "Loading" : "Register"}
        </Button>
      </form >
      <p className="text-sm text-center">
        ¿Ya tienes cuenta? <Link href="/login" className="underline">Inicia sesión</Link>
      </p>
    </>
  )
}