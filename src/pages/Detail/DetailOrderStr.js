import axios from "axios";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";

const DetailOrderStr = () => {
    const { id } = useParams();

    const [order, setOrder] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:5000/order_str/${id}`)
            .then(res => {
                setOrder(res.data.data);
                console.log(res.data.data); // Menampilkan data yang ditangkap dari server
            })
            .catch(err => {
                console.error('Error fetching order:', err);
            });
    }, [id]);

    // Fungsi untuk membersihkan bagian waktu dari tanggal
    const cleanDate = (date) => {
        // Pastikan date tidak kosong atau undefined sebelum melakukan split
        if (date) {
            return date.split('T')[0]; // Mengambil bagian tanggal saja
        } else {
            return ''; // Mengembalikan string kosong jika date tidak tersedia
        }
    }

    return (
        <div className="bg-orange-100 to-orange-50 custom-height-110vh">
            <Navbar />
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 shadow-md rounded-lg max-w-3xl mx-auto mt-5">
                <div className="bg-gradient-to-r from-orange-400 to-orange-500 rounded-t-lg p-4 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-white">Detail Order Paket Setrika</h2>
                    <p className="text-right text-white font-bold">No Order: #{order.noOrderStr}</p>
                </div>
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 shadow-md rounded-b-lg">
                <div className="bg-orange-200 to-orange-500 p-2 mb-2">
                    <h4 className="text-lg font-bold ml-5">Pelanggan</h4>
                </div>
                    <div className="flex p-2">
                        <p className="flex-1 ml-5">Nama Pelanggan :</p>
                        <p className="flex-1 font-bold">{order.namaPelangganStr}</p>
                    </div>
                    <div className="flex p-2">
                        <p className="flex-1 ml-5">Nomor Telepon :</p>
                        <p className="flex-1 font-bold">{order.nomorTeleponStr}</p>
                    </div>
                    <div className="flex p-2">
                        <p className="flex-1 ml-5">Alamat :</p>
                        <p className="flex-1 font-bold">{order.alamatStr}</p>
                    </div>
                <div className="bg-orange-200 to-orange-500 p-2 mb-2">
                    <h4 className="text-lg font-bold ml-5">Detail Pesanan</h4>
                </div>
                    <div className="flex p-2">
                        <p className="flex-1 ml-5">Jenis Paket :</p>
                        <p className="flex-1 font-bold">{order.paketStr}</p>
                    </div>
                    <div className="flex p-2">
                        <p className="flex-1 ml-5">Waktu Kerja :</p>
                        <p className="flex-1 font-bold">{order.waktuKerjaStr} Hari</p>
                    </div>
                    <div className="flex p-2">
                        <p className="flex-1 ml-5">Tanggal Order :</p>
                        <p className="flex-1 font-bold">{cleanDate(order.tglOrderStr)}</p>
                    </div>
                    <div className="flex p-2">
                        <p className="flex-1 ml-5">Tanggal Selesai :</p>
                        <p className="flex-1 font-bold">{cleanDate(order.tglSelesaiStr)}</p>
                    </div>
                    <div className="flex p-2">
                            <p className="flex-1 ml-5">Keterangan :</p>
                            <p className="flex-1 font-bold">{order.keteranganStr}</p>
                        </div>
                <div className="bg-orange-200 to-orange-500 p-2 mb-2">
                    <h4 className="text-lg font-bold ml-5">Order</h4>
                </div>
                    <div className="flex p-2 justify-center">
                        <div className="flex flex-col items-center mx-auto">
                            <p className="mb-1">Berat (Kg)</p>
                            <p className="text-center font-bold">{order.beratStr}</p>
                        </div>
                        <div className="flex flex-col items-center mx-auto">
                            <p className="mb-1">Harga (Kg)</p>
                            <p className="text-center font-bold">Rp. {order.hargaPerKgStr}</p>
                        </div>
                        <div className="flex flex-col items-center mx-auto">
                            <p className="mb-1">Total Bayar</p>
                            <p className="text-center font-bold">Rp. {order.totalBayarStr}</p>
                        </div>
                    </div>
                    <div className="text-right p-3">
                        <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded">
                            Bayar Sekarang
                        </button>
                    </div>
                </div>
            </div>
            <br></br>
        </div>
    );

};

export default DetailOrderStr;