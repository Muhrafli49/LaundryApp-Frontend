import React, { useState, useEffect } from 'react';
import axios from '../services/index';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const OrderTable2 = () => {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(3);
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [orderIdToDelete, setOrderIdToDelete] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('/order_reg');
            const sortedOrders = response.data.data.sort((a, b) => new Date(b.tglOrderReg) - new Date(a.tglOrderReg));
            setOrders(sortedOrders);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`/order_reg/delete/${orderIdToDelete}`);
            setModalContent('Order berhasil dihapus.');
            setShowModal(false);
            fetchData(); // Fetch new data after deletion
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    // Pagination Logic
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    const totalPages = Math.ceil(orders.length / ordersPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container mt-4">
            <div className="overflow-x-auto">
                <h2 className="lg:text-2xl sm:text-xl mb-2">Orderan Paket Reguler</h2>
                <table className="w-full table-auto">
                    <thead>
                        <tr className="text-left bg-gray-200">
                            <th className="px-6 py-3">No</th>
                            <th className="px-6 py-3">No Order</th>
                            <th className="px-6 py-3">Tanggal Order</th>
                            <th className="px-6 py-3">Nama Pelanggan</th>
                            <th className="px-6 py-3">Jenis Paket</th>
                            <th className="px-6 py-3">Waktu Kerja</th>
                            <th className="px-6 py-3">Berat (kg)</th>
                            <th className="px-6 py-3">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentOrders.map((order, index) => (
                            <tr key={order._id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-300'}>
                                <td className="px-6 py-3">{indexOfFirstOrder + index + 1}</td>
                                <td className="px-6 py-3">{order.noOrderReg}</td>
                                <td className="px-6 py-3">{new Date(order.tglOrderReg).toLocaleDateString()}</td>
                                <td className="px-6 py-3">{order.namaPelangganReg}</td>
                                <td className="px-6 py-3">{order.paketReg}</td>
                                <td className="px-6 py-3">{order.waktuKerjaReg} hari</td>
                                <td className="px-6 py-3">{order.beratReg}</td>
                                <td className="px-6 py-3 flex space-x-2">
                                    <Link
                                        to={`/detail/order_reg/${order._id}`}
                                        className={`text-white font-bold py-1 px-3 rounded ${order.status ? 'bg-slate-600 hover:bg-slate-700' : 'bg-blue-500 hover:bg-blue-700'}`}
                                        onClick={order.status ? (e) => e.preventDefault() : null}
                                    >
                                        Detail
                                    </Link>
                                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded" onClick={() => {
                                        setOrderIdToDelete(order._id);
                                        setModalContent(`Apakah yakin ingin menghapus order dengan nomor ${order.noOrderReg}?`);
                                        setShowModal(true);
                                    }}>Hapus</button>
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

const Pagination = ({ totalPages, currentPage, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="flex justify-center mt-3">
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


export default OrderTable2;
