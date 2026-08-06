import Link from "next/link";
import { ArrowRight, Play, Sparkles } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";

const AVATAR_COLORS = ["bg-chart-1", "bg-chart-2", "bg-chart-3", "bg-chart-4"];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />

      <div className="mx-auto flex max-w-4xl flex-col items-center px-4 py-24 text-center sm:px-6 sm:py-32 lg:px-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-xs font-medium text-secondary-foreground">
          <Sparkles className="size-3.5 text-primary" />
          All-in-One Productivity Workspace
        </span>

        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
          Think. Execute.
          <br />
          Remember.{" "}
          <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
            Share.
          </span>
        </h1>

        <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
          Actamind brings your tasks, habits, notes, and ideas together in one
          seamless workspace — so you can focus on what truly matters.
        </p>

        <div className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link href="/sign-up" className={buttonVariants({ size: "lg" })}>
            Start for Free
            <ArrowRight />
          </Link>
          <Button size="lg" variant="outline">
            Watch Demo
            <Play />
          </Button>
        </div>

        <div className="mt-12 flex flex-col items-center gap-3 sm:flex-row">
          <div className="flex -space-x-3">
            {AVATAR_COLORS.map((color, i) => (
              <span
                key={i}
                className={`size-8 rounded-full border-2 border-background ${color}`}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            Join 1,200+ creators and builders building better systems every
            day.
          </p>
        </div>
      </div>
    </section>
  );
}
