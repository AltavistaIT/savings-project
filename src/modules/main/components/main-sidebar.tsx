'use client'

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubItem } from "@/components/ui/sidebar";
import { ChevronDown, ChevronRight, Home, PieChart } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const items = [
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
        title: "Ahorros",
        icon: PieChart,
        href: "/savings",
        items: [
          {
            title: "Ahorros",
            href: "/savings"
          },
          {
            title: "Inversiones",
            href: "/investments"
          }
        ]
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
                    const isOpen = openMenus[index] || false;
                    return (
                      <div key={index}>
                        <SidebarMenuItem >
                          {item.items ? (
                            <>
                              <SidebarMenuButton onClick={() => toggleMenu(index)} className="justify-between">
                                <div className="flex gap-2 items-center ">
                                  <item.icon className="w-4 h-4" />
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
                                  {item.items.map((subItem, subIndex) => (
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
                            <SidebarMenuButton>
                              <item.icon className="w-5 h-5" />
                              <span>{item.title}</span>
                            </SidebarMenuButton>
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
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}