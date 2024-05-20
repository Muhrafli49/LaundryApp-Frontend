import React from "react";
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Hero from '../components/Hero';

const DashboardAdmin = () => {

    return (
        <div className="p-2">
            {/* Navbar */}
            <Navbar />
            <div className="flex overflow-auto">
                <Sidebar/>
                <Hero />
            </div>
        </div>
    );
};

export default DashboardAdmin;
