// URL de base du back (provenant de .env.local)
const API_URL = process.env.NEXT_API_BASE_URL || "http://localhost:4000";
// NEXT_API_BASE_URL=http://localhost:4000

// login
export async function authentification() {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "admin@admin.com", password: "password" }),
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

// get all products (arbres)
export async function getProducts() {
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
