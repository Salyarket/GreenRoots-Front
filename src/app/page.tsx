import Header from "@/components/Header";
import Hero from "@/components/Hero/Hero";
import WhyUs from "@/components/Sections/WhyUs";

const page = () => {
  return (
    <div className="min-h-screen min-w-[360px] max-w-[1920px] m-auto">
      <Header backgroundTransparent={true} />
      <main>
        {/* main image + h1 */}
        <Hero />

        <WhyUs />
        {/* <ValuesSection />
        <BestSellers />
        <CounterSection /> */}
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default page;
