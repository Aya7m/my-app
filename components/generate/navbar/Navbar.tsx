"use client";

import React, { useState } from "react";
import Logo from "./Logo";
import Link from "next/link";
import { LuMenu, LuNotebookPen, LuSearch, LuX } from "react-icons/lu";
import MobileMenu from "./MobileMenu";
import { useModalState } from "@/store/useModalStore";
import { authClient } from "@/app/lib/auth-client";

export const navLinks = [
  { url: "/", lable: "Home" },
  { url: "/blogs", lable: "Blogs" },
  { url: "/about", lable: "About" },
];
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { openSignIn, openSearch } = useModalState();

  const { data: session, isPending } = authClient.useSession();
  console.log(session);

  const handleLogout = async () => {
    await authClient.signOut();
  }

  return (
    <nav className="h-18 fixed top-0 left-0 z-50 backdrop-blur-md backdrop-saturate-50 w-full p-4 shadow">
      <div className="flex items-center justify-between h-full max-w-7xl mx-auto">
        {/* logo */}
        <Logo />

        {/* navlinks */}

        <ul className="flex items-center gap-4 md:gap-8 text-gray-800 font-medium">
          <li
            onClick={openSearch}
            className="flex items-center gap-2 cursor-pointer"
          >
            <LuSearch size={25} />
            <span className="hidden md:block">Search</span>
          </li>

          {session && (
            <li className="flex items-center gap-2 cursor-pointer">
              <Link href={"/write"}>
                <LuNotebookPen size={25} />
              </Link>

              <span className="hidden md:block">Write</span>
            </li>
          )}

          {navLinks.map((navlink) => {
            return (
              <li
                key={navlink.url}
                className="hidden md:flex hover:text-secondary"
              >
                <Link href={navlink.url}>{navlink.lable}</Link>
              </li>
            );
          })}

          {!isPending && (
            <>
              {session ? (
                <li
                  onClick={handleLogout}
                  className="text-primary px-4 py-1.5 rounded border border-secondary cursor-pointer  hover:bg-secondary hover:text-white transition-all duration-300"
                >
                  Logout
                </li>
              ) : (
                <li
                  onClick={openSignIn}
                  className="text-primary px-4 py-1.5 rounded border border-secondary cursor-pointer  hover:bg-secondary hover:text-white transition-all duration-300"
                >
                  Login
                </li>
              )}
            </>
          )}
          <li className="md:hidden cursor-pointer z-80">
            {menuOpen ? (
              <LuX size={20} onClick={() => setMenuOpen(false)} />
            ) : (
              <LuMenu size={20} onClick={() => setMenuOpen(!menuOpen)} />
            )}
          </li>
        </ul>
      </div>

      <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </nav>
  );
};

export default Navbar;
