import Image from "next/image";
import Link from "next/link.js";

const Header = () => {
  return (
    <header className="w-full bg-brand-green text-white p-4 flex justify-between items-center">
      <Link href={"/"} className="md:hidden">
        <Image
          src="/icon_menu.svg"
          alt="GreenRoots"
          width={40}
          height={40}
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
    </header>
  );
};

export default Header;
