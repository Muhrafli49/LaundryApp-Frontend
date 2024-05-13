import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";

const PengajuanBarang = () => {
    const [pengajuanBarang, setPengajuanBarang] = useState([]);

    useEffect(() => {
        // Ambil data pengajuan barang dari API saat komponen dimuat
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get("http://localhost:5000/pengajuan")
            .then(response => {
                // Tambahkan nomor urut otomatis ke setiap pengajuan
                const dataWithIndex = response.data.data.map((item, index) => ({
                    ...item,
                    noUrut: index + 1
                }));
                setPengajuanBarang(dataWithIndex);
            })
            .catch(error => {
                console.error("Error fetching pengajuan barang:", error);
            });
    };

    const handleDelete = (id, index) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus pengajuan ini?")) {
            axios.delete(`http://localhost:5000/pengajuan/delete/${id}`)
                .then(response => {
                    alert("Pengajuan berhasil dihapus.");
                    // Hapus pengajuan dari state
                    const updatedPengajuan = [...pengajuanBarang];
                    updatedPengajuan.splice(index, 1);
                    setPengajuanBarang(updatedPengajuan);
                })
                .catch(error => {
                    console.error("Error deleting pengajuan:", error);
                });
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container mx-auto">
                <div className="card mt-8 rounded-md">
                    <div className="card-body flex justify-between items-center">
                        <div>
                            <h2 className="text-3xl lg:text-4xl mb-5 p-2 mt-2">Pengajuan Barang</h2>
                            <Link to="/form_pengajuan" className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded">+ Tambah Pengajuan</Link>
                        </div>
                        <div className="flex justify-end">
                            <Link to="/dashboard" className="m-4 mt-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-500 hover:text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                    <table className="min-w-full border">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                                <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No Pengajuan</th>
                                <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jenis Barang</th>
                                <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah</th>
                                <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Merk</th>
                                <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harga Satuan</th>
                                <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Harga</th>
                                <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {pengajuanBarang.map((pengajuan, index) => (
                                <tr key={pengajuan._id} className="border-b">
                                    <td className="px-6 py-4 whitespace-nowrap">{pengajuan.noUrut}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{pengajuan.noPengajuan}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{pengajuan.jenisBarang}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{pengajuan.jumlah}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{pengajuan.merk}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">Rp {pengajuan.hargaSatuan.toLocaleString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">Rp {pengajuan.totalHarga.toLocaleString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap mx-auto text-sm font-medium">
                                        <Link to={`/edit/form_pengajuan/${pengajuan._id}`} className="btn btn-primary btn-md p-2">Edit</Link>
                                        <button className="btn btn-danger btn-md p-2" onClick={() => handleDelete(pengajuan._id, index)}>Hapus</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default PengajuanBarang;
