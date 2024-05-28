import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; 

const EditFormTambahPegawai = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        id: id,
        nama: "",
        username: "",
        email: "",
        password: "",
    });

    const [initialFormData, setInitialFormData] = useState({
        id: id,
        nama: "",
        username: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState('');
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:5000/user/${id}`)
            .then(res => {
                const data = res.data.data;
                setFormData({
                    nama: data.nama || "",
                    username: data.username || "",
                    email: data.email || "",
                    password: "", // We do not fetch password for security reasons, so keep it empty
                });
                // Simpan nilai awal form
                setInitialFormData({
                    nama: data.nama || "",
                    username: data.username || "",
                    email: data.email || "",
                    password: "", // Same reason as above
                });
            })
            .catch(err => {
                console.error("Error fetching data:", err);
                setError("Error fetching data");
            });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        for (const key in formData) {
            if (formData[key] === '') {
                alert('Semua field harus diisi');
                return;
            }
        }

        try {
            await axios.put(`http://localhost:5000/user/edit/${id}`, { ...formData });
            setError('');
            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false);
                navigate("/jumlah_karyawan");
            }, 2000);
        } catch (error) {
            console.error("Error submitting form:", error);
            setError(error.response?.data?.message || "Error submitting form");
        }
    }

    const handleCancel = () => {
        setFormData(initialFormData);
    }

    return (
        <div className="bg-yellow-50 min-h-screen">
            <Navbar />
            <div className="max-w-md mx-auto mt-5">
                <div className="bg-slate-300 p-8 rounded-lg shadow-lg relative">
                <Link to="/jumlah_karyawan" className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                </Link>
                    <h2 className="text-xl font-semibold mb-4 text-center">Update Data Pegawai</h2>
                    {error && <p className="text-red-500">{error}</p>}
                    {showNotification && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                            <span className="block sm:inline">Update Data Pegawai Berhasil</span>
                        </div>
                    )}
                    <form id="registrationForm" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="nama" className="block text-sm font-medium text-gray-700">Nama</label>
                            <input
                                type="text"
                                id="nama"
                                name="nama"
                                value={formData.nama}
                                onChange={e => setFormData({ ...formData, nama: e.target.value })}
                                required
                                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={e => setFormData({ ...formData, username: e.target.value })}
                                required
                                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                required
                                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={e => setFormData({ ...formData, password: e.target.value })}
                                required
                                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="px-4 py-2 mr-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none">
                                Update
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
}

export default EditFormTambahPegawai;
