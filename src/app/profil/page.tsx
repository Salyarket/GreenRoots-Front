import Image from "next/image";
import Link from "next/link";

const ProfilPage = () => {
  return (
    <main className="min-h-screen mt-16 px-4 custom-size-minmax py-8">
      <h1 className="text-xl md:text-2xl text-brand-darkgreen font-bold text-center mb-6 md:mb-8">
        Bonjour, User
      </h1>

      <section className="flex flex-col gap-4 md:flex-row md:gap-6 justify-center max-w-4xl mx-auto">
        {/* Carte Profil */}
        <div className="flex-1 bg-brand-white rounded-xl md:rounded-2xl p-4 md:p-6 border border-brand-lightgreen/30 shadow-sm custom-card-hover text-center">
          <div className="bg-brand-lightgreen/10 rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-3 md:mb-4">
            <Image
              src="/icon_profil.svg"
              alt="Icône profil"
              width={20}
              height={20}
              className="w-5 h-5 md:w-6 md:h-6"
            />
          </div>
          <h2 className="text-base md:text-lg font-semibold text-brand-darkgreen mb-2">
            Mon profil
          </h2>
          <p className="text-brand-green text-xs md:text-sm mb-3 md:mb-4">
            Gérez vos informations personnelles
          </p>
          <Link
            href={"/profil/edit"}
            className="text-brand-lightgreen text-xs md:text-sm font-medium hover:text-brand-darkgreen transition-colors"
          >
            Modifier le profil ›
          </Link>
        </div>

        {/* Carte Commandes */}
        <div className="flex-1 bg-brand-white rounded-xl md:rounded-2xl p-4 md:p-6 border border-brand-lightgreen/30 shadow-sm custom-card-hover text-center">
          <div className="bg-brand-lightgreen/10 rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-3 md:mb-4">
            <Image
              src="/icon_cart.svg"
              alt="Icône commandes"
              width={20}
              height={20}
              className="w-5 h-5 md:w-6 md:h-6"
            />
          </div>
          <h2 className="text-base md:text-lg font-semibold text-brand-darkgreen mb-2">
            Mes commandes
          </h2>
          <p className="text-brand-green text-xs md:text-sm mb-3 md:mb-4">
            Suivez votre historique d'achat
          </p>
          <button className="text-brand-lightgreen text-xs md:text-sm font-medium hover:text-brand-darkgreen transition-colors">
            Voir mes commandes ›
          </button>
        </div>

        {/* Carte Messages */}
        <div className="flex-1 bg-brand-white rounded-xl md:rounded-2xl p-4 md:p-6 border border-brand-lightgreen/30 shadow-sm custom-card-hover text-center">
          <div className="bg-brand-lightgreen/10 rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-3 md:mb-4">
            <Image
              src="/icon_message.svg"
              alt="Icône messages"
              width={20}
              height={20}
              className="w-5 h-5 md:w-6 md:h-6"
            />
          </div>
          <h2 className="text-base md:text-lg font-semibold text-brand-darkgreen mb-2">
            Mes messages
          </h2>
          <p className="text-brand-green text-xs md:text-sm mb-3 md:mb-4">
            Échangez avec notre service client
          </p>
          <button className="text-brand-lightgreen text-xs md:text-sm font-medium hover:text-brand-darkgreen transition-colors">
            Contacter le support ›
          </button>
        </div>
      </section>
    </main>
  );
};

export default ProfilPage;
