import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative h-screen bg-cover flex justify-center items-center">
      <Image
        src="/landing_page_small.webp"
        alt="Hero for mobile screen"
        fill
        className="object-cover md:hidden" //dès que l'écran atteint le breakpoint md l'img apparait
      />
      <Image
        src="/landing_page_large.webp"
        alt="Hero for desktop screen"
        fill
        className="object-cover hidden md:block"
      />
      <header></header>
      <div className="absolute flex justify-center items-center px-5">
        <h1 className="text-white text-xl md:text-5xl font-bold uppercase max-w-full md:max-w-3xl">
          Plantez ou offrez un arbre et vivez son histoire.
        </h1>
      </div>
    </section>
  );
};

export default Hero;
