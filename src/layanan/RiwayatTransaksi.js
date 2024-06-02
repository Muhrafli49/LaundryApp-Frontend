import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import axios from '../services/index';
import Footer from '../components/Footer';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import WhatsappIcon from "../assets/whatsapp-removebg.png";
import InvoiceIcon from "../assets/point-of-sale-bill-removebg.png";

const TotalOrderan = () => {
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(5);
    const [filter, setFilter] = useState("all"); 

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const responseExp = await axios.get('http://localhost:5000/order_exp');
            const responseReg = await axios.get('http://localhost:5000/order_reg');
            const responseStr = await axios.get('http://localhost:5000/order_str');
            
            const combinedOrders = [
                ...responseExp.data.data.map(order => ({ ...order, orderType: 'exp' })),
                ...responseReg.data.data.map(order => ({ ...order, orderType: 'reg' })),
                ...responseStr.data.data.map(order => ({ ...order, orderType: 'str' }))
            ];

            const dataWithIndex = combinedOrders.map((order, index) => ({
                ...order,
                noUrut: index + 1
            }));
            
            setOrders(dataWithIndex);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const handleSendNotification = async (orderType, orderId) => {
        try {
            const response = await axios.get(`http://localhost:5000/invoice/sendNotification/${orderType}/${orderId}`);
            console.log('Notification sent successfully:', response.data);
            alert('Notification sent successfully');
        } catch (error) {
            console.error('Failed to send notification:', error);
            alert('Failed to send notification');
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    };

    // Filter berdasarkan pilihan tanggal
    const filteredOrders = orders.filter(order => {
        const fullName = order.namaPelangganExp || order.namaPelangganReg || order.namaPelangganStr;
        const dateFilter = new Date(order.tglSelesaiExp || order.tglSelesaiReg || order.tglSelesaiStr);

        if (filter === "today") {
            const today = new Date();
            return fullName.toLowerCase().includes(searchTerm.toLowerCase()) && dateFilter.toDateString() === today.toDateString();
        } else if (filter === "week") {
            const today = new Date();
            const nextWeek = new Date();
            nextWeek.setDate(today.getDate() + 7);
            return fullName.toLowerCase().includes(searchTerm.toLowerCase()) && dateFilter >= today && dateFilter <= nextWeek;
        } else {
            return fullName.toLowerCase().includes(searchTerm.toLowerCase());
        }
    });

    // Pagination Logic
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="flex flex-col min-h-screen bg-yellow-50">
            <Navbar />
            <div className="container mx-auto flex-grow">
                <div className="card mt-8 shadow-md rounded-lg mb-3">
                    <div className="card-body flex justify-between items-center">
                        <h2 className="text-3xl lg:text-4xl mb-3 p-2 mt-2 font-bold">Riwayat Transaksi</h2>
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
                        <div className="ml-4">
                            <select value={filter} onChange={handleFilterChange} className="border border-gray-800 rounded-md py-2 px-4 mr-3 font-semibold">
                                <option value="all">Semua</option>
                                <option value="today">Hari Ini</option>
                                <option value="week">Seminggu Kedepan</option>
                            </select>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full border">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                                    <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No Order</th>
                                    <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                                    <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jenis Paket</th>
                                    <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Berat (Kg)</th>
                                    <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                    <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estimasi Selesai</th>
                                    <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {currentOrders.map((order, index) => (
                                    <tr key={order._id} className="border-b">
                                        <td className="px-6 py-4 whitespace-nowrap">{order.noUrut}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{order.noOrderExp || order.noOrderReg || order.noOrderStr}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{order.namaPelangganExp || order.namaPelangganReg || order.namaPelangganStr}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{order.paketExp || order.paketReg || order.paketStr}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{order.beratExp || order.beratReg || order.beratStr}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {`Rp. ${new Intl.NumberFormat('id-ID').format(order.totalBayarExp || order.totalBayarReg || order.totalBayarStr || 0)}`}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {formatDate(order.tglSelesaiExp || order.tglSelesaiReg || order.tglSelesaiStr)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {order.status ? (
                                                <span className="bg-lime-500 text-white px-2 py-1 rounded-md">Selesai</span>
                                            ) : (
                                                <span className="bg-slate-500 text-white px-2 py-1 rounded-md">Pending</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap mx-auto text-sm font-medium">
                                            <div className="flex items-center gap-x-2">
                                                <button
                                                    onClick={() => handleSendNotification(order.orderType, order._id)}
                                                    className="bg-green-500 text-white font-bold py-2 px-3 rounded hover:bg-green-700 flex items-center"
                                                >
                                                    Kirim
                                                    <img src={WhatsappIcon} alt="WhatsApp Icon" className="w-5 h-5 ml-2" />
                                                </button>
                                                <Link to={`/invoice/${order.orderType}/${order._id}`} className="bg-blue-600 text-white font-bold py-2 px-3 rounded hover:bg-blue-700 flex items-center">
                                                    Cetak
                                                    <img src={InvoiceIcon} alt="Invoice Icon" className="w-5 h-5 ml-2" />
                                                </Link>
                                            </div>
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

export default TotalOrderan;
