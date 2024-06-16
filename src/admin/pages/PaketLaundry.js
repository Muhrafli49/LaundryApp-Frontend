import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ExpressPaketIcon from '../../assets/express-removebg.png';
import RegulerPaketIcon from '../../assets/reguler_paket-removebg.png';
import SetrikaPaketIcon from '../../assets/setrika_paket-removebg.png';

const PaketLaundry = () => {
    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex flex-row flex-1">
                <Sidebar />
                <div className="flex-1 p-6 overflow-auto">
                    <div className="container mx-auto">
                        <div className="bg-white shadow-md rounded-lg p-8">
                            <div className="card-body">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-3xl lg:text-4xl mb-5 p-2 mt-2 font-bold ml-3">Paket Laundry</h2>
                                    <Link to="/dashboard/admin" className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded">Kembali</Link>
                                </div>
                                <h5 className="text-center my-3 font-semibold text-xl">Pilih Paket</h5>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                                    {/* Paket Express */}
                                    <div className="card bg-orange-600 p-3 md:p-5 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
                                        <Link to="/paket_express_tersedia" className="text-decoration-none">
                                            <div className="card-body text-center">
                                                <div className="flex items-center justify-center">
                                                    <img src={ExpressPaketIcon} alt="Order Done" className="w-12 h-12 mr-4" />
                                                    <div>
                                                        <p className="card-title text-white font-bold text-sm md:text-lg mt-2 md:mt-4">Paket Express</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    {/* Paket Reguler */}
                                    <div className="card bg-orange-600 p-3 md:p-5 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
                                        <Link to="/paket_reguler_tersedia" className="text-decoration-none">
                                            <div className="card-body text-center">
                                                <div className="flex items-center justify-center">
                                                    <img src={RegulerPaketIcon} alt="Order Done" className="w-12 h-12 mr-4" />
                                                    <div>
                                                        <h5 className="card-title text-white font-bold text-sm md:text-lg mt-2 md:mt-3">Paket Reguler</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    {/* Paket Setrika */}
                                    <div className="card bg-orange-600 p-3 md:p-5 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
                                        <Link to="/paket_setrika_tersedia" className="text-decoration-none">
                                            <div className="card-body text-center">
                                                <div className="flex items-center justify-center">
                                                    <img src={SetrikaPaketIcon} alt="Order Done" className="w-12 h-12 mr-4" />
                                                    <div>
                                                        <h5 className="card-title text-white font-bold text-sm md:text-lg mt-2 md:mt-3">Paket Setrika</h5>
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
            </div>
        </div>
    );
}

export default PaketLaundry;
