import ContainerLayout from "@/layouts/ContainerLayout";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <ContainerLayout>
      <div className="text-center space-y-4  my-24 sm:px-12 px-4">
        <h1 className="text-2xl md:text-3xl lg:text-5xl">
          About{" "}
          <span className="text-background bg-text px-2 rounded">
            Your Blog
          </span>{" "}
        </h1>
        <p className="">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. <br /> Quasi
          labore quis molestias.
        </p>
      </div>

      <div className="p-5 bg-text backdrop-blur-2xl text-background rounded-2xl w-full">
        <p className="my-3 text-2xl">Why Your Blogs?</p>
        <ul className="space-y-3">
          <li className="flex items-center gap-2">
            {" "}
            . modern web technology and framework
          </li>

          <li className="flex items-center gap-2">
            {" "}
            . modern web technology and framework
          </li>

          <li className="flex items-center gap-2">
            {" "}
            . modern web technology and framework
          </li>
        </ul>
      </div>
<div className="flex items-center justify-center my-12">
     <Link href="/blogs" className="text-background bg-text px-4 py-1.5 rounded border border-secondary">Explore</Link>
</div>
     
    </ContainerLayout>
  );
};

export default page;
