"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Header = ({
  backgroundTransparent,
}: {
  backgroundTransparent: boolean;
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
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
      className={`w-full bg-brand-darkgreen text-white p-4 flex justify-between items-center z-50  ${
        backgroundTransparent ? "bg-transparent absolute" : "relative"
      } `}
    >
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden"
        aria-label="Toggle menu"
      >
        <Image
          src={menuOpen ? "/icon_menu_close.svg" : "/icon_menu_open.svg"}
          alt="Menu"
          width={30}
          height={30}
        />
      </button>

      <Link href={"/"}>
        <Image
          src="/logo_white.svg"
          alt="GreenRoots"
          width={40}
          height={40}
          priority
          className="hover:scale-125"
        />
      </Link>

      {/* nav invisible en mode md + */}
      <nav role="navigation" className="space-x-4 flex  ">
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
              className="hover:scale-125"
            />
          </Link>
          <Link href={"/profil"}>
            <Image
              src="/icon_cart.svg"
              alt="GreenRoots"
              width={20}
              height={20}
              className="hover:scale-125"
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
