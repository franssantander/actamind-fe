import {
  KanbanSquare,
  LayoutDashboard,
  NotebookPen,
  Rss,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export const navItems: NavItem[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/kanban",
    label: "Kanban",
    icon: KanbanSquare,
  },
  {
    href: "/journal",
    label: "Journal",
    icon: NotebookPen,
  },
  {
    href: "/publish",
    label: "Publish",
    icon: Rss,
  },
];

export function isNavItemActive(pathname: string, href: string): boolean {
  if (href === "/dashboard") {
    return pathname === href;
  }
  return pathname.startsWith(href);
}

export function getPageTitle(pathname: string): string {
  const match = navItems.find((item) => isNavItemActive(pathname, item.href));
  return match?.label ?? "Dashboard";
}
