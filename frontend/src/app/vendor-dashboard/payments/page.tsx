"use client";

import React from "react";
import Header from "@/components/shared/Headers/Header";
import { useVendorAuth } from "@/contexts/VendorAuthContext";
import LoaderJelly from "@/components/shared/Loaders/LoaderJelly";
import Footer from "@/components/shared/Footer";
import { useQuery} from '@apollo/client';
import { GET_VENDOR_PAYMENTS } from '@/graphql/queries';

interface Payment {
    id: string;
    amount: number;
    status: 'completed' | 'pending' | 'failed';
    createdAt: string;
    visitor: {
        id: string;
        visitor_fname: string;
        email: string;
    };
    package: {
        id: string;
        name: string;
        offering: {
            id: string;
            name: string;
        };
    };
}

const PaymentsPage = () => {
    const { vendor } = useVendorAuth();
    
    const { data, loading, error } = useQuery(GET_VENDOR_PAYMENTS, {
        variables: { vendorId: vendor?.id },
        skip: !vendor?.id,
    });

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

    if (error) {
        return (
            <div className="bg-lightYellow min-h-screen">
                <Header />
                <div className="container mx-auto px-4 py-6">
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        Error loading payments: {error.message}
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    const payments = data?.vendorPayments || [];

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
                                    Package
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Customer
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
                            {payments.map((payment: Payment) => (
                                <tr key={payment.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            {payment.package.offering.name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            {payment.package.name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-gray-900">
                                                {payment.visitor.visitor_fname}
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                {payment.visitor.email}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            ${payment.amount.toFixed(2)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {new Date(payment.createdAt).toLocaleDateString()}
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
