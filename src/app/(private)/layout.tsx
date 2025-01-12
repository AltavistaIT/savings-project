import MainNavbar from "@/modules/main/components/main-navbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import MainSidebar from "@/modules/main/components/main-sidebar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* <MainNavbar /> */}
      <SidebarProvider defaultOpen={true}>
        <MainSidebar />
        <SidebarTrigger />
        {children}
      </SidebarProvider>
    </>
  );
}