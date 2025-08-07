import { SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubItem } from "@/components/ui/sidebar";
import { ChevronDown, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { MenuItem } from "./types";

interface MainSidebarMenuItemProps {
  item: MenuItem;
  index: number;
  isOpen: boolean;
  toggleMenu: (index: number) => void;
}

export default function MainSidebarMenuItem({ item, index, isOpen, toggleMenu }: MainSidebarMenuItemProps) {
  const hasSubItems = Array.isArray(item.items);

  return (
    <SidebarMenuItem >
      {hasSubItems ? (
        <>
          <SidebarMenuButton onClick={() => toggleMenu(index)} className="justify-between">
            <div className="flex gap-2 items-center ">
              {item.icon && <item.icon className="w-4 h-4" />}
              <span>{item.title}</span>
            </div>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </motion.div>
          </SidebarMenuButton>
          <motion.div
            initial={false}
            animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <SidebarMenuSub className="pl-6 border-l border-border ml-2 mt-1">
              {item.items?.map((subItem, subIndex) => (
                <SidebarMenuSubItem key={subIndex}>
                  <a
                    href={subItem.href}
                    className="block w-full px-2 py-1.5 rounded-md text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  >
                    {subItem.title}
                  </a>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </motion.div>
        </>
      ) : (
        <a href={item.href}>
          <SidebarMenuButton>
            {item.icon && <item.icon className="w-4 h-4" />}
            <span>{item.title}</span>
          </SidebarMenuButton>
        </a>
      )}
    </SidebarMenuItem>
  )
}