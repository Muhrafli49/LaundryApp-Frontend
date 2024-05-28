import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";

const EditFormPelanggan = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nama: '',
        telepon: '',
        alamat: '',
    });

    const [initialFormData, setInitialFormData] = useState(null);
    const [error, setError] = useState('');
    const [showNotification, setShowNotification] = useState(false);

    // Fetch data based on ID from the backend
    useEffect(() => {
        axios.get(`http://localhost:5000/pelanggan/${id}`)
            .then(res => {
                const data = res.data.data;
                setFormData(data);
                setInitialFormData(data);
            })
            .catch(err => setError('Failed to fetch data: ' + err.message));
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        for (const key in formData) {
            if (formData[key] === '') {
                setError(`Form ${key} tidak boleh kosong!`);
                return;
            }
        }

        try {
            await axios.put(`http://localhost:5000/pelanggan/edit/${id}`, formData);
            setError('');
            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false);
                navigate("/tambah_pelanggan");
            }, 2000);
        } catch (error) {
            console.error("Error submitting form:", error);
            setError(error.response.data.message);
        }
    };

    // Function to reset the form to initial values
    const handleCancel = () => {
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
                    <h2 className="text-xl font-semibold mb-4 text-center">Form Edit Pelanggan</h2>
                    {error && <p className="text-red-500">{error}</p>}
                    {showNotification && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                            <span className="block sm:inline">Pelanggan Berhasil Diperbarui</span>
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
                                onChange={handleInputChange}
                                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="telepon" className="block text-sm font-medium text-gray-700">No Telepon</label>
                            <input
                                type="text"
                                id="telepon"
                                name="telepon"
                                value={formData.telepon}
                                onChange={handleInputChange}
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
                                onChange={handleInputChange}
                                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="px-4 py-2 mr-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none">
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

export default EditFormPelanggan;
