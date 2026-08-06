import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";
import { KanbanBoard } from "@/features/kanban/components/kanban-board";

export default function KanbanPage() {
  return (
    <>
      <PageHeader
        title="Kanban"
        description="Backlog, in progress, and done."
        action={
          <Button size="sm">
            <Plus />
            New Task
          </Button>
        }
      />
      <div className="px-6 py-6 sm:px-8">
        <KanbanBoard />
      </div>
    </>
  );
}
