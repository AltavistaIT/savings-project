"use client"

import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu } from "@/components/ui/sidebar";
import { useState } from "react";
import { Home, LucideIcon, PieChart } from "lucide-react";
import { MenuGroup } from "./types";
import { routes } from "@/lib/routes";
import MainSidebarMenuItem from "../items/main-sidebar-menu-item";


const items: MenuGroup[] = [
  {
    label: "Reports",
    items: [
      {
        title: "Overview",
        icon: Home,
        href: routes.private.reports.overview
      },
      {
        title: "Ingresos",
        icon: PieChart,
        href: routes.private.reports.invoices
      },
      {
        title: "Gastos",
        icon: PieChart,
        href: routes.private.reports.expenses
      },
      {
        title: "Ahorros e Inversiones",
        icon: PieChart,
        href: routes.private.reports.savings
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

export default function MainSidebarGroup() {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({})

  const toggleMenu = (index: number) => {
    setOpenMenus((prev) => ({
      ...prev,
      [index]: !prev[index]
    }))
  }
  return (
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
                return (
                  <div key={index}>
                    <MainSidebarMenuItem item={item} index={index} isOpen={isOpen} toggleMenu={toggleMenu} />
                  </div>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </div>
      ))}
    </SidebarGroup>
  )
}