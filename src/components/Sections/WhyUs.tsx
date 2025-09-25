import SectionWithImage from "./SectionWithImage";

const WhyUs = () => {
  return (
    <div className="px-4">
      <SectionWithImage
        title="Pourquoi planter des arbres avec nous ?"
        text="Chez GreenRoots, chaque arbre financé agit directement contre le réchauffement climatique : reforestation, stockage de carbone, restauration d’écosystèmes. En plus de l’impact environnemental, votre geste soutient l’emploi local et s’accompagne d’un suivi transparent de chaque plantation."
        image="/mini_tree_small.webp"
      />

      <SectionWithImage
        title="notre histoire, nos valeurs"
        text="GreenRoots est née d’une idée simple : rendre la lutte contre le changement climatique accessible à toutes et tous. Depuis nos débuts, nous plaçons la simplicité, l’équité et la durabilité au cœur de nos actions. Notre mission : sensibiliser, fédérer une communauté engagée et prouver qu’ensemble, de petits gestes créent un grand impact."
        image="/baby_tree_small.webp"
        reverse // pour inverser l'image et le texte en écran large (meilleur rendu visuel)
      />
    </div>
  );
};

export default WhyUs;
