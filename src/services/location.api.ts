// router.get("/locations", checkRoles(["admin"]), locationController.getAll);

import { apiFetch } from "./api";

// get all orders from user (ADMIN ONLY VOIR BUTTON PAGE ACCUEIL TEST testSecureRoute.tsx : pour ADRIEN)
export async function getAllLocations() {
  const res = await apiFetch("/locations", { method: "GET" });

  if (!res.ok) {
    throw new Error(`Erreur API: ${res.status} ${res.statusText}`);
  }

  return res.json(); // devrait renvoyer les commandes de l'user
}
