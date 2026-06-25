// proxy.ts
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth((req) => {
  if (!req.auth) {
    return NextResponse.redirect(
      new URL("/auth", req.url)
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/profile", "/reccs", "/create"],
};