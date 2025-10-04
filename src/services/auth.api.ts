import { apiFetch } from "./api";

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

// fonction pour update l'user sur email / mdp
export async function updateUser(data: {
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}) {
  try {
    const res = await apiFetch("/users/me", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
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
