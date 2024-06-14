import React, { useState } from "react";
import axios from '../../services/index';
import { Alert, AlertIcon } from "@chakra-ui/react";

const FormPengajuanBarang = ({ onClose }) => {
    const initialFormData = {
        jenisBarang: "",
        jumlah: "",
        merk: "",
        hargaSatuan: "",
        totalHarga: "",
    };

    const [formData, setFormData] = useState(initialFormData);
    const [error, setError] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const [showWarning, setShowWarning] = useState(false);

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
            if (key !== "totalHarga" && formData[key] === "") {
                setShowWarning(true); 
                return;
            }
        }

        const calculatedTotalHarga = formData.jumlah * formData.hargaSatuan;

        axios.post("/pengajuan/tambah_pengajuan", { ...formData, totalHarga: calculatedTotalHarga })
            .then(response => {
                console.log("Response from API:", response.data);
                setFormData(initialFormData);
                setError('');
                setShowNotification(true);
                setTimeout(() => {
                    setShowNotification(false);
                    onClose();
                }, 2500);
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

    const handleFormClick = () => {
        setShowWarning(false); 
    };

    return (
        <div className="bg-slate-300 p-8 rounded-lg shadow-lg relative justify-between max-w-md mx-auto" onClick={handleFormClick}>
            {showNotification && (
                <div className="animate-drop bg-white border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4 shadow-lg">
                    <Alert status="success" className="flex items-center">
                        <AlertIcon boxSize="20px" />
                        <span className="ml-2">Pengajuan baru berhasil dibuat</span>
                    </Alert>
                </div>
            )}
            {showWarning && (
                <div className="animate-drop bg-white border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-4 shadow-lg">
                    <Alert status="warning" className="flex items-center">
                        <AlertIcon boxSize="20px" />
                        <span className="ml-2">Semua field harus diisi</span>
                    </Alert>
                </div>
            )}
            <div className="relative mb-4">
                <button onClick={onClose} className="absolute top-0 right-0 text-gray-600 hover:text-gray-900 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <h2 className="text-xl font-semibold mb-4 text-center">Form Pengajuan Barang</h2>
            {error && <p className="text-red-500">{error}</p>}
            <form id="pengajuanform" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="jenisBarang" className="block text-sm font-medium text-gray-700">Jenis Barang</label>
                    <input
                        type="text"
                        id="jenisBarang"
                        name="jenisBarang"
                        value={formData.jenisBarang}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="jumlah" className="block text-sm font-medium text-gray-700">Jumlah</label>
                    <input
                        type="text"
                        id="jumlah"
                        name="jumlah"
                        value={formData.jumlah}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="merk" className="block text-sm font-medium text-gray-700">Merk</label>
                    <input
                        type="text"
                        id="merk"
                        name="merk"
                        value={formData.merk}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="hargaSatuan" className="block text-sm font-medium text-gray-700">Harga Satuan</label>
                    <input
                        type="text"
                        id="hargaSatuan"
                        name="hargaSatuan"
                        value={formData.hargaSatuan}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="totalHarga" className="block text-sm font-medium text-gray-700">Total Harga</label>
                    <input
                        type="text"
                        id="totalHarga"
                        name="totalHarga"
                        value={formData.jumlah * formData.hargaSatuan}
                        onChange={handleChange}
                        disabled
                        className="mt-1 p-2 block w-full border rounded-md shadow-sm bg-gray-400"
                    />
                </div>
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="px-4 py-2 mr-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none ">
                        Ajukan
                    </button>
                    <button type="button" className="px-4 py-2 bg-slate-500 text-white rounded-md hover:bg-slate-700 focus:outline-none" onClick={handleCancel}>
                        Batal
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormPengajuanBarang;
