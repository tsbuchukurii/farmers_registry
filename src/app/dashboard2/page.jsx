"use client"
import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primeicons/primeicons.css';

const DashboardPage2 = () => {
    const [farmers, setFarmers] = useState([
        { id: 1, name: 'შპს სიმპიონის ვაინ', phone: '01010000000000', status: 'მუდმივობა', action: 'მოლოდინის რეჟიმი', details: 'სრულად ნახვა' },
        { id: 2, name: 'ი/მ ფურობში', phone: '01010000000000', status: 'მუდმივობა', action: 'დახარვეზებული', details: 'სრულად ნახვა' },
        { id: 3, name: 'შპს სიმპიონის ვაინ', phone: '01010000000000', status: 'მუდმივობა', action: 'აქტიური', details: 'სრულად ნახვა' },
        { id: 4, name: 'შპს სიმპიონის ვაინ', phone: '01010000000000', status: 'მუდმივობა', action: 'აქტიური', details: 'სრულად ნახვა' },
        { id: 5, name: 'შპს სიმპიონის ვაინ', phone: '01010000000000', status: 'მუდმივობა', action: 'აქტიური', details: 'სრულად ნახვა' },
        { id: 6, name: 'შპს სიმპიონის ვაინ', phone: '01010000000000', status: 'მუდმივობა', action: 'აქტიური', details: 'სრულად ნახვა' },
        { id: 7, name: 'შპს სიმპიონის ვაინ', phone: '01010000000000', status: 'მუდმივობა', action: 'აქტიური', details: 'სრულად   ნახვა' },
    ]);

    const actionBodyTemplate = (rowData) => {
        let buttonClass = 'px-6 py-2 rounded font-medium text-sm';
        let buttonText = rowData.action;

        if (rowData.action === 'მოლოდინის რეჟიმი') {
            buttonClass += ' bg-orange-500 text-white hover:bg-orange-600';
        } else if (rowData.action === 'დახარვეზებული') {
            buttonClass += ' bg-red-600 text-white hover:bg-red-700';
        } else if (rowData.action === 'აქტიური') {
            buttonClass += ' bg-green-600 text-white hover:bg-green-700';
        }

        return <button className={buttonClass}>{buttonText}</button>;
    };

    const detailsBodyTemplate = (rowData) => {
        return (
            <button className="px-6 py-2 rounded font-medium text-sm bg-gray-400 text-white hover:bg-gray-500">
                {rowData.details}
            </button>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-[1400px] mx-auto px-8 py-5 flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <img
                            src="https://rda.gov.ge/_nuxt/img/logo.d7ddd12.svg"
                            alt="Agricultural landscape"
                            className="object-contain opacity-90 h-12 w-auto"
                        />
                        <div>
                            <h1 className="text-gray-500 font-semibold text-base leading-tight">
                                სოფლის<br />განვითარების<br />სააგენტო
                            </h1>
                        </div>
                    </div>

                    {/* User Profile */}
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 border-2 border-green-700 rounded-full flex items-center justify-center">
                            <i className="pi pi-user text-green-700 text-xl"></i>
                        </div>
                        <div className="text-sm">
                            <div className="font-semibold">სახელი გვარიშვილი</div>
                            <div className="text-gray-600">თანამშრომი</div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-[1400px] mx-auto px-8 py-10">
                {/* Page Title */}
                <h2 className="text-sm font-thin text-gray-800 mb-8">ფერმერის ძიება</h2>

                {/* Search Section */}
                <div className="flex justify-between bg-white rounded-lg shadow-sm p-8 mb-8">
                    <div className="grid grid-cols-5 gap-5 items-end w-full">

                        {/* ფერმერის სახელწოდება */}
                        <div className="flex flex-col w-full">
                            <label className="text-sm text-gray-600 mb-2">ფერმერის სახელწოდება</label>
                            <input
                                type="text"
                                placeholder="01010000000000"
                                className="w-full p-3 border border-gray-300 text-gray-900 text-sm rounded"
                            />
                        </div>

                        {/* კომპანიის ს/კ */}
                        <div className="flex flex-col w-full">
                            <label className="text-sm text-gray-600 mb-2">კომპანიის ს/კ</label>
                            <input
                                type="text"
                                placeholder="01010000000000"
                                className="w-full p-3 border border-gray-300 text-gray-900 text-sm rounded"
                            />
                        </div>

                        {/* რეგიონი */}
                        <div className="flex flex-col w-full">
                            <label className="text-sm text-gray-600 mb-2">რეგიონი</label>
                            <input
                                type="text"
                                placeholder="კატეგორია"
                                className="w-full p-3 border border-gray-300 text-gray-900 text-sm rounded"
                            />
                        </div>

                        {/* ძებნა button */}
                        <button className="h-12 w-full border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 text-gray-600">
                            ძებნა
                        </button>

                        {/* Refresh button */}
                        <button className="h-12 w-full border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50">
                            <i className="pi pi-refresh text-gray-600 text-xl"></i>
                        </button>
                    </div>
                </div>

                {/* Add Button */}
                <Button
                    label="ფერმერის დამატება"
                    icon="pi pi-plus"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded font-medium mb-8"
                />

                {/* Data Table */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-8">
                    <table className="w-full">
                        <thead>
                        <tr className="border-b border-gray-200">
                            <th className="text-left py-4 px-6 font-medium text-gray-700 text-sm">ფერმერი</th>
                            <th className="text-left py-4 px-6 font-medium text-gray-700 text-sm">პირადი/სკ</th>
                            <th className="text-left py-4 px-6 font-medium text-gray-700 text-sm">ფერმერის ტიპი</th>
                            <th className="text-left py-4 px-6 font-medium text-gray-700 text-sm">სტატუსი</th>
                            <th className="text-left py-4 px-6 font-medium text-gray-700 text-sm">სამართავი ღილაკები</th>
                        </tr>
                        </thead>
                        <tbody>
                        {farmers.map((farmer, index) => (
                            <tr
                                key={farmer.id}
                                className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                            >
                                <td className="py-4 px-6 text-sm text-gray-700">{farmer.name}</td>
                                <td className="py-4 px-6 text-sm text-gray-700">{farmer.phone}</td>
                                <td className="py-4 px-6 text-sm text-gray-700">{farmer.status}</td>
                                <td className="py-4 px-6">
                                    {actionBodyTemplate(farmer)}
                                </td>
                                <td className="py-4 px-6">
                                    {detailsBodyTemplate(farmer)}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default DashboardPage2;