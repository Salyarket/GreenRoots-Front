import Image from "next/image";
import { FaInstagram, FaLinkedin, FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; //twitter
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-brand-darkgreen text-white py-12 px-16">
      {/* Haut du footer en 3 colonnes */}
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
        {/* Colonne gauche : menu */}
        <div className="flex flex-col gap-2 text-center md:text-left">
          <Link href="/" className="custom-btn-hover">Accueil</Link>
          <Link href="/catalogue" className="custom-btn-hover">Catalogue</Link>
          <Link href="/a-propos" className="custom-btn-hover">À propos</Link>
          <Link href="/contact" className="custom-btn-hover">Contact</Link>
          <Link href="/connexion" className="custom-btn-hover">Se connecter</Link>
          <Link href="/inscription" className="custom-btn-hover">S’inscrire</Link>
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
            {/* <Link> sert avant tout au routing interne <a> est préféré si externe car pas de surcouche donc plus léger*/}
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="custom-btn-hover"
            >
              <FaInstagram />
            </a>
            <a
              href="https://x.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="custom-btn-hover"
            >
              <FaXTwitter />
            </a>
            <a
              href="https://www.linkedin.com/home"
              target="_blank"
              rel="noopener noreferrer"
              className="custom-btn-hover"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://fr-fr.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="custom-btn-hover"
            >
              <FaFacebook />
            </a>
          </div>
        </div>
      </div>

      {/* Pages légales en bas */}
      <div className="mt-8 text-center text-sm space-y-1">
        <Link href={"/mentions-legales"} 
        className="custom-btn-hover">Mentions légales -
        </Link>
        <Link href={"/termes-et-conditions"} 
        className="custom-btn-hover"> Termes et conditions
        </Link>
        <br />
        <Link href={"/utilisation-des-cookies"} 
        className="custom-btn-hover">Utilisation des cookies -
        </Link>
        <Link href={"/politique-de-confidentialite"} 
        className="custom-btn-hover"> Politique de confidentialité
        </Link>
        <p>Copyright © 2025 GreenRoots</p>
      </div>
    </footer>
  );
};

export default Footer;
