import SectionWithImage from "./SectionWithImage";

const WhyUs = () => {
  return (
    <div className="px-4">
      <SectionWithImage
        title="Pourquoi planter des arbres avec nous ?"
        text="GreenRoots permet de financer la plantation de plants d’arbres... Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore architecto, provident obcaecati eveniet totam harum exercitationem. Commodi neque hic qui veritatis voluptatibus dolores ad recusandae blanditiis consequatur eum, aliquam, dolorum possimus fugiat sunt sint cumque facere exercitationem eveniet placeat, rerum nam! Asperiores labore odio aliquid maxime aperiam facere dolor reiciendis!"
        image="/mini_tree_large.webp"
      />
      <p></p>
      <SectionWithImage
        title="notre histoire, nos valeurs"
        text="Notre mission est de sensibiliser aux enjeux climatiques... Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore architecto, provident obcaecati eveniet totam harum exercitationem. Commodi neque hic qui veritatis voluptatibus dolores ad recusandae blanditiis consequatur eum, aliquam, dolorum possimus fugiat sunt sint cumque facere exercitationem eveniet placeat, rerum nam! Asperiores labore odio aliquid maxime aperiam facere dolor reiciendis!"
        image="/baby_tree_large.webp"
        reverse // pour inverser image et texte
      />
    </div>
  );
};

export default WhyUs;
