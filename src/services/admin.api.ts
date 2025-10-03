import { IProduct, PaginatedResponse } from "@/types/index.types";
import { apiFetch } from "./api";

// admin (tous les produits, dispo ou pas)
export async function getProductsPaginationAdmin(
  limit: number,
  page: number = 1
): Promise<PaginatedResponse<IProduct>> {
  try {
    const res = await apiFetch(
      `/products/pagination/all?limit=${limit}&page=${page}`,
      {
        method: "GET",
      }
    );

    if (!res.ok) {
      throw new Error(`Erreur API: ${res.status} ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error("Erreur API:", error);
    return {
      data: [],
      pagination_State: { total: 0, page: 1, limit, totalPages: 0 },
    };
  }
}
