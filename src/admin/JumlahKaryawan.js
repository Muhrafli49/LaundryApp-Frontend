import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const JumlahKaryawan = () => {
    // Data dummy untuk daftar karyawan
    const karyawan = [
        { no: 1, nama: 'John Doe', username: 'johndoe', email: 'john@example.com' },
        { no: 2, nama: 'Jane Smith', username: 'janesmith', email: 'jane@example.com' },
        { no: 3, nama: 'Michael Johnson', username: 'michaeljohnson', email: 'michael@example.com' },
    ];

    return (
        <div>
            <Navbar />
            <div className="container mt-4">
                <div className="card">
                    <div className="card-body">
                        <h3 className="card-title mb-5">Daftar Karyawan</h3>
                        <Link to="/dashboard/admin" className="btn btn-primary btn-sm btn-kembali">Kembali</Link>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Nama Karyawan</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {karyawan.map(karyawan => (
                                    <tr key={karyawan.no}>
                                        <td>{karyawan.no}</td>
                                        <td>{karyawan.nama}</td>
                                        <td>{karyawan.username}</td>
                                        <td>{karyawan.email}</td>
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

export default JumlahKaryawan;
