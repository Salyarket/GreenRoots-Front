const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

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
    console.error("Erreur d'actualisation du token", error);
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

  // si accessToken expiré => 401
  if (res.status === 401) {
    console.warn("⏳ Token expiré, tentative de d'actualisation.");

    // on tente un refresh
    const refreshRes = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include",
      cache: "no-store",
    });

    if (refreshRes.ok) {
      console.log("✅ Nouveau token reçu, nouvelle tentative de la requête.");
      // on rejoue la requête d’origine
      res = await fetch(url, {
        ...options,
        credentials: "include",
        cache: "no-store",
      });
    } else {
      console.error("❌ Refresh échoué, redirection login");
      if (typeof window !== "undefined") {
        window.location.href = "/connexion";
      }
      throw new Error("Session expirée, veuillez vous reconnecter.");
    }
  }

  return res;
}
