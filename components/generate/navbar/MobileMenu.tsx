import React from "react";
import { navLinks } from "./Navbar";
import Link from "next/link";

interface MobileMenuProps {
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  menuOpen: boolean;
}
const MobileMenu = ({ menuOpen, setMenuOpen }: MobileMenuProps) => {
  return (
    <div className="md:hidden">
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${menuOpen ? "opacity-100" : "opacity-0"}`}
      >
        <ul
          className={`fixed top-18 right-0 z-50 h-[80vh] w-full flex flex-col items-center justify-center gap-10  bg-black/80 backdrop-blur-2xl border-t border-secondary/60 transition-transform duration-500 ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          {navLinks.map((nav) => {
            return (
              <li key={nav.url} className="text-secondary font-semibold">
                <Link href={nav.url} onClick={() => setMenuOpen(false)}>
                  {nav.lable}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default MobileMenu;
