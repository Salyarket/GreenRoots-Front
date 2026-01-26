"use client";

import { useEffect, useState } from "react";
import { COOKIE_EVENT, COOKIE_KEY } from "@/lib/cookies/cookie";

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

    useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) {
      setVisible(true);

      const handler = () => {
        setVisible(true);
      };
      window.addEventListener(COOKIE_EVENT, handler);
      return () => {
        window.removeEventListener(COOKIE_EVENT, handler);
      };
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setVisible(false);
  };

    const declineCookies = () => {
        localStorage.setItem(COOKIE_KEY, "declined");
        setVisible(false);
    };

    if (!visible) return null;
    return (
    <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg z-50">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <p className="mb-4 md:mb-0 text-center md:text-left">
          Nous utilisons des cookies pour améliorer votre expérience sur notre
          site. En continuant à naviguer, vous acceptez notre utilisation des
          cookies 🍪
        </p>
        <div className="flex gap-4">
          <button
            onClick={acceptCookies}
            className="bg-brand-brown text-black px-4 py-2 rounded hover:bg-[#f4c27d] text-blacktransition"
          >
            Accepter
          </button>
          <button
            onClick={declineCookies}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
          >
            Refuser
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;