import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

const PaketSetrika = () => {
    // State untuk menyimpan data paket setrika
    const [paketSetrika, setPaketSetrika] = useState([]);

    // Gunakan useEffect untuk mengambil data paket setrika dari API saat komponen dimuat
    useEffect(() => {
        fetchData();
    }, []);

    // Fungsi untuk mengambil data paket setrika dari API
    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:5000/pkt_setrika");
            setPaketSetrika(response.data.data);
        } catch (error) {
            console.error("Error fetching paket setrika:", error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container mx-auto">
                <div className="card mt-8 rounded-md">
                    <div className="card-body">
                        <div className="flex justify-between items-center">
                            <h2 className="text-3xl lg:text-4xl mb-5 p-2">Paket Setrika</h2>
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
                                <thead className="bg-slate-500 text-white font-semibold">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-sm font-medium tracking-wider">No</th>
                                        <th className="px-6 py-3 text-left text-sm font-medium tracking-wider">Nama Paket</th>
                                        <th className="px-6 py-3 text-left text-sm font-medium tracking-wider">Waktu Kerja</th>
                                        <th className="px-6 py-3 text-left text-sm font-medium tracking-wider">Berat Min(Kg)</th>
                                        <th className="px-6 py-3 text-left text-sm font-medium tracking-wider">Harga/Kg</th>                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {paketSetrika.map((paket, index) => (
                                        <tr key={paket._id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}>
                                            <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{paket.namaPaket}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{paket.waktuKerja}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{paket.beratMin}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">Rp. {paket.harga}</td>
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
}

export default PaketSetrika;
