"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {Password} from "primereact/password";

export default function LoginForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data) => {
        setIsLoading(true);
        setError("");

        try {
            const result = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false
            });

            if (result?.error) {
                setError(result.error);
            } else {
                router.push("/dashboard");
                router.refresh();
            }
        } catch (err) {
            setError("An unexpected error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && (
                <div className="p-4 text-sm text-red-800 bg-red-100 rounded-lg">
                    {error}
                </div>
            )}

            <div className="field">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    ელ-ფოსტა
                </label>
                <InputText
                    id="email"
                    type="text"
                    {...register("email", {
                        required: "ელ-ფოსტა სავალდებულოა",
                        pattern: {
                            // value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "არავალიდური ელფოსტა"
                        }
                    })}
                    className={`mt-1 block w-full px-3 py-2 border shadow-sm focus:outline-none focus:ring-green-900 focus:border-green-900 text-black text-xs ${
                        errors.email ? 'p-invalid border-red-500' : ''
                    }`}
                />
                {errors.email && (
                    <small className="p-error text-red-500 mt-1">{errors.email.message}</small>
                )}
            </div>


            <div className="field">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    პაროლი
                </label>
                <Password
                    id="password"
                    {...register("password", {
                        required: "პაროლი სავალდებულოა",
                        minLength: {
                            value: 8,
                            message: "მინიმალური პაროლის სიმბოლოა 8"
                        }
                    })}
                    toggleMask={false}
                    feedback={false}
                    inputClassName={`mt-1 block w-full px-3 py-2 border shadow-sm focus:outline-none focus:ring-green-900 focus:border-green-900 text-black text-xs ${
                        errors.password ? 'p-invalid border-red-500' : ''
                    }`}

                    className="w-full"
                />
                {errors.password && (
                    <small className="p-error text-red-500 mt-1">{errors.password.message}</small>
                )}
            </div>

            <Button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium text-white bg-green-900 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
                {isLoading ? "ავტორიზაცია..." : "ავტორიზაცია"}
            </Button>
        </form>
    );
}