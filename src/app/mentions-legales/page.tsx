import Link from "next/link";
import AiFillAlert from "@/components/Sections/AlertBox";

const Page = () => {
  return (
    <main className="min-h-screen mt-16 mb-16 px-4 min-w-[360px] max-w-[1200px] mx-auto">
      <h1 className="text-xl md:text-2xl text-brand-darkgreen uppercase font-bold text-center">
        Mentions légales
      </h1>

      <AiFillAlert message="Les éléments présentés ci-dessous sont une simulation réalisée dans le cadre d’un projet de fin de formation." />

      <section className="mt-10">
        {/* Bloc éditeur + hébergeur */}
        <div className="flex flex-col md:flex-row justify-around gap-10">
          <div>
            <h2 className="text-xl font-semibold mb-4 mt-8 text-brand-darkgreen">
              Éditeur du site
            </h2>
            <ul className="space-y-2">
              <li>
                <span className="font-semibold">Nom / Dénomination sociale :</span>{" "}
                GreenRoots SAS
              </li>
              <li>
                <span className="font-semibold">Forme juridique :</span> SAS
              </li>
              <li>
                <span className="font-semibold">Capital social :</span> 20 000 €
              </li>
              <li>
                <span className="font-semibold">Siège social :</span>{" "}
                123 Rue de l’Environnement, 75001 Paris, France
              </li>
              <li>
                <span className="font-semibold">SIREN / SIRET :</span>{" "}
                123 456 789 00012
              </li>
              <li>
                <span className="font-semibold">RCS :</span> Paris
              </li>
              <li>
                <span className="font-semibold">TVA intracommunautaire :</span>{" "}
                FR12 345678901
              </li>
              <li>
                <span className="font-semibold">E-mail :</span>{" "}
                contact@greenroots.fr
              </li>
              <li>
                <span className="font-semibold">Téléphone :</span>{" "}
                +33 1 42 43 17 12
              </li>
              <li>
                <span className="font-semibold">Responsable de la publication :</span>{" "}
                Mme Alice GLICE
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4 mt-8 text-brand-darkgreen">
              Hébergeur du site
            </h2>
            <ul className="space-y-2">
              <li>
                <span className="font-semibold">Nom :</span> OVH Cocorico SAS
              </li>
              <li>
                <span className="font-semibold">Adresse :</span> 2 rue Kellermann,
                59100 Roubaix, France
              </li>
              <li>
                <span className="font-semibold">Téléphone :</span> +33 9 72 10 10 07
              </li>
            </ul>
          </div>
        </div>

        {/* Objet */}
        <div className="text-center md:text-start">
          <h2 className="text-xl font-semibold mb-4 mt-18 text-brand-darkgreen">
            Objet du site / Activité
          </h2>
          <p>
            GreenRoots permet aux utilisateurs de financer la plantation d’arbres
            via l’achat virtuel. Aucun produit physique n’est expédié : les arbres
            sont plantés par des partenaires selon les modalités prévues dans les
            Conditions Générales de Vente.
          </p>
        </div>

        {/* Propriété intellectuelle */}
        <div className="text-center md:text-start">
          <h2 className="text-xl font-semibold mb-4 mt-18 text-brand-darkgreen">
            Propriété intellectuelle
          </h2>
          <p className="mb-3">
            L’ensemble des contenus présents sur ce site (textes, images, logos,
            illustrations, éléments graphiques, etc.) est protégé par le droit de
            la propriété intellectuelle.
          </p>
          <p>
            Toute reproduction, représentation, modification ou exploitation, totale
            ou partielle, sans autorisation préalable écrite, est strictement interdite.
          </p>
        </div>

        {/* Responsabilité */}
        <div className="text-center md:text-start">
          <h2 className="text-xl font-semibold mb-4 mt-18 text-brand-darkgreen">
            Responsabilité
          </h2>
          <p className="mb-3">
            L’éditeur s’efforce de fournir des informations exactes et à jour, sans
            toutefois garantir leur exhaustivité ou l’absence d’erreurs.
          </p>
          <p className="mb-3">
            L’éditeur ne saurait être tenu responsable des dommages directs ou indirects
            résultant notamment de l’accès au site, de son utilisation ou d’une
            interruption/dysfonctionnement.
          </p>
          <p>
            Concernant la plantation des arbres, celle-ci constitue une obligation de moyens et non de résultat.
            La survie des arbres peut dépendre de facteurs naturels (intempéries,
            maladies, aléas climatiques) indépendants de la volonté de l’éditeur.
          </p>
        </div>

        {/* Données personnelles (résumé + lien) */}
        <div className="text-center md:text-start">
          <h2 className="text-xl font-semibold mb-4 mt-18 text-brand-darkgreen">
            Données personnelles
          </h2>
          <p className="mb-3">
            GreenRoots peut collecter certaines données personnelles nécessaires à la
            gestion des commandes et à la relation client. Le responsable du traitement
            est <span className="font-semibold">Mr Gilles LEFAIT</span>.
          </p>
          <p>
            Pour plus d’informations (données collectées, finalités, bases légales,
            durée de conservation, droits RGPD), consultez notre page{" "}
            <Link
              href="/cgv"
              className="text-brand-darkgreen underline font-semibold"
            >
              Conditions générales & Politique de confidentialité
            </Link>
            .
          </p>
        </div>

        {/* Cookies (résumé) */}
        <div className="text-center md:text-start">
          <h2 className="text-xl font-semibold mb-4 mt-18 text-brand-darkgreen">
            Cookies
          </h2>
          <p className="mb-3">
            Le site utilise des cookies nécessaires à son bon fonctionnement (session,
            panier) ainsi que, le cas échéant, des cookies analytiques ou marketing.
          </p>
          <p>
            Un bandeau de consentement permet à l’utilisateur de gérer ses préférences
            lors de sa première visite. Les préférences peuvent ensuite être modifiées à tout moment via le lien `Gérer mes cookies` en bas de page.
          </p>
        </div>

        {/* Mise à jour */}
        <div className="text-center md:text-start">
          <h2 className="text-xl font-semibold mb-4 mt-18 text-brand-darkgreen">
            Mise à jour
          </h2>
          <p>
            Les présentes mentions légales peuvent être modifiées à tout moment afin
            de se conformer aux évolutions législatives, réglementaires ou techniques.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Page;
