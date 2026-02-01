import React from "react";

const Footer = () => {
  return (
    <div className="border-t mt-24 border-secondary">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-center gap-4">
        <p>&copy;{new Date().getFullYear()} Mead By Yooyo</p>
      </div>
    </div>
  );
};

export default Footer;
