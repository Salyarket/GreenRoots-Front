"use client"; // test API
import { useEffect, useState } from "react";
import { getHello } from "@/services/api"; // on importe la fonction pour tester l'API

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero/Hero";
import BestSellers from "@/components/Sections/BestSellers";
import { CounterSection } from "@/components/Sections/CounterSection";
import WhyUs from "@/components/Sections/WhyUs";

const Page = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    getHello()
      .then((data) => setMessage(data.message))
      .catch((err) => console.error("Erreur API: ", err));
  }, []);

  return (
    <div className="min-h-screen min-w-[360px] max-w-[1920px] m-auto">
      <Header backgroundTransparent={true} />
      <main>
        {/* main image + h1 */}
        <Hero />
        <WhyUs />
        <BestSellers />
        <CounterSection />

        {/* Bloc de test connexion au back */}
        <section className="p-4 bg-gray-100 mt-8 rounded">
          <h2 className="text-xl font-bold">Connexion API</h2>
          <p>Message du back : {message || "Chargement..."}</p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Page;
