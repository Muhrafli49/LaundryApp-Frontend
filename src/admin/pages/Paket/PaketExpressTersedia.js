import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import FormPaketExpress from "../../Form/FormPaketExpress";
import axios from "axios";
import { Link } from "react-router-dom";

const PaketExpressTersedia = () => {
    const [paketExpress, setPaketExpress] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedExpress, setSelectedExpress] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:5000/pkt_express");
            setPaketExpress(response.data.data);
        } catch (error) {
            console.error("Error fetching paket express:", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
            try {
                const response = await axios.delete(`http://localhost:5000/pkt_express/delete/${id}`);
                console.log("Data berhasil dihapus:", response.data);
                // Reload data after deletion
                fetchData();
            } catch (error) {
                console.error("Error deleting data:", error);
            }
        }
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedExpress(null);
    }

    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex flex-row flex-1">
                <Sidebar />
                <div className={`flex-1 p-6 overflow-auto transition duration-300 ease-in-out ${isModalOpen ? 'filter blur-sm' : ''}`}>
                    <div className="container mx-auto">
                        <div className="bg-white shadow-md rounded-lg">
                            <div className="card-body flex justify-between items-center">
                                <div>
                                    <h2 className="text-3xl lg:text-4xl mb-5 p-2 mt-2 font-bold ml-3">Paket Express</h2>
                                    <button onClick={openModal} className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 ml-5 mb-3 rounded">+ Tambah Paket</button>
                                </div>
                                <div className="flex justify-end">
                                    <Link to="/paket_laundry" className="m-4 mt-4">
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
                                            <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Paket</th>
                                            <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waktu Kerja (Jam)</th>
                                            <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Berat Min (Kg)</th>
                                            <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harga/Kg</th>
                                            <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {paketExpress.map((paket, index) => (
                                            <tr key={paket._id} className="border-b">
                                                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{paket.namaPaket}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{paket.waktuKerja}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{paket.beratMin}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">Rp. {paket.harga}</td>
                                                <td className="px-6 py-4 whitespace-nowrap item-left text-sm font-medium">
                                                    <button onClick={() => handleDelete(paket._id)} className="btn btn-danger btn-md p-2 ml-2">Hapus</button>
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
            {isModalOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"/>
                        </div>
                        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <FormPaketExpress
                                express={selectedExpress}
                                onClose={closeModal} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PaketExpressTersedia;
