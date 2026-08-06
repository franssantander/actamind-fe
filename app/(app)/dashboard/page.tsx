import { PageHeader } from "@/components/page-header";
import { HabitMiniGrid } from "@/features/dashboard/components/habit-mini-grid";
import { JournalQuickView } from "@/features/dashboard/components/journal-quick-view";
import { KanbanPreview } from "@/features/dashboard/components/kanban-preview";
import { PomodoroWidget } from "@/features/dashboard/components/pomodoro-widget";
import { QuickCapture } from "@/features/dashboard/components/quick-capture";

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        description="A quick look across your workspace."
      />
      <div className="flex flex-col gap-6 px-6 py-6 sm:px-8">
        <QuickCapture />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <KanbanPreview />
          <PomodoroWidget />
          <HabitMiniGrid />
          <JournalQuickView />
        </div>
      </div>
    </>
  );
}
