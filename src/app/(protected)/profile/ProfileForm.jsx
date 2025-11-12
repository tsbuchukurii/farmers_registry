"use client";

import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { updateUserProfile } from "@/app/actions/auth";
import { useOptimistic, useState } from "react";

const initialState = {
    success: false,
    message: ""
};

export default function ProfileForm({ initialData }) {
    const [state, formAction] = useFormState(updateUserProfile, initialState);
    const [optimisticData, setOptimisticData] = useOptimistic(initialData);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: {
            name: initialData?.name || "",
            bio: initialData?.bio || ""
        }
    });

    const onSubmit = async (data, event) => {
        // Optimistically update the UI
        setOptimisticData({
            ...initialData,
            name: data.name,
            bio: data.bio
        });

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
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                    Bio
                </label>
                <textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    {...register("bio", {
                        maxLength: {
                            value: 500,
                            message: "Bio must be less than 500 characters"
                        }
                    })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.bio && (
                    <p className="mt-1 text-sm text-red-600">{errors.bio.message}</p>
                )}
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
            </div>
        </form>
    );
}