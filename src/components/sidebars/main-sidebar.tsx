'use client'

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubItem } from "@/components/ui/sidebar";
import { ChevronDown, ChevronRight, Home, LucideIcon, PieChart } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import SidebarProfile from "./sidebar-profile";


interface SubItem {
  title: string;
  href: string;
}

interface MenuItem {
  title: string;
  icon?: LucideIcon;
  href: string;
  items?: SubItem[];
}

interface MenuGroup {
  label: string;
  items: MenuItem[];
}

const items: MenuGroup[] = [
  {
    label: "Sección Principal",
    items: [
      {
        title: "Dashboard",
        icon: Home,
        href: "/"
      },
      {
        title: "Ingresos",
        icon: PieChart,
        href: "/invoices"
      },
      {
        title: "Gastos",
        icon: PieChart,
        href: "/expenses"
      },
      {
        title: "Ahorros e Inversiones",
        icon: PieChart,
        href: "/savings"
      }
    ]
  },
  {
    label: "Análisis y Reportes",
    items: [
      {
        title: "Reportes Mensuales",
        icon: PieChart,
        href: "/invoices"
      },
      {
        title: "Tendencias Financieras",
        icon: PieChart,
        href: "/savings",
      }
    ]
  },
  {
    label: "Otros",
    items: [
      {
        title: "Simulador de Inversiones",
        icon: PieChart,
        href: "/savings",
      }
    ]
  }
]

export default function MainSidebar() {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({})

  const toggleMenu = (index: number) => {
    setOpenMenus((prev) => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  return (
    <Sidebar className="border-r">
      <SidebarHeader>
        {/* <h2>Financial Dashboard</h2> */}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {items.map((group, groupIndex) => (
            <div key={groupIndex} >
              <SidebarGroupLabel className="text-gray-500 ">
                {group.label}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item, index) => {
                    const isOpen = openMenus[index] || false
                    const hasSubItems = Array.isArray(item?.items)
                    return (
                      <div key={index}>
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
                                <SidebarMenuSub >
                                  {item.items?.map((subItem, subIndex) => (
                                    <SidebarMenuSubItem key={subIndex}>
                                      <a

                                        href={subItem.href}
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
                      </div>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </div>
          ))}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarProfile />
      </SidebarFooter>
    </Sidebar>
  );
}