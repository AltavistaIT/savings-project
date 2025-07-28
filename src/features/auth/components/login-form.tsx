"use client"

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { getConfig } from "@/actions/get-config";
import { LocalStorageService } from "@/services/local-storage-service";
import { useState } from "react";
import Link from "next/link";

const loginSchema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

type LoginForm = z.infer<typeof loginSchema>;
export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const loginHandler = async (data: LoginForm) => {
    setIsLoading(true)
    const login = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    })

    if (login?.error) {
      toast.error("Invalid credentials");
      setIsLoading(false)
      return
    }

    const config = await getConfig();

    LocalStorageService.setItem("config", config!.data);
    redirect("/");
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-center">Iniciar Sesión</h1>
      <form className="space-y-4" onSubmit={handleSubmit(loginHandler)}>
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
          {isLoading ? "Loading" : "Login"}
        </Button>
      </form>
      <p className="text-sm text-center">
        ¿No tienes cuenta? <Link href="/register" className="underline">Regístrate</Link>
      </p>
    </>
  )
}