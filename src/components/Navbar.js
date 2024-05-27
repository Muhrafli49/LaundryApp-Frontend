import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LaundryLogo from '../assets/laundry-removebg.png';
import LogoutIcon from '../assets/logout-removebg.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);
    const location = useLocation();

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    const logout = () => {
        setLoggingOut(true); 
        localStorage.removeItem('token');
        setTimeout(() => {
            window.location.href = '/';
        }, 1000); 
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
                            <NavLink to="/paket_tersedia" isActive={location.pathname === '/paket_tersedia'}>Daftar Paket</NavLink>
                            <NavLink to="/riwayat_transaksi" isActive={location.pathname === '/riwayat_transaksi'}>Riwayat Transaksi</NavLink>
                            <NavLink to="/tambah_pelanggan" isActive={location.pathname === '/tambah_pelanggan'}>Pelanggan</NavLink>
                            <NavLink to="/pengajuan_barang" isActive={location.pathname === '/pengajuan_barang'}>Pengajuan</NavLink>
                        </div>
                    </div>
                    <div className="hidden md:block m-20">
                        <button className="bg-slate-100 rounded-lg flex items-center py-2 px-2 hover:bg-slate-300" onClick={logout}>
                            {loggingOut ? (
                                <svg className="animate-spin h-5 w-5 mr-3 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.008 8.008 0 014 12H0c0 4.418 3.582 8 8 8v-4zm14-8a8.008 8.008 0 01-4 6.928V20c4.418 0 8-3.582 8-8h-4zm-2-5.291A8.008 8.008 0 0120 12h4c0-4.427-3.584-8-8-8v4z"></path>
                                </svg>
                            ) : (
                                <div className="flex items-center">
                                    <img src={LogoutIcon} alt="Logout Icon" className="h-5 w-5 mr-2 mx-auto" />
                                    {/* <span>Logout</span> */}
                                </div>
                            )}
                        </button>
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
                            <NavLink to="/paket_tersedia" isActive={location.pathname === '/paket_tersedia'}>Daftar Paket</NavLink>
                            <NavLink to="/riwayat_transaksi" isActive={location.pathname === '/riwayat_transaksi'}>Riwayat Transaksi</NavLink>
                            <NavLink to="/tambah_pelanggan" isActive={location.pathname === '/tambah_pelanggan'}>Pelanggan</NavLink>
                            <NavLink to="/pengajuan_barang" isActive={location.pathname === '/pengajuan_barang'}>Pengajuan</NavLink>
                            <button className="btn btn-danger flex items-center" onClick={logout}>
                                {loggingOut ? (
                                    <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.008 8.008 0 014 12H0c0 4.418 3.582 8 8 8v-4zm14-8a8.008 8.008 0 01-4 6.928V20c4.418 0 8-3.582 8-8h-4zm-2-5.291A8.008 8.008 0 0120 12h4c0-4.427-3.584-8-8-8v4z"></path>
                                    </svg>
                                ) : (
                                    <span>Logout</span>
                                )}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

const NavLink = ({ to, children, isActive }) => {
    return (
        <Link
            to={to}
            className={`text-white px-3 py-2 rounded-md text-sm font-medium mt-4 ${isActive ? 'bg-orange-900' : 'hover:bg-orange-900'}`}
        >
            {children}
        </Link>
    );
}

export default Navbar;
