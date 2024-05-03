import React from 'react';
import '../style/OrderTable.css';

const OrderTable = () => {
    // Data dummy untuk rekapan orderan
    const orders = [
        { no: 1, noOrder: 'ORD001', tglOrder: '2024-04-20', namaPelanggan: 'John Doe', jenisPaket: 'Cuci Setrika', waktuKerja: '1 hari', berat: '5 kg' },
        { no: 2, noOrder: 'ORD002', tglOrder: '2024-04-21', namaPelanggan: 'Jane Smith', jenisPaket: 'Cuci Kering', waktuKerja: '2 hari', berat: '3 kg' },
        { no: 3, noOrder: 'ORD003', tglOrder: '2024-04-22', namaPelanggan: 'Michael Johnson', jenisPaket: 'Cuci Lipat', waktuKerja: '1 hari', berat: '4 kg' },
    ];

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-body">
                    <h3 className="mb-3">Rekap Orderan</h3>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>No Order</th>
                                <th>Tanggal Order</th>
                                <th>Nama Pelanggan</th>
                                <th>Jenis Paket</th>
                                <th>Waktu Kerja</th>
                                <th>Berat (kg)</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.noOrder}>
                                    <td>{order.no}</td>
                                    <td>{order.noOrder}</td>
                                    <td>{order.tglOrder}</td>
                                    <td>{order.namaPelanggan}</td>
                                    <td>{order.jenisPaket}</td>
                                    <td>{order.waktuKerja}</td>
                                    <td>{order.berat}</td>
                                    <td className="btn-group">
                                        <button className="btn btn-primary btn-md p-2">Detail</button>
                                        <button className="btn btn-danger btn-md p-2">Hapus</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default OrderTable;
