"use server";
import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/auth";
import { createServerAxios } from "@/lib/axios";

export async function registerUser(prevState, formData) {
    const email = formData.get("email");
    const password = formData.get("password");
    const name = formData.get("name");

    if (!email || !password || !name) {
        return {
            success: false,
            message: "ველების შევსება სავალდებულოა"
        };
    }

    if (password.length < 8) {
        return {
            success: false,
            message: "პაროლი უნდა იყოს მინ 8 სიმბოლო"
        };
    }

    try {
        const axios = createServerAxios();

        // registration endpoint
        const response = await axios.post("/auth/register", {
            email,
            password,
            name
        });

        return {
            success: true,
            message: "რეგისტრაცია წარმატების დასრულდა",
            data: response.data
        };
    } catch (error) {
        console.error("Registration error:", error);

        return {
            success: false,
            message: error.response?.data?.message || "რეგისტრაცია წარუმატებელია. ცადეთ განმეორებით"
        };
    }
}

export async function updateUserProfile(prevState, formData) {
    const session = await getAuthSession();

    if (!session?.user) {
        return {
            success: false,
            message: "გაიარე ავტორიზაცია"
        };
    }

    const name = formData.get("name");
    const bio = formData.get("bio");

    try {
        const axios = createServerAxios(session.accessToken);

        const response = await axios.put(`/users/${session.user.id}`, {
            name,
            bio
        });

        return {
            success: true,
            message: "პროფილი წარმატებით განახლდა",
            data: response.data
        };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || "პროფილი ვერ განახლდა"
        };
    }
}

export async function getProtectedData(resourceType) {
    const session = await getAuthSession();

    if (!session?.user) {
        throw new Error("გაიარე ავტორიზაცია");
    }

    const allowedRoles = {
        adminData: ["admin"],
        managerData: ["admin", "manager"],
        userData: ["admin", "manager", "user"]
    };

    if (!allowedRoles[resourceType]?.includes(session.user.role)) {
        throw new Error("Forbidden: Insufficient permissions");
    }

    try {
        const axios = createServerAxios(session.accessToken);
        const response = await axios.get(`/data/${resourceType}`);

        return {
            success: true,
            data: response.data
        };
    } catch (error) {
        throw new Error(error.response?.data?.message || "მონაცემები ვერ იტვირთება");
    }
}

export async function checkAuth() {
    const session = await getAuthSession();

    return {
        isAuthenticated: !!session?.user,
        user: session?.user || null
    };
}

export async function performAdminAction(actionType, data) {
    const session = await getAuthSession();

    if (!session?.user) {
        return {
            success: false,
            message: "გაიარე ავტორიზაცია"
        };
    }

    if (session.user.role !== "admin") {
        return {
            success: false,
            message: "შესვლა დაუშვებელია"
        };
    }

    try {
        const axios = createServerAxios(session.accessToken);
        const response = await axios.post(`/admin/${actionType}`, data);

        return {
            success: true,
            data: response.data
        };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || "მცდელობა წარუმატებელია"
        };
    }
}