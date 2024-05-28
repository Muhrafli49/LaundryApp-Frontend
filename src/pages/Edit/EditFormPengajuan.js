import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; 

const EditFormPengajuan = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState ({
        id: id,
        jenisBarang: "",
        jumlah: "",
        merk: "",
        hargaSatuan: "",
        totalHarga: "",
    });

    // State untuk menyimpan nilai awal formulir
    const [initialFormData, setInitialFormData] = useState(null);

    const [error, setError] = useState('');
    const [showNotification, setShowNotification] = useState(false);

    // Mengambil data pengajuan barang berdasarkan ID dari backend
    useEffect(() => {
        axios.get('http://localhost:5000/pengajuan/'+id)
        .then(res => {
            setFormData({
                jenisBarang: res.data.data.jenisBarang,
                jumlah: res.data.data.jumlah,
                merk: res.data.data.merk,
                hargaSatuan: res.data.data.hargaSatuan,
                totalHarga: res.data.data.totalHarga
            });
            // Simpan nilai awal formulir
            setInitialFormData({
                jenisBarang: res.data.data.jenisBarang,
                jumlah: res.data.data.jumlah,
                merk: res.data.data.merk,
                hargaSatuan: res.data.data.hargaSatuan,
                totalHarga: res.data.data.totalHarga
            });
        });
    }, [id]); 
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        for (const key in formData) {
            if (key !== "totalHarga" && formData[key] === "") {
                alert("Semua field harus diisi");
                return; 
            }
        }
    
        const calculatedTotalHarga = formData.jumlah * formData.hargaSatuan;
    
        try {
            await axios.put(`http://localhost:5000/pengajuan/edit/${id}`, {...formData, totalHarga: calculatedTotalHarga});
            setError('');
            setShowNotification(true); 
            setTimeout(() => {
                setShowNotification(false);
                navigate("/pengajuan_barang");
            }, 2000);
        } catch (error) {
            console.error("Error submitting form:", error);
            setError(error.response.data.message);
        }
    };

    // Fungsi untuk mengembalikan nilai formulir ke nilai awal
    const handleCancel = () => {
        // Setel nilai formulir kembali ke nilai awal
        setFormData(initialFormData);
    };

    return (
        <div className="bg-yellow-50 min-h-screen">
            <Navbar />
            <div className="max-w-md mx-auto mt-5">
                <div className="bg-slate-300 p-8 rounded-lg shadow-lg relative">
                <div className="relative mb-4">
                    <Link to="/pengajuan_barang" className="absolute top-0 right-0 text-gray-600 hover:text-gray-900 focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </Link>
                </div>
                    <h2 className="text-xl font-semibold mb-4 text-center">Form Edit Pengajuan Barang</h2>
                    {error && <p className="text-red-500">{error}</p>}
                    {showNotification && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                            <span className="block sm:inline">Pengajuan Berhasil Diperbarui</span>
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
                                onChange={e => setFormData({...formData, jenisBarang: e.target.value })}
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
                                onChange={e => setFormData({...formData, jumlah: e.target.value })}
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
                                onChange={e => setFormData({...formData, merk: e.target.value })}
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
                                onChange={e => setFormData({...formData, hargaSatuan: e.target.value })}
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
                                disabled
                                className="mt-1 p-2 block w-full border rounded-md shadow-sm bg-gray-400"
                            />
                        </div>
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="px-4 py-2 mr-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none ">
                                Update
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

export default EditFormPengajuan;
