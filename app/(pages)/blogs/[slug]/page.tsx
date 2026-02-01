import { getBlog } from "@/app/server-action/getBlog";
import SingleBlog from "@/components/blogPage/SingleBlog";
import SingleBlogSceleton from "@/components/SingleBlogSceleton";
import { Suspense } from "react";

const BlogPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params; // ✅ unwrap once
  const blogPromis = getBlog(slug);

  return (
    <Suspense fallback={<SingleBlogSceleton />}>
      <SingleBlog blogPromis={blogPromis} />
    </Suspense>
  );
};

export default BlogPage;
