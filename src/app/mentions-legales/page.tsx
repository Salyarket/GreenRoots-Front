import WarningBox from "@/components/Sections/WarningBox";
import HrWithImage from "@/components/Sections/HrWithImage";
import { GiLindenLeaf, GiMonsteraLeaf, GiVineLeaf } from "react-icons/gi";
import { FaCanadianMapleLeaf } from "react-icons/fa6";

const Page = () => {
  return (
    <main className="min-h-screen mt-16 mb-16 px-4 min-w-[360px] max-w-[1200px] mx-auto">
      <h1 className="text-xl md:text-2xl text-brand-darkgreen uppercase font-bold text-center">
        Mentions légales
      </h1>

      <WarningBox message="Les mentions légales présentés ci-dessous sont une simulation pour un projet de fin de formation" />

      <section className="mt-10">
        {/* Bloc éditeur + hébergeur */}
        <div className="flex flex-col md:flex-row justify-around gap-10">
          <div>
            <h3 className="text-xl font-semibold mb-4 mt-8 text-brand-darkgreen">
              Éditeur du site
            </h3>
            <ul className="space-y-3 md:space-y-1">
              <li className="flex items-start md:items-center">
                <span
                  className="hidden md:inline-block h-4 w-4 mr-2 bg-no-repeat bg-center bg-contain"
                  style={{ backgroundImage: "url(/icons8-feuille-48.png)" }}
                />
                Nom / Dénomination sociale : GreenRoots SAS
              </li>
              <li>Forme juridique : SAS</li>
              <li>Capital social : 20 000 €</li>
              <li>Siège social : 123 Rue de l’Environnement, 75001 Paris</li>
              <li>Numéro SIREN / SIRET : 123 456 789 00012</li>
              <li>Numéro RCS (Ville d’immatriculation) : RCS Paris</li>
              <li>Numéro de TVA intracommunautaire : FR12 345678901</li>
              <li>E-mail de contact : contact@greenroots.fr</li>
              <li>Numéro de téléphone : +33 1 23 45 67 89</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 mt-8 text-brand-darkgreen">
              Hébergeur du site
            </h3>
            <ul className="space-y-2">
              <li>Nom de l’hébergeur : OVH Cocorico SAS</li>
              <li>
                Adresse de l’hébergeur : 2 rue Kellermann, 59100 Roubaix, France
              </li>
              <li>Téléphone de l’hébergeur : +33 9 72 10 10 07</li>
            </ul>
          </div>
        </div>

        <p className="text-center my-10">
          Responsable de publication : <b>Jean Dupont</b>
        </p>

        {/* Objet */}

        <div className="flex items-center justify-center my-8">
          {/* ligne gauche */}
          <div className="flex-1 h-[4px] mr-10 bg-brand-darkgreen rounded-full max-w-[120px]" />
          {/* icône */}
          <HrWithImage icon={GiLindenLeaf} />
          {/* ligne droite */}
          <div className="flex-1 h-[4px] ml-10 bg-brand-darkgreen rounded-full max-w-[120px]" />
        </div>
        <div className="text-center md:text-start">
          <h3 className="text-xl font-semibold mb-4 mt-8 text-brand-darkgreen">
            Objet du site / Activité
          </h3>
          <p>
            Ce site permet aux utilisateurs de financer la plantation d’arbres
            via l’achat virtuel d’arbres. Les arbres ne sont pas expédiés aux
            clients ; ils sont plantés par des pépiniéristes partenaires selon
            les modalités définies dans les Conditions Générales de Vente (CGV).
          </p>
        </div>

        {/* Propriété intellectuelle */}
        <div className="flex items-center justify-center my-8">
          {/* ligne gauche */}
          <div className="flex-1 h-[4px] mr-10 bg-brand-darkgreen rounded-full max-w-[120px]" />

          {/* icône */}
          <HrWithImage icon={GiVineLeaf} />

          {/* ligne droite */}
          <div className="flex-1 h-[4px] ml-10 bg-brand-darkgreen rounded-full max-w-[120px]" />
        </div>
        <div className="text-center md:text-start">
          <h3 className="text-xl font-semibold mb-4 mt-8 text-brand-darkgreen">
            Propriété intellectuelle
          </h3>
          <p className="mb-3">
            L’ensemble des contenus (textes, images, logos, vidéos, etc.)
            présents sur ce site est protégé par le droit d’auteur. Toute
            reproduction, représentation, modification, publication totale ou
            partielle, ou adaptation de ces contenus est strictement interdite
            sans autorisation expresse de l’éditeur.
          </p>
          <p>
            Les marques, logos et signes distinctifs figurant sur le site sont
            la propriété de leurs titulaires respectifs.
          </p>
        </div>

        {/* Responsabilité */}
        <div className="flex items-center justify-center my-8">
          {/* ligne gauche */}
          <div className="flex-1 h-[4px] mr-10 bg-brand-darkgreen rounded-full max-w-[120px]" />

          {/* icône */}
          <HrWithImage icon={GiMonsteraLeaf} />

          {/* ligne droite */}
          <div className="flex-1 h-[4px] ml-10 bg-brand-darkgreen rounded-full max-w-[120px]" />
        </div>
        <div className="text-center md:text-start">
          <h3 className="text-xl font-semibold mb-4 mt-8 text-brand-darkgreen">
            Responsabilité
          </h3>
          <p className="mb-3">
            L’éditeur s’efforce d’assurer l’exactitude des informations
            diffusées sur le site, mais ne peut garantir leur caractère complet,
            fiable ou à jour.
          </p>
          <p className="mb-3">
            L’éditeur n’assume pas la responsabilité des dommages directs ou
            indirects pouvant résulter de l’accès au site ou de l’impossibilité
            d’y accéder, ou de l’utilisation des informations diffusées.
          </p>
          <p>
            En ce qui concerne l’activité de plantation réalisée par les
            pépiniéristes, l’éditeur garantit que les prestataires respectent
            les bonnes pratiques agronomiques, mais n’assume pas la
            responsabilité pour des événements naturels (catastrophes, aléas
            climatiques) affectant la survie des arbres.
          </p>
        </div>

        {/* Données personnelles */}

        <div className="flex items-center justify-center my-8">
          {/* ligne gauche */}
          <div className="flex-1 h-[4px] mr-10 bg-brand-darkgreen rounded-full max-w-[120px]" />

          {/* icône */}
          <HrWithImage icon={FaCanadianMapleLeaf} />

          {/* ligne droite */}
          <div className="flex-1 h-[4px] ml-10 bg-brand-darkgreen rounded-full max-w-[120px]" />
        </div>
        <div className="text-center md:text-start">
          <h3 className="text-xl font-semibold mb-4 mt-8 text-brand-darkgreen">
            Données personnelles & vie privée
          </h3>
          <ul className="list-none space-y-2 text-center md:text-left">
            <li>Responsable du traitement : John Doe</li>
            <li>
              Finalités du traitement des données : gestion des commandes,
              facturation, communication avec les clients, envoi de newsletters
              (si applicable), statistiques et amélioration du site
            </li>
            <li>
              Données collectées : nom, prénom, adresse postale, adresse e-mail,
              téléphone, données de paiement
            </li>
            <li>
              Bases légales du traitement : exécution du contrat, consentement
              (ex : newsletter)
            </li>
            <li>
              Destinataires des données : services internes, prestataires
              (hébergeur, emailing, comptabilité), autorités légales le cas
              échéant
            </li>
            <li>Durée de conservation en conformité avec la RGPD</li>
            <li>
              Droits des personnes : accès, rectification, effacement,
              opposition, limitation, portabilité, réclamation auprès de la CNIL
            </li>
            <li>
              Modalités d’exercice : courrier ou e-mail à l’adresse de contact
              mentionnée ci-dessus
            </li>
          </ul>
        </div>

        {/* Cookies */}

        <div className="flex items-center justify-center my-8">
          {/* ligne gauche */}
          <div className="flex-1 h-[4px] mr-10 bg-brand-darkgreen rounded-full max-w-[120px]" />

          {/* icône */}
          <HrWithImage icon={GiLindenLeaf} />

          {/* ligne droite */}
          <div className="flex-1 h-[4px] ml-10 bg-brand-darkgreen rounded-full max-w-[120px]" />
        </div>
        <div className="text-center md:text-start">
          <h3 className="text-xl font-semibold mb-4 mt-8 text-brand-darkgreen">
            Cookies
          </h3>
          <p className="mb-3">
            Le site utilise des cookies ou traceurs pour assurer son bon
            fonctionnement (gestion de session, panier) et pour des finalités
            analytiques ou marketing.
          </p>
          <p>
            Un bandeau de consentement est présenté lors de la première visite
            pour recueillir l’accord de l’utilisateur. Celui-ci peut refuser ou
            retirer son consentement à tout moment via les paramètres du
            navigateur ou un outil dédié.
          </p>
        </div>

        {/* CGV */}
        <div className="flex items-center justify-center my-8">
          {/* ligne gauche */}
          <div className="flex-1 h-[4px] mr-10 bg-brand-darkgreen rounded-full max-w-[120px]" />
          {/* icône */}
          <HrWithImage icon={GiVineLeaf} />

          {/* ligne droite */}
          <div className="flex-1 h-[4px] ml-10 bg-brand-darkgreen rounded-full max-w-[120px]" />
        </div>
        <div className="text-center md:text-start">
          <h3 className="text-xl font-semibold mb-4 mt-8 text-brand-darkgreen">
            Conditions Générales de Vente (CGV)
          </h3>
          <ul className="list-disc pl-6 space-y-1 text-left">
            <li>Modalités de commande (achat virtuel de l’arbre)</li>
            <li>Prix et modalités de paiement</li>
            <li>Mécanisme de plantation (localisation, calendrier)</li>
            <li>
              Responsabilités en cas de non-plantation ou mortalité des arbres
            </li>
            <li>Droits de rétractation (le cas échéant)</li>
            <li>Garanties et limitations de responsabilité</li>
            <li>Modalités de règlement des litiges</li>
          </ul>
        </div>

        {/* Litiges */}
        <div className="flex items-center justify-center my-8">
          {/* ligne gauche */}
          <div className="flex-1 h-[4px] mr-10 bg-brand-darkgreen rounded-full max-w-[120px]" />
          {/* icône */}
          <HrWithImage icon={GiMonsteraLeaf} />

          {/* ligne droite */}
          <div className="flex-1 h-[4px] ml-10 bg-brand-darkgreen rounded-full max-w-[120px]" />
        </div>
        <div className="text-center md:text-start">
          <h3 className="text-xl font-semibold mb-4 mt-8 text-brand-darkgreen">
            Litiges
          </h3>
          <p>
            Tout litige relatif à l’interprétation ou l’exécution du contrat
            sera soumis au droit français. À défaut d’accord amiable, le litige
            sera porté devant les tribunaux compétents dans le ressort du siège
            social de l’éditeur ou, le cas échéant, devant la juridiction
            compétente selon la réglementation applicable aux consommateurs.
          </p>
        </div>

        {/* Mise à jour */}
        <div className="flex items-center justify-center my-8">
          {/* ligne gauche */}
          <div className="flex-1 h-[4px] mr-10 bg-brand-darkgreen rounded-full max-w-[120px]" />
          {/* icône */}
          <HrWithImage icon={FaCanadianMapleLeaf} />

          {/* ligne droite */}
          <div className="flex-1 h-[4px] ml-10 bg-brand-darkgreen rounded-full max-w-[120px]" />
        </div>
        <div className="text-center md:text-start">
          <h3 className="text-xl font-semibold mb-4 mt-8 text-brand-darkgreen">
            Mise à jour des mentions légales
          </h3>
          <p>
            Ces mentions légales peuvent être modifiées à tout moment pour
            respecter l’évolution législative ou réglementaire, ou pour adapter
            les informations. La date de la dernière mise à jour est indiquée en
            haut de cette page.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Page;
