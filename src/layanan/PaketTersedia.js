import React from "react";
import { Link } from "react-router-dom"; 
import Navbar from "../components/Navbar";
import DoneIcon from '../assets/ceklis-removebg.png';

const TambahOrder = () => {
    return (
        <div className="w-full h-full min-h-screen bg-yellow-50">
            <Navbar />
            <div className="container mx-auto">
                <div className="card mt-8">
                    <div className="card-body">
                    <div className="flex justify-between items-center">
                    <h2 className="text-3xl lg:text-4xl mb-5 p-2">Paket Tersedia</h2>
                        <Link to="/dashboard" className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded m-3">Kembali</Link>
                    </div>
                    <h5 className="text-center my-3 font-semibold text-xl">Pilih Paket</h5>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                            <div className="card bg-yellow-200 p-5 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
                            <Link to="/paket_express" className="text-decoration-none">
                                <div className="card-body text-center">
                                    <div className="flex items-center justify-center">
                                        <img src={DoneIcon} alt="Order Done" className="w-20 h-15 mr-5" />
                                        <div>
                                            <h5 className="card-title text-orange-950 text-lg mt-4">Paket Express</h5>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            </div>
                            <div className="card bg-yellow-200 p-5 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
                                <Link to="/paket_reguler" className="text-decoration-none">
                                    <div className="card-body text-center">
                                        <div className="flex items-center justify-center">
                                            <img src={DoneIcon} alt="Order Done" className="w-20 h-15 mr-5" />
                                            <div>
                                                <h5 className="card-title text-orange-950 text-lg mt-3">Paket Reguler</h5>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="card bg-yellow-200 p-5 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
                            <Link to="/paket_setrika" className="text-decoration-none">
                                <div className="card-body text-center">
                                    <div className="flex items-center justify-center">
                                        <img src={DoneIcon} alt="Order Done" className="w-20 h-15 mr-5" />
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

export default TambahOrder;
