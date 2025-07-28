"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export const LogoutButton = () => {
  const handleLogout = async () => {
    await signOut({ redirect: true, redirectTo: "/login" });
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