import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DoneIcon from '../assets/ceklis-removebg.png';
import OrderanIcon from '../assets/Orderan-removebg.png';
import TersediaIcon from '../assets/Tersedia-removebg.png';

const Hero = () => {
    const [availablePackages, setAvailablePackages] = useState(0);
    const [completedOrders, setCompletedOrders] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);

    useEffect(() => {
        const fetchAvailablePackages = async () => {
            try {
                const response = await axios.get('http://localhost:5000/jumlah/total_paket');
                
                // Log data received from API
                console.log('Total Paket:', response.data);

                if (response.data.success) {
                    setAvailablePackages(response.data.data);
                } else {
                    console.error('Failed to fetch total paket:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching available packages:', error);
            }
        };

        const fetchOrders = async () => {
            try {
                const responseExp = await axios.get('http://localhost:5000/order_exp');
                const responseReg = await axios.get('http://localhost:5000/order_reg');
                const responseStr = await axios.get('http://localhost:5000/order_str');
                
                const combinedOrders = [
                    ...responseExp.data.data,
                    ...responseReg.data.data,
                    ...responseStr.data.data
                ];

                // Hitung total orderan
                const totalOrdersCount = combinedOrders.length;

                // Hitung orderan yang selesai (status true)
                const completedOrdersCount = combinedOrders.filter(order => order.status === true).length;
                
                setTotalOrders(totalOrdersCount);
                setCompletedOrders(completedOrdersCount);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchAvailablePackages();
        fetchOrders();
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="mb-4 hero-title text-xl">
                <strong>Selamat Datang </strong> 
                di Dashboard <br />
                Pegawai
            </h2>
            <div className="card-footer flex justify-end">
                <Link to="/tambah_orderan" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded mb-3" style={{ height: '3rem', lineHeight: '2rem' }}>
                    + Tambah Orderan
                </Link>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <div className="text-decoration-none">
                        <div className="card mb-3 p-3 hover:opacity-90 cursor-pointer rounded-lg bg-yellow-200 transition duration-300 ease-in-out transform hover:scale-105">
                            <div className="card-body text-center">
                                <div className="flex items-center justify-center">
                                    <img src={OrderanIcon} alt="Order Done" className="w-15 h-12 mr-5" />
                                    <div>
                                        <h5 className="card-title text-orange-950 text-lg mt-4 ml-2 font-bold">Orderan Selesai</h5>
                                        <p className="card-text font-bold">{completedOrders}</p> {/* Menampilkan jumlah orderan selesai */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="text-decoration-none">
                        <div className="card mb-3 p-3 hover:opacity-90 cursor-pointer rounded-lg bg-yellow-200 transition duration-300 ease-in-out transform hover:scale-105">
                            <div className="card-body text-center">
                                <div className="flex items-center justify-center">
                                    <img src={DoneIcon} alt="Order Done" className="w-20 h-15 mr-5" />
                                    <div>
                                        <h5 className="card-title text-orange-950 text-lg mt-4 ml-2 font-bold">Total Orderan</h5>
                                        <p className="card-text font-bold">{totalOrders}</p> {/* Menampilkan jumlah total orderan */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="text-decoration-none">
                        <div className="card mb-3 p-3 hover:opacity-90 cursor-pointer rounded-lg bg-yellow-200 transition duration-300 ease-in-out transform hover:scale-105">
                            <div className="card-body text-center">
                                <div className="flex items-center justify-center">
                                    <img src={TersediaIcon} alt="Order Done" className="w-15 h-12 mr-5" />
                                    <div>
                                        <h5 className="card-title text-orange-950 text-lg mt-4 ml-2 font-bold">Paket Tersedia</h5>
                                        <p className="card-text font-bold">{availablePackages}</p> {/* Menampilkan jumlah paket yang tersedia */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;
