import { NextResponse } from "next/server";
import { parse } from "cookie";

export function middleware(req) {
  const cookieHeader = req.headers.get("adminToken") || "";
  const cookies = parse(cookieHeader);

  const token = cookies.token;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};