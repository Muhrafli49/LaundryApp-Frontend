import React, { useState, useEffect } from "react";
import axios from '../services/index';
const PaketSetrika = ({ onClose }) => {
    // State untuk menyimpan data paket setrika
    const [paketSetrika, setPaketSetrika] = useState([]);

    // Gunakan useEffect untuk mengambil data paket setrika dari API saat komponen dimuat
    useEffect(() => {
        fetchData();
    }, []);

    // Fungsi untuk mengambil data paket setrika dari API
    const fetchData = async () => {
        try {
            const response = await axios.get("/pkt_setrika");
            setPaketSetrika(response.data.data);
        } catch (error) {
            console.error("Error fetching paket setrika:", error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 w-11/12 md:w-3/4 lg:w-1/2">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl">Paket Setrika</h3>
                    <button onClick={onClose} className="text-gray-600 hover:text-gray-900 focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full border table-auto">
                        <thead className="bg-slate-500 text-white font-semibold">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-medium tracking-wider">No</th>
                                <th className="px-6 py-3 text-left text-sm font-medium tracking-wider">Nama Paket</th>
                                <th className="px-6 py-3 text-left text-sm font-medium tracking-wider">Waktu Kerja</th>
                                <th className="px-6 py-3 text-left text-sm font-medium tracking-wider">Berat Min(Kg)</th>
                                <th className="px-6 py-3 text-left text-sm font-medium tracking-wider">Harga/Kg</th>
                            </tr>
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
    );
}

export default PaketSetrika;
