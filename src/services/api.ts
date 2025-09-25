// // URL de base du back (provenant de .env.local)
// const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

// // Fonction pour GET
// export async function apiGet<T>(endpoint: string): Promise<T> {
//   const res = await fetch(`${API_URL}${endpoint}`);
//   if (!res.ok) {
//     throw new Error(`Erreur API GET ${endpoint}: ${res.status}`);
//   }
//   return res.json();
// }

// // Ajouter authorization dans les headers avec JWT bearer
// // Fonction pour POST
// export async function apiPost<T>(endpoint: string, body: object): Promise<T> {
//   const res = await fetch(`${API_URL}${endpoint}`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(body),
//   });
//   if (!res.ok) {
//     throw new Error(`Erreur API POST ${endpoint}: ${res.status}`);
//   }
//   return res.json();
// }

// // au lieu d’appeler directement apiGet("/api/hello") pour tester on l’encapsule dans une fonction dédiée
// export function getProducts() {
//   return apiGet<any[]>("/api/products");
// }
// export function loginUser(email: string, password: string) {
//   return apiPost<{ token: string }>("/api/login", { email, password });
// }
// export function getHello() {
//   return apiGet<{ message: string }>("/api/hello");
// }
