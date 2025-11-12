import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function ProtectedLayout({ children }) {
    const session = await getAuthSession();

    // This is redundant with middleware but provides extra security
    if (!session?.user) {
        redirect("/login");
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex space-x-8">
                            <Link
                                href="/dashboard"
                                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-transparent hover:border-gray-300"
                            >
                                Dashboard
                            </Link>

                            <Link
                                href="/profile"
                                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-transparent hover:border-gray-300"
                            >
                                Profile
                            </Link>

                            {["admin", "manager"].includes(session.user.role) && (
                                <Link
                                    href="/manager"
                                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-transparent hover:border-gray-300"
                                >
                                    Manager
                                </Link>
                            )}

                            {session.user.role === "admin" && (
                                <Link
                                    href="/admin"
                                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-transparent hover:border-gray-300"
                                >
                                    Admin
                                </Link>
                            )}
                        </div>

                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-700">{session.user.email}</span>
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                {session.user.role}
              </span>
                            <form action="/api/auth/signout" method="post">
                                <button
                                    type="submit"
                                    className="text-sm text-gray-700 hover:text-gray-900"
                                >
                                    Sign out
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </nav>

            {children}
        </div>
    );
}