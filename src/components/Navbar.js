import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LaundryLogo from '../assets/laundry-removebg.png'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    const logout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    }

    return (
        <nav className='p-2' style={{ backgroundColor: '#ED9455' }}>
            <div className="mx-auto px-4">
            <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0 flex items-center">
                    <img src={LaundryLogo} alt="Logo" className="h-12 w-12 m-4" /> 
                        <Link to="/dashboard" className="text-white text-lg font-semibold">Bingo Laundry</Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="flex space-x-4">
                            <Link to="/paket_tersedia" className="text-white hover:bg-orange-900 px-3 py-2 rounded-md text-sm font-medium mt-4">Daftar Paket</Link>
                            <Link to="/riwayat_transaksi" className="text-white hover:bg-orange-900 px-3 py-2 rounded-md text-sm font-medium mt-4">Riwayat Transaksi</Link>
                            <Link to="/pengajuan" className="text-white hover:bg-orange-900 px-3 py-2 rounded-md text-sm font-medium mt-4">Pengajuan</Link>
                            <Link to="/tentang_kami" className="text-white hover:bg-orange-900 px-3 py-2 rounded-md text-sm font-medium mt-4">Tentang Kami</Link>
                        </div>
                    </div>
                    <div className="hidden md:block m-20">
                        <button className="btn btn-danger" onClick={logout}>Logout</button>
                    </div>
                    <div className="md:hidden">
                        <button onClick={toggleNavbar} type="button" className="inline-flex items-center justify-center p-2 text-white hover:bg-slate-400 focus:outline-none focus:bg-gray-700">
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
                {isOpen && (
                    <div className="md:hidden">
                        <div className="flex flex-col mt-2 space-y-2">
                            <Link to="/paket_tersedia" className="text-white hover:bg-orange-900 px-3 py-2 rounded-md text-sm font-medium">Daftar Paket</Link>
                            <Link to="/riwayat_transaksi" className="text-white  hover:bg-orange-900 px-3 py-2 rounded-md text-sm font-medium">Riwayat Transaksi</Link>
                            <Link to="/pengajuan" className="text-white  hover:bg-orange-900 px-3 py-2 rounded-md text-sm font-medium">Pengajuan</Link>
                            <Link to="/tentang_kami" className="text-white  hover:bg-orange-900 px-3 py-2 rounded-md text-sm font-medium">Tentang Kami</Link>
                            <button className="btn btn-danger" onClick={logout}>Logout</button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
