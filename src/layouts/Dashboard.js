import React from 'react';
import Navbar from '../components/Navbar'; 
import HeroSection from '../components/Hero'; 
import OrderTable from '../components/OrderTable';
import OrderTable2 from '../components/OrderTable2';
import OrderTable3 from '../components/OrderTable3';

const Dashboard = () => {
    const token = localStorage.getItem('token');

    if(!token) {
        window.location.href = '/';
    } 

    return (
        <div className='w-full h-full min-h-screen' style={{ backgroundColor: '#FFFDEF' }}>
            <Navbar />
            <HeroSection />
            <OrderTable/>
            <OrderTable2/>
            <OrderTable3/>
        </div>
    );
}

export default Dashboard;
