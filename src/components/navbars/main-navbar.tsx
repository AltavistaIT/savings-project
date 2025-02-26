import { SidebarTrigger } from "@/components/ui/sidebar";

export default function MainNavbar() {
  return (
    <nav className="flex h-14 border-b justify-center bg-white">
      <div className="w-11/12 flex items-center gap-4">
        <SidebarTrigger />
        <h1 className="text-2xl font-bold">Savings Project</h1>
      </div>
    </nav>
  )
}