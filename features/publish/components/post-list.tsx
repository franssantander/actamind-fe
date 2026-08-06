import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Post } from "@/features/publish/types/post";

const MOCK_POSTS: Post[] = [
  {
    id: "1",
    title: "Why linking beats collecting",
    status: "published",
    updatedAt: "2026-07-30",
  },
  {
    id: "2",
    title: "Building a solo-first product",
    status: "draft",
    updatedAt: "2026-07-26",
  },
  {
    id: "3",
    title: "A week of morning pages",
    status: "draft",
    updatedAt: "2026-07-20",
  },
];

export function PostList() {
  return (
    <div className="flex flex-col gap-2">
      {MOCK_POSTS.map((post) => (
        <Card key={post.id} size="sm">
          <div className="flex items-center justify-between gap-4 px-(--card-spacing)">
            <div className="flex min-w-0 items-center gap-3">
              <span className="truncate text-sm font-medium">
                {post.title}
              </span>
              <Badge variant={post.status === "published" ? "default" : "outline"}>
                {post.status === "published" ? "Published" : "Draft"}
              </Badge>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <span className="text-xs text-muted-foreground">
                {new Date(post.updatedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
              <Button size="sm" variant="outline">
                Edit
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
