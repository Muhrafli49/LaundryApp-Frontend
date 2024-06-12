import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import axios from '../services/index';
import Footer from '../components/Footer';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import FormPelanggan from "../pages/Form/FormPelanggan";

const Pelanggan = () => {
    const [customers, setCustomers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [showFormModal, setShowFormModal] = useState(false);
    const [selectedPelanggan, setSelectedPelanggan] = useState(null);
    const [customersPerPage] = useState(5);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('/pelanggan');
            const sortedData = response.data.data.reverse(); // Reverse array to show newest first
            const dataWithIndex = sortedData.map((customer, index) => ({
                ...customer,
                noUrut: index + 1
            }));
            setCustomers(dataWithIndex);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };
    

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredCustomers = customers.filter(customer =>
        customer.nama.toLowerCase().includes(searchTerm.toLowerCase()) 
    );

    // Pagination Logic
    const indexOfLastCustomer = currentPage * customersPerPage;
    const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
    const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);
    const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const closeFormModal = () => {
        setSelectedPelanggan(null);
        setShowFormModal(false);
    };


    return (
        <div className="flex flex-col min-h-screen bg-yellow-50">
            <Navbar />
            <div className={`container mx-auto flex-1 transition duration-300 ease-in-out ${showFormModal ? 'filter blur-sm' : ''}`}>
                <div className="card mt-8 shadow-md rounded-lg mb-3">
                    <div className="card-body flex justify-between items-center">
                        <h2 className="text-3xl lg:text-4xl mb-3 p-2 mt-2 font-bold">Daftar Pelanggan</h2>
                        <div className="flex justify-end">
                            <Link to="/dashboard" className="m-4 mt-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-500 hover:text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                    <div className="p-2 ml-4 flex justify-between items-center">
                        <div className="relative">
                            <input
                                type="text"
                                className="border border-gray-300 rounded-md py-2 px-4 w-full max-w-md hover:scale-105"
                                placeholder="Cari berdasarkan nama"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M8 1a7 7 0 0 1 5.585 11.243l5.146 5.146-1.415 1.415-5.146-5.146A7 7 0 1 1 8 1zm0 2a5 5 0 1 0 0 10A5 5 0 0 0 8 3z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                        <div>
                            <button
                                onClick={() => setShowFormModal(true)}
                                className="bg-green-700 hover:bg-green-800 text-white font-bold mr-3 mb-2 py-2 px-4 rounded"
                            >
                                + Tambah Pelanggan
                            </button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full border">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                                    <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                                    <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No. Telepon</th>
                                    <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alamat</th>
                                    <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {currentCustomers.map((customer, index) => (
                                    <tr key={customer._id} className="border-b">
                                        <td className="px-6 py-4 whitespace-nowrap">{customer.noUrut}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{customer.nama}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{customer.telepon}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{customer.alamat}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <Link to={`/edit/form_tambah_pelanggan/${customer._id}`} className="text-white font-bold py-2 px-3 rounded bg-blue-500 hover:bg-blue-700">Edit</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pagination
                            totalPages={totalPages}
                            currentPage={currentPage}
                            paginate={paginate}
                        />
                    </div>
                </div>
            </div>

            {/* Modal Form Pelanggan */}
            {showFormModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75" />
                        </div>
                        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <FormPelanggan
                                    pengajuan={selectedPelanggan}
                                    onClose={closeFormModal} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
};

const Pagination = ({ totalPages, currentPage, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="flex justify-center mt-3 mb-2">
            <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-2 py-1 font-bold ${currentPage === 1 ? 'text-gray-400' : 'text-slate-600'}`}
            >
                <ChevronLeftIcon className="w-3 h-3" />
            </button>
            {pageNumbers.map(number => (
                <button 
                    key={number} 
                    onClick={() => paginate(number)} 
                    className={`px-2 py-1 mx-1 font-bold ${currentPage === number ? 'bg-slate-500 text-white' : 'text-slate-600'}`}
                >
                    {number}
                </button>
            ))}
            <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-2 py-1 font-bold ${currentPage === totalPages ? 'text-gray-400' : 'text-slate-600'}`}
            >
                <ChevronRightIcon className="w-3 h-3" />
            </button>
        </div>
    );
};

export default Pelanggan;
