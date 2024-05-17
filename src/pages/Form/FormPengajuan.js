import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormPengajuanBarang= () => {
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
            if (key !== "totalHarga" && formData[key] === "") {
                alert("Semua field harus diisi");
                return; 
            }
        }
    
        const calculatedTotalHarga = formData.jumlah * formData.hargaSatuan;
    
        axios.post("http://localhost:5000/pengajuan/tambah_pengajuan", {...formData, totalHarga: calculatedTotalHarga})
            .then(response => {
                console.log("Response from API:", response.data);
                setFormData(initialFormData); 
                setError(''); 
                setShowNotification(true); 
                setTimeout(() => {
                    setShowNotification(false);
                    navigate("/pengajuan_barang");
                }, 2500);
            })
            .catch(error => {
                console.error("Error submitting form:", error);
                setError(error.response.data.message);
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
                    <h2 className="text-xl font-semibold mb-4 text-center">Form Pengajuan Barang</h2>
                    {error && <p className="text-red-500">{error}</p>}
                    {showNotification && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                            <span className="block sm:inline">Pengajuan Berhasil Dibuat</span>
                        </div>
                    )}
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
                            <button type="button" className="px-4 py-2 bg-slate-500 text-white rounded-md hover:bg-slate-700 focus:outline-none focus:bg-slate-500" onClick={handleCancel}>
                                Batal
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

};

export default FormPengajuanBarang;
