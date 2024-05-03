import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const PaketReguler = () => {
    // Data dummy untuk daftar paket reguler
    const paketReguler = [
        { no: 1, namaPaket: 'Cuci Setrika', waktuKerja: '1 hari', beratMin: '5 kg', tarif: '$10' },
        { no: 2, namaPaket: 'Cuci Kering', waktuKerja: '2 hari', beratMin: '3 kg', tarif: '$15' },
        { no: 3, namaPaket: 'Cuci Lipat', waktuKerja: '1 hari', beratMin: '4 kg', tarif: '$12' },
    ];

    return (
        <div>
            <Navbar />
            <div className="container mt-4">
                <div className="card">
                    <div className="card-body">
                        <h3 className="card-title mb-5">Daftar Paket Reguler Tersedia</h3>
                        <Link to="/tambah_orderan" className="btn btn-primary btn-sm btn-kembali">Kembali</Link>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Nama Paket</th>
                                    <th>Waktu Kerja</th>
                                    <th>Berat Min(Kg)</th>
                                    <th>Tarif</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paketReguler.map(paket => (
                                    <tr key={paket.no}>
                                        <td>{paket.no}</td>
                                        <td>{paket.namaPaket}</td>
                                        <td>{paket.waktuKerja}</td>
                                        <td>{paket.beratMin}</td>
                                        <td>{paket.tarif}</td>
                                        <td className="btn-group">
                                            <button className="btn btn-primary btn-md p-2">Edit</button>
                                            <button className="btn btn-danger btn-md p-2">Hapus</button>
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
}

export default PaketReguler;
