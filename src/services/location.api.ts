import { PaginatedResponse, ILocation } from "@/types/index.types";
import { apiFetch } from "./api";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Avori les localisations avec de la pagination
export async function fetchLocations(page: number, limit: number) {
    const res = await apiFetch(
        `/locations/pagination?page=${page}&limit=${limit}`,
        { method: "GET" }
    );

    if (!res.ok) {
        throw new Error("Erreur API");
    }

    const data: PaginatedResponse<ILocation> = await res.json();
    return data;
}
// router.get("/locations", checkRoles(["admin"]), locationController.getAll);


// get all orders from user (ADMIN ONLY VOIR BUTTON PAGE ACCUEIL TEST testSecureRoute.tsx : pour ADRIEN)
export async function getAllLocations() {
    const res = await apiFetch("/locations", { method: "GET" });

    if (!res.ok) {
        throw new Error(`Erreur API: ${res.status} ${res.statusText}`);
    }

    return res.json(); // devrait renvoyer les commandes de l'user
}


export async function createLocation(data: { name: string; latitude: number; longitude: number }) {
    try {
        const res = await apiFetch("/locations", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            credentials: "include",
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error(`Erreur API: ${res.status} ${res.statusText}`);
        }

        return res.json();
    } catch (error) {
        console.error("Erreur loggin", error);
        throw error;
    }
}

export async function createProductLocationLink(id: string, data: { product_id: number; }) {
    try {
        const res = await apiFetch(`/locations/${id}/products`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            credentials: "include",
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error(`Erreur API: ${res.status} ${res.statusText}`);
        }

        return res.json();
    } catch (error) {
        console.error("Erreur loggin", error);
        throw error;
    }
}

export async function deleteLocation(id: string) {
    const res = await apiFetch(`/locations/${id}`, { method: "DELETE" });

    if (!res.ok) {
        throw new Error(`Erreur API: ${res.status} ${res.statusText}`);
    }

    return res.json();
}

export async function deleteProductLocationLink(locationId: string, productId: number) {
    try {
        const res = await apiFetch(`/locations/${locationId}/products/${productId}`, {
            method: "DELETE",
            credentials: "include",
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error(`Erreur API: ${res.status} ${res.statusText}`);
        }

        return res.json();
    } catch (error) {
        console.error("Erreur lors de la suppression de la liaison produit-localisation ❌", error);
        throw error;
    }
}