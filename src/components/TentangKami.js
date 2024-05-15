import React from 'react';
import Navbar from '../components/Navbar';

const TentangKami = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-5">
        <h1 className="text-3xl font-bold mb-3">Tentang Kami</h1>
        <p className="text-lg">Kami adalah tim yang berdedikasi untuk memberikan solusi terbaik dalam pembuatan aplikasi web dan pengembangan perangkat lunak. Dengan pengalaman yang luas dan keahlian dalam teknologi terkini, kami siap membantu Anda mencapai tujuan bisnis Anda.</p>
      </div>
    </div>
  );
}

export default TentangKami;
