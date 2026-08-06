import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { JournalEntry } from "@/features/journal/types/entry";

const MOCK_ENTRIES: JournalEntry[] = [
  {
    id: "1",
    title: "Why linking beats collecting",
    excerpt:
      "Spent the morning thinking about why a pile of notes never feels as useful as notes that point at each other...",
    createdAt: "2026-07-30",
    tags: ["product", "notes"],
  },
  {
    id: "2",
    title: "Kanban column naming",
    excerpt:
      "Backlog / In Progress / Done is boring but boring is fine for v1. Resist the urge to add a fourth column.",
    createdAt: "2026-07-28",
    tags: ["kanban"],
  },
  {
    id: "3",
    title: "Morning pages",
    excerpt:
      "Free-writing for ten minutes before opening the laptop. Half of it is nonsense, but the other half is where ideas start.",
    createdAt: "2026-07-27",
    tags: ["journal", "habit"],
  },
];

export function JournalEntryList() {
  return (
    <div className="flex flex-col gap-3">
      {MOCK_ENTRIES.map((entry) => (
        <Card key={entry.id}>
          <div className="flex flex-col gap-2 px-(--card-spacing)">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-sm font-medium">{entry.title}</h3>
              <span className="shrink-0 text-xs text-muted-foreground">
                {new Date(entry.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{entry.excerpt}</p>
            {entry.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {entry.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}
