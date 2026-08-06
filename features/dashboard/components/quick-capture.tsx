import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function QuickCapture() {
  return (
    <Card>
      <CardContent className="flex items-center gap-3">
        <Input placeholder="Quickly capture a task or note..." />
        <Button size="sm" className="shrink-0">
          Capture
          <ArrowRight />
        </Button>
      </CardContent>
    </Card>
  );
}
