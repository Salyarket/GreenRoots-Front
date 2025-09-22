import Image from "next/image";

interface SectionWithImageProps {
  title: string;
  text: string;
  image: string;
  reverse?: boolean;
}

const SectionWithImage = ({
  title,
  text,
  image,
  reverse = false,
}: SectionWithImageProps) => {
  return (
    <section
      className={`flex flex-col md:flex-row items-center gap-4 my-8 p-8  bg-brand-white  ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="flex-1">
        <Image
          src={image}
          alt={title}
          height={400}
          width={600}
          className="rounded-xl object-cover w-full"
        />
      </div>
      <div className="flex-1 text-center px-4">
        <h3 className="text-2xl font-bold mb-4 uppercase text-brand-green underline underline-offset-5">
          {title}
        </h3>
        <p className="text-black 2xl:max-w-1/2 m-auto">{text}</p>
      </div>
    </section>
  );
};

export default SectionWithImage;
