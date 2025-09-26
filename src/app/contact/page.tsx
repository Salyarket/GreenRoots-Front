const ContactPage = () => {
  return (
    <main className="min-h-screen mt-16 px-4 custom-size-minmax">
      {/* Section titre */}
      <section>
        <h1 className="text-xl md:text-2xl text-brand-darkgreen font-bold text-center">
          Contactez l'équipe greenroots
        </h1>
        <p className="mt-4 text-md md:text-xl text-brand-lightgreen font-bold  text-center">
          Une question sur nos plantations ? Notre équipe vous répond avec
          plaisir.
        </p>
      </section>

      {/* Section contact info */}
      <section className="flex flex-col md:flex-row justify-center space-x-4 md:space-x-10 mt-8">
        <div className="text-center p-4">
          <h3 className="font-semibold text-brand-darkgreen">Téléphone</h3>
          <p className="text-brand-green">+33 1 23 45 67 89</p>
          <p className="text-brand-lightgreen text-sm">Lun-Ven • 8h-19h</p>
        </div>

        <div className="text-center p-4">
          <h3 className="font-semibold text-brand-darkgreen">Email</h3>
          <p className="text-brand-green">contact@greenroots.fr</p>
          <p className="text-brand-lightgreen text-sm">Réponse sous 48h</p>
        </div>

        <div className="text-center p-4">
          <h3 className="font-semibold text-brand-darkgreen">Adresse</h3>
          <p className="text-brand-green">123 Allée des Chênes</p>
          <p className="text-brand-lightgreen text-sm">75000 Paris</p>
        </div>
      </section>

      {/* Section formulaire  */}
      <section className="mt-12 max-w-2xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold text-brand-darkgreen mb-2 text-center">
          Ou envoyez-nous un message
        </h2>
        <p className="text-brand-green text-center mb-6 md:mb-8 text-sm md:text-base">
          Remplissez le formulaire ci-dessous
        </p>

        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Votre nom"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none"
              required
            />
            <input
              type="text"
              placeholder="Votre prénom"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none"
              required
            />
          </div>

          <input
            type="email"
            placeholder="Votre adresse email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none"
            required
          />

          <textarea
            placeholder="Votre message..."
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none resize-vertical"
            required
          ></textarea>

          <button
            type="submit"
            className="w-full bg-brand-green text-white px-6 py-2 rounded-lg font-semibold hover:bg-brand-darkgreen cursor-pointer"
          >
            Envoyer mon message
          </button>
        </form>
      </section>

      {/* Footer */}
      <div className="text-center m-8">
        <p className="text-brand-green text-sm">
          Engagement écologique • 100% des profits reinvestis
        </p>
      </div>
    </main>
  );
};

export default ContactPage;
