import React from "react";
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Hero from '../components/Hero';

const DashboardAdmin = () => {
    return (
        <div className="p-2 h-screen flex flex-col">
            <Navbar />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <div className="flex-1 flex flex-col overflow-y-auto pt-6">
                    <Hero />
                </div>
            </div>
        </div>
    );
};

export default DashboardAdmin;
