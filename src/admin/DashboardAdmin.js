import React, { useState } from "react";
import { Link } from "react-router-dom";
import LaundryLogo from '../assets/laundry-removebg.png';
import ProfileIcon from '../assets/Profile_icon-removebg.png';
import DashboardIcon from '../assets/dashboard_icon-removebg.png';
import PegawaiIcon from '../assets/pegawai-removebg.png';

const DashboardAdmin = () => {
    const [showSidebar, setShowSidebar] = useState(true);
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setTimeout(() => {
            window.location.href = '/';
        }, 1000); // Menunggu 1 detik sebelum redirect ke halaman utama setelah logout
    }

    return ( 
        <div className="p-2">
            {/* Navbar */}
            <nav className="bg-gradient-to-r from-orange-800 to-orange-700 text-white p-2">
                <div className="mx-auto px-4 flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <img src={LaundryLogo} alt="Logo" className="h-12 w-12 m-2" />
                        <Link to="/dashboard/admin" className="text-white text-xl font-semibold">Bingo Laundry</Link>
                    </div>
                    {/* Profile Dropdown */}
                    <div className="relative">
                        <button onClick={toggleDropdown} className="flex items-center focus:outline-none">
                            <img src={ProfileIcon} alt="Profile" className="h-8 w-8 rounded-full border border-white" />
                        </button>
                        {/* Dropdown Content */}
                        {showDropdown && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                                <div className="py-1">
                                    <button className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left">
                                        Admin
                                    </button>
                                    <button onClick={logout} className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left">
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
            <div className="flex">
                {/* Sidebar */}
                {showSidebar && (
                    <div className="bg-orange-50 h-screen w-1/5 mt-0 rounded-sm border border-orange-300">
                        <div className="flex items-center p-4">
                            <Link to="/dashboard/admin" className="flex items-center">
                                <img src={DashboardIcon} alt="Dashboard Icon" className="w-6 h-6 mr-2" />
                                <h1 className="text-2xl font-bold ml-3 mb-2">Dashboard</h1>
                            </Link>
                        </div>
                        <div className="flex items-center ml-6"> 
                            <Link to="/jumlah_karyawan" className="flex items-center">
                                <div className="flex items-center mr-2 ml-2">
                                    <img src={PegawaiIcon} alt="Pegawai Icon" className="w-4 h-4 mr-2" />
                                    <h4 className="text-lg font-semibold m-3">Pegawai</h4>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center ml-6"> 
                            <Link to="/paket-laundry" className="flex items-center">
                                <div className="flex items-center mr-2 ml-2">
                                    <img src={PegawaiIcon} alt="Paket Laundry Icon" className="w-4 h-4 mr-2" />
                                    <h4 className="text-lg font-semibold m-3">Paket Laundry</h4>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center ml-6"> 
                            <Link to="/laporan-pengajuan" className="flex items-center">
                                <div className="flex items-center mr-2 ml-2">
                                    <img src={PegawaiIcon} alt="Laporan Pengajuan Icon" className="w-4 h-4 mr-2" />
                                    <h4 className="text-lg font-semibold m-3">Laporan Pengajuan</h4>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center ml-6"> 
                            <Link to="/pengajuan" className="flex items-center">
                                <div className="flex items-center mr-2 ml-2">
                                    <img src={PegawaiIcon} alt="Laporan Pengajuan Icon" className="w-4 h-4 mr-2" />
                                    <h4 className="text-lg font-semibold m-3">Pengajuan</h4>
                                </div>
                            </Link>
                        </div>
                        <button onClick={toggleSidebar} className="bg-gray-500 text-white px-4 py-2 mt-4 ml-4 mb-2 rounded-md">Toggle Sidebar</button>
                    </div>
                )}
                <div className="flex-1">
                    <div>
                    <button onClick={toggleSidebar} className="bg-gray-500 text-white px-4 py-2 mt-4 ml-4 mb-2 rounded-md">Toggle Sidebar</button>
                        <h2 className="p-4 hero-title text-xl">
                            <strong>Selamat Datang </strong> 
                            di Dashboard <br />
                            Admin
                        </h2>
                        <div className="flex justify-around mt-6">
                            {/* Card 1 */}
                            <div className="bg-white rounded-lg p-4 shadow-md flex items-center hover:scale-105 transition-transform">
                                <div className="bg-gray-300 rounded-full h-12 w-12 flex items-center justify-center mr-4">
                                    {/* Icon */}
                                    <img src={PegawaiIcon} alt="Employee Icon" className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-lg font-semibold">Jumlah Karyawan</p>
                                    <p className="text-xl font-bold text-right">10</p>
                                </div>
                            </div>
                            {/* Card 2 */}
                            <div className="bg-white rounded-lg p-4 shadow-md flex items-center hover:scale-105 transition-transform">
                                <div className="bg-gray-300 rounded-full h-12 w-12 flex items-center justify-center mr-4">
                                    {/* Icon */}
                                    <img src={PegawaiIcon} alt="Employee Icon" className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-lg font-semibold">Jumlah Karyawan</p>
                                    <p className="text-xl font-bold text-right">10</p>
                                </div>
                            </div>
                            {/* Card 3 */}
                            <div className="bg-white rounded-lg p-4 shadow-md flex items-center hover:scale-105 transition-transform">
                                <div className="bg-gray-300 rounded-full h-12 w-12 flex items-center justify-center mr-4">
                                    {/* Icon */}
                                    <img src={PegawaiIcon} alt="Employee Icon" className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-lg font-semibold">Jumlah Karyawan</p>
                                    <p className="text-xl font-bold text-right">10</p>
                                </div>
                            </div>
                            {/* Card 4 */}
                            <div className="bg-white rounded-lg p-4 shadow-md flex items-center hover:scale-105 transition-transform">
                                <div className="bg-gray-300 rounded-full h-12 w-12 flex items-center justify-center mr-4">
                                    {/* Icon */}
                                    <img src={PegawaiIcon} alt="Employee Icon" className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-lg font-semibold">Jumlah Karyawan</p>
                                    <p className="text-xl font-bold text-right">10</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardAdmin;
