import React from "react";
import { Link } from "react-router-dom"; 
import Navbar from "../components/Navbar"; 
import "../style/TambahOrder.css";

const TambahOrder = () => {
    return (
        <div>
            <Navbar/>
            <div className="container">
                <div className="card">
                    <div className="card-body">
                        <h2 className="card-title mb-5">Tambah Orderan</h2>
                        <Link to="/dashboard" className="btn btn-primary btn-sm btn-kembali">Kembali</Link>
                        <h5 className="text-center">Pilih Paket</h5>
                        <div className="row mt-3">
                            <div className="col-md-4">
                                <Link to="/paket_express" className="text-decoration-none text-dark">
                                    <div className="card mb-3 p-5">
                                        <div className="card-body text-center">
                                            <h5 className="card-title">Cuci Setrika Express</h5>
                                            <p className="card-text">100</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-md-4">
                                <Link to="/paket_reguler" className="text-decoration-none text-dark">
                                    <div className="card mb-3 p-5">
                                        <div className="card-body text-center">
                                            <h5 className="card-title">Cuci Setrika Reguler</h5>
                                            <p className="card-text">500</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-md-4">
                                <Link to="/paket_setrika" className="text-decoration-none text-dark">
                                    <div className="card mb-3 p-5">
                                        <div className="card-body text-center">
                                            <h5 className="card-title">Setrika</h5>
                                            <p className="card-text">200</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TambahOrder;