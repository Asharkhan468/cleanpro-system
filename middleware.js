import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req) {
  const token = req.headers.get("authorization")?.split(" ")[1];

  if (!token) {
    return NextResponse.json(
      { message: "Access Denied" },
      { status: 401 }
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Admin Route Protection
    if (req.nextUrl.pathname.startsWith("/api/admin")) {
      if (decoded.role !== "admin") {
        return NextResponse.json(
          { message: "Admin Access Only" },
          { status: 403 }
        );
      }
    }

    return NextResponse.next();

  } catch (error) {
    return NextResponse.json(
      { message: "Invalid Token" },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: ["/api/admin/:path*", "/api/user/:path*"],
};