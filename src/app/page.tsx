import Hero from "@/components/Hero/Hero";

const page = () => {
  return (
    <div className="min-h-screen min-w-[360px]">
      <Hero />
      <div className="flex flex-col space-y-4 bg-yellow-100 h-screen"></div>
    </div>
  );
};

export default page;
