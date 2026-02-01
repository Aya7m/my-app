import RecentlyHome from "@/components/home/RecentlyHome";
import Looding from "@/components/Looding";
import ContainerLayout from "@/layouts/ContainerLayout";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
  return (
    <ContainerLayout>
      <h1 className="text-center text-3xl md:text-4xl lg:text-5xl tracking-wide leading-snug lg:leading-tight">
        <span>
          Create Your{" "}
          <span className="bg-primary text-secondary px-3 rounded border">
            Blog
          </span>{" "}
        </span>
        <br />
        Discover Your Mood
      </h1>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div className=" hover:scale-105 transition-all duration-300">
          <Image src={"/1.jpg"} alt="Blog Image" width={400} height={300} />
        </div>
        <div className=" hover:scale-105 transition-all duration-300">
          <Image src={"/2.jpg"} alt="Blog Image" width={400} height={400} />
        </div>
        <div className=" hover:scale-105 transition-all duration-300">
          <Image src={"/3.jpg"} alt="Blog Image" width={400} height={400} />
        </div>
        <div className=" hover:scale-105 transition-all duration-300">
          <Image src={"/5.jpg"} alt="Blog Image" width={400} height={400} />
        </div>
      </div>

      <Link
        href={"/about"}
        className="mt-10 text-center flex items-center justify-center bg-text text-background px-4 py-2  w-[200px] mx-auto cursor-pointer border border-secondary rounded hover:bg-primary transition-all duration-300 ease-in-out"
      >
        Learn More
      </Link>

      <Suspense fallback={<Looding/>}>
        <RecentlyHome />
      </Suspense>
    </ContainerLayout>
  );
}
