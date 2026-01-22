export const dynamic = "force-dynamic";

import Hero from "@/components/Hero/Hero";
import BestSellers from "@/components/Sections/BestSellers";
import { CounterSection } from "@/components/Sections/CounterSection";
import WhyUs from "@/components/Sections/WhyUs";
import CookieBanner from "@/components/CookieBanner";

const Page = () => {
  return (
    <div className="min-h-screen custom-size-minmax">
      {/* main image + h1 */}
      {/* <RefreshAccesToken /> */}
      <Hero />
      {/* <TestSecureRoute /> */}
      <WhyUs />
      <BestSellers />
      <CounterSection />
      <CookieBanner />
    </div>
  );
};

export default Page;
