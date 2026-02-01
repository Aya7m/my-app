"use server"
import prisma from "../lib/prisma";

export async function getBlog(slug: string) {
  if (!slug) {
    throw new Error("Slug Is Required");
  }
  const blog = await prisma.blog.findUnique({
    where: {slug},
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      coverImageUrl: true,
      createdAt:true,
      author: {
        select: {
          id: true,
          image: true,
          email: true,
        },
      },
    },
  });

  if (!blog) {
    return null;
  }

  return blog;
}
