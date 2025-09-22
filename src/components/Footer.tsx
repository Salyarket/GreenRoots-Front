import Image from "next/image";

const Footer = () => {
  return (
    <div className="bg-brand-darkgreen py-16 px-8 flex justify-center items-center text-white">
      <div className="text-center flex flex-col items-center gap-y-4 md:text-2xl">
        <Image
          src="/logo_white.svg"
          alt="GreenRoots"
          width={100}
          height={100}
          priority
        />
        <span className="pb-16">{"Vert l'avenir"}</span>

        <p>Mentions légales - Termes et conditions</p>
        <p>Utilisation des cookies - Politique de confidentialité</p>
        <p>Copyright © 2025 - GreenRoots</p>
      </div>
    </div>
  );
};

export default Footer;
