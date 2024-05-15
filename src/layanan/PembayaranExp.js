import React, { useState, useEffect } from "react";
import DoneIcon from '../assets/ceklis-removebg.png';
import { useParams, useNavigate } from "react-router-dom"; 
import axios from "axios";

const PembayaranExp = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState({});
    const [totalAmount, setTotalAmount] = useState("");
    const [totalHarga, setTotalHarga] = useState(0);

    useEffect(() => {
        axios.get(`http://localhost:5000/order_exp/${id}`)
            .then(res => {
                setOrder(res.data.data);
                setTotalHarga(res.data.data.totalBayarExp);
            })
            .catch(err => {
                console.error('Error fetching order:', err);
            });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Parsing totalAmount ke tipe angka
        const parsedTotalAmount = parseFloat(totalAmount);
    
        // Memeriksa apakah pesanan sudah terbayar
        // if (order.status) {
        //     alert("Pesanan ini sudah terbayarkan.");
        //     navigate("/riwayat_transaksi");
        //     return; // Menghentikan proses pembayaran jika pesanan sudah terbayarkan
        // }
    
        // Memeriksa apakah jumlah pembayaran cukup
        if (parsedTotalAmount >= totalHarga) {
            try {
                // Mengirim permintaan ke server untuk mengubah status menjadi true
                await axios.put(`http://localhost:5000/order_exp/edit/${id}`, {
                    status: true
                });
    
                // Menampilkan pesan bahwa pembayaran berhasil jika permintaan berhasil
                alert("Pembayaran berhasil!");
    
                // Navigasi ke halaman /riwayat_transaksi setelah pembayaran berhasil
                navigate("/riwayat_transaksi");
            } catch (error) {
                console.error("Error:", error);
            }
        } else {
            // Menampilkan pesan alert pembayaran gagal jika jumlah pembayaran kurang dari total harga
            alert("Pembayaran gagal. Jumlah pembayaran kurang dari total harga.");
            
        }
    };

    return (
        <div className="bg-gradient-to-b from-orange-100 to-orange-500 h-screen relative flex items-center justify-center">
            <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-b from-white to-transparent rounded-full mix-blend-multiply pointer-events-none"></div>
            <div className="max-w-xl bg-white shadow-md rounded-lg overflow-hidden relative">
                <div className="bg-orange-500 h-32 flex items-center justify-center">
                    <img src={DoneIcon} alt="Done" className="w-20 h-auto" /> 
                </div>
                <div className="p-5 text-center">
                    <h2 className="text-2xl font-bold mb-4">Melakukan Pembayaran</h2>
                    <h5 className="text-md font-bold mb-4">#No Order : {order.noOrderExp}</h5>
                    <p className="text-gray-800 mb-4" style={{ maxWidth: '18rem', wordWrap: 'break-word' }}>Mohon isi dengan teliti jumlah total pembayaran yang sesuai dengan transaksi</p>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label
                                htmlFor="totalAmount"
                                className="block text-gray-700 font-bold mb-2 text-left"
                            >
                                Total Harga
                            </label>
                            <input
                                type="number"
                                id="totalAmount"
                                name="totalAmount"
                                value={totalAmount}
                                onChange={(e) => setTotalAmount(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100 bg-opacity-50 block" style={{ height: '3rem' }}
                                placeholder="Masukkan Nominal ex:60000"
                                required
                            />
                        </div>
                        <div className="flex items-center justify-center">
                            <button
                                type="submit"
                                className="bg-orange-600 text-white font-bold text-lg py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition duration-300 ease-in-out transform hover:bg-customBlueHover hover:scale-105" style={{ height: '3rem' }}
                            >
                                Bayar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PembayaranExp;
