import Image from "next/image";
import { IoWarningOutline } from "react-icons/io5";
import  WarningBox from "@/components/Sections/WarningBox"

const Page = () => {

    return (
        <main className="min-h-screen mt-16 mb-16 px-4 custom-size-minmax">

            <h1 className="text-xl md:text-2xl text-brand-darkgreen uppercase font-bold text-center">
                Mentions légales
            </h1>

            <WarningBox message="Les mentions légales présentés ci-dessous sont une simulation pour un projet de fin de formation" />

            <section>
                <div className="flex flex-col">
                    <div className="flex justify-between">
                        <div className="px-40">
                            <h3 className="h3-style-page-rules">
                                Éditeur du site / Responsable de la publication
                            </h3>
                            <ul>
                                <li>Nom / Dénomination sociale : GreenRoots SAS</li>
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

                        <div className="px-40">
                            <h3 className="h3-style-page-rules">Hébergeur du site</h3>
                            <ul>
                                <li>Nom de l’hébergeur : OVH SAS</li>
                                <li>Adresse de l’hébergeur : 2 rue Kellermann, 59100 Roubaix, France</li>
                                <li>Téléphone de l’hébergeur : +33 9 72 10 10 07</li>
                            </ul>
                        </div>
                    </div>

                    <div>
                        <p className="text-center my-10">
                            Responsable de publication : <b>Jean Dupont</b> 
                        </p>
                    </div>
                </div>

                <div>
                    <h3 className="h3-style-page-rules">Objet du site / Activité</h3>
                    <p>
                        Ce site permet aux utilisateurs de financer la plantation d’arbres via l’achat
                        virtuel d’arbres. Les arbres ne sont pas expédiés aux clients ; ils sont plantés
                        par des pépiniéristes partenaires selon les modalités définies dans les Conditions
                        Générales de Vente (CGV).
                    </p>
                </div>

                <div>
                    <h3 className="h3-style-page-rules">Propriété intellectuelle</h3>
                    <p>
                        L’ensemble des contenus (textes, images, logos, vidéos, etc.) présents sur ce site est
                        protégé par le droit d’auteur. Toute reproduction, représentation, modification,
                        publication totale ou partielle, ou adaptation de ces contenus est strictement
                        interdite sans autorisation expresse de l’éditeur.
                    </p>
                    <p>
                        Les marques, logos et signes distinctifs figurant sur le site sont la propriété
                        de leurs titulaires respectifs.
                    </p>
                </div>

                <div>
                    <h3 className="h3-style-page-rules">Responsabilité</h3>
                    <p>
                        L’éditeur s’efforce d’assurer l’exactitude des informations diffusées sur le site,
                        mais ne peut garantir leur caractère complet, fiable ou à jour.
                    </p>
                    <p>
                        L’éditeur n’assume pas la responsabilité des dommages directs ou indirects pouvant
                        résulter de l’accès au site ou de l’impossibilité d’y accéder, ou de l’utilisation
                        des informations diffusées.
                    </p>
                    <p>
                        En ce qui concerne l’activité de plantation réalisée par les pépiniéristes,
                        l’éditeur garantit que les prestataires respectent les bonnes pratiques agronomiques,
                        mais n’assume pas la responsabilité pour des événements naturels (catastrophes,
                        aléas climatiques) affectant la survie des arbres.
                    </p>

                </div>

                <div>
                    <h3 className="h3-style-page-rules">Données personnelles & vie privée</h3>
                    <ul>
                        <li>Responsable du traitement : [Nom de l’entreprise ou du responsable]</li>
                        <li>
                            Finalités du traitement des données : gestion des commandes, facturation,
                            communication avec les clients, envoi de newsletters (si applicable),
                            statistiques et amélioration du site
                        </li>
                        <li>
                            Données collectées : nom, prénom, adresse postale, adresse e-mail, téléphone,
                            données de paiement (via prestataire)
                        </li>
                        <li>Bases légales du traitement : exécution du contrat, consentement (ex : newsletter)</li>
                        <li>
                            Destinataires des données : services internes, prestataires (hébergeur, emailing,
                            comptabilité), autorités légales le cas échéant
                        </li>
                        <li>Durée de conservation : [indiquer durée selon nature des données]</li>
                        <li>
                            Droits des personnes : accès, rectification, effacement, opposition, limitation,
                            portabilité, réclamation auprès de la CNIL
                        </li>
                        <li>
                            Modalités d’exercice : courrier ou e-mail à l’adresse de contact mentionnée ci-dessus
                        </li>
                        <li>Transferts hors UE éventuels : [indiquer le cas échéant]</li>
                    </ul>
                </div>

                <div>
                    <h3 className="h3-style-page-rules">Cookies / traceurs</h3>
                    <p>
                        Le site utilise des cookies ou traceurs pour assurer son bon fonctionnement
                        (gestion de session, panier) et pour des finalités analytiques ou marketing.
                    </p>
                    <p>
                        Un bandeau de consentement est présenté lors de la première visite pour recueillir
                        l’accord de l’utilisateur. Celui-ci peut refuser ou retirer son consentement à tout
                        moment via les paramètres du navigateur ou un outil dédié.
                    </p>

                    <h3 className="h3-style-page-rules">Conditions Générales de Vente (CGV)</h3>
                    <ul>
                        <li>Modalités de commande (achat virtuel de l’arbre)</li>
                        <li>Prix et modalités de paiement</li>
                        <li>Mécanisme de plantation (localisation, calendrier)</li>
                        <li>Responsabilités en cas de non-plantation ou mortalité des arbres</li>
                        <li>Droits de rétractation (le cas échéant)</li>
                        <li>Garanties et limitations de responsabilité</li>
                        <li>Modalités de règlement des litiges</li>
                    </ul>
                </div>

                <div>
                    <h3 className="h3-style-page-rules">Litiges</h3>
                    <p>
                        Tout litige relatif à l’interprétation ou l’exécution du contrat sera soumis au droit
                        français. À défaut d’accord amiable, le litige sera porté devant les tribunaux
                        compétents dans le ressort du siège social de l’éditeur ou, le cas échéant,
                        devant la juridiction compétente selon la réglementation applicable aux consommateurs.
                    </p>

                    <h3 className="h3-style-page-rules">Mise à jour des mentions légales</h3>
                    <p>
                        Ces mentions légales peuvent être modifiées à tout moment pour respecter l’évolution
                        législative ou réglementaire, ou pour adapter les informations. La date de la dernière
                        mise à jour est indiquée en haut de cette page.
                    </p>
                </div>

            </section>
        </main>
    );
};

export default Page;
