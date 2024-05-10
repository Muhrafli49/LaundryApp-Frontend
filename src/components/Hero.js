import React from 'react';
import { Link } from 'react-router-dom';
import DoneIcon from '../assets/ceklis-removebg.png'


const Hero = () => {
    return (
        <div className="container mt-5">
            <h2 className="mb-4 hero-title text-xl">
                <strong>Selamat Datang </strong> 
                di Dashboard <br />
                Pegawai
            </h2>
            <div className="card-footer flex justify-end">
                <Link to="/tambah_orderan" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded mb-3" style={{ height: '3rem', lineHeight: '2rem' }}>
                    + Tambah Orderan
                </Link>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <div className="text-decoration-none">
                        <div className="card mb-3 p-3 hover:opacity-90 cursor-pointer rounded-lg bg-yellow-200 transition duration-300 ease-in-out transform hover:scale-105">
                            <div className="card-body text-center">
                                <div className="flex items-center justify-center">
                                <img src={DoneIcon} alt="Order Done" className="w-20 h-15 mr-5" />
                                    <div>
                                        <h5 className="card-title text-orange-950 text-lg mt-4 ml-2">Orderan Selesai</h5>
                                        <p className="card-text">100</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="text-decoration-none">
                        <div className="card mb-3 p-3 hover:opacity-90 cursor-pointer rounded-lg bg-yellow-200 transition duration-300 ease-in-out transform hover:scale-105" >
                            <div className="card-body text-center">
                                <div className="flex items-center justify-center">
                                <img src={DoneIcon} alt="Order Done" className="w-20 h-15 mr-5" />
                                    <div>
                                        <h5 className="card-title text-orange-950 text-lg mt-4 ml-2">Total Orderan</h5>
                                        <p className="card-text">500</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="text-decoration-none">
                        <div className="card mb-3 p-3 hover:opacity-90 cursor-pointer rounded-lg bg-yellow-200 transition duration-300 ease-in-out transform hover:scale-105" >
                            <div className="card-body text-center">
                                <div className="flex items-center justify-center">
                                <img src={DoneIcon} alt="Order Done" className="w-20 h-15 mr-5" />
                                    <div>
                                        <h5 className="card-title text-orange-950 text-lg mt-4 ml-2">Paket Tersedia</h5>
                                        <p className="card-text">200</p>
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

export default Hero;
