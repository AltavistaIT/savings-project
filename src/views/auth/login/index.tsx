"use client"
import { LoginForm } from "@/features/auth/components/login-form";
import { routes } from "@/lib/routes";
import { signOut } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export const LoginPage = () => {
  const params = useSearchParams()
  const expired = params.get("expired");

  useEffect(() => {
    if (expired) {
      const logout = async () => {
        await signOut({ redirect: true, redirectTo: routes.public.login });
      }
      logout();
    }
  }, [expired]);

  return (
    <div className="max-w-md mx-auto h-screen flex flex-col justify-center py-16 space-y-6">
      <LoginForm />
    </div>
  )
};