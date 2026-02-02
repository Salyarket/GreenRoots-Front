import AiFillAlert from "@/components/Sections/AlertBox";

const Page = () => {
  return (
    <main className="min-h-screen mt-16 mb-16 px-4 min-w-[360px] max-w-[1200px] mx-auto">
      <h1 className="text-xl md:text-2xl text-brand-darkgreen uppercase font-bold text-center">
        Conditions Générales & Politique de Confidentialité
      </h1>

      <AiFillAlert message="Les éléments présentés ci-dessous sont une simulation réalisée dans le cadre d’un projet de fin de formation." />

      <section className="mt-12 space-y-12">

        {/* CGV */}
        <div>
          <h2 className="text-xl font-semibold text-brand-darkgreen mb-4">
            Conditions Générales de Vente (CGV)
          </h2>

          <h3 className="font-semibold mt-10">Champ d’application</h3>
          <p>
            Les présentes Conditions Générales de Vente s’appliquent à toute
            commande passée sur le site GreenRoots dans le cadre de l’achat
            virtuel d’arbres.
          </p>

          <h3 className="font-semibold mt-10">Produits et services</h3>
          <p>
            Les produits proposés correspondent au financement de la plantation
            d’arbres. Aucun produit physique n’est expédié. La plantation est
            réalisée par des partenaires sélectionnés selon des critères
            environnementaux et éthiques.
          </p>

          <h3 className="font-semibold mt-10">Prix et paiement</h3>
          <p>
            Les prix sont indiqués en euros toutes taxes comprises. Le paiement
            est exigible immédiatement à la commande via les moyens de paiement
            sécurisés proposés sur le site.
          </p>

          <h3 className="font-semibold mt-10">Droit de rétractation</h3>
          <p>
            Conformément à la réglementation en vigueur, le droit de
            rétractation peut être exclu lorsque la prestation a commencé avec
            l’accord du client avant la fin du délai légal.
          </p>

          <h3 className="font-semibold mt-10">Responsabilité</h3>
          <p>
            GreenRoots s’engage à mettre en œuvre tous les moyens nécessaires à
            la bonne exécution de la prestation. Toutefois, la survie des arbres
            peut être affectée par des facteurs naturels indépendants de sa
            volonté.
          </p>
        </div>

        {/* RGPD */}
        <div>
          <h2 className="text-xl font-semibold text-brand-darkgreen mb-4">
            Politique de confidentialité (RGPD)
          </h2>

          <p>
            Le responsable du traitement des données personnelles est
            <strong> Monsieur Bobby Brown</strong>, pour la société GreenRoots.
          </p>

          <h3 className="font-semibold mt-6">Données collectées</h3>
          <p>
            Les données susceptibles d’être collectées sont : nom, prénom,
            adresse postale, adresse e-mail, numéro de téléphone et données de
            paiement via un prestataire sécurisé (Stripe).
          </p>

          <h3 className="font-semibold mt-10">Finalités du traitement</h3>
          <p>
            Les données sont utilisées pour la gestion des commandes, la
            facturation, la relation client, l’envoi de communications si
            consentement donné, ainsi que l’amélioration du service.
          </p>

          <h3 className="font-semibold mt-10">Base légale</h3>
          <p>
            Le traitement repose sur l’exécution du contrat, le consentement de
            l’utilisateur et les obligations légales applicables.
          </p>

          <h3 className="font-semibold mt-10">Droits des utilisateurs</h3>
          <p>
            Conformément au RGPD, l’utilisateur dispose d’un droit d’accès, de
            rectification, d’effacement (suppression), d’opposition, de
            portabilité et de limitation du traitement. L’utilisateur peut
            demander la suppression de ses données dans les limites légales.
            Ces droits peuvent être exercés par simple demande auprès de
            l’éditeur à contact@greenroots.fr.
          </p>
        </div>

        {/* Cookies */}
        <div>
          <h2 className="text-xl font-semibold text-brand-darkgreen mb-4">
            Cookies
          </h2>
          <p>
            Le site utilise des cookies nécessaires à son bon fonctionnement
            ainsi que, le cas échéant, des cookies analytiques ou marketing. Un
            bandeau de consentement permet à l’utilisateur de gérer ses
            préférences : les préférences sont modifiables via `Gérer mes cookies` en bas de page.
          </p>
        </div>

        {/* Litiges */}
        <div>
          <h2 className="text-xl font-semibold text-brand-darkgreen mb-4">
            Droit applicable et litiges
          </h2>
          <p>
            Les présentes conditions sont soumises au droit français. En cas de
            litige, une solution amiable sera recherchée avant toute action
            judiciaire.
          </p>
        </div>

        {/* Mise à jour */}
        <div>
          <h2 className="text-xl font-semibold text-brand-darkgreen mb-4">
            Mise à jour
          </h2>
          <p>
            Les présentes conditions peuvent être modifiées à tout moment afin
            de se conformer aux évolutions légales ou réglementaires.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Page;
