"use client";

import Image from "next/image";
import Link from "next/link.js";
import { useState } from "react";

const Header = ({
  backgroundTransparent,
}: {
  backgroundTransparent: boolean;
}) => {
  const [menuOpen, setMenuOpen] = useState(true);
  const links_url = [
    {
      id: 1,
      link: "catalogue",
      href: "/catalogue",
    },
    {
      id: 2,
      link: "contact",
      href: "/contact",
    },
    {
      id: 3,
      link: "à propos",
      href: "/a-propos",
    },
  ];

  return (
    <header
      className={`w-full bg-brand-darkgreen text-white p-4 flex justify-between items-center relative  ${
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
          {links_url.map((el) => (
            <Link
              key={el.id}
              href={el.href}
              className={"capitalize hover:scale-125"}
            >
              {el.link}
            </Link>
          ))}
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
        <div className="absolute top-full left-0 w-full h-[92vh] bg-brand-green text-white flex flex-col  items-center justify-center space-y-8 text-2xl  md:hidden">
          {links_url.map((el) => (
            <Link
              key={el.id}
              href={el.href}
              onClick={() => setMenuOpen(false)}
              className={"capitalize hover:scale-125 "}
            >
              {el.link}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
