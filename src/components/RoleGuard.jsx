"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RoleGuard({ children, allowedRoles }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "loading") return;

        if (!session) {
            router.push("/login");
            return;
        }

        if (allowedRoles && !allowedRoles.includes(session.user.role)) {
            router.push("/unauthorized");
        }
    }, [session, status, allowedRoles, router]);

    if (status === "loading") {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-gray-600">Loading...</div>
            </div>
        );
    }

    if (!session || (allowedRoles && !allowedRoles.includes(session.user.role))) {
        return null;
    }

    return <>{children}</>;
}

export function AdminOnlySection({ children }) {
    return <RoleGuard allowedRoles={["admin"]}>{children}</RoleGuard>;
}

export function ManagerSection({ children }) {
    return <RoleGuard allowedRoles={["admin", "manager"]}>{children}</RoleGuard>;
}