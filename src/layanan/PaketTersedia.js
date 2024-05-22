import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import PaketExpress from "./PaketExpress"; // Sesuaikan dengan path komponen PaketExpress yang sebenarnya
import ExpressPaketIcon from '../assets/express_paket-removebg.png';
import RegulerPaketIcon from '../assets/reguler_paket-removebg.png';
import SetrikaPaketIcon from '../assets/setrika_paket-removebg.png';
import Footer from '../components/Footer';

const TambahOrder = () => {
    const [showExpressModal, setShowExpressModal] = useState(false);
    const [showRegulerModal, setShowRegulerModal] = useState(false);
    const [showSetrikaModal, setShowSetrikaModal] = useState(false);

    const openExpressModal = () => setShowExpressModal(true);
    const openRegulerModal = () => setShowRegulerModal(true);
    const openSetrikaModal = () => setShowSetrikaModal(true);

    const closeExpressModal = () => setShowExpressModal(false);
    const closeRegulerModal = () => setShowRegulerModal(false);
    const closeSetrikaModal = () => setShowSetrikaModal(false);

    return (
        <div className="flex flex-col min-h-screen bg-yellow-50">
            <Navbar />
            <div className={`container mx-auto flex-1 transition duration-300 ease-in-out ${showExpressModal || showRegulerModal || showSetrikaModal ? 'filter blur-sm' : ''}`}>
                <div className="card mt-8">
                    <div className="card-body">
                        <div className="flex justify-between items-center">
                            <h2 className="text-3xl lg:text-4xl mb-5 p-2">Paket Tersedia</h2>
                            <Link to="/dashboard" className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded m-3">Kembali</Link>
                        </div>
                        <h5 className="text-center my-3 font-semibold text-xl">Pilih Paket</h5>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                            <div className="cursor-pointer card bg-yellow-200 p-5 rounded-lg transition duration-300 ease-in-out transform hover:scale-105" onClick={openExpressModal}>
                                <div className="card-body text-center">
                                    <div className="flex items-center justify-center">
                                        <img src={ExpressPaketIcon} alt="Paket Express" className="w-20 h-20 mr-5" />
                                        <div>
                                            <h5 className="card-title text-orange-950 text-lg mt-4">Paket Express</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="cursor-pointer card bg-yellow-200 p-5 rounded-lg transition duration-300 ease-in-out transform hover:scale-105" onClick={openRegulerModal}>
                                <div className="card-body text-center">
                                    <div className="flex items-center justify-center">
                                        <img src={RegulerPaketIcon} alt="Paket Reguler" className="w-20 h-20 mr-5" />
                                        <div>
                                            <h5 className="card-title text-orange-950 text-lg mt-3">Paket Reguler</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="cursor-pointer card bg-yellow-200 p-5 rounded-lg transition duration-300 ease-in-out transform hover:scale-105" onClick={openSetrikaModal}>
                                <div className="card-body text-center">
                                    <div className="flex items-center justify-center">
                                        <img src={SetrikaPaketIcon} alt="Paket Setrika" className="w-20 h-20 mr-5" />
                                        <div>
                                            <h5 className="card-title text-orange-950 text-lg mt-3">Paket Setrika</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showExpressModal &&
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-5 rounded-lg shadow-lg">
                        <PaketExpress onClose={closeExpressModal} />
                    </div>
                </div>
            }

            {showRegulerModal &&
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-5 rounded-lg shadow-lg">
                        <PaketExpress onClose={closeRegulerModal} />
                    </div>
                </div>
            }

            {showSetrikaModal &&
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-5 rounded-lg shadow-lg">
                        <PaketExpress onClose={closeSetrikaModal} />
                    </div>
                </div>
            }

            <Footer />
        </div>
    );
};

export default TambahOrder;
