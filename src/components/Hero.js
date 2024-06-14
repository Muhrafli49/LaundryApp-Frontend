import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../services/index';
import DoneIcon from '../assets/ceklis-removebg.png';
import OrderanIcon from '../assets/Orderan-removebg.png';
import TersediaIcon from '../assets/Tersedia-removebg.png';

const Hero = () => {
    const [availablePackages, setAvailablePackages] = useState(0);
    const [completedOrders, setCompletedOrders] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        const fetchAvailablePackages = async () => {
            try {
                const response = await axios.get('/jumlah/total_paket');

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
                const [responseExp, responseReg, responseStr] = await Promise.all([
                    axios.get('/order_exp'),
                    axios.get('/order_reg'),
                    axios.get('/order_str')
                ]);

                const combinedOrders = [
                    ...responseExp.data.data,
                    ...responseReg.data.data,
                    ...responseStr.data.data
                ];

                const totalOrdersCount = combinedOrders.length;
                const completedOrdersCount = combinedOrders.filter(order => order.status === true).length;
                
                setTotalOrders(totalOrdersCount);
                setCompletedOrders(completedOrdersCount);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchAvailablePackages();
        fetchOrders();

        // Add scroll listener
        window.addEventListener('scroll', handleScroll);

        return () => {
            // Clean up scroll listener
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScroll = () => {
        if (window.scrollY > 200) { // Show button after scrolling down 200px
            setShowBackToTop(true);
        } else {
            setShowBackToTop(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4 hero-title lg:text-2xl md:text-xl sm:text-lg">
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
                                        <p className="card-text font-bold">{completedOrders}</p>
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
                                    <img src={DoneIcon} alt="Order Done" className="w-16 h-13 mr-5" />
                                    <div>
                                        <h5 className="card-title text-orange-950 text-lg mt-4 ml-2 font-bold">Total Orderan</h5>
                                        <p className="card-text font-bold">{totalOrders}</p>
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
                                        <p className="card-text font-bold">{availablePackages}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showBackToTop && (
                <button onClick={scrollToTop} className="fixed bottom-4 right-4 bg-slate-300 hover:bg-slate-200font-bold py-2 px-2 rounded" style={{ height: '3rem', lineHeight: '2rem' }}>
                    Back to Top
                </button>
            )}
        </div>
    );
}

export default Hero;
