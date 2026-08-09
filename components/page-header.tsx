"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Bell } from "lucide-react";

type PageHeaderProps = {
  title: string;
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

  useEffect(() => {
    const id = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(id);
  }, []);

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

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3 border-b border-border/60 py-4 pl-16 pr-4 sm:px-8 sm:py-5 md:pl-8">
      <div className="flex min-w-0 flex-col gap-1">
        <h1 className="truncate text-xl font-semibold tracking-tight">
          {title}
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
