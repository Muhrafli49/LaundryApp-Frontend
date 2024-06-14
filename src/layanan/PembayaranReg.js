import React, { useState, useEffect } from "react";
import DoneIcon from '../assets/ceklis-removebg.png';
import { useParams, useNavigate } from "react-router-dom"; 
import axios from '../services/index';
import { Alert, AlertIcon } from "@chakra-ui/react";

const PembayaranReg = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState({});
    const [totalAmount, setTotalAmount] = useState("");
    const [totalHarga, setTotalHarga] = useState(0);
    const [showNotification, setShowNotification] = useState(false);
    const [showWarning, setShowWarning] = useState(false);

    useEffect(() => {
        axios.get(`/order_reg/${id}`)
            .then(res => {
                setOrder(res.data.data);
                setTotalHarga(res.data.data.totalBayarReg);
            })
            .catch(err => {
                console.error('Error fetching order:', err);
            });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Parsing totalAmount ke tipe angka
        const parsedTotalAmount = parseFloat(totalAmount);

    
        // Memeriksa apakah jumlah pembayaran cukup
        if (parsedTotalAmount >= totalHarga) {
            try {
                // Mengirim permintaan ke server untuk mengubah status menjadi true
                await axios.put(`/order_reg/edit/${id}`, {
                    status: true
                });
    
                // Menampilkan notifikasi bahwa pembayaran berhasil jika permintaan berhasil
                setShowNotification(true);

                // Navigasi ke halaman /riwayat_transaksi setelah pembayaran berhasil
                setTimeout(() => {
                    navigate("/riwayat_transaksi");
                }, 2500); // Delay 2.5 detik sebelum navigasi
            } catch (error) {
                console.error("Error:", error);
            }
        } else {
            // Menampilkan peringatan jika jumlah pembayaran kurang dari total harga
            setShowWarning(true);            
        }
    };

    const handleFormClick = () => {
        setShowWarning(false);
    };

    return (
        <div className="bg-gradient-to-b from-orange-100 to-orange-500 h-screen relative flex items-center justify-center">
            {/* Alert Success */}
            {showNotification && (
                <div className="animate-slide-down bg-white border border-green-400 text-green-700 px-4 py-3 rounded absolute top-10 left-1/2 transform -translate-x-1/2">
                    <Alert status="success" className="flex items-center">
                        <AlertIcon boxSize="20px" />
                        <span className="ml-2">Pembayaran berhasil!</span>
                    </Alert>
                </div>
            )}
            {/* Alert Warning */}
            {showWarning && (
                <div className="animate-slide-down bg-white border border-yellow-400 text-yellow-700 px-4 py-3 rounded absolute top-10 left-1/2 transform -translate-x-1/2">
                    <Alert status="warning" className="flex items-center">
                        <AlertIcon boxSize="20px" />
                        <span className="ml-2">Pembayaran gagal. Jumlah pembayaran kurang dari total harga.</span>
                    </Alert>
                </div>
            )}
            <div className="max-w-xl bg-white shadow-md rounded-lg overflow-hidden relative">
                <div className="bg-orange-500 h-32 flex items-center justify-center">
                    <img src={DoneIcon} alt="Done" className="w-20 h-auto" /> 
                </div>
                <div className="p-5 text-center">
                    <h2 className="text-2xl font-bold mb-4">Melakukan Pembayaran</h2>
                    <h5 className="text-md font-bold mb-4">#No Order : {order.noOrderReg}</h5>
                    <h5 className="text-md font-bold mb-4">#Total Nominal: {order.totalBayarReg ? order.totalBayarReg.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }) : '-'}</h5>
                    <p className="text-gray-800 mb-4" style={{ maxWidth: '18rem', wordWrap: 'break-word' }}>Mohon isi dengan teliti jumlah total pembayaran yang sesuai dengan transaksi</p>
                    <form onClick={handleFormClick} onSubmit={handleSubmit}>
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

export default PembayaranReg;
