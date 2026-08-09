"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, PanelLeftClose, PanelLeftOpen, Settings, X } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { navItems } from "@/features/dashboard/config/nav-items";

export function AppSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open sidebar"
          className="fixed top-4 left-4 z-30 inline-flex size-9 items-center justify-center rounded-md border border-border/60 bg-background text-muted-foreground shadow-sm md:hidden"
        >
          <Menu className="size-4" />
        </button>
      )}

      {open && (
        <div
          onClick={() => setOpen(false)}
          aria-hidden="true"
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-60 shrink-0 flex-col overflow-hidden border-r border-border/60 bg-background transition-transform duration-200 md:static md:z-auto md:translate-x-0 md:bg-background/40 md:transition-[width]",
          open ? "translate-x-0" : "-translate-x-full",
          collapsed ? "md:w-16" : "md:w-60",
        )}
      >
        <div className="relative flex h-full min-h-0 flex-1 flex-col">
          <div
            className={cn(
              "relative flex h-16 items-center gap-2 px-4",
              collapsed && "md:gap-0 md:px-0",
            )}
          >
            <Image
              src="/images/actamind.png"
              alt="Actamind logo"
              width={26}
              height={26}
              className={cn("shrink-0 rounded-md", collapsed && "md:hidden")}
              priority
            />
            <span
              className={cn(
                "truncate text-base font-semibold tracking-tight",
                collapsed && "md:hidden",
              )}
            >
              Actamind
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close sidebar"
              className="ml-auto inline-flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:hidden"
            >
              <X className="size-4" />
            </button>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed((v) => !v)}
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              className={cn(
                "ml-auto hidden text-muted-foreground hover:text-foreground md:inline-flex",
                collapsed && "mx-auto",
              )}
            >
              {collapsed ? (
                <PanelLeftOpen className="4" />
              ) : (
                <PanelLeftClose className="4" />
              )}
            </Button>
          </div>

          <nav className="flex flex-1 flex-col gap-1 px-3 py-2">
            {navItems.map((item) => {
              const active = pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  title={collapsed ? item.label : undefined}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    collapsed && "md:justify-center md:px-0",
                    active
                      ? "bg-secondary text-secondary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <item.icon className="size-4 shrink-0" />
                  <span className={cn(collapsed && "md:hidden")}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div
            className={cn(
              "flex items-center gap-3 border-t border-border/60 px-4 py-4",
              collapsed && "md:justify-center md:px-0",
            )}
          >
            <Avatar>
              <AvatarFallback>J</AvatarFallback>
            </Avatar>
            <div
              className={cn(
                "flex min-w-0 flex-1 flex-col",
                collapsed && "md:hidden",
              )}
            >
              <span className="truncate text-sm font-medium">John</span>
              <span className="truncate text-xs text-muted-foreground">
                Free plan
              </span>
            </div>
            <button
              type="button"
              aria-label="Settings"
              className={cn(
                "inline-flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                collapsed && "md:hidden",
              )}
            >
              <Settings className="size-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
