import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";
import { JournalEntryList } from "@/features/journal/components/journal-entry-list";

export default function JournalPage() {
  return (
    <>
      <PageHeader
        title="Journal"
        description="Your private entries, most recent first."
        action={
          <Button size="sm">
            <Plus />
            New Entry
          </Button>
        }
      />
      <div className="mx-auto w-full max-w-2xl px-6 py-6 sm:px-8">
        <JournalEntryList />
      </div>
    </>
  );
}
