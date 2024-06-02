import React, { useState, useEffect } from "react";
import axios from '../../services/index';
import { useNavigate } from "react-router-dom";

const FormOrderReguler = ({ onClose }) => {
    const initialFormData = {
        namaPelangganReg: "",
        nomorTeleponReg: "",
        alamatReg: "",
        paketReg: "",
        hargaPerKgReg: 0,
        beratReg: "",
        waktuKerjaReg: 0,
        tglOrderReg: "",
        tglSelesaiReg: "",
        keteranganReg: "",
        totalBayarReg: ""
    };

    const [formData, setFormData] = useState(initialFormData);
    const [error, setError] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const [paketOptions, setPaketOptions] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [allPelanggan, setAllPelanggan] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPaketOptions();
        fetchAllPelanggan(); 
    }, []);

    const fetchPaketOptions = async () => {
        try {
            const response = await axios.get("http://localhost:5000/pkt_reguler");
            setPaketOptions(response.data.data);
        } catch (error) {
            console.error("Error fetching paket options:", error);
        }
    };

    const fetchAllPelanggan = async () => {
        try {
            const response = await axios.get("http://localhost:5000/pelanggan");
            setAllPelanggan(response.data.data);
        } catch (error) {
            console.error('Error fetching all pelanggan:', error);
        }
    };
    
    const searchPelanggan = (searchTerm) => {
        const results = allPelanggan.filter(pelanggan => pelanggan.nama.toLowerCase().includes(searchTerm.toLowerCase()));
        setSearchResults(results);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if (name === 'namaPelangganReg') {
            searchPelanggan(value);
        }

        if (name === 'paketReg') {
            const selectedPaket = paketOptions.find(paket => paket._id === value);
            if (selectedPaket) {
                setFormData(prevState => ({
                    ...prevState,
                    waktuKerjaReg: selectedPaket.waktuKerja,
                    hargaPerKgReg: selectedPaket.harga
                }));
            }
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault(); 

        
        for (const key in formData) {
            if (key !== "totalBayarReg" && formData[key] === "") {
                alert("Semua field harus diisi");
                return; 
            }
        }

        const totalBayar = formData.hargaPerKgReg * formData.beratReg;
        setFormData(prevState => ({
            ...prevState,
            totalBayarReg: totalBayar
        }));

        try {
            // Dapatkan nama paket berdasarkan ID yang dipilih dari formData
            const selectedPaket = paketOptions.find(paket => paket._id === formData.paketReg);
            if (!selectedPaket) {
                return;
            }
    
            // Kirim permintaan POST dengan data yang sesuai, termasuk nama paket
            await axios.post("http://localhost:5000/order_Reg/tambah_order", {
                ...formData,
                paketReg: selectedPaket.namaPaket, 
                totalBayarReg: totalBayar
            });
    
            // Setelah berhasil, atur kembali formData dan tampilkan notifikasi
            setFormData(initialFormData);
            setError('');
            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false);
                navigate("/dashboard");
            }, 2500);
        } catch (error) {
            console.error("Error submitting form:", error);
            setError(error.response.data.message);
        }
    };

    const handleCancel = () => {
        setFormData(initialFormData); 
    };

    const handleSelectPelanggan = (pelanggan) => {
        setFormData({
            ...formData,
            namaPelangganReg: pelanggan.nama,
            nomorTeleponReg: pelanggan.telepon,
            alamatReg: pelanggan.alamat
        });
        setSearchResults([]); 
    };


    return (
        <div className="bg-slate-300 p-8 rounded-lg shadow-lg relative justify-between">
            <div className="relative">
                <button onClick={onClose} className="absolute top-0 right-0 text-gray-600 hover:text-gray-900 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <h2 className="text-xl font-semibold mb-4 text-center">Form Order Reguler</h2>
                {error && <p className="text-red-500">{error}</p>}
                {showNotification && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                        <span className="block sm:inline">Order berhasil dibuat</span>
                    </div>
                )}
                    <form id="orderForm" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="mb-2">
                                <label htmlFor="namaPelangganReg" className="block text-sm font-medium text-gray-700">Nama Pelanggan</label>
                                <input
                            type="text"
                            id="namaPelangganReg"
                            name="namaPelangganReg"
                            value={formData.namaPelangganReg}
                            onChange={(e) => {
                                handleChange(e);
                                searchPelanggan(e.target.value);
                            }}
                            className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                            {searchResults.length > 0 && (
                                <ul className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-300">
                                    {searchResults.map((pelanggan) => (
                                        <li
                                            key={pelanggan._id}
                                            onClick={() => handleSelectPelanggan(pelanggan)}
                                            className="cursor-pointer p-2 hover:bg-gray-100"
                                        >
                                            {pelanggan.nama}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            </div>
                            <div className="mb-2">
                                <label htmlFor="nomorTeleponReg" className="block text-sm font-medium text-gray-700">Nomor Telepon</label>
                                <input 
                                    type="int"
                                    id="nomorTeleponReg" 
                                    name="nomorTeleponReg" 
                                    value={formData.nomorTeleponReg} 
                                    onChange={handleChange} 
                                    maxLength={13} 
                                    pattern="[0-9]*" 
                                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="alamatReg" className="block text-sm font-medium text-gray-700">Alamat</label>
                                <textarea 
                                    id="alamatReg" 
                                    name="alamatReg" 
                                    value={formData.alamatReg} 
                                    onChange={handleChange} 
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="hargaPerKgReg" className="block text-sm font-medium text-gray-700">Harga Per Kg</label>
                                <input 
                                    type="text" 
                                    id="hargaPerKgReg" 
                                    name="hargaPerKgReg" 
                                    value={formData.hargaPerKgReg} 
                                    onChange={handleChange} 
                                    disabled 
                                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-200"
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="paketReg" className="block text-sm font-medium text-gray-700">Paket</label>
                                <select
                                    id="paketReg"
                                    name="paketReg"
                                    value={formData.paketReg}
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                                    <option value="">Pilih Paket</option>
                                    {paketOptions.map((paket, index) => (
                                        <option key={index} value={paket._id}>{paket.namaPaket}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-2">
                                <label htmlFor="beratReg" className="block text-sm font-medium text-gray-700">Berat</label>
                                <input 
                                    type="text" 
                                    id="beratReg" 
                                    name="beratReg" 
                                    value={formData.beratReg} 
                                    onChange={handleChange} 
                                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="waktuKerjaReg" className="block text-sm font-medium text-gray-700">Waktu Kerja (Hari)</label>
                                <input 
                                    type="text" 
                                    id="waktuKerjaReg" 
                                    name="waktuKerjaReg" 
                                    value={formData.waktuKerjaReg} 
                                    onChange={handleChange}
                                    disabled 
                                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-200" 
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="tglOrderReg" className="block text-sm font-medium text-gray-700">Tanggal Order</label>
                                <input 
                                    type="date" 
                                    id="tglOrderReg" 
                                    name="tglOrderReg" 
                                    value={formData.tglOrderReg} 
                                    onChange={handleChange} 
                                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="tglSelesaiReg" className="block text-sm font-medium text-gray-700">Tanggal Selesai</label>
                                <input 
                                    type="date" 
                                    id="tglSelesaiReg" 
                                    name="tglSelesaiReg" 
                                    value={formData.tglSelesaiReg} 
                                    onChange={handleChange} 
                                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="keteranganReg" className="block text-sm font-medium text-gray-700">Keterangan</label>
                                <textarea
                                    id="keteranganReg" 
                                    name="keteranganReg" 
                                    value={formData.keteranganReg} 
                                    onChange={handleChange} 
                                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="totalBayarReg" className="block text-sm font-medium text-gray-700">Total Bayar</label>
                                <input 
                                    type="text" 
                                    id="totalBayarReg" 
                                    name="totalBayarReg" 
                                    value={formData.hargaPerKgReg * formData.beratReg}
                                    onChange={handleChange}
                                    disabled   
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
    );
};

export default FormOrderReguler;
