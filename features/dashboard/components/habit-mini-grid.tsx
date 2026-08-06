import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const MOCK_HABITS = [
  { id: "1", name: "Morning pages", days: [true, true, false, true, true, true, false] },
  { id: "2", name: "No phone before 9am", days: [true, false, true, true, false, true, true] },
  { id: "3", name: "Read 20 minutes", days: [true, true, true, true, true, false, true] },
];

export function HabitMiniGrid() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Habits</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {MOCK_HABITS.map((habit) => (
          <div key={habit.id} className="flex items-center justify-between gap-3">
            <span className="text-sm">{habit.name}</span>
            <div className="flex gap-1">
              {habit.days.map((done, i) => (
                <span
                  key={i}
                  className={cn(
                    "size-2 rounded-full",
                    done ? "bg-primary" : "bg-muted"
                  )}
                />
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
