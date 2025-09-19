"use client";

import Image from "next/image";
import Link from "next/link.js";
import { useState } from "react";

const Header = ({
  backgroundTransparent,
}: {
  backgroundTransparent: boolean;
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className={`w-full bg-brand-darkgreen  text-white p-4 flex justify-between items-center relative ${
        backgroundTransparent && "bg-transparent"
      } `}
    >
      <Link
        href={"/"}
        className="md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <Image
          src="/icon_menu.svg"
          alt="GreenRoots"
          width={30}
          height={30}
          priority
        />
      </Link>
      <Link href={"/"}>
        <Image
          src="/logo_white.svg"
          alt="GreenRoots"
          width={40}
          height={40}
          priority
        />
      </Link>
      {/* nav invisible en mode md + */}
      <nav className="space-x-4 flex  ">
        <div className="hidden md:flex space-x-4">
          <Link href="/catalogue" className={"hover:underline"}>
            Catalogue
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
          <Link href="/contact" className="hover:underline">
            À propos
          </Link>
        </div>
        <div className="space-x-4 flex">
          <Link href={"/profil"}>
            <Image
              src="/icon_profil.svg"
              alt="GreenRoots"
              width={20}
              height={20}
              priority
            />
          </Link>
          <Link href={"/profil"}>
            <Image
              src="/icon_cart.svg"
              alt="GreenRoots"
              width={20}
              height={20}
              priority
            />
          </Link>
        </div>
      </nav>

      {menuOpen && (
        <div className="absolute top-full left-0 h-screen w-full bg-brand-green text-white flex flex-col items-center justify-center space-y-8   md:hidden">
          <Link href="/catalogue" onClick={() => setMenuOpen(false)}>
            Catalogue
          </Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>
          <Link href="/apropos" onClick={() => setMenuOpen(false)}>
            À propos
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
