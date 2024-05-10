import React from 'react';

const OrderTable = () => {
    // Data dummy untuk rekapan orderan
    const orders = [
        { no: 1, noOrder: 'ORD001', tglOrder: '2024-04-20', namaPelanggan: 'John Doe', jenisPaket: 'Cuci Setrika', waktuKerja: '1 hari', berat: '5 kg' },
        { no: 2, noOrder: 'ORD002', tglOrder: '2024-04-21', namaPelanggan: 'Jane Smith', jenisPaket: 'Cuci Kering', waktuKerja: '2 hari', berat: '3 kg' },
        { no: 3, noOrder: 'ORD003', tglOrder: '2024-04-22', namaPelanggan: 'Michael Johnson', jenisPaket: 'Cuci Lipat', waktuKerja: '1 hari', berat: '4 kg' },
    ];

    return (
        <div className="container mt-4">
            <div className="overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="text-left bg-gray-200">
                            <th className="px-4 py-2">No</th>
                            <th className="px-4 py-2">No Order</th>
                            <th className="px-4 py-2">Tanggal Order</th>
                            <th className="px-4 py-2">Nama Pelanggan</th>
                            <th className="px-4 py-2">Jenis Paket</th>
                            <th className="px-4 py-2">Waktu Kerja</th>
                            <th className="px-4 py-2">Berat (kg)</th>
                            <th className="px-4 py-2">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={order.noOrder} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-300'}>
                                <td className="px-4 py-2">{order.no}</td>
                                <td className="px-4 py-2">{order.noOrder}</td>
                                <td className="px-4 py-2">{order.tglOrder}</td>
                                <td className="px-4 py-2">{order.namaPelanggan}</td>
                                <td className="px-4 py-2">{order.jenisPaket}</td>
                                <td className="px-4 py-2">{order.waktuKerja}</td>
                                <td className="px-4 py-2">{order.berat}</td>
                                <td className="px-4 py-2 flex space-x-2">
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded">Detail</button>
                                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded">Hapus</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default OrderTable;
