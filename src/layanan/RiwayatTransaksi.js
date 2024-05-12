import React from "react";
import Navbar from "../components/Navbar";

const TotalOrderan = () => {
    // Data dummy untuk rekap orderan
    const orders = [
        { no: 1, noOrder: 'ORD001', nama: 'John Doe', jenisPaket: 'Cuci Setrika', jumlah: 2, total: '$20', uangBayar: '$50', kembalian: '$30', status: 'Selesai' },
        { no: 2, noOrder: 'ORD002', nama: 'Jane Smith', jenisPaket: 'Cuci Kering', jumlah: 1, total: '$15', uangBayar: '$20', kembalian: '$5', status: 'Proses' },
        { no: 3, noOrder: 'ORD003', nama: 'Michael Johnson', jenisPaket: 'Cuci Lipat', jumlah: 3, total: '$36', uangBayar: '$40', kembalian: '$4', status: 'Selesai' },
    ];

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
                        <table className="min-w-full border">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                                    <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No Order</th>
                                    <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                                    <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jenis Paket</th>
                                    <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah</th>
                                    <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                    <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uang Bayar</th>
                                    <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kembalian</th>
                                    <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {orders.map(order => (
                                    <tr key={order.noOrder} className="border-b">
                                        <td className="px-6 py-4 whitespace-nowrap">{order.no}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{order.noOrder}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{order.nama}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{order.jenisPaket}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{order.jumlah}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{order.total}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{order.uangBayar}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{order.kembalian}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{order.status}</td>
                                        <td className="px-6 py-4 whitespace-nowrap mx-auto text-sm font-medium">
                                            <button className="btn btn-primary btn-md p-2">Detail</button>
                                            <button className="btn btn-danger btn-md p-2">Cetak</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TotalOrderan;
