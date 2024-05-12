import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";


const FormOrderSetrika = () => {
    const initialFormData = {
        namaPelangganStr: "",
        nomorTeleponStr: "",
        alamatStr: "",
        paketStr: "",
        hargaPerKgStr: "",
        beratStr: "",
        waktuKerjaStr: "",
        tglOrderStr: "",
        tglSelesaiStr: "",
        keteranganStr: "",
        totalBayarStr: ""
    };

    const [formData, setFormData] = useState(initialFormData);
    const [error, setError] = useState('');
    const [showNotification, setShowNotification] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
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
        axios.post("http://localhost:5000/order_str/tambah_order", formData)
            .then(response => {
                console.log("Response from API:", response.data);
                setFormData(initialFormData); 
                setError(''); 
                setShowNotification(true); 
                setTimeout(() => {
                    setShowNotification(false); // 
                }, 2500);
            })
            .catch(error => {
                console.error("Error submitting form:", error);
                setError(error.response.data.message);
            });
    };

    const handleCancel = () => {
        setFormData(initialFormData); 
    };


    return (
        <div className="bg-yellow-50 min-h-screen">
            <Navbar />
            <div className="max-w-3xl mx-auto mt-5">
                <div className="bg-slate-300 p-8 rounded-lg shadow-lg relative">
                    <h2 className="text-xl font-semibold mb-4 text-center">Form Order Setrika</h2>
                    {error && <p className="text-red-500">{error}</p>}
                    {showNotification && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                            <span className="block sm:inline">Order berhasil dibuat</span>
                        </div>
                    )}
                    <form id="orderForm" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="mb-2">
                                <label htmlFor="namaPelangganStr" className="block text-sm font-medium text-gray-700">Nama Pelanggan</label>
                                <input 
                                    type="text" 
                                    id="namaPelangganStr" 
                                    name="namaPelangganStr" 
                                    value={formData.namaPelangganStr} 
                                    onChange={handleChange} 
                                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="nomorTeleponStr" className="block text-sm font-medium text-gray-700">Nomor Telepon</label>
                                <input 
                                    type="int"
                                    id="nomorTeleponStr" 
                                    name="nomorTeleponStr" 
                                    value={formData.nomorTeleponStr} 
                                    onChange={handleChange} 
                                    maxLength={13} 
                                    pattern="[0-9]*" 
                                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="alamatStr" className="block text-sm font-medium text-gray-700">Alamat</label>
                                <textarea 
                                    id="alamatStr" 
                                    name="alamatStr" 
                                    value={formData.alamatStr} 
                                    onChange={handleChange} 
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="hargaPerKgStr" className="block text-sm font-medium text-gray-700">Harga Per Kg</label>
                                <input 
                                    type="text" 
                                    id="hargaPerKgStr" 
                                    name="hargaPerKgStr" 
                                    value={formData.hargaPerKgStr} 
                                    onChange={handleChange} 
                                    // disabled 
                                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-200"
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="paketStr" className="block text-sm font-medium text-gray-700">Paket</label>
                                <select
                                    id="paketStr"
                                    name="paketStr"
                                    value={formData.paketStr}
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                                    <option value="">Pilih Paket</option>
                                    <option value="Paket A">Paket A</option>
                                    <option value="Paket B">Paket B</option>
                                    <option value="Paket C">Paket C</option>
                                </select>
                            </div>
                            <div className="mb-2">
                                <label htmlFor="beratStr" className="block text-sm font-medium text-gray-700">Berat</label>
                                <input 
                                    type="text" 
                                    id="beratStr" 
                                    name="beratStr" 
                                    value={formData.beratStr} 
                                    onChange={handleChange} 
                                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="waktuKerjaStr" className="block text-sm font-medium text-gray-700">Waktu Kerja</label>
                                <input 
                                    type="text" 
                                    id="waktuKerjaStr" 
                                    name="waktuKerjaStr" 
                                    value={formData.waktuKerjaStr} 
                                    onChange={handleChange}
                                    // disabled 
                                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-200" 
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="tglOrderStr" className="block text-sm font-medium text-gray-700">Tanggal Order</label>
                                <input 
                                    type="date" 
                                    id="tglOrderStr" 
                                    name="tglOrderStr" 
                                    value={formData.tglOrderStr} 
                                    onChange={handleChange} 
                                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="tglSelesaiStr" className="block text-sm font-medium text-gray-700">Tanggal Selesai</label>
                                <input 
                                    type="date" 
                                    id="tglSelesaiStr" 
                                    name="tglSelesaiStr" 
                                    value={formData.tglSelesaiStr} 
                                    onChange={handleChange} 
                                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="keteranganStr" className="block text-sm font-medium text-gray-700">Keterangan</label>
                                <textarea
                                    id="keteranganStr" 
                                    name="keteranganStr" 
                                    value={formData.keteranganStr} 
                                    onChange={handleChange} 
                                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="totalBayarStr" className="block text-sm font-medium text-gray-700">Total Bayar</label>
                                <input 
                                    type="text" 
                                    id="totalBayarStr" 
                                    name="totalBayarStr" 
                                    value={formData.totalBayarStr} 
                                    onChange={handleChange}
                                    // disabled   
                                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-200" 
                                />
                            </div>
                        </div>
                        <div className="absolute bottom-0 right-0 mb-4 mr-4">
                            <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none mr-2">
                                Simpan
                            </button>
                            <button type="button" className="px-4 py-2 bg-slate-500 text-white rounded-md hover:bg-slate-600 focus:outline-none focus:bg-slate-500" onClick={handleCancel}>
                                Batal
                            </button>
                        </div>  
                    </form>
                </div>
            </div>
            <br>
            </br>
        </div>
    );

};

export default FormOrderSetrika;