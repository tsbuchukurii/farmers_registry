// src/app/(protected)/dashboard/page.js
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { createServerAxios } from "@/lib/axios";
import Link from "next/link";

// This is a Server Component by default in App Router
export const metadata = {
    title: "Dashboard",
    description: "User dashboard"
};

// Fetch data on the server
async function getUserData(accessToken) {
    try {
        const axios = createServerAxios(accessToken);
        const response = await axios.get("/users/me");
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
}

async function getDashboardStats(accessToken) {
    try {
        const axios = createServerAxios(accessToken);
        const response = await axios.get("/dashboard/stats");
        return response.data;
    } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        return null;
    }
}

export default async function DashboardPage() {
    // Get session on server
    const session = await getAuthSession();

    // This shouldn't happen due to middleware, but good to double-check
    if (!session?.user) {
        redirect("/login");
    }

    // Fetch data on server using access token
    const [userData, dashboardStats] = await Promise.all([
        getUserData(session.accessToken),
        getDashboardStats(session.accessToken)
    ]);

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-xl font-semibold">Dashboard</h1>
                        </div>
                        <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                {session.user.email}
              </span>
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

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Welcome back, {userData?.name || session.user.name}!
                        </h2>
                        <p className="mt-1 text-sm text-gray-600">
                            Here's what's happening with your account today.
                        </p>
                    </div>

                    {/* Role-based navigation */}
                    <div className="mb-8 flex space-x-4">
                        {["admin", "manager", "user"].includes(session.user.role) && (
                            <Link
                                href="/profile"
                                className="px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                            >
                                Profile
                            </Link>
                        )}
                        {["admin", "manager"].includes(session.user.role) && (
                            <Link
                                href="/manager"
                                className="px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                            >
                                Manager Panel
                            </Link>
                        )}
                        {session.user.role === "admin" && (
                            <Link
                                href="/admin"
                                className="px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                            >
                                Admin Panel
                            </Link>
                        )}
                    </div>

                    {/* Dashboard Stats */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {dashboardStats?.totalUsers && (
                            <div className="bg-white overflow-hidden shadow rounded-lg">
                                <div className="p-5">
                                    <div className="flex items-center">
                                        <div className="flex-1">
                                            <dl>
                                                <dt className="text-sm font-medium text-gray-500 truncate">
                                                    Total Users
                                                </dt>
                                                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                                                    {dashboardStats.totalUsers}
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {dashboardStats?.activeProjects && (
                            <div className="bg-white overflow-hidden shadow rounded-lg">
                                <div className="p-5">
                                    <div className="flex items-center">
                                        <div className="flex-1">
                                            <dl>
                                                <dt className="text-sm font-medium text-gray-500 truncate">
                                                    Active Projects
                                                </dt>
                                                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                                                    {dashboardStats.activeProjects}
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {dashboardStats?.pendingTasks && (
                            <div className="bg-white overflow-hidden shadow rounded-lg">
                                <div className="p-5">
                                    <div className="flex items-center">
                                        <div className="flex-1">
                                            <dl>
                                                <dt className="text-sm font-medium text-gray-500 truncate">
                                                    Pending Tasks
                                                </dt>
                                                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                                                    {dashboardStats.pendingTasks}
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}