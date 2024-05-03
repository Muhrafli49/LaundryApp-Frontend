import React, { useState } from "react";
import Navbar from "../../components/Navbar";

const FormOrderExpress = () => {
    // State untuk menyimpan nilai input
    const [formData, setFormData] = useState({
        noOrderExp: "",
        namaPelangganExp: "",
        nomorTeleponExp: "",
        alamatExp: "",
        paketExp: "",
        hargaPerKgExp: 0,
        beratExp: "",
        tglSelesaiExp: "",
        waktuKerjaExp: 0,
        keteranganExp: "",
        totalBayarExp: 0
    });

    // Handler untuk mengubah nilai input saat berubah
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handler untuk mengirim data ke server
    const handleSubmit = (e) => {
        e.preventDefault();
        // Kirim data formData ke server menggunakan fetch atau library Axios
        console.log(formData);
    };

    return (
        <div>
            <Navbar />
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="noOrderExp"
                    value={formData.noOrderExp}
                    onChange={handleChange}
                    placeholder="Nomor Order"
                />
                <input
                    type="text"
                    name="namaPelangganExp"
                    value={formData.namaPelangganExp}
                    onChange={handleChange}
                    placeholder="Nama Pelanggan"
                />
                <input
                    type="text"
                    name="nomorTeleponExp"
                    value={formData.nomorTeleponExp}
                    onChange={handleChange}
                    placeholder="Nomor Telepon"
                />
                <input
                    type="text"
                    name="alamatExp"
                    value={formData.alamatExp}
                    onChange={handleChange}
                    placeholder="Alamat"
                />
                <input
                    type="text"
                    name="paketExp"
                    value={formData.paketExp}
                    onChange={handleChange}
                    placeholder="Paket"
                />
                <input
                    type="number"
                    name="hargaPerKgExp"
                    value={formData.hargaPerKgExp}
                    onChange={handleChange}
                    placeholder="Harga Per Kg"
                />
                <input
                    type="text"
                    name="beratExp"
                    value={formData.beratExp}
                    onChange={handleChange}
                    placeholder="Berat"
                />
                <input
                    type="date"
                    name="tglSelesaiExp"
                    value={formData.tglSelesaiExp}
                    onChange={handleChange}
                    placeholder="Tanggal Selesai"
                />
                <input
                    type="number"
                    name="waktuKerjaExp"
                    value={formData.waktuKerjaExp}
                    onChange={handleChange}
                    placeholder="Waktu Kerja"
                />
                <input
                    type="text"
                    name="keteranganExp"
                    value={formData.keteranganExp}
                    onChange={handleChange}
                    placeholder="Keterangan"
                />
                <input
                    type="number"
                    name="totalBayarExp"
                    value={formData.totalBayarExp}
                    onChange={handleChange}
                    placeholder="Total Bayar"
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default FormOrderExpress;