import { ListFilter, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";
import { JournalEntryList } from "@/features/journal/components/journal-entry-list";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function JournalPage() {
  return (
    <>
      <PageHeader
        description="Your private entries, most recent first."
        action={
          <Button size="sm">
            <Plus />
            New Entry
          </Button>
        }
      />

      <div className="w-full px-6 py-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2.5fr] gap-4">
          <Card>
            <CardHeader className="w-full flex items-center justify-between">
              <CardTitle>
                Journal Entries <Badge className="ml-1" variant="secondary">42</Badge>
              </CardTitle>
              <CardAction>
                <Button size="icon" variant="outline">
                  <ListFilter />
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <JournalEntryList />
            </CardContent>
          </Card>
          <Card></Card>
        </div>
      </div>
    </>
  );
}
