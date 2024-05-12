import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderTable3 = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/order_str');
            setOrders(response.data.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const handleDetail = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/order_str/${id}`);
            alert(JSON.stringify(response.data)); // Tampilkan informasi data pada ID tersebut
        } catch (error) {
            console.error('Error fetching order detail:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/order_str/delete/${id}`);
            alert('Order berhasil dihapus.');
            fetchData(); // Ambil data baru setelah penghapusan berhasil
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    return (
        <div className="container mt-4">
            <div className="overflow-x-auto">
            <h2 className="lg:text-2xl sm:text-xl mb-2">Orderan Paket Setrika</h2>
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
                                <td className="px-6 py-3">{order.noOrderStr}</td>
                                <td className="px-6 py-3">{new Date(order.tglOrderStr).toLocaleDateString()}</td>
                                <td className="px-6 py-3">{order.namaPelangganStr}</td>
                                <td className="px-6 py-3">{order.paketStr}</td>
                                <td className="px-6 py-3">{order.waktuKerjaStr}</td>
                                <td className="px-6 py-3">{order.beratStr}</td>
                                <td className="px-6 py-3 flex space-x-2">
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded" onClick={() => handleDetail(order._id)}>Detail</button>
                                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded" onClick={() => handleDelete(order._id)}>Hapus</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <br>
            </br>
            <br>
            </br>
        </div>
    );    
};

export default OrderTable3;
