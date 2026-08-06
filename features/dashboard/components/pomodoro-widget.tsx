import { Play } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PomodoroWidget() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Focus Timer</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <span className="text-4xl font-semibold tabular-nums">25:00</span>
        <Button size="sm">
          <Play />
          Start Focus
        </Button>
      </CardContent>
    </Card>
  );
}
