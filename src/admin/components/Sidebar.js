import React, { useState } from "react";
import { Link } from "react-router-dom";
import DashboardIcon from '../../assets/dashboard-removebg.png';
import PegawaiIcon from '../../assets/pegawaai-removebg.png';
import PaketLaundryIcon from '../../assets/paket.png';
import LaporanIcon from '../../assets/laporan-removebg.png';
import PengajuanIcon from '../../assets/pengajuan-removebg.png';

const Sidebar = () => {
    const [showSidebar, setShowSidebar] = useState(true);

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };


    return (
        <div className="bg-orange-100 h-screen w-1/5 mt-0 rounded-sm border border-slate-900">
            <div className="flex items-center p-4">
                <Link to="/dashboard/admin" className="flex items-center">
                <img src={DashboardIcon} alt="Dashboard Icon" className="w-10 h-10 mr-2" />
                <h1 className="text-2xl font-bold ml-3 mb-2">Dashboard</h1>
                </Link>
            </div>
            <div className="flex items-center ml-6">
                <Link to="/jumlah_karyawan" className="flex items-center">
                <div className="flex items-center mr-2 ml-2 hover:text-gray-600 hover:scale-105 transition-transform">
                    <img src={PegawaiIcon} alt="Pegawai Icon" className="w-10 h-10 mr-2 hover:text-gray-600 hover:scale-105 transition-transform" />
                    <h4 className="text-lg font-semibold m-3 ">Pegawai</h4>
                </div>
                </Link>
            </div>
            <div className="flex items-center ml-6">
                <Link to="/paket_laundry" className="flex items-center">
                <div className="flex items-center mr-2 ml-2 hover:text-gray-600 hover:scale-105 transition-transform">
                    <img src={PaketLaundryIcon} alt="Paket Laundry Icon" className="w-10 h-10 mr-2 hover:text-gray-600 hover:scale-105 transition-transform" />
                    <h4 className="text-lg font-semibold m-3">Paket Laundry</h4>
                </div>
                </Link>
            </div>
            <div className="flex items-center ml-6">
                <Link to="/laporan-pengajuan" className="flex items-center">
                <div className="flex items-center mr-2 ml-2 hover:text-gray-600 hover:scale-105 transition-transform">
                    <img src={LaporanIcon} alt="Laporan Pengajuan Icon" className="w-10 h-10 mr-2 hover:text-gray-600 hover:scale-105 transition-transform" />
                    <h4 className="text-lg font-semibold m-3">Laporan</h4>
                </div>
                </Link>
            </div>
            <div className="flex items-center ml-6">
                <Link to="/persetujuan_pengajuan" className="flex items-center ">
                    <div className="flex items-center mr-2 ml-2 hover:text-gray-600 hover:scale-105 transition-transform">
                        <img src={PengajuanIcon} alt="Pengajuan Icon" className="w-10 h-10 mr-2 hover:text-gray-600 hover:scale-105 transition-transform" />
                        <h4 className="text-lg font-semibold m-3">Pengajuan</h4>
                    </div>
                </Link>
            </div>
            <button onClick={toggleSidebar} className="bg-gray-500 text-white px-4 py-2 mt-4 ml-4 mb-2 rounded-md">Toggle Sidebar</button>
        </div>
    );
};

export default Sidebar;
