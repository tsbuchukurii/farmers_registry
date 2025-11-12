import axios from "axios";
import { getSession } from "next-auth/react";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

// Request interceptor - auth token
axiosInstance.interceptors.request.use(
    async (config) => {
        // Get session on client side
        if (typeof window !== "undefined") {
            const session = await getSession();

            if (session?.accessToken) {
                config.headers.Authorization = `Bearer ${session.accessToken}`;
            }
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - Handle errors & token refresh
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const session = await getSession();

                if (session?.refreshToken) {
                    //refresh token endpoint
                    const response = await axios.post(
                        `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
                        {
                            refreshToken: session.refreshToken
                        }
                    );

                    const { accessToken } = response.data;

                    // Update session - new token
                    // session update backend

                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                    return axiosInstance(originalRequest);
                }
            } catch (refreshError) {
                if (typeof window !== "undefined") {
                    window.location.href = "/login";
                }
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export const createServerAxios = (accessToken) => {
    const instance = axios.create({
        baseURL: process.env.API_URL,
        headers: {
            "Content-Type": "application/json",
            ...(accessToken && { Authorization: `Bearer ${accessToken}` })
        }
    });

    return instance;
};

export default axiosInstance;