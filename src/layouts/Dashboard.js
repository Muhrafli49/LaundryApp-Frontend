// Dashboard.jsx

import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/Hero';
import OrderTable from '../components/OrderTable';
import OrderTable2 from '../components/OrderTable2';
import OrderTable3 from '../components/OrderTable3';
import Footer from '../components/Footer';

const Dashboard = () => {
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = '/'; // Redirect jika token tidak ada
    }

    return (
        <div className='min-h-screen bg-yellow-50'>
            <Navbar activePage="dashboard" />
            <HeroSection />
            <div className="container mx-auto py-8">
                <OrderTable />
                <OrderTable2 />
                <OrderTable3 />
            </div>
            <Footer />
        </div>
    );
}

export default Dashboard;
