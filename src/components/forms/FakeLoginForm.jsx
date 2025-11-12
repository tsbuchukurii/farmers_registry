"use client"
import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import 'primereact/resources/themes/lara-light-green/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {fakeLogin, storeSession} from "@/app/(auth)/login/Authservice";

const FakeLoginForm = () => {

    const handleLogin = async (u,p) => {
        try {
            const response = await fakeLogin(u, p);

            storeSession(response.user, response.token);

            alert(`${response.message}\nმოგესალმებით, ${response.user.name}!`);

            window.location.reload();

        } catch (error) {
            alert(error.message || 'არასწორი მომხმარებელი ან პაროლი');
        }
    }

    return (<>
            <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg text-xs">
                <p className="font-semibold mb-1">ტესტირებისთვის გამოიყენეთ:</p>
                <p>პირადი ნომერი: <code className="bg-blue-100 px-1 rounded">010101011</code></p>
                <p>პაროლი: <code className="bg-blue-100 px-1 rounded">admin123</code></p>
            </div>

            <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                    პირადი ნომერი
                </label>
                <InputText
                    id="username"
                    placeholder="პირადი ნომერი"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    პაროლი
                </label>
                <Password
                    id="password"
                    placeholder="პაროლი"
                    feedback={false}
                    className="w-full"
                    inputClassName="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
            </div>

            <Button
                onClick={() => handleLogin("010101011", "admin123")}
                label={"შესვლა"}
                type="submit"
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            />
    </>);
};

export default FakeLoginForm;