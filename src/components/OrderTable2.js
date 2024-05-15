import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const OrderTable2 = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/order_reg');
            setOrders(response.data.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    // const handleDetail = async (id) => {
    //     try {
    //         const response = await axios.get(`http://localhost:5000/order_reg/${id}`);
    //         alert(JSON.stringify(response.data)); // Tampilkan informasi data pada ID tersebut
    //     } catch (error) {
    //         console.error('Error fetching order detail:', error);
    //     }
    // };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/order_reg/delete/${id}`);
            alert('Order berhasil dihapus.');
            fetchData(); // Ambil data baru setelah penghapusan berhasil
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

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
                        {orders.map((order, index) => (
                            <tr key={order._id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-300'}>
                                <td className="px-6 py-3">{index + 1}</td>
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
                                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded" onClick={() => handleDelete(order._id)}>Hapus</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );    
};

export default OrderTable2;
