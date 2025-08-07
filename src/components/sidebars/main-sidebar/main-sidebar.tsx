import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";
import SidebarProfile from "@/components/sidebars/main-sidebar/sidebar-profile";
import MainSidebarGroup from "./group/main-sidebar-group";

export default function MainSidebar() {
  return (
    <Sidebar className="border-r">
      <SidebarHeader>
        {/* <h2>Financial Dashboard</h2> */}
      </SidebarHeader>
      <SidebarContent>
        <MainSidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <SidebarProfile />
      </SidebarFooter>
    </Sidebar>
  );
}