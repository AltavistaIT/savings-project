import { SidebarProvider } from "@/components/ui/sidebar";
import MainNavbar from "@/modules/main/components/main-navbar";
import MainSidebar from "@/modules/main/components/main-sidebar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SidebarProvider defaultOpen={true}>
        <MainSidebar />
        <div className="w-full">
          <div className="fixed w-full z-10">
            <MainNavbar />
          </div>
          <div className="py-20">
            {children}
          </div>
        </div>
      </SidebarProvider>
    </>
  );
}