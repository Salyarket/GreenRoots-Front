import { PaginatedResponse, Product } from "@/types/index.types";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// login
export async function login(data: { email: string; password: string }) {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
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

// register
export async function registerUser(data: {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
  user_type_id: number;
}) {
  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Erreur API: ${res.status} ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    console.error("Erreur register", error);
    throw error;
  }
}

// get all products (arbres)
export async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${API_URL}/products`, { cache: "no-store" });
    if (!res.ok) {
      throw new Error(`Erreur API: ${res.status} ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    console.error("Erreur API:", error);
    throw error; // avec le throw error, next va envoyer automatiquement la page error.tsx
  }
}

// get One product per id
export async function getOneProductWithLocation(id: number): Promise<Product> {
  try {
    const res = await fetch(`${API_URL}/products/with_location/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Erreur API: ${res.status} ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error("Erreur API:", error);
    throw error; // laisser throw pour que Next affiche error.tsx si ça bug
  }
}

// get 3 products landing page pagination
export async function getProductsPagination(
  limitation: number
): Promise<PaginatedResponse<Product>> {
  try {
    const res = await fetch(
      `${API_URL}/products/pagination?limit=${limitation}`,
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

// get 3 products landing page pagination
export async function getlocationsPagination(
  limitation: number
): Promise<PaginatedResponse<Product>> {
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

// PATCH user (member only)
export async function patchUserMember() {}
