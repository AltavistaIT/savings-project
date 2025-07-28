import { SidebarProvider } from "@/components/ui/sidebar";
import MainNavbar from "@/components/navbars/main-navbar";
import MainSidebar from "@/components/sidebars/main-sidebar";
import DateSelector from "@/components/selectors/date-selector";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  return (
    <>
      <SidebarProvider defaultOpen={true}>
        <MainSidebar />
        <div className="w-full">
          <div className="fixed w-full z-10">
            <MainNavbar />
          </div>
          <div className="py-20 flex justify-center">
            <DateSelector />
            {children}
          </div>
        </div>
      </SidebarProvider>
    </>
  );
}