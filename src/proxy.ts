import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

// clé secrète pour vérifier le token
const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function proxy(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;

  console.log("➡️ Middleware check sur :", req.nextUrl.pathname);

  // Pas d'accessToken → redirection
  if (!accessToken) {
    console.log("❌ Aucun accessToken, redirection vers /connexion");
    return NextResponse.redirect(new URL("/connexion", req.url));
  }

  try {
    // Vérification du JWT
    const { payload } = await jwtVerify(accessToken, secret);
    const role = payload.role;

    console.log("✅ Token valide, payload :", payload);

    // Protection des routes admin
    if (req.nextUrl.pathname.startsWith("/admin") && role !== "admin") {
      console.log("⛔ Accès refusé : admin uniquement");
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Redirection admin vers /admin
    if (req.nextUrl.pathname.startsWith("/profil") && role !== "member") {
      console.log("⛔ Accès refusé : membre uniquement");
      return NextResponse.redirect(new URL("/admin", req.url));
    }
  } catch (err) {
    console.log("❌ AccessToken invalide ou expiré :", err);
    return NextResponse.redirect(new URL("/", req.url));
  }

  console.log("✅ Accès autorisé");
  return NextResponse.next();
}

// Routes à protéger
export const config = {
  matcher: ["/profil/:path*", "/admin/:path*"],
};
