import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import axios from '../../services/index';
import { Link } from "react-router-dom";

const PersetujuanPengajuan = () => {
    const [pengajuan, setPengajuan] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get("/pengajuan")
            .then(response => {
                // Tambahkan nomor urut otomatis ke setiap pengajuan
                const dataWithIndex = response.data.data.map((item, index) => ({
                    ...item,
                    noUrut: index + 1
                }));
                setPengajuan(dataWithIndex);
            })
            .catch(error => {
                console.error("Error fetching pengajuan barang:", error);
            });
    };

    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex flex-row flex-1">
                <Sidebar />
                <div className="flex-1 p-6 overflow-auto">
                    <div className="container mx-auto">
                        <div className="bg-white shadow-md rounded-lg">
                            <div className="card-body flex justify-between items-center">
                                <div>
                                    <h2 className="text-3xl lg:text-4xl mb-5 p-2 mt-2 font-bold ml-3">Daftar Pengajuan </h2>
                                </div>
                                <div className="flex justify-end">
                                    <Link to="/dashboard/admin" className="m-4 mt-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-500 hover:text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full border mt-3">
                                    <thead>
                                        <tr>
                                            <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                                            <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No Pengajuan</th>
                                            <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jenis Barang</th>
                                            <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah</th>
                                            <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Merk</th>
                                            <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harga Satuan</th>
                                            <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Harga</th>
                                            <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {pengajuan.map((pengajuan, index) => (
                                            <tr key={pengajuan._id} className="border-b">
                                                <td className="px-6 py-4 whitespace-nowrap">{pengajuan.noUrut}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{pengajuan.noPengajuan}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{pengajuan.jenisBarang}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{pengajuan.jumlah}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{pengajuan.merk}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {`Rp. ${new Intl.NumberFormat('id-ID').format(pengajuan.hargaSatuan)}`}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {`Rp. ${new Intl.NumberFormat('id-ID').format(pengajuan.totalHarga)}`}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {pengajuan.status ? (
                                                        <span className="text-green-500">Terverifikasi</span>
                                                    ) : (
                                                        <span className="text-red-500">Belum diverifikasi</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap mx-auto text-sm font-medium">
                                                    <Link
                                                        to={`/persetujuan/form_pengajuan/${pengajuan._id}`}
                                                        className={`text-white font-bold py-2 px-3 rounded ${pengajuan.status ? 'bg-slate-600 hover:bg-slate-700' : 'bg-blue-500 hover:bg-blue-700'}`}
                                                        onClick={pengajuan.status ? (e) => e.preventDefault() : null}
                                                    >
                                                        Tindakan
                                                    </Link>
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
        </div>
    );
};

export default PersetujuanPengajuan;
