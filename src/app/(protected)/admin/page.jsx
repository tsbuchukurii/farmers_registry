import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { createServerAxios } from "@/lib/axios";

export const metadata = {
    title: "Admin Panel",
    description: "Admin dashboard"
};

// Server Component with role verification
export default async function AdminPage() {
    const session = await getAuthSession();

    // Double-check role (middleware should catch this, but extra security)
    if (!session?.user || session.user.role !== "admin") {
        redirect("/unauthorized");
    }

    // Fetch admin-specific data
    const axios = createServerAxios(session.accessToken);
    let adminData = null;

    try {
        const response = await axios.get("/admin/dashboard");
        adminData = response.data;
    } catch (error) {
        console.error("Error fetching admin data:", error);
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
                        <p className="mt-2 text-sm text-gray-600">
                            Manage users, roles, and system settings
                        </p>
                    </div>

                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">System Overview</h2>

                        {adminData ? (
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-600">Total Users</p>
                                    <p className="text-2xl font-bold">{adminData.totalUsers || 0}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Active Sessions</p>
                                    <p className="text-2xl font-bold">{adminData.activeSessions || 0}</p>
                                </div>
                            </div>
                        ) : (
                            <p className="text-gray-600">Loading admin data...</p>
                        )}
                    </div>

                    <div className="mt-8">
                        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <button className="p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                Manage Users
                            </button>
                            <button className="p-4 bg-green-600 text-white rounded-lg hover:bg-green-700">
                                View Reports
                            </button>
                            <button className="p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                                System Settings
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}