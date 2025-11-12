"use client";

import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { registerUser } from "@/app/actions/auth";

const initialState = {
    success: false,
    message: ""
};

export default function RegisterForm() {
    const router = useRouter();
    const [state, formAction] = useFormState(registerUser, initialState);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm();

    const password = watch("password");

    useEffect(() => {
        if (state?.success) {
            setTimeout(() => {
                router.push("/login");
            }, 2000);
        }
    }, [state?.success, router]);

    const onSubmit = (data, event) => {
        const formData = new FormData(event.target);
        formAction(formData);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {state?.message && (
                <div
                    className={`p-4 text-sm rounded-lg ${
                        state.success
                            ? "text-green-800 bg-green-100"
                            : "text-red-800 bg-red-100"
                    }`}
                >
                    {state.message}
                </div>
            )}

            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                </label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    {...register("name", {
                        required: "Name is required",
                        minLength: {
                            value: 2,
                            message: "Name must be at least 2 characters"
                        }
                    })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address"
                        }
                    })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters"
                        },
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                            message: "Password must contain uppercase, lowercase, and number"
                        }
                    })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                </label>
                <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    {...register("confirmPassword", {
                        required: "Please confirm your password",
                        validate: (value) =>
                            value === password || "Passwords do not match"
                    })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                )}
            </div>

            <button
                type="submit"
                disabled={state?.success}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {state?.success ? "Registration successful!" : "Create account"}
            </button>
        </form>
    );
}