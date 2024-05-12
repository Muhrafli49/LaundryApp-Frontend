import React from "react";
import Navbar from "../components/Navbar";

const PaketReguler = () => {
    // Data dummy untuk daftar paket reguler
    const paketReguler = [
        { no: 1, namaPaket: 'Cuci Setrika', waktuKerja: '1 hari', beratMin: '5 kg', tarif: '$10' },
        { no: 2, namaPaket: 'Cuci Kering', waktuKerja: '2 hari', beratMin: '3 kg', tarif: '$15' },
        { no: 3, namaPaket: 'Cuci Lipat', waktuKerja: '1 hari', beratMin: '4 kg', tarif: '$12' },
    ];

    return (
        <div>
            <Navbar />
            <div className="container mx-auto">
                <div className="card mt-8 rounded-md">
                    <div className="card-body">
                        <div className="flex justify-between items-center">
                            <h2 className="text-3xl lg:text-4xl mb-5 p-2">Paket Reguler</h2>
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
                                    <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Paket</th>
                                    <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waktu Kerja</th>
                                    <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Berat Min(Kg)</th>
                                    <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tarif</th>
                                    <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {paketReguler.map(paket => (
                                    <tr key={paket.no} className="border-b">
                                        <td className="px-6 py-4 whitespace-nowrap">{paket.no}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{paket.namaPaket}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{paket.waktuKerja}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{paket.beratMin}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{paket.tarif}</td>
                                        <td className="px-6 py-4 whitespace-nowrap mx-auto text-sm font-medium">
                                            <button className="btn btn-primary btn-md p-2">Edit</button>
                                            <button className="btn btn-danger btn-md p-2">Hapus</button>
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
}

export default PaketReguler;
