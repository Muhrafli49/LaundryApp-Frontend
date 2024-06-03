import React, { useState, useEffect } from "react";
import axios from '../../services/index';
import { useNavigate } from "react-router-dom";


const FormOrderSetrika = ({ onClose }) => {
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
            const response = await axios.get("/pkt_setrika");
            setPaketOptions(response.data.data);
        } catch (error) {
            console.error("Error fetching paket options:", error);
        }
    };

    const fetchAllPelanggan = async () => {
        try {
            const response = await axios.get("/pelanggan");
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

        if (name === 'namaPelangganStr') {
            searchPelanggan(value);
        }

        // Jika nama paket dipilih, isi waktu kerja dan harga per kg sesuai dengan paket yang dipilih
        if (name === 'paketStr') {
            const selectedPaket = paketOptions.find(paket => paket._id === value);
            if (selectedPaket) {
                setFormData(prevState => ({
                    ...prevState,
                    waktuKerjaStr: selectedPaket.waktuKerja,
                    hargaPerKgStr: selectedPaket.harga
                }));
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        for (const key in formData) {
            if (key !== "totalBayarStr" && formData[key] === "") {
                alert("Semua field harus diisi");
                return; 
            }
        }

        const totalBayar = formData.hargaPerKgStr * formData.beratStr;
        setFormData(prevState => ({
            ...prevState,
            totalBayarStr: totalBayar
        }));

        try {
            // Dapatkan nama paket berdasarkan ID yang dipilih dari formData
            const selectedPaket = paketOptions.find(paket => paket._id === formData.paketStr);
            if (!selectedPaket) {
                // Jika tidak ada paket yang sesuai, tangani kesalahan atau kembali
                return;
            }
    
            // Kirim permintaan POST dengan data yang sesuai, termasuk nama paket
            await axios.post("/order_str/tambah_order", {
                ...formData,
                paketStr: selectedPaket.namaPaket, // Kirim nama paket sebagai gantinya
                totalBayarStr: totalBayar
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
            namaPelangganStr: pelanggan.nama,
            nomorTeleponStr: pelanggan.telepon,
            alamatStr: pelanggan.alamat
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
                                    disabled 
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
                                    {paketOptions.map((paket, index) => (
                                        <option key={index} value={paket._id}>{paket.namaPaket}</option>
                                    ))}
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
                                    disabled 
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
                                    value={formData.hargaPerKgStr * formData.beratStr} 
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

export default FormOrderSetrika;