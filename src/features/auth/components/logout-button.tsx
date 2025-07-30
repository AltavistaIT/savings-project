"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { routes } from "@/lib/routes";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export const LogoutButton = () => {
  const handleLogout = async () => {
    await signOut({ redirect: true, redirectTo: routes.public.login });
  }

  return (
    <DropdownMenuItem
      onClick={handleLogout}
      className="text-red-600">
      <LogOut className="mr-2 h-4 w-4" />
      <span>Log out</span>
    </DropdownMenuItem>
  )
};