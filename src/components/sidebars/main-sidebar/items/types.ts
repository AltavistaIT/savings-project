import { LucideIcon } from "lucide-react";

interface SubItem {
  title: string;
  href: string;
}

export interface MenuItem {
  title: string;
  icon?: LucideIcon;
  href: string;
  items?: SubItem[];
}
