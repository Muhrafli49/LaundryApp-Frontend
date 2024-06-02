import React, { useState } from "react";
import axios from '../../services/index';

const FormPelanggan = ({ onClose }) => {
    const initialFormData = {
        nama: "",
        telepon: "",
        alamat: "",
    };

    const [formData, setFormData] = useState(initialFormData);
    const [error, setError] = useState('');
    const [showNotification, setShowNotification] = useState(false);

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

        axios.post("http://localhost:5000/pelanggan/tambah_pelanggan", formData)
            .then(response => {
                console.log("Response from API:", response.data);
                setFormData(initialFormData);
                setError('');
                setShowNotification(true);
                setTimeout(() => {
                    setShowNotification(false);
                    onClose();
                }, 2000);
            })
            .catch(error => {
                console.error("Error submitting form:", error);
                setError(error.response?.data?.message || "Terjadi kesalahan");
            });
    }

    const handleCancel = () => {
        setFormData(initialFormData);
        onClose();
    };

    return (
        <div className="bg-slate-300 p-8 rounded-lg shadow-lg relative justify-between max-w-md mx-auto">
            <div className="relative mb-4">
                <button onClick={onClose} className="absolute top-0 right-0 text-gray-600 hover:text-gray-900 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <h2 className="text-xl font-semibold mb-4 text-center">Form Pelanggan Baru</h2>
            {error && <p className="text-red-500">{error}</p>}
            {showNotification && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                    <span className="block sm:inline">Pelanggan Berhasil Ditambahkan</span>
                </div>
            )}
            <form id="pelangganform" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="nama" className="block text-sm font-medium text-gray-700">Nama</label>
                    <input
                        type="text"
                        id="nama"
                        name="nama"
                        value={formData.nama}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="telepon" className="block text-sm font-medium text-gray-700">No. Telepon</label>
                    <input
                        type="text"
                        id="telepon"
                        name="telepon"
                        value={formData.telepon}
                        onChange={handleChange}
                        maxLength={13}
                        className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="alamat" className="block text-sm font-medium text-gray-700">Alamat</label>
                    <input
                        type="text"
                        id="alamat"
                        name="alamat"
                        value={formData.alamat}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="px-4 py-2 mr-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none ">
                        Tambah
                    </button>
                    <button type="button" className="px-4 py-2 bg-slate-500 text-white rounded-md hover:bg-slate-700 focus:outline-none" onClick={handleCancel}>
                        Batal
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormPelanggan;
