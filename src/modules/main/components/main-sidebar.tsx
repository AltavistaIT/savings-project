import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader } from "@/components/ui/sidebar";

export default function MainSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <h2>Financial Dashboard</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup></SidebarGroup>
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}