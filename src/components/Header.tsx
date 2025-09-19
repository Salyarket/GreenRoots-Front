import Image from "next/image";
import Link from "next/link.js";

const Header = () => {
  return (
    <header className="w-full bg-brand-green text-white p-4 flex justify-between items-center">
      <Link href={"/"}>
        <Image
          src="/logo_white.svg"
          alt="GreenRoots"
          width={40}
          height={40}
          priority
        />
      </Link>
      <nav className="space-x-4">
        <Link href="/catalogue" className={""}>
          Catalogue
        </Link>
        <Link href="/contact" className="hover:underline">
          Contact
        </Link>
        <Link href="/contact" className="hover:underline">
          À propos
        </Link>
      </nav>
    </header>
  );
};

export default Header;
