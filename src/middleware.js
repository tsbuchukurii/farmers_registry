import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const pathname = req.nextUrl.pathname;

        const roleRouteMap = {
            "/admin": ["admin"],
            // "/dashboard": ["admin", "user", "manager"],
            "/manager": ["admin", "manager"]
        };

        for (const [route, allowedRoles] of Object.entries(roleRouteMap)) {
            if (pathname.startsWith(route)) {
                if (!token?.role || !allowedRoles.includes(token.role)) {
                    return NextResponse.redirect(new URL("/unauthorized", req.url));
                }
            }
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => {
                return !!token;
            }
        }
    }
);

export const config = {
    matcher: [
        // "/dashboard/:path*",
        "/admin/:path*",
        "/manager/:path*",
        "/profile/:path*"
    ]
};