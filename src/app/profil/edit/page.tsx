import Link from "next/link";

const EditPage = () => {
  return (
    <main className="min-h-screen mt-16 mb-16 px-4 custom-size-minmax py-6 md:py-8">
      {/* Header */}
      <div className="text-center mb-6 md:mb-8">
        <Link
          href="/profil"
          className="inline-flex items-center text-brand-lightgreen hover:text-brand-darkgreen transition-colors mb-3 md:mb-4 text-xs md:text-sm font-medium"
        >
          ← Retour à mon compte
        </Link>
        <h1 className="text-lg md:text-2xl text-brand-darkgreen font-bold">
          Mettre à jour mon profil
        </h1>
        <p className="text-brand-green mt-1 md:mt-2 text-xs md:text-sm">
          Modifiez vos informations personnelles en toute sécurité
        </p>
      </div>

      <section className="max-w-2xl mx-auto">
        <form className="space-y-4 md:space-y-6">
          {/* Informations personnelles */}
          <div className="bg-brand-white rounded-xl md:rounded-2xl p-4 md:p-6 border border-brand-lightgreen/20">
            <h2 className="text-base md:text-lg font-semibold text-brand-darkgreen mb-3 md:mb-4 pb-2 md:pb-3 border-b border-brand-lightgreen/10">
              Informations personnelles
            </h2>

            <div className="space-y-3 md:space-y-4">
              <label
                htmlFor="firstname"
                className="block text-brand-darkgreen font-medium mb-1 md:mb-2 text-xs md:text-sm"
              >
                Prénom
              </label>
              <input
                id="firstname"
                type="text"
                className="w-full px-3 py-2 md:px-4 md:py-3 border border-brand-lightgreen/20 rounded-lg bg-white text-sm mb-3 md:mb-4 focus:outline-none focus:ring-1 focus:ring-brand-green"
                placeholder="Votre prénom"
              />

              <label
                htmlFor="lastname"
                className="block text-brand-darkgreen font-medium mb-1 md:mb-2 text-xs md:text-sm"
              >
                Nom
              </label>
              <input
                id="lastname"
                type="text"
                className="w-full px-3 py-2 md:px-4 md:py-3 border border-brand-lightgreen/20 rounded-lg bg-white text-sm focus:outline-none focus:ring-1 focus:ring-brand-green"
                placeholder="Votre nom"
              />
            </div>
          </div>

          {/* Sécurité */}
          <div className="bg-brand-white rounded-xl md:rounded-2xl p-4 md:p-6 border border-brand-lightgreen/20">
            <h2 className="text-base md:text-lg font-semibold text-brand-darkgreen mb-3 md:mb-4 pb-2 md:pb-3 border-b border-brand-lightgreen/10">
              Sécurité du compte
            </h2>

            <div className="space-y-3 md:space-y-4">
              <label
                htmlFor="email"
                className="block text-brand-darkgreen font-medium mb-1 md:mb-2 text-xs md:text-sm"
              >
                Nouvelle adresse e-mail
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-3 py-2 md:px-4 md:py-3 border border-brand-lightgreen/20 rounded-lg bg-white text-sm mb-3 md:mb-4 focus:outline-none focus:ring-1 focus:ring-brand-green"
                placeholder="Laissez vide pour ne pas modifier"
              />

              <label
                htmlFor="confirmEmail"
                className="block text-brand-darkgreen font-medium mb-1 md:mb-2 text-xs md:text-sm"
              >
                Confirmer l'adresse e-mail
              </label>
              <input
                id="confirmEmail"
                type="email"
                className="w-full px-3 py-2 md:px-4 md:py-3 border border-brand-lightgreen/20 rounded-lg bg-white text-sm mb-3 md:mb-4 focus:outline-none focus:ring-1 focus:ring-brand-green"
                placeholder="Confirmez votre e-mail"
              />

              <label
                htmlFor="newPassword"
                className="block text-brand-darkgreen font-medium mb-1 md:mb-2 text-xs md:text-sm"
              >
                Nouveau mot de passe
              </label>
              <input
                id="newPassword"
                type="password"
                className="w-full px-3 py-2 md:px-4 md:py-3 border border-brand-lightgreen/20 rounded-lg bg-white text-sm mb-3 md:mb-4 focus:outline-none focus:ring-1 focus:ring-brand-green"
                placeholder="Laissez vide pour ne pas modifier"
              />

              <label
                htmlFor="confirmPassword"
                className="block text-brand-darkgreen font-medium mb-1 md:mb-2 text-xs md:text-sm"
              >
                Confirmer le mot de passe
              </label>
              <input
                id="confirmPassword"
                type="password"
                className="w-full px-3 py-2 md:px-4 md:py-3 border border-brand-lightgreen/20 rounded-lg bg-white text-sm focus:outline-none focus:ring-1 focus:ring-brand-green"
                placeholder="Confirmez votre mot de passe"
              />
            </div>
          </div>

          {/* Boutons */}
          <div className="flex flex-col sm:flex-row gap-2 md:gap-3 pt-3 md:pt-4">
            <Link
              href="/profil"
              className="order-2 sm:order-1 text-center border border-brand-lightgreen/30 text-brand-darkgreen hover:bg-brand-lightgreen/5 font-semibold py-2 md:py-3 px-4 md:px-6 rounded-lg text-xs md:text-sm"
            >
              Annuler
            </Link>
            <button
              type="submit"
              className="order-1 sm:order-2 bg-brand-green hover:bg-brand-darkgreen text-white font-semibold py-2 md:py-3 px-4 md:px-6 rounded-lg text-xs md:text-sm"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default EditPage;
