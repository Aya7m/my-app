"use client";
import { authClient } from "@/app/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import React, { use } from "react";
import { LuArrowBigLeft, LuPen } from "react-icons/lu";
import DeleteButton from "./DeleteButton";

interface BlogPageProps {
  blogPromis: Promise<{
    id: string;
    title: string;
    excerpt: string;
    content: string;
    slug: string;
    coverImageUrl: string;
    createdAt: string | Date;
    author: {
      id: string;
      name: string;
      image: string | null;
    };
  } | null>;
}
const SingleBlog = ({ blogPromis }: BlogPageProps) => {
  const blog = use(blogPromis);
  const { data: session } = authClient.useSession();
  const isAuthor = session?.user?.id === blog?.author.id;
  return (
    <div className="max-w-3xl mx-auto py-20 px-6">
      <header>
        <h1 className="text-2xl md:text-3xl lg:4xl leading-tight font-bold">
          {blog?.title}
        </h1>
        <div className="flex items-center gap-5 mb-5">
          <span className="text-sm text-primary">{blog?.author.name}</span>

          <p className="text-sm text-primary">
            {new Date(blog?.createdAt as string).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>

        <div className="relative w-full h-55 sm:h-80 lg:h-105 mb-12">
          <Image
            src={blog?.coverImageUrl}
            alt="image"
            className="object-cover rounded-2xl"
            fill
          />
        </div>

        <div>
          <p className="mb-6">{blog?.content}</p>
          <p className="mb-6">{blog?.excerpt}</p>
        </div>

        <div className="border-t border-secondary my-16" />

        <div className="flex justify-end items-center gap-3">
          {isAuthor && (
            <Link
              href={`/write/edit/${blog?.id}`}
              className="inline-flex items-center gap-3 px-3 py-1.5 text-sm font-medium border bg-text text-secondary rounded-full hover:bg-primary hover:text-white teansition-all duration-300"
            >
              <LuPen />
              Edit
            </Link>
          )}

          {isAuthor && blog?.id && <DeleteButton blogId={blog?.id as string} />}
        </div>

        <div>
          <Link href={"/blogs"} className="flex items-center gap-2">
            <LuArrowBigLeft size={20} /> Back To Blogs
          </Link>
        </div>
      </header>
    </div>
  );
};

export default SingleBlog;
