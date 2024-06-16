import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import axios from '../../services/index';
import { Link } from "react-router-dom";
import FormTambahPegawai from "../Form/FormTambahPegawai"; 

const JumlahKaryawan = () => {
    const [karyawan, setKaryawan] = useState([]);
    const [showFormModal, setShowFormModal] = useState(false);
    const [selectedPegawai, setSelectedPegawai] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [orderIdToDelete, setOrderIdToDelete] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get("/user/all")
            .then(response => {
                if (response.data.status) {
                    const filteredKaryawan = response.data.data.filter(item => item.role !== 'admin');
                    const dataWithIndex = filteredKaryawan.map((item, index) => ({
                        ...item,
                        noUrut: index + 1
                    }));
                    setKaryawan(dataWithIndex);
                } else {
                    console.error("Error fetching data karyawan:", response.data.message);
                }
            })
            .catch(error => {
                console.error("Error fetching data karyawan:", error);
            });
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`/user/delete/${orderIdToDelete}`);
            setModalContent('Akun Pegawai berhasil dihapus');
            setShowModal(false);
            fetchData();
        } catch (error) {
            console.error('Error deleting account: ', error);
        }
    };

    const openFormModal = () => {
        setShowFormModal(true);
    };

    const closeFormModal = () => {
        setSelectedPegawai(null);
        setShowFormModal(false);
    };

    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex flex-row flex-1">
                <Sidebar />
                <div className={`flex-1 p-6 overflow-auto transition duration-300 ease-in-out ${showFormModal ? 'filter blur-sm' : ''}`}>
                    <div className="container mx-auto">
                        <div className="bg-white shadow-md rounded-lg">
                            <div className="card-body flex justify-between items-center">
                                <div>
                                    <h2 className="text-3xl lg:text-4xl mb-5 p-2 mt-2 font-bold ml-3">Daftar Pegawai</h2>
                                    <button onClick={openFormModal} className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 ml-5 mb-3 rounded">+ Tambah Pegawai</button>
                                </div>
                                <div className="flex justify-end">
                                    <Link to="/dashboard/admin" className="m-4 mt-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-500 hover:text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full border mt-3">
                                    <thead>
                                        <tr>
                                            <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                                            <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                                            <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                                            <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                            <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {karyawan.map((karyawan, index) => (
                                            <tr key={karyawan._id} className="border-b">
                                                <td className="px-6 py-4 whitespace-nowrap">{karyawan.noUrut}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{karyawan.nama}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{karyawan.username}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{karyawan.email}</td>
                                                <td className="px-6 py-4 whitespace-nowrap mx-auto text-sm font-medium">
                                                    <Link to={`/edit/form_tambah_pegawai/${karyawan._id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded mr-2">Edit</Link>
                                                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 rounded" onClick={() => {
                                                        setOrderIdToDelete(karyawan._id);
                                                        setModalContent(`Apakah yakin ingin menghapus order dengan nomor ${karyawan.nama}?`);
                                                        setShowModal(true);
                                                    }}>
                                                        Hapus
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Form Tambah Pegawai */}
            {showFormModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"/>
                        </div>
                        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <FormTambahPegawai
                                    pegawai={selectedPegawai}
                                    onClose={closeFormModal}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showModal && (
                <Modal
                    content={modalContent}
                    onConfirm={confirmDelete}
                    onCancel={() => setShowModal(false)}
                />
            )}
        </div>
    );
};

const Modal = ({ content, onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
            <div className="bg-white p-4 rounded shadow-lg w-96">
                <p className="text-lg mb-4">{content}</p>
                <div className="flex justify-end">
                    <button onClick={onConfirm} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2">Ya</button>
                    <button onClick={onCancel} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">Batal</button>
                </div>
            </div>
        </div>
    );
};

export default JumlahKaryawan;
