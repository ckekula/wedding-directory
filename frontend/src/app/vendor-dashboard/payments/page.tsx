"use client";

import React, { useEffect, useState } from 'react';
import Header from "@/components/shared/Headers/Header";
import { useVendorAuth } from "@/contexts/VendorAuthContext";
import LoaderJelly from "@/components/shared/Loaders/LoaderJelly";
import Footer from "@/components/shared/Footer";

interface Payment {
    id: string;
    amount: number;
    date: string;
    status: 'completed' | 'pending' | 'failed';
    serviceName: string;
}

const PaymentsPage = () => {
    const { vendor } = useVendorAuth();
    const [payments, setPayments] = useState<Payment[]>([]);
    const [loading, setLoading] = useState(true);

    // Mock data - Replace with actual API call
    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setPayments([
                {
                    id: '1',
                    amount: 1500,
                    date: '2025-05-01',
                    status: 'completed',
                    serviceName: 'Wedding Photography'
                },
                {
                    id: '2',
                    amount: 2000,
                    date: '2025-05-03',
                    status: 'pending',
                    serviceName: 'Event Planning'
                }
            ]);
            setLoading(false);
        }, 1000);
    }, []);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'failed':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) {
        return (
            <div>
                <Header />
                <div className="flex justify-center items-center h-screen">
                    <LoaderJelly />
                </div>
            </div>
        );
    }

    return (
        <div className="bg-lightYellow min-h-screen">
            <Header />
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-3xl font-bold mb-8">Payment History</h1>

                {payments.length > 0 ? (
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <table className="min-w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Service
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Amount
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {payments.map((payment) => (
                                    <tr key={payment.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {payment.serviceName}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                ${payment.amount.toFixed(2)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {new Date(payment.date).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(payment.status)}`}>
                                                {payment.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow p-6 text-center">
                        <p className="text-gray-500 text-lg">No payments found</p>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default PaymentsPage;
