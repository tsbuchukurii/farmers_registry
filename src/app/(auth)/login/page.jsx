import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/auth";
import Link from "next/link";
import { fakeLogin, storeSession, FAKE_USERS } from './authService';
import FakeLoginForm from "@/components/forms/FakeLoginForm";
import LoginForm from "@/components/forms/LoginForm";

export const metadata = {
    title: "ავტორიზაცია",
    description: "ავტორიზაციის გვერდი"
};

const LoginPage = async () => {
    const session = await getAuthSession();

    if (session?.user) {
        redirect("/dashboard");
    }

    return (
        <div className="w-10/12 bg-white border-1 border-solid border-gray-200 rounded-xl shadow-xl p-8 lg:p-12">
            <div className="flex items-center justify-center mb-8 space-x-4">
                <img
                    src="https://rda.gov.ge/_nuxt/img/logo.d7ddd12.svg"
                    alt="Agricultural landscape"
                    className="object-contain opacity-90 h-12 w-auto"
                />

                <div className="text-left">
                    <h2 className="text-2xl font-bold text-gray-500 leading-tight text-[18px]">
                        სოფლის<br />
                        განვითარების<br />
                        სააგენტო
                    </h2>
                </div>
            </div>
            <LoginForm />
            {/*<FakeLoginForm />*/}
        </div>

    );
}

export default LoginPage;