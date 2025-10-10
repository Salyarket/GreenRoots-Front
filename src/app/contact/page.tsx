import { ContactForm } from "@/components/EmailJs";

const ContactPage = () => {
  return (
    <main className="min-h-screen mt-16 px-4 custom-size-minmax">
      {/* Section titre */}
      <section>
        <h1 className="text-xl md:text-2xl text-brand-darkgreen font-bold text-center">
          Contactez l&apos;équipe greenroots
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
      <ContactForm />

      {/* Footer */}
      <div className="text-center m-8">
        <p className="text-brand-green text-sm">
          Engagement écologique • 100% des profits réinvestis
        </p>
      </div>
    </main>
  );
};

export default ContactPage;
