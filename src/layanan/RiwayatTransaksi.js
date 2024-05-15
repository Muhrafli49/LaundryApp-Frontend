import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

const TotalOrderan = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const responseExp = await axios.get('http://localhost:5000/order_exp');
            const responseReg = await axios.get('http://localhost:5000/order_reg');
            const responseStr = await axios.get('http://localhost:5000/order_str');
            
            const combinedOrders = [
                ...responseExp.data.data,
                ...responseReg.data.data,
                ...responseStr.data.data
            ];
            
            setOrders(combinedOrders);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container mx-auto">
                <div className="card mt-8">
                    <div className="card-body">
                        <div className="flex justify-between items-center">
                            <h2 className="text-3xl lg:text-4xl mb-5 p-2">Riwayat Transaksi</h2>
                            <div className="text-gray-600 hover:text-gray-900 mr-2">
                                <button onClick={() => window.history.back()} className="focus:outline-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full border">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                                        <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No Order</th>
                                        <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                                        <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jenis Paket</th>
                                        <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Berat (Kg)</th>
                                        <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                        <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {Array.isArray(orders) && orders.length > 0 && orders.map((order, index) => (
                                        <tr key={order._id} className="border-b">
                                            <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{order.noOrderExp || order.noOrderReg || order.noOrderStr}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{order.namaPelangganExp || order.namaPelangganReg || order.namaPelangganStr}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{order.paketExp || order.paketReg || order.paketStr}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{order.beratExp || order.beratReg || order.beratStr}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">Rp. {order.totalBayarExp || order.totalBayarReg || order.totalBayarStr}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{order.status ? 'Selesai' : 'Pending'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap mx-auto text-sm font-medium">
                                                <button className="btn btn-primary btn-md p-2">Detail</button>
                                                <button className="btn btn-danger btn-md p-2 ml-2">Cetak</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TotalOrderan;
