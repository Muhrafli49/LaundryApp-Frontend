import React from 'react';
import PegawaiIcon from '../../assets/pegawai-removebg.png';

const Hero = () => {
    return (
        <div className="flex-1">
            <div>
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
    );
};

export default Hero;
