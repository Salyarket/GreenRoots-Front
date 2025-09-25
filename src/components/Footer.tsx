import Image from "next/image";
import { FaInstagram, FaLinkedin, FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-brand-darkgreen text-white py-12 px-16">
      {/* Haut du footer en 3 colonnes */}
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">

        {/* Colonne gauche : menu */}
        <div className="flex flex-col gap-2 text-center md:text-left">
          <p className="cursor-pointer">Accueil</p>
          <p className="cursor-pointer">Catalogue</p>
          <p className="cursor-pointer">À propos</p>
          <p className="cursor-pointer">Contact</p>
          <p className="cursor-pointer">Se connecter</p>
          <p className="cursor-pointer">S’inscrire</p>
        </div>

        {/* Colonne centre : logo + slogan */}
        <div className="flex flex-col items-center">
          <Image
            src="/logo_white.svg"
            alt="GreenRoots"
            width={100}
            height={100}
            priority
          />
          <span className="mt-2">{"Vert l'avenir"}</span>
        </div>

        {/* Colonne droite : les réseaux */}
        <div className="flex flex-col items-center md:items-end gap-2">
          <p className="font-semibold">NOUS SUIVRE</p>
          <div className="flex gap-4 text-2xl">
            <FaInstagram className="cursor-pointer" />
            <FaXTwitter className="cursor-pointer" />
            <FaLinkedin className="cursor-pointer" />
            <FaFacebook className="cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Pages légales en bas */}
      <div className="mt-8 text-center text-sm space-y-1">
        <p className="cursor-pointer">
          Mentions légales - Termes et conditions
        </p>
        <p className="cursor-pointer">
          Utilisation des cookies - Politique de confidentialité
        </p>
        <p>Copyright © 2025 GreenRoots</p>
      </div>
    </footer>
  );
};

export default Footer;
