const AProposPage = () => {
  return (
    <main className="min-h-screen mt-16 px-4 custom-size-minmax">
      {/* Section titre */}
      <section className="text-center mb-12 max-w-4xl mx-auto">
        <h1 className="text-xl md:text-2xl text-brand-darkgreen font-bold">
          A propos de GreenRoots
        </h1>
        <p className="mt-4 text-md md:text-xl text-brand-lightgreen font-bold">
          GreenRoots est un projet scolaire réalisé dans le cadre de notre
          formation de Concepteur Développeur d’Applications chez O’clock. Il
          s’agit d’un travail d’équipe où nous avons appliqué nos compétences
          techniques et méthodologiques pour concevoir une application web
          complète.
        </p>
      </section>
      {/* Section équipe */}
      <section className="text-center mb-12 max-w-4xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold text-brand-darkgreen mb-2">
          Notre équipe
        </h2>
        <p className="text-brand-green mb-6 md:mb-8 text-sm md:text-base">
          Derrière GreenRoots se cache une équipe passionnée, réunie autour d’un
          objectif commun : apprendre à collaborer sur un projet concret en
          conditions proches du monde professionnel.
        </p>
        <ul>
          <li>Saliha Harkat</li>
          <li>Oumaïma Afakkir</li>
          <li>Adrien Paris</li>
          <li>Tarig Mekhazni</li>
        </ul>
      </section>

      {/* Section projet */}
      <section className="text-center mb-12 max-w-4xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold text-brand-darkgreen mb-2">
          Notre projet
        </h2>
        <p className="text-brand-green mb-6 md:mb-8 text-sm md:text-base">
          GreenRoots est une plateforme fictive conçue pour encourager des
          initiatives écologiques locales. Le projet nous a permis de mettre en
          pratique les notions de gestion de projet agile, de travail
          collaboratif avec GitHub, et d’intégration d’une stack technique
          moderne côté frontend et backend.
        </p>
      </section>

      {/* Section stack */}
      <section className="text-center mb-12 max-w-4xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold text-brand-darkgreen mb-2">
          Notre stack technique
        </h2>
        <div>
          <h3 className="font-semibold text-brand-darkgreen">Frontend</h3>
          <p>React</p>
          <p>Next.js</p>
          <p>Tailwind CSS</p>
        </div>
        <div>
          <h3 className="font-semibold text-brand-darkgreen">Backend</h3>
          <p>Node.js</p>
          <p>Express</p>
          <p>TypeScript</p>
          <p>Prisma</p>
          <p>Zod</p>
          <p>Bcrypt</p>
          <p>JWT</p>
          <p>Multer</p>
          <p>EmailJS</p>
        </div>
      </section>
      {/* Footer - conclusion */}
      <section className="text-center mb-12 max-w-4xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold text-brand-darkgreen mb-2">
          Conclusion
        </h2>
        <p className="text-brand-green mb-6 md:mb-8 text-sm md:text-base">
          Ce projet nous a permis de consolider nos compétences techniques, de
          renforcer notre expérience en travail d’équipe et de vivre une
          première immersion dans le développement d’une application complète de
          A à Z.
        </p>
      </section>
    </main>
  );
};

export default AProposPage;
