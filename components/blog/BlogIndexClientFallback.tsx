import BlogPostList from "@/components/blog/BlogPostList";
import type { PostMeta } from "@/lib/post-meta";

/** Static list shown while tag filter hydrates (search params). */
export default function BlogIndexClientFallback({
  posts,
}: {
  posts: PostMeta[];
}) {
  return <BlogPostList posts={posts} linked={false} />;
}
