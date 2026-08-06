export type PostStatus = "draft" | "published";

export type Post = {
  id: string;
  title: string;
  status: PostStatus;
  updatedAt: string;
};
