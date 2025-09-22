import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative h-[80vh] max-h-[800px]  flex flex-col ">
      {/* la div de background avec les images différentes tailles */}
      <div className="absolute inset-0 -z-10 ">
        <Image
          src="/landing_page_large.webp"
          alt="Hero"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* puis le text centré */}
      <div className="flex flex-1 justify-center items-center px-5 text-center">
        <h1 className="text-white text-xl md:text-5xl font-bold uppercase md:max-w-3xl drop-shadow-2xl drop-shadow-black">
          Plantez ou offrez un arbre et vivez son histoire.
        </h1>
      </div>
    </section>
  );
};

export default Hero;
