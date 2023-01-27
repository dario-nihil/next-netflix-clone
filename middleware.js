import { verifyToken } from "./lib/utils";

import { NextResponse } from "next/server";

export const middleware = async (req, ev) => {
  const token = req ? req.cookies.get("token")?.value : null;
  const userId = await verifyToken(token);
  const { pathname } = req.nextUrl;

  if (
    (token && userId) ||
    pathname.includes("/login") ||
    pathname.includes("/static")
  ) {
    return NextResponse.next();
  }

  if ((!token || !userId) && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }
};

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico).*)"],
};
