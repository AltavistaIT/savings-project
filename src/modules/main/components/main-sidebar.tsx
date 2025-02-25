'use client'

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubItem } from "@/components/ui/sidebar";
import { Briefcase, ChevronDown, ChevronRight, CreditCard, DollarSign, FileText, Gift, Home, PieChart, PiggyBank } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const items = [
  {
    title: "Home",
    icon: Home,
  },
  {
    title: "Budget", icon: PieChart,
    items: [
      { title: "Categories", href: "/categories" },
      { title: "Transactions", href: "/transactions" },
    ]
  },
  {
    title: "Invoices", icon: FileText,
    items: [
      { title: "Categories", href: "/categories" },
      { title: "Transactions", href: "/transactions" },
    ]
  },
  { title: "Expenses", icon: DollarSign },
  { title: "Investments", icon: Briefcase },
  { title: "Savings", icon: PiggyBank },
  { title: "Debt", icon: CreditCard },
  { title: "Donations", icon: Gift },
]

export default function MainSidebar() {
  const [openMenus, setOpenMenus] = useState<Record<number, boolean>>({})

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
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item, index) => (
                <SidebarMenuItem key={index} className="mb-6">
                  {item.items ? (
                    <>
                      <SidebarMenuButton
                        className="flex justify-between items-center w-full text-base font-medium text-gray-700 hover:text-gray-900 transition-all"
                        onClick={() => toggleMenu(index)}
                      >
                        <div className="flex gap-3 items-center">
                          <item.icon className="w-5 h-5 text-gray-600" />
                          <span>{item.title}</span>
                        </div>
                        <motion.div
                          animate={{ rotate: openMenus[index] ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {openMenus[index] ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                        </motion.div>
                      </SidebarMenuButton>

                      <motion.div
                        initial={false}
                        animate={{ height: openMenus[index] ? "auto" : 0, opacity: openMenus[index] ? 1 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <SidebarMenuSub className="pl-6 space-y-3 mt-2">
                          {item.items.map((subItem, subIndex) => (
                            <SidebarMenuSubItem key={subIndex}>
                              <a className="text-sm text-gray-600 hover:text-gray-800 transition-all" href={subItem.href}>
                                {subItem.title}
                              </a>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </motion.div>
                    </>
                  ) : (
                    <SidebarMenuButton className="flex gap-3 items-center text-base font-medium text-gray-700 hover:text-gray-900 transition-all">
                      <item.icon className="w-5 h-5 text-gray-600" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}