import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { Link } from "react-router-dom";

const JumlahKaryawan = () => {
    const [karyawan, setKaryawan] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get("http://localhost:5000/user/all")
            .then(response => {
                if (response.data.status) {
                    const filteredKaryawan = response.data.data.filter(item => item.role !== 'admin');
                    const dataWithIndex = filteredKaryawan.map((item, index) => ({
                        ...item,
                        noUrut: index + 1
                    }));
                    setKaryawan(dataWithIndex);
                } else {
                    console.error("Error fetching data karyawan:", response.data.message);
                }
            })
            .catch(error => {
                console.error("Error fetching data karyawan:", error);
            });
    };

    const handleDelete = (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
            axios.delete(`http://localhost:5000/user/delete/${id}`)
                .then(response => {
                    console.log("Data berhasil dihapus:", response.data);
                    // Memuat ulang data setelah penghapusan
                    fetchData();
                })
                .catch(error => {
                    console.error("Error deleting data:", error);
                });
        }
    };

    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex flex-row flex-1">
                <Sidebar/>
                <div className="flex-1 p-6 overflow-auto">
                    <div className="container mx-auto">
                        <div className="bg-white shadow-md rounded-lg">
                            <div className="card-body flex justify-between items-center">
                                <div>
                                    <h2 className="text-3xl lg:text-4xl mb-5 p-2 mt-2 font-bold ml-3">Daftar Pegawai</h2>
                                    <Link to="/form_tambah_pegawai" className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 ml-5 mb-3 rounded">+ Tambah Pegawai</Link>
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
                                            <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                                            <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                                            <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                            <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {karyawan.map((karyawan, index) => (
                                            <tr key={karyawan._id} className="border-b">
                                                <td className="px-6 py-4 whitespace-nowrap">{karyawan.noUrut}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{karyawan.nama}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{karyawan.username}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{karyawan.email}</td>
                                                <td className="px-6 py-4 whitespace-nowrap mx-auto text-sm font-medium">
                                                <Link to={`/edit/form_tambah_pegawai/${karyawan._id}`} className="btn btn-primary btn-md p-2">Edit</Link>
                                                    <button onClick={() => handleDelete(karyawan._id)} className="btn btn-danger btn-md p-2 ml-2">Hapus</button>
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
}

export default JumlahKaryawan;
