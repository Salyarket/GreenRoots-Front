"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const links_url = [
    {
      id: 1,
      link: "catalogue",
      href: "/catalogue",
    },
    {
      id: 2,
      link: "se connecter",
      href: "/login",
    },
    {
      id: 3,
      link: "s'inscrire",
      href: "/register",
    },
    {
      id: 4,
      link: "contact",
      href: "/contact",
    },
    {
      id: 5,
      link: "à propos",
      href: "/a-propos",
    },
  ];

  return (
    <header
      className={`w-full bg-brand-darkgreen text-white p-4 flex justify-between items-center z-50 text-2xl custom-size-minmax relative`}
    >
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden custom-btn-hover"
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
          width={100}
          height={100}
          priority
          className="custom-btn-hover"
        />
      </Link>

      {/* nav invisible en mode md + */}
      <nav role="navigation" className="space-x-8 flex items-center   ">
        <div className="hidden md:flex space-x-8 text-xl">
          {links_url.map((el) => (
            <Link
              key={el.id}
              href={el.href}
              className={"capitalize custom-btn-hover"}
            >
              {el.link}
            </Link>
          ))}
        </div>
        <div className="space-x-8 flex">
          <Link href={"/profil"}>
            <Image
              src="/icon_profil.svg"
              alt="GreenRoots"
              width={20}
              height={20}
              className="custom-btn-hover"
            />
          </Link>
          <Link href={"/panier"}>
            <Image
              src="/icon_cart.svg"
              alt="GreenRoots"
              width={20}
              height={20}
              className="custom-btn-hover"
            />
          </Link>
        </div>
      </nav>

      {menuOpen && (
        <div className="absolute top-24 left-0 w-full  min-h-[50vh] bg-brand-white text-black flex flex-col  items-center justify-center space-y-8 text-2xl  md:hidden">
          {links_url.map((el) => (
            <Link
              key={el.id}
              href={el.href}
              onClick={() => setMenuOpen(false)}
              className={"capitalize custom-btn-hover "}
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
