import { Blog } from "@/types/type";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiArrowFromLeft } from "react-icons/bi";

// export const Posts = [
//   {
//     id: 1,
//     title: "winter",
//     excerpt: "winter is a beatiful than summer",
//     date: "Sep 11,2025",
//     slug: "winter-is-beatful",
//     image: "/1.jpg",
//   },
//   {
//     id: 2,
//     title: "Reading",
//     excerpt: "Reading is a beatiful than summer",
//     date: "Sep 11,2025",
//     slug: "Reading-is-beatful",
//     image: "/2.jpg",
//   },
//   {
//     id: 3,
//     title: "Cat",
//     excerpt: "Cat is a beatiful than summer",
//     date: "Sep 11,2025",
//     slug: "Cat-is-beatful",
//     image: "/3.jpg",
//   },
//   {
//     id: 4,
//     title: "Drown",
//     excerpt: "Drown is a beatiful than summer",
//     date: "Sep 11,2025",
//     slug: "Drown-is-beatful",
//     image: "/5.jpg",
//   },
// ];
const RecentlyHome = async() => {
 
    const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/recent`,{cache:"no-store"});
    if(!res.ok){
        throw new Error("Failed to fetch recent blogs");
    }
    const {blogs}:{blogs:Blog[]}=await res.json();

  return (
    <div className="mt-10">
        <h1 className="my-5 text-2xl font-medium ">Recently Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {blogs.map((post) => {
          return (
            <div
              key={post.id}
              className="flex flex-col border bg-text/90 backdrop-blur-2xl text-background p-3 cursor-pointer"
            >
              <div className="space-y-2">
                <Image
                  src={post.coverImageUrl}
                  alt={post.title}
                  width={400}
                  height={400}
                  className="h-60 object-cover hover:scale-105 transition-all duration-300 ease-in-out"
                />
                <p className="text-sm text-primary">{new Date(post.createdAt).toLocaleDateString("en-GB",{
                    day:"2-digit",
                    month:"short",
                    year:"numeric"
                })}</p>
              </div>

              <div className="mt-2">
                <p className="text-center text-secondary font-semibold text-2xl">
                  {post.title}
                </p>
                <p className="text-sm">{post.excerpt}</p>
                <Link href={`/blogs/${post.slug}`} className="flex items-center gap-2 text-sm text-primary group">Read More
                <BiArrowFromLeft size={20} className="hover:translate-x-1 transition-all duration-300"/>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentlyHome;
