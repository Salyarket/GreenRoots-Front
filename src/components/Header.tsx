"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import useAuthStore from "@/store/AuthStore";
import useCartStore from "@/store/CartStore";
import { CgProfile } from "react-icons/cg";
import { BsCart } from "react-icons/bs";
import { usePathname } from "next/navigation";
import { set } from "zod";

const Header = () => {
  const { user, logout } = useAuthStore();
  const items = useCartStore((state) => state.items);

  const [ isScrolled, setIsScrolled ] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const total = items.reduce(
    (acc, item) => acc + item.quantity,
    0 // le 0 à la fin est la valeur initiale de l'accumulateur (acc)
  );



  const [menuOpen, setMenuOpen] = useState(false);
  const links_url_loggedOut = [
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
    {
      id: 4,
      link: "connexion",
      href: "/connexion",
    },
    {
      id: 5,
      link: "inscription",
      href: "/inscription",
    },
  ];

  const links_url_loggedIn = [
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
    {
      id: 4,
      link: "déconnexion",
      href: "/",
    },
  ];


    const pathname = usePathname();

// Choisir la couleur selon la page
let headerBg = "bg-transparent";

if (isScrolled) {
  headerBg = "bg-brand-darkgreen";
} else if (pathname !== "/"){
  headerBg = "bg-brand-darkgreen";
}


  const focusRing =
    "focus-visible:outline-2 focus-visible:outline-brand-brown focus-visible:outline-offset-2";

  return (
    <header
      className={`fixed top-0 left-0 w-full p-4 flex justify-between items-center z-50 text-2xl custom-size-minmax transition-colors duration-500 ${headerBg} text-white`}

    >
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className={`md:hidden custom-btn-hover ${focusRing}`}
        aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={menuOpen}
        aria-controls="mobile-nav"
      >
        <Image
          src={menuOpen ? "/icon_menu_close.svg" : "/icon_menu_open.svg"}
          alt="Menu"
          width={30}
          height={30}
        />
      </button>

      <Link href={"/"} className={focusRing}>
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
          {user ? (
            <>
              {links_url_loggedIn.map((el) =>
                el.link === "déconnexion" ? (
                  <Link
                    key={el.id}
                    href={"/"}
                    onClick={logout}
                    className={`capitalize custom-btn-hover ${focusRing}`}
                  >
                    {el.link}
                  </Link>
                ) : (
                  <Link
                    key={el.id}
                    href={el.href}
                    className={`capitalize custom-btn-hover ${focusRing}`}
                  >
                    {el.link}
                  </Link>
                )
              )}
            </>
          ) : (
            <>
              {links_url_loggedOut.map((el) => (
                <Link
                  key={el.id}
                  href={el.href}
                  className={`capitalize custom-btn-hover ${focusRing}`}
                >
                  {el.link}
                </Link>
              ))}
            </>
          )}
        </div>
        <div className="space-x-8 flex">
          {user && (
            <Link href={"/profil"} aria-label="Profil" className={focusRing}>
              <CgProfile className="custom-btn-hover w-6 h-6" />
            </Link>
          )}
          <div className="relative">
            <Link href={"/panier"} aria-label="Panier" className={focusRing}>
              <BsCart className="custom-btn-hover w-6 h-6 mr-2" />
              {total > 0 && (
                <span className="absolute -top-4 -right-3.5 rounded-full w-6 h-6 bg-brand-brown text-brand-darkgreen text-sm font-extrabold flex items-center justify-center">
                  {total}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>

      {/* menu qui s'ouvre en mobile */}
      {menuOpen && (
        <div id="mobile-nav" className="absolute top-24 left-0 w-full  min-h-[50vh] bg-brand-white text-black flex flex-col  items-center justify-center space-y-8 text-2xl  md:hidden">
          {user ? (
            <>
              {links_url_loggedIn.map((el) =>
                el.link === "déconnexion" ? (
                  <button
                    key={el.id}
                    onClick={logout}
                    className={`capitalize custom-btn-hover ${focusRing}`}
                  >
                    {el.link}
                  </button>
                ) : (
                  <Link
                    key={el.id}
                    href={el.href}
                    className={`capitalize custom-btn-hover ${focusRing}`}
                  >
                    {el.link}
                  </Link>
                )
              )}
            </>
          ) : (
            <>
              {links_url_loggedOut.map((el) => (
                <Link
                  key={el.id}
                  href={el.href}
                  className={`capitalize custom-btn-hover ${focusRing}`}
                >
                  {el.link}
                </Link>
              ))}
            </>
          )}
        </div>
      )}
    </header>
    
  );
};
export default Header;
