import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import ExpressPaketIcon from '../assets/express_paket-removebg.png';
import RegulerPaketIcon from '../assets/reguler_paket-removebg.png';
import SetrikaPaketIcon from '../assets/setrika_paket-removebg.png';

const TambahOrderan = () => {
    return (
        <div className="w-full h-full min-h-screen bg-yellow-50">
            <Navbar />
            <div className="container mx-auto">
                <div className="card mt-8">
                    <div className="card-body">
                    <div className="flex justify-between items-center">
                    <h2 className="text-3xl lg:text-4xl mb-5 p-2">Paket Tersedia</h2>
                        <Link to="/dashboard" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-3">Kembali</Link>
                    </div>
                    <h5 className="text-center my-3 font-semibold text-xl">Pilih Paket</h5>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                            <div className="card bg-yellow-200 p-5 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
                            <Link to="/form_order_express" className="text-decoration-none">
                                <div className="card-body text-center">
                                    <div className="flex items-center justify-center">
                                        <img src={ExpressPaketIcon} alt="Order Done" className="w-20 h-15 mr-5" />
                                        <div>
                                            <h5 className="card-title text-orange-950 text-lg mt-4">Paket Express</h5>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            </div>
                            <div className="card bg-yellow-200 p-5 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
                                <Link to="/form_order_reguler" className="text-decoration-none">
                                    <div className="card-body text-center">
                                        <div className="flex items-center justify-center">
                                            <img src={RegulerPaketIcon} alt="Order Done" className="w-20 h-15 mr-5" />
                                            <div>
                                                <h5 className="card-title text-orange-950 text-lg mt-3">Paket Reguler</h5>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="card bg-yellow-200 p-5 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
                            <Link to="/form_order_setrika" className="text-decoration-none">
                                <div className="card-body text-center">
                                    <div className="flex items-center justify-center">
                                        <img src={SetrikaPaketIcon} alt="Order Done" className="w-20 h-15 mr-5" />
                                        <div>
                                        <h5 className="card-title text-orange-950 text-lg mt-3">Paket Setrika</h5>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TambahOrderan;
