"use client";
import { Blog } from "@/app/generated/prisma/browser";
import Looding from "@/components/Looding";
import { useInfiniteBlogs } from "@/hooks/useBlog";
import ContainerLayout from "@/layouts/ContainerLayout";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiArrowFromLeft } from "react-icons/bi";

const Page = () => {
  const { data, fetchNextPage, hasNextPage, status, isFetchingNextPage } =
    useInfiniteBlogs({ limit: 3 });

  if (status === "pending") {
    return (
      <ContainerLayout>
       <Looding/>
      </ContainerLayout>
    );
  }

  if (status === "error") {
    return (
      <ContainerLayout>
        <p className="">Failing ...</p>
      </ContainerLayout>
    );
  }

  const Posts = data.pages.flatMap((page) => page.blogs) ?? [];
  return (
    <ContainerLayout>
      <h1 className="text-2xl md:text-3xl lg:text-4xl mt-20 mb-5">All Blogs</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {Posts.map((post) => {
          return (
            <div
              key={post.id}
              className="flex flex-col border bg-text/90 backdrop-blur-2xl text-background p-3 cursor-pointer"
            >
              {post.coverImageUrl && (
                <div className="space-y-2">
                  <Image
                    src={post.coverImageUrl}
                    alt={post.title}
                    width={400}
                    height={400}
                    className="h-60 object-cover hover:scale-105 transition-all duration-300 ease-in-out"
                  />

                  <p className="text-sm text-primary">
                    {new Date(post.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              )}

              <div className="mt-2">
                <p className="text-center text-secondary font-semibold text-2xl">
                  {post.title}
                </p>
                <p className="text-sm">{post.excerpt}</p>
                <Link
                  href={`/blogs/${post.slug}`}
                  className="flex items-center gap-2 text-sm text-primary group"
                >
                  Read More
                  <BiArrowFromLeft
                    size={20}
                    className="hover:translate-x-1 transition-all duration-300"
                  />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center mt-12">
        {hasNextPage && (
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="px-4 py-2 text-background bg-text rounded"
          >
            {isFetchingNextPage ? "Loading more..." : "Load More"}
          </button>
        )}
      </div>
    </ContainerLayout>
  );
};

export default Page;
