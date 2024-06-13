import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from '../services/index';
import { Link } from "react-router-dom";
import FormPengajuanBarang from "../pages/Form/FormPengajuan"; 
import Footer from "../components/Footer";

const PengajuanBarang = () => {
    const [pengajuanBarang, setPengajuanBarang] = useState([]);
    const [showFormModal, setShowFormModal] = useState(false);
    const [selectedPengajuan, setSelectedPengajuan] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get("/pengajuan")
            .then(response => {
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
            axios.delete(`/pengajuan/delete/${id}`)
                .then(response => {
                    alert("Pengajuan berhasil dihapus.");
                    const updatedPengajuan = [...pengajuanBarang];
                    updatedPengajuan.splice(index, 1);
                    setPengajuanBarang(updatedPengajuan);
                })
                .catch(error => {
                    console.error("Error deleting pengajuan:", error);
                });
        }
    };

    const closeFormModal = () => {
        setSelectedPengajuan(null);
        setShowFormModal(false);
    };

    
    return (
        <div className="flex flex-col min-h-screen bg-yellow-50">
            <Navbar />
            <div className={`container mx-auto flex-1 transition duration-300 ease-in-out ${showFormModal ? 'filter blur-sm' : ''}`}>
                <div className="container mx-auto flex-grow">
                    <div className="card mt-8 shadow-md rounded-lg">
                        <div className="card-body flex justify-between items-center">
                            <div>
                                <h2 className="text-3xl lg:text-4xl mb-5 p-2 mt-2 font-bold">Pengajuan Barang</h2>
                                <button
                                    onClick={() => setShowFormModal(true)}
                                    className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
                                >
                                    + Tambah Pengajuan
                                </button>
                            </div>
                            <div className="flex justify-end">
                                <Link to="/dashboard" className="m-4 mt-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-500 hover:text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
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
                                        <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
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
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {`Rp. ${new Intl.NumberFormat('id-ID').format(pengajuan.hargaSatuan)}`}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {`Rp. ${new Intl.NumberFormat('id-ID').format(pengajuan.totalHarga)}`}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {pengajuan.status ? (
                                                    <span className="bg-green-500 text-white px-2 py-1 rounded-md">Diterima</span>
                                                ) : (
                                                    <span className="bg-slate-500 text-white px-2 py-1 rounded-md">Proses</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap mx-auto text-sm font-medium">
                                            <Link
                                                    to={`/edit/form_pengajuan/${pengajuan._id}`}
                                                    className={`text-white font-bold py-2 px-3 rounded ${pengajuan.status ? 'bg-slate-600 hover:bg-slate-700' : 'bg-blue-500 hover:bg-blue-700'}`}
                                                    onClick={pengajuan.status ? (e) => e.preventDefault() : null}
                                                >
                                                    Edit
                                                </Link>
                                                <button className="bg-red-600 text-white font-bold py-2 px-3 rounded ml-2" onClick={() => handleDelete(pengajuan._id, index)}>Hapus</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Form Pengajuan Barang */}
            {showFormModal && (
                
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"/>
                        </div>
                        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <FormPengajuanBarang
                            pengajuan={selectedPengajuan}
                            onClose={closeFormModal}/>
                            </div>
                        </div>
                    </div>
                </div>
            )}
                <Footer />
        </div>
    );
}

export default PengajuanBarang;