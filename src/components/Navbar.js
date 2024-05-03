import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/Navbar.css'

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
        <nav className="navbar navbar-expand-lg navbar-light bg-orange">
            <div className="full-width d-flex justify-content-between m-lg-2">
                <Link className="navbar-brand text-white" to="/">Bingo Laundry</Link>
                <button className="navbar-toggler" type="button" onClick={toggleNavbar}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/dashboard">Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/services">Services</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">Contact</Link>
                        </li>
                    </ul>
                </div>
                <button className='btn btn-danger' onClick={logout}>Logout</button>
            </div>
        </nav>
    );
}

export default Navbar;
