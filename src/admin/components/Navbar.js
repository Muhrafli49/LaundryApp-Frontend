// Navbar.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import LaundryLogo from '../../assets/laundry-removebg.png';
import ProfileIcon from '../../assets/Profile_icon-removebg.png';

const Navbar = () => {
    const [showDropdown, setShowDropdown] = useState(false);

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
        <nav className="bg-gradient-to-r from-orange-800 to-orange-700 text-white p-2">
            <div className="mx-auto px-4 flex justify-between items-center h-16">
                <div className="flex items-center">
                    <img src={LaundryLogo} alt="Logo" className="h-12 w-12 m-2" />
                    <Link to="/dashboard/admin" className="text-white text-xl font-semibold">Bingo Laundry</Link>
                </div>
                <div className="relative">
                    <button onClick={toggleDropdown} className="flex items-center focus:outline-none">
                        <img src={ProfileIcon} alt="Profile" className="h-8 w-8 rounded-full border border-white" />
                    </button>
                    {showDropdown && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                            <div className="py-1">
                                <button onClick={logout} className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left">
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
