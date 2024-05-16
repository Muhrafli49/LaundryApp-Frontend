import React from "react";
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Hero from '../components/Hero';

const DashboardAdmin = () => {
    const [showSidebar, setShowSidebar] = React.useState(true);

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    return (
        <div className="p-2">
            {/* Navbar */}
            <Navbar />
            <div className="flex">
                {/* Sidebar */}
                {showSidebar && (
                    <Sidebar toggleSidebar={toggleSidebar} />
                )}
                <Hero />
            </div>
        </div>
    );
};

export default DashboardAdmin;
