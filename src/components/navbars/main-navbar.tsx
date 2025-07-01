import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "../ui/button";
import { RefreshCw } from "lucide-react";

export default function MainNavbar() {
  return (
    <nav className="flex items-center h-14 border-b justify-center bg-white">
      <div className="w-11/12 flex items-center gap-4">
        <SidebarTrigger />
        <h1 className="text-2xl font-bold">Savings Project</h1>
      </div>
      <Button variant="outline" size="icon">
        <RefreshCw className="h-4 w-4" />
        <span className="sr-only">Refresh</span>
      </Button>
    </nav>
  )
}