const AProposPage = () => {
  const team = [
    { initials: "SH", firstName: "Saliha", lastName: "Harkat",  link: "https://github.com/Salyarket" },
    { initials: "OA", firstName: "Oumaïma", lastName: "Afakkir", link: "https://github.com/Oumaima-afk" },
    { initials: "AP", firstName: "Adrien", lastName: "Pâris", link: "https://github.com/AdrienParisDev" },
    { initials: "TM", firstName: "Tarig", lastName: "Mekazni", link: "https://github.com/" },
  ];

  const frontTech = [
    "React",
    "Next.js",
    "Tailwind CSS",
    "TypeScript",
    "Zod",
    "Zustand",
    "Leaflet",
  ];
  const backTech = [
    "Node.js",
    "Express",
    "TypeScript",
    "Prisma",
    "Zod",
    "Bcrypt",
    "JWT",
    "Multer",
    "Swagger",
    "EmailJS",
  ];

  const userFeatures = [
    "Compte & profil personnalisé",
    "Catalogue interactif des arbres",
    "Recherche et filtres avancés",
    "Panier & processus de commande",
    "Confirmation par email",
    "Historique des achats",
  ];

  const adminFeatures = [
    "Gestion complète des produits",
    "Dashboard administrateur",
    "Suivi des commandes utilisateurs",
    "Interface de gestion complète",
  ];

  return (
    <main className="min-h-screen mt-16 px-4 custom-size-minmax py-8">
      {/* Section */}
      <section className="text-center mb-16 max-w-4xl mx-auto mt-12">
        <div className="bg-avocado-100 rounded-3xl p-8 border border-brand-lightgreen/30 mb-8">
          <h1 className="text-xl md:text-2xl text-brand-darkgreen font-bold mb-4 ">
            À propos de GreenRoots
          </h1>
          <p className="text-lg md:text-l text-brand-green font-medium">
            GreenRoots est un projet pédagogique réalisé dans le cadre <br/>de notre
            formation de Concepteur Développeur d&apos;Applications chez O&apos;clock.
            <br/>Une aventure collaborative où la tech rencontre l&apos;écologie.
          </p>
        </div>
      </section>

      {/* Section équipe */}
      <section className="mb-16 max-w-4xl mx-auto">
        <h2 className="text-xl text-center md:text-2xl font-bold text-brand-darkgreen mb-4">
          Notre équipe
        </h2>
        <p className="text-brand-green text-lg text-center mb-4">
          Quatre passionné.e.s unis par l&apos;envie d&apos;apprendre et de créer ensemble.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-brand-white rounded-2xl p-4 text-center border border-brand-brown shadow-sm min-w-[140px] custom-card-hover"
            >
              <div className="w-16 h-16 bg-brand-brown rounded-full mx-auto mb-3 flex items-center justify-center text-brand-white font-bold text-xl">
                {member.link ? (
                  <a
                    href={member.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {member.initials}
                  </a>
                ) : (
                  member.initials
                )}
              </div>
              <p className="font-semibold text-brand-darkgreen">
                
                    {member.firstName}
                 
              </p>
              <p className="text-sm text-brand-brown">{member.lastName}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section projet */}
      <section className="mb-16 max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-brand-green to-brand-darkgreen rounded-3xl p-8 text-brand-white">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Notre mission</h2>
          <p className="text-lg leading-relaxed">
            GreenRoots est bien plus qu&apos;un projet scolaire : c&apos;est une
            plateforme
            <strong> éco-responsable</strong> qui simule une vraie expérience
            e-commerce dédiée à la reforestation.
          </p>
        </div>
      </section>

      {/* Section fonctionnalités */}
      <section className="mb-16 max-w-4xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold text-brand-darkgreen mb-8 text-center">
          Fonctionnalités phares
        </h2>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 bg-avocado-50 rounded-2xl p-6 border border-brand-lightgreen/20">
            <h3 className="font-semibold text-brand-darkgreen mb-3 flex items-center">
              <span className="w-6 h-6 bg-brand-green rounded-full text-brand-white text-sm flex items-center justify-center mr-3">
                1
              </span>
              Expérience Utilisateur
            </h3>
            <ul className="space-y-2 text-brand-green">
              {userFeatures.map((feature, index) => (
                <li key={index} className="flex items-center">
                  ✓ {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-1 bg-avocado-50 rounded-2xl p-6 border border-brand-lightgreen/20">
            <h3 className="font-semibold text-brand-darkgreen mb-3 flex items-center">
              <span className="w-6 h-6 bg-brand-green rounded-full text-brand-white text-sm flex items-center justify-center mr-3">
                2
              </span>
              Administration
            </h3>
            <ul className="space-y-2 text-brand-green">
              {adminFeatures.map((feature, index) => (
                <li key={index} className="flex items-center">
                  ✓ {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Section stack */}
      <section className="mb-16 max-w-4xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold text-brand-darkgreen mb-8 text-center">
          Notre stack technique
        </h2>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 bg-brand-white rounded-2xl p-6 border border-brand-lightgreen/30 shadow-sm">
            <h3 className="font-semibold text-brand-darkgreen text-lg mb-4 text-center">
              Frontend
            </h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {frontTech.map((tech, index) => (
                <span
                  key={index}
                  className="bg-brand-green text-brand-white px-4 py-2 rounded-full font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex-1 bg-brand-white rounded-2xl p-6 border border-brand-lightgreen/30 shadow-sm">
            <h3 className="font-semibold text-brand-darkgreen text-lg mb-4 text-center">
              Backend
            </h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {backTech.map((tech, index) => (
                <span
                  key={index}
                  className="bg-brand-darkgreen text-brand-white px-4 py-2 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <section className="max-w-4xl mx-auto mb-16">
        <div className="bg-avocado-100 rounded-3xl p-8 border border-brand-lightgreen/30 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-brand-darkgreen mb-4">
            Ce que nous avons appris
          </h2>
          <p className="text-lg text-brand-green">
            Au-delà du code, ce projet nous a enseigné l&apos;
            <strong>agilité</strong>, la <strong>collaboration</strong> et la{" "}
            <strong>gestion de projet</strong>. Une immersion totale dans le
            monde professionnel du développement web.
          </p>
        </div>
      </section>
    </main>
  );
};

export default AProposPage;
