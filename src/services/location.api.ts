import { useEffect, useState } from "react";
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
