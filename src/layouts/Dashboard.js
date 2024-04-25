import React from 'react';
import Navbar from '../components/Navbar'; 
import HeroSection from '../components/Hero'; 
import OrderTable from '../components/OrderTable';

const Dashboard = () => {
    const token = localStorage.getItem('token');

    if(!token) {
        window.location.href = '/';
    } 

    return (
        <div>
            <Navbar />
            <HeroSection />
            <OrderTable/>
        </div>
    );
}

export default Dashboard;
