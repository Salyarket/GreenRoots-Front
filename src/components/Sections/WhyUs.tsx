import SectionWithImage from "./SectionWithImage";

const WhyUs = () => {
  return (
    <div className="px-4">
      <SectionWithImage
        title="Pourquoi planter des arbres avec nous ?"
        text="Chez GreenRoots, chaque arbre que vous financez est bien plus qu’un simple geste symbolique : c’est une action concrète pour la planète et pour l’avenir. Nous travaillons main dans la main avec des pépiniéristes bio et des travailleurs qualifiés et certifiés afin de garantir des plantations durables et respectueuses de l’environnement. En contribuant à nos projets, vous participez directement à la reforestation, à la réduction du carbone dans l’atmosphère et à la restauration d’écosystèmes menacés. Nous mettons un point d’honneur à la transparence : chaque arbre est suivi et vous pouvez consulter son évolution. Au-delà de l’impact environnemental, votre contribution favorise aussi l’emploi local et inclusif, en donnant du travail à des personnes issues de tous horizons."
        image="/mini_tree_small.webp"
      />

      <SectionWithImage
        title="notre histoire, nos valeurs"
        text="GreenRoots est née d’une conviction simple : la lutte contre le changement climatique doit être accessible à toutes et à tous. Notre mission est de sensibiliser aux enjeux écologiques en rendant l’acte de planter un arbre aussi simple qu’un achat en ligne. Dès nos débuts, nous avons choisi de collaborer uniquement avec des pépiniéristes engagés dans l’agriculture biologique et des travailleurs certifiés, afin de garantir la qualité et la traçabilité de chaque plantation. Nous croyons en des valeurs fortes : transparence, équité, durabilité. Chaque projet est documenté et chaque arbre suivi, pour que vous puissiez voir concrètement votre impact. En rejoignant notre communauté, vous participez à un mouvement qui allie environnement, emploi local et responsabilité sociale — une action collective pour un avenir plus vert et solidaire."
        image="/baby_tree_small.webp"
        reverse // pour inverser l'image et le texte en écran large (meilleur rendu visuel)
      />
    </div>
  );
};

export default WhyUs;
