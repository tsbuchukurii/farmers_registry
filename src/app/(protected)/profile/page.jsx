import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { createServerAxios } from "@/lib/axios";
import ProfileForm from "./ProfileForm";

export const metadata = {
    title: "Profile",
    description: "Edit your profile"
};

export default async function ProfilePage() {
    const session = await getAuthSession();

    if (!session?.user) {
        redirect("/login");
    }

    // Fetch user data
    const axios = createServerAxios(session.accessToken);
    let userData = null;

    try {
        const response = await axios.get(`/users/${session.user.id}`);
        userData = response.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Profile Settings</h1>

                    <div className="bg-white shadow rounded-lg p-6">
                        <ProfileForm initialData={userData} />
                    </div>
                </div>
            </div>
        </div>
    );
}