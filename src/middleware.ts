// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // console.log("Cookie accessToken =", req.cookies.get("accessToken"));
  // const accessToken = req.cookies.get("accessToken")?.value;
  // if (!accessToken) {
  //   const refreshToken = req.cookies.get("refreshToken")?.value;
  //   if (!refreshToken) {
  //     return NextResponse.redirect(new URL("/a-propos", req.url));
  //   }
  // }
  // return NextResponse.next();
}

// Ce middleware s'applique uniquement sur les routes protégées
export const config = {
  // matcher: ["/profil", "/profil/:path*"], // protège /profil et tout ce qui est en dessous
};
