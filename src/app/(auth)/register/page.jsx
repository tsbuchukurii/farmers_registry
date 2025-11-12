import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/auth";
import RegisterForm from "@/components/forms/RegisterForm";
import Link from "next/link";

export const metadata = {
    title: "Register",
    description: "Create a new account"
};

export default async function RegisterPage() {
    const session = await getAuthSession();

    if (session?.user) {
        redirect("/dashboard");
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                            Sign in
                        </Link>
                    </p>
                </div>

                <RegisterForm />
            </div>
        </div>
    );
}