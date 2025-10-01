// // middleware.ts
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(req: NextRequest) {
//   // console.log("Cookie accessToken =", req.cookies.get("accessToken"));
//   // const accessToken = req.cookies.get("accessToken")?.value;
//   // if (!accessToken) {
//   //   const refreshToken = req.cookies.get("refreshToken")?.value;
//   //   if (!refreshToken) {
//   //     return NextResponse.redirect(new URL("/a-propos", req.url));
//   //   }
//   // }
//   // return NextResponse.next();
// }

// // Ce middleware s'applique uniquement sur les routes protégées
// export const config = {
//   // matcher: ["/profil", "/profil/:path*"], // protège /profil et tout ce qui est en dessous
// };

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

// clé secrète pour vérifier le token
const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  console.log("Request URL:", req.nextUrl.pathname);
  console.log("AccessToken:", accessToken);
  console.log("RefreshToken:", refreshToken);

  if (!accessToken && !refreshToken) {
    console.log("Aucun token trouvé, redirection vers /a-propos");
    return NextResponse.redirect(new URL("/a-propos", req.url));
  }

  if (accessToken) {
    try {
      const { payload } = await jwtVerify(accessToken, secret);
      const role = payload.role;

      console.log("Payload décodé :", payload);
      console.log("Rôle :", role);

      if (req.nextUrl.pathname.startsWith("/admin") && role !== "admin") {
        console.log("Accès refusé pour les routes admin (admin uniquement)");
        return NextResponse.redirect(new URL("/contact", req.url));
      }

      if (req.nextUrl.pathname.startsWith("/profil") && role !== "member") {
        console.log("Accès refusé pour les routes profil (membre uniquement)");
        return NextResponse.redirect(new URL("/contact", req.url));
      }
    } catch (err) {
      console.log("Token invalide ou expiré :", err);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  console.log("Middleware : accès autorisé");
  return NextResponse.next();
}

// Routes à protéger
export const config = {
  matcher: ["/profil/:path*", "/admin/:path*"],
};
