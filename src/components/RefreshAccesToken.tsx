"use client";

import { useEffect } from "react";
import { refreshAccessToken } from "@/services/api";

export default function AuthRefresher() {
  useEffect(() => {
    const doRefresh = async () => {
      try {
        const tokens = await refreshAccessToken();
        console.log("✅ Token refresh au retour :", tokens);
      } catch (err) {
        console.error("❌ Erreur refresh token :", err);
      }
    };

    doRefresh();
  }, []);

  return null; // Ce composant n'affiche rien
}
