import React, { useEffect, useState } from 'react';
import PegawaiIcon from '../../assets/user.png';
import PaketLaundry from '../../assets/paket_icon-removebg.png';
import PengajuanIcon from '../../assets/pengajuan_icon-removebg.png';
import TotalOrderan from '../../assets/rupiah.png';
import axios from '../../services/index';
import Chart from './Chart'; 

const Hero = () => {
    const [jumlahPegawai, setJumlahPegawai] = useState(0);
    const [jumlahPaket, setJumlahPaket] = useState(0);
    const [jumlahPengajuan, setJumlahPengajuan] = useState(0);
    const [totalPendapatan, setTotalPendapatan] = useState(0);

    useEffect(() => {
        const fetchJumlahPegawai = async () => {
            try {
                const response = await axios.get('http://localhost:5000/total_pegawai');
                setJumlahPegawai(response.data.data);
            } catch (error) {
                console.error('Error fetching total pegawai:', error);
            }
        };

        const fetchJumlahPaket = async () => {
            try {
                const response = await axios.get('http://localhost:5000/jumlah/total_paket');
                setJumlahPaket(response.data.data);
            } catch (error) {
                console.error('Error fetching total paket:', error);
            }
        };

        const fetchJumlahPengajuan = async () => {
            try {
                const response = await axios.get('http://localhost:5000/pengajuan/count');
                setJumlahPengajuan(response.data.count);
            } catch (error) {
                console.error('Error fetching total pengajuan:', error);
            }
        };

        const fetchTotalPendapatan = async () => {
            try {
                const response = await axios.get('http://localhost:5000/order/total_pendapatan');
                setTotalPendapatan(response.data.subtotal);
            } catch (error) {
                console.error('Error fetching total pendapatan:', error);
            }
        };

        fetchJumlahPegawai();
        fetchJumlahPaket();
        fetchJumlahPengajuan();
        fetchTotalPendapatan();

    }, []);

    return (
        <div className="flex-1">
            <div className="p-4">
                <h2 className="text-xl font-semibold mb-4">
                    <strong>Selamat Datang </strong> 
                    di Dashboard <br />
                    Admin
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Card 1 */}
                    <div className="card bg-white rounded-lg p-3 shadow-md hover:shadow-xl transition duration-300 flex items-left">
                        <div className="w-16 h-16 mt-2">  
                            <img src={PaketLaundry} alt="Paket Icon"/>
                        </div>
                        <div className='text-right'>
                            <p className="text-lg font-semibold">Paket Tersedia</p>
                            <p className="text-xl font-bold">{jumlahPaket}</p>
                        </div>
                    </div>
                    {/* Card 2 */}
                    <div className="card bg-white rounded-lg p-3 shadow-md hover:shadow-xl transition duration-300 flex items-left">
                        <div className="w-16 h-16 mt-2">  
                            <img src={PegawaiIcon} alt="Pegawai Icon"/>
                        </div>
                        <div className='text-right'>
                            <p className="text-lg font-semibold">Jumlah Pegawai</p>
                            <p className="text-xl font-bold">{jumlahPegawai}</p>
                        </div>
                    </div>
                    {/* Card 3 */}
                    <div className="card bg-white rounded-lg p-3 shadow-md hover:shadow-xl transition duration-300 flex items-left">
                        <div className="w-16 h-16 mt-2">  
                            <img src={PengajuanIcon} alt="Pengajuan Icon"/>
                        </div>
                        <div className='text-right'>
                            <p className="text-lg font-semibold">Total Pengajuan</p>
                            <p className="text-xl font-bold">{jumlahPengajuan}</p>
                        </div>
                    </div>
                    {/* Card 4 */}
                    <div className="card bg-white rounded-lg p-3 shadow-md hover:shadow-xl transition duration-300 flex items-left">
                        <div className="w-16 h-16 mt-2">  
                            <img src={TotalOrderan} alt="Orderan Icon"/>
                        </div>
                        <div className='text-right'>
                            <p className="text-lg font-semibold">Total Orderan</p>
                            <p className="text-xl font-bold">{`Rp. ${new Intl.NumberFormat('id-ID').format(totalPendapatan)}`}</p>
                        </div>
                    </div>
                </div>
                <Chart/>
            </div>
        </div>
    );
};

export default Hero;
