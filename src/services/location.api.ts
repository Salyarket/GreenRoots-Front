<<<<<<< HEAD
import { PaginatedResponse, Location } from "@/types/index.types";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// get 3 products landing page pagination
export async function getlocationsPagination(
    limitation: number
): Promise<PaginatedResponse<Location>> {
    try {
        const res = await fetch(
            `${API_URL}/localisations/pagination?limit=${limitation}`,
            {
                cache: "no-store",
            }
        );
        if (!res.ok) {
            throw new Error(`Erreur API: ${res.status} ${res.statusText}`);
        }
        return res.json();
    } catch (error) {
        console.error("Erreur API:", error);
        // si on throw new error et que le back est down, le site crash alors le mieux est de retourner un objet vide et gérer l'erreur dans le composant
        return {
            data: [],
            pagination_State: {
                total: 0,
                page: 1,
                limit: 3,
                totalPages: 0,
            },
        };
    }
}
=======
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
>>>>>>> dev
