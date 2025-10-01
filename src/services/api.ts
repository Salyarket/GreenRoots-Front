import { Order } from "@/store/AuthStore";
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

// get products with choice (number)
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

// refresh token mode manuel page accueil / profil
export async function refreshAccessToken() {
  try {
    const res = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include", // indispensable pour envoyer les cookies
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Erreur API: ${res.status} ${res.statusText}`);
    }

    return res.json(); // { accessToken, refreshToken }
  } catch (error) {
    console.error("Erreur refresh access token", error);
    throw error;
  }
}

// wrapper qui refresh le token automatiquement sur chaque appel
export async function apiFetch(
  input: string,
  options: RequestInit = {}
): Promise<Response> {
  const url = `${API_URL}${input}`;
  // localhost:4000/XXXXX
  // option post ou get

  // premier appel
  let res = await fetch(url, {
    ...options,
    credentials: "include",
    cache: "no-store",
  });

  // si accessToken expiré → 401
  if (res.status === 401) {
    console.warn("⏳ Token expiré, tentative de refresh…");

    // on tente un refresh
    const refreshRes = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include",
      cache: "no-store",
    });

    if (refreshRes.ok) {
      console.log("✅ Nouveau token reçu, retry de la requête");
      // on rejoue la requête d’origine
      res = await fetch(url, {
        ...options,
        credentials: "include",
        cache: "no-store",
      });
    } else {
      console.error("❌ Refresh échoué, redirection login");
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
      throw new Error("Session expirée, veuillez vous reconnecter.");
    }
  }

  return res;
}

// get all orders from user (using the wrapper)
export async function getMyOrders(token: string): Promise<{ orders: Order[] }> {
  const res = await apiFetch("/orders/me/orders", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Erreur API: ${res.status} ${res.statusText}`);
  }

  return res.json(); // renvoie { orders: [...] }
}
