import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const EditFormPersetujuan = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        status: null,
    });

    const [error, setError] = useState("");
    const [showNotification, setShowNotification] = useState(false);

    // Mengambil data pengajuan barang berdasarkan ID dari backend
    useEffect(() => {
        axios.get(`http://localhost:5000/pengajuan/${id}`)
            .then((res) => {
                const data = res.data.data;
                setFormData({
                    status: data.status || "",
                });
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [id]); // Hanya jalankan sekali saat id berubah

    // Fungsi untuk mengubah status
    const handleChangeStatus = async (newStatus) => {
        try {
            const response = await axios.put(
                `http://localhost:5000/pengajuan/edit/${id}`,
                { status: newStatus }
            );
            console.log("Status changed successfully:", response.data);
            // Update status di state
            setFormData({ ...formData, status: newStatus });
            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false);
                navigate("/persetujuan_pengajuan");
            }, 1500);
        } catch (error) {
            console.error("Error changing status:", error);
            setError(error.response.data.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Kirim permintaan untuk menyimpan data status yang diubah
            const response = await axios.put(
                `http://localhost:5000/pengajuan/edit/${id}`,
                { status: formData.status === "Diterima" } // Mengubah string menjadi boolean
            );
            console.log("Response from API:", response.data);
            setError("");
            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false);
            }, 2500);
        } catch (error) {
            console.error("Error submitting form:", error);
            setError(error.response.data.message);
        }
    };

    return (
        <div className="bg-yellow-50 min-h-screen">
            <Navbar />
            <div className="flex flex-row">
                <div className="flex-1 p-6">
                    <div className="max-w-md mx-auto mt-5">
                        <div className="bg-slate-300 p-8 rounded-lg shadow-lg relative">
                            <h2 className="text-xl font-semibold mb-4 text-center">
                                Tindakan Pengajuan
                            </h2>
                            {error && <p className="text-red-500">{error}</p>}
                            {showNotification && (
                                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                                    <span className="block sm:inline">
                                        Tindakan Berhasil Diperbarui
                                    </span>
                                </div>
                            )}
                            <form id="pengajuanform" onSubmit={handleSubmit}>
                            <div className="mb-4">
                                    <label
                                        htmlFor="status"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Tindakan
                                    </label>
                                    <select
                                        id="status"
                                        name="status"
                                        value={formData.status} // Membiarkan pengguna memilih sendiri
                                        onChange={(e) =>
                                            handleChangeStatus(e.target.value === "Diterima")
                                        }
                                        className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">Silahkan pilih tindakan</option>
                                        <option value="Diterima">Diterima</option>
                                        <option value="Ditolak">Ditolak</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditFormPersetujuan;
