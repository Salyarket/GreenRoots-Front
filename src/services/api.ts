import { PaginatedResponse, Product } from "@/types/index.types";

const API_URL = process.env.NEXT_API_BASE_URL || "http://localhost:4000";

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

// get 3 products landing page pagination
export async function getProductsPagination(): Promise<
  PaginatedResponse<Product>
> {
  try {
    const res = await fetch(`${API_URL}/products/pagination?limit=3`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`Erreur API: ${res.status} ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    console.error("Erreur API:", error);
    throw error; // avec le throw error, next va envoyer automatiquement la page error.tsx
  }
}
