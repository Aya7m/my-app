import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <div>
      <Link
        href={"/"}
        className="text-primary font-medium text-2xl md:text-3xl lg:text-4xl"
      >
        Your <span className="text-secondary">Blog</span>
      </Link>
    </div>
  );
};

export default Logo;
