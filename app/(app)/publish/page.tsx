import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";
import { PostList } from "@/features/publish/components/post-list";

export default function PublishPage() {
  return (
    <>
      <PageHeader
        description="Draft and published posts."
        action={
          <Button size="sm">
            <Plus />
            New Post
          </Button>
        }
      />
      <div className="mx-auto w-full max-w-2xl px-6 py-6 sm:px-8">
        <PostList />
      </div>
    </>
  );
}
