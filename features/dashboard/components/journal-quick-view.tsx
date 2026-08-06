import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RECENT_ENTRIES = [
  { id: "1", title: "Why linking beats collecting" },
  { id: "2", title: "Kanban column naming" },
];

export function JournalQuickView() {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Journal</CardTitle>
        <Link
          href="/journal"
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          View all
          <ArrowRight className="size-3" />
        </Link>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {RECENT_ENTRIES.map((entry) => (
          <p key={entry.id} className="text-sm font-medium">
            {entry.title}
          </p>
        ))}
      </CardContent>
    </Card>
  );
}
