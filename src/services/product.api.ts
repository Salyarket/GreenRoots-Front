import { PaginatedResponse, Product } from "@/types/index.types";

// ramener getproduct + getproduct withpagination
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// get products with choice (number)
export async function getProductsPagination(
  limit: number,
  page: number = 1
): Promise<PaginatedResponse<Product>> {
  try {
    const res = await fetch(
      `${API_URL}/products/pagination?limit=${limit}&page=${page}`,
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
