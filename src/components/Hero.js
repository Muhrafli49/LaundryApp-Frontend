import React from 'react';
import '../style/Hero.css';
import { Link } from 'react-router-dom'; 

const Hero = () => {

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Selamat Datang di Admin Dashboard</h2>
            <div className="card-footer d-flex justify-content-end">
                <Link to="/tambah_orderan" className="btn btn-primary mb-3">+ Tambah Orderan</Link>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <Link to="/jumlah_karyawan" className="text-decoration-none text-dark">
                        <div className="card mb-3 p-3">
                            <div className="card-body text-center">
                                <h5 className="card-title">Jumlah Karyawan</h5>
                                <p className="card-text">100</p>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="col-md-4">
                    <Link to="/total_orderan" className="text-decoration-none text-dark">
                        <div className="card mb-3 p-3">
                            <div className="card-body text-center">
                                <h5 className="card-title">Total Orderan</h5>
                                <p className="card-text">500</p>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="col-md-4">
                    <Link to="/paket_tersedia" className="text-decoration-none text-dark">
                        <div className="card mb-3 p-3">
                            <div className="card-body text-center">
                                <h5 className="card-title">Jumlah Paket Tersedia</h5>
                                <p className="card-text">200</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );

}

export default Hero;
