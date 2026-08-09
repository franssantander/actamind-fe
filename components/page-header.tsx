"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Bell } from "lucide-react";
import { getPageTitle } from "@/features/dashboard/config/nav-items";
import { usePathname } from "next/navigation";

type PageHeaderProps = {
  description?: string;
  action?: React.ReactNode;
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
});

const timeFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

function HeaderClock() {
  const [now, setNow] = useState<Date>(() => new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(id);
  }, []);

  if (!mounted) {
    return <div className="hidden h-5 w-32 sm:block" />;
  }

  return (
    <div className="hidden items-center gap-2 text-sm text-muted-foreground sm:flex">
      <span>{dateFormatter.format(now)}</span>
      <span className="text-gray-400">·</span>
      <span className="tabular-nums text-foreground">
        {timeFormatter.format(now)}
      </span>
    </div>
  );
}

export function PageHeader({ description, action }: PageHeaderProps) {
  const pathname = usePathname();
  return (
    <div className="sticky top-0 bg-background flex flex-wrap items-center justify-between gap-x-4 gap-y-3 border-b border-border/60 py-4 pl-16 pr-4 sm:px-8 md:pl-8">
      <div className="flex min-w-0 flex-col">
        <h1 className="truncate text-xl font-semibold tracking-tight">
          {getPageTitle(pathname)}
        </h1>
        {description && (
          <p className="truncate text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      <div className="flex items-center gap-4">
        <HeaderClock />
        <Button size="sm" variant="outline">
          <Bell />
        </Button>
        {action}
      </div>
    </div>
  );
}
