import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TentangKami = () => {
  return (
    <div className="flex flex-col min-h-screen bg-yellow-50">
      <Navbar />
      <div className="container mx-auto flex-grow px-4 py-8">
        <h1 className="text-3xl lg:text-4xl font-bold mb-3">Tentang Kami</h1>
        <p className="text-lg leading-relaxed">
          Kami adalah tim yang berdedikasi untuk memberikan solusi terbaik dalam pembuatan aplikasi web dan pengembangan perangkat lunak. Dengan pengalaman yang luas dan keahlian dalam teknologi terkini, kami siap membantu Anda mencapai tujuan bisnis Anda.
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default TentangKami;
