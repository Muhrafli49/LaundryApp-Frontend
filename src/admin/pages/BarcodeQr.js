import React, { useState, useEffect } from "react";
import axios from '../../services/index';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";

const Barcode = () => {
    const [qrCode, setQrCode] = useState('');

    useEffect(() => {
        fetchQrCode();  
        const interval = setInterval(fetchQrCode, 2000); 

        return () => clearInterval(interval);  
    }, []);

    const fetchQrCode = async () => {
        try {
            const response = await axios.get('/konfigurasi/qr-code'); 
            setQrCode(response.data); 
        } catch (error) {
            console.error('Error fetching QR code:', error);
        }
    };

    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex flex-row flex-1">
                <Sidebar />
                <div className="flex-1 p-6 overflow-auto">
                    <div className="container mx-auto">
                        <div className="bg-white shadow-md rounded-lg">
                            <div className="card-body flex justify-between items-center">
                                <div>
                                    <h2 className="text-3xl lg:text-4xl mb-5 p-2 mt-2 font-bold ml-3">Scan Barcode </h2>
                                </div>
                                <div className="flex justify-end">
                                    <Link to="/dashboard/admin" className="m-4 mt-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-500 hover:text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                            <div className="p-6 text-center">
                                {qrCode && (
                                    <>
                                        <img src={qrCode} alt="QR Code" className="mx-auto" />
                                        <p className="mt-4 text-gray-600 text-lg">Silahkan scan barcode</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Barcode;
