import Link from "next/link";

export const metadata = {
    title: "Unauthorized",
    description: "Access denied"
};

export default function UnauthorizedPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                <div className="mb-8">
                    <h1 className="text-6xl font-bold text-gray-900 mb-4">403</h1>
                    <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                        Access Denied
                    </h2>
                    <p className="text-gray-600">
                        You don't have permission to access this page.
                    </p>
                </div>

                <div className="space-y-4">
                    <Link
                        href="/dashboard"
                        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Go to Dashboard
                    </Link>

                    <div>
                        <Link
                            href="/"
                            className="text-sm text-blue-600 hover:text-blue-800"
                        >
                            Return to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}