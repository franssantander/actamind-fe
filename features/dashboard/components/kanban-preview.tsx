import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const COLUMNS = [
  { label: "Backlog", count: 4 },
  { label: "In Progress", count: 2 },
  { label: "Done", count: 6 },
];

export function KanbanPreview() {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Kanban</CardTitle>
        <Link
          href="/kanban"
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          View board
          <ArrowRight className="size-3" />
        </Link>
      </CardHeader>
      <CardContent className="grid grid-cols-3 gap-3">
        {COLUMNS.map((column) => (
          <div
            key={column.label}
            className="flex flex-col items-center gap-1 rounded-md bg-muted/50 py-3"
          >
            <span className="text-lg font-semibold">{column.count}</span>
            <span className="text-xs text-muted-foreground">
              {column.label}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
