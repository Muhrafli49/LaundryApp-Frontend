import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const TotalOrderan = () => {
    // Data dummy untuk rekap orderan
    const orders = [
        { no: 1, noOrder: 'ORD001', nama: 'John Doe', jenisPaket: 'Cuci Setrika', jumlah: 2, total: '$20', uangBayar: '$50', kembalian: '$30', status: 'Selesai' },
        { no: 2, noOrder: 'ORD002', nama: 'Jane Smith', jenisPaket: 'Cuci Kering', jumlah: 1, total: '$15', uangBayar: '$20', kembalian: '$5', status: 'Proses' },
        { no: 3, noOrder: 'ORD003', nama: 'Michael Johnson', jenisPaket: 'Cuci Lipat', jumlah: 3, total: '$36', uangBayar: '$40', kembalian: '$4', status: 'Selesai' },
    ];

    return (
        <div>
            <Navbar />
            <div className="container mt-4">
                <div className="card">
                    <div className="card-body">
                        <h3 className="card-title mb-5">Total Orderan</h3>
                        <Link to="/dashboard" className="btn btn-primary btn-sm btn-kembali">Kembali</Link>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>No Order</th>
                                    <th>Nama</th>
                                    <th>Jenis Paket</th>
                                    <th>Jumlah</th>
                                    <th>Total</th>
                                    <th>Uang Bayar</th>
                                    <th>Kembalian</th>
                                    <th>Status</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order.noOrder}>
                                        <td>{order.no}</td>
                                        <td>{order.noOrder}</td>
                                        <td>{order.nama}</td>
                                        <td>{order.jenisPaket}</td>
                                        <td>{order.jumlah}</td>
                                        <td>{order.total}</td>
                                        <td>{order.uangBayar}</td>
                                        <td>{order.kembalian}</td>
                                        <td>{order.status}</td>
                                        <td className="btn-group">
                                            <button className="btn btn-primary btn-md p-2">Detail</button>
                                            <button className="btn btn-danger btn-md p-2">Cetak</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TotalOrderan;
