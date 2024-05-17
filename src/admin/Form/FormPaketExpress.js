import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormPaketExpress = () => {
    const initialFormData = {
        namaPaket: "",
        beratMin: "",
        waktuKerja: "",
        harga: ""
    };

    const [formData, setFormData] = useState(initialFormData);
    const [error, setError] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        for (const key in formData) {
            if (formData[key] === "") {
                alert("Semua field harus diisi");
                return;
            }
        }

        axios.post("http://localhost:5000/pkt_express/tambah", formData)
            .then(response => {
                console.log("Response from API:", response.data);
                setFormData(initialFormData);
                setError('');
                setShowNotification(true);
                setTimeout(() => {
                    setShowNotification(false);
                    navigate("/paket_express_tersedia");
                }, 2000);
            })
            .catch(error => {
                console.error("Error submitting form:", error);
                if (error.response && error.response.data && error.response.data.message) {
                    setError(error.response.data.message);
                } else {
                    setError('Terjadi kesalahan saat mengirim data');
                }
            });
    }

    const handleCancel = () => {
        setFormData(initialFormData);
    };

    return (
        <div className="bg-yellow-50 min-h-screen">
            <Navbar />
            <div className="max-w-md mx-auto mt-5">
                <div className="bg-slate-300 p-8 rounded-lg shadow-lg relative">
                    <h2 className="text-xl font-semibold mb-4 text-center">Form Paket Express</h2>
                    {error && <p className="text-red-500">{error}</p>}
                    {showNotification && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                            <span className="block sm:inline">Paket Baru Berhasil Dibuat</span>
                        </div>
                    )}
                    <form id="paketExpressForm" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="namaPaket" className="block text-sm font-medium text-gray-700">Nama Paket</label>
                            <input
                                type="text"
                                id="namaPaket"
                                name="namaPaket"
                                value={formData.namaPaket}
                                onChange={handleChange}
                                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="beratMin" className="block text-sm font-medium text-gray-700">Berat Min (kg)</label>
                            <input
                                type="number"
                                id="beratMin"
                                name="beratMin"
                                value={formData.beratMin}
                                onChange={handleChange}
                                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="waktuKerja" className="block text-sm font-medium text-gray-700">Waktu Kerja (jam)</label>
                            <input
                                type="number"
                                id="waktuKerja"
                                name="waktuKerja"
                                value={formData.waktuKerja}
                                onChange={handleChange}
                                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="harga" className="block text-sm font-medium text-gray-700">Harga (Rp)</label>
                            <input
                                type="number"
                                id="harga"
                                name="harga"
                                value={formData.harga}
                                onChange={handleChange}
                                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="px-4 py-2 mr-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none">
                                Tambah
                            </button>
                            <button
                                type="button"
                                className="px-4 py-2 bg-slate-500 text-white rounded-md hover:bg-slate-700 focus:outline-none"
                                onClick={handleCancel}>
                                Batal
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FormPaketExpress;
