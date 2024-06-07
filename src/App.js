import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

// Pegawai
import Login from './components/Login';
import Dashboard from './layouts/Dashboard';
import PaketTersedia from './layanan/PaketTersedia';
import RiwayatTransaksi from './layanan/RiwayatTransaksi';
import TambahOrder from './layanan/TambahOrderan';
import PengajuanBarang from './layanan/PengajuanBarang';
import EditFormPengajuan from './pages/Edit/EditFormPengajuan';
import EditFormPelanggan from './pages/Edit/EditFormPelanggan';
import DetailOrderExp from './pages/Detail/DetailOrderExp';
import DetailOrderReg from './pages/Detail/DetailOrderReg';
import DetailOrderStr from './pages/Detail/DetailOrderStr';
import PembayaranExp from './layanan/PembayaranExp';
import PembayaranReg from './layanan/PembayaranReg';
import PembayaranStr from './layanan/PembayaranStr';
import Pelanggan from './layanan/Pelanggan';

// Admin
import DashboardAdmin from './admin/layouts/DashboardAdmin';
import JumlahKaryawan from './admin/pages/JumlahKaryawan';
import EditFormTambahPegawai from './admin/Edit/EditFormTambahPegawai';
import PaketLaundry from './admin/pages/PaketLaundry';
import PaketExpressTersedia from './admin/pages/Paket/PaketExpressTersedia';
import PaketRegulerTersedia from './admin/pages/Paket/PaketRegulerTersedia';
import PaketSetrikaTersedia from './admin/pages/Paket/PaketSetrikaTersedia';
import PersetujuanPengajuan from './admin/pages/PersetujuanPengajuan';
import EditFormPersetujuan from './admin/Edit/EditFormPersetujuan';
import Invoice from './layanan/Invoice';
import LaporanOrderan from './admin/pages/LaporanOrderan';
import Barcode from './admin/pages/BarcodeQr';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Pegawai */}
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} roles={['pegawai', 'admin']} />} />
        <Route path="/paket_tersedia" element={<ProtectedRoute component={PaketTersedia} roles={['pegawai', 'admin']} />} />
        <Route path="/riwayat_transaksi" element={<ProtectedRoute component={RiwayatTransaksi} roles={['pegawai', 'admin']} />} />
        <Route path="/tambah_orderan" element={<ProtectedRoute component={TambahOrder} roles={['pegawai', 'admin']} />} />
        <Route path="/pengajuan_barang" element={<ProtectedRoute component={PengajuanBarang} roles={['pegawai', 'admin']} />} />
        <Route path="/edit/form_pengajuan/:id" element={<ProtectedRoute component={EditFormPengajuan} roles={['pegawai', 'admin']} />} />
        <Route path="/detail/order_exp/:id" element={<ProtectedRoute component={DetailOrderExp} roles={['pegawai', 'admin']} />} />
        <Route path="/detail/order_reg/:id" element={<ProtectedRoute component={DetailOrderReg} roles={['pegawai', 'admin']} />} />
        <Route path="/detail/order_str/:id" element={<ProtectedRoute component={DetailOrderStr} roles={['pegawai', 'admin']} />} />
        <Route path="/pembayaran/exp/:id" element={<ProtectedRoute component={PembayaranExp} roles={['pegawai', 'admin']} />} />
        <Route path="/pembayaran/reg/:id" element={<ProtectedRoute component={PembayaranReg} roles={['pegawai', 'admin']} />} />
        <Route path="/pembayaran/str/:id" element={<ProtectedRoute component={PembayaranStr} roles={['pegawai', 'admin']} />} />
        <Route path="/invoice/:type/:id" element={<ProtectedRoute component={Invoice} roles={['pegawai', 'admin']} />} />
        <Route path="/tambah_pelanggan" element={<ProtectedRoute component={Pelanggan} roles={['pegawai', 'admin']} />} />
        <Route path="/edit/form_tambah_pelanggan/:id" element={<ProtectedRoute component={EditFormPelanggan} roles={['pegawai', 'admin']} />} />
        <Route path="/barcode" element={<ProtectedRoute component={Barcode} roles={['pegawai', 'admin']} />} />

        {/* Admin */}
        <Route path="/dashboard/admin" element={<ProtectedRoute component={DashboardAdmin} roles={['admin']} />} />
        <Route path="/jumlah_karyawan" element={<ProtectedRoute component={JumlahKaryawan} roles={['admin']} />} />
        <Route path="/edit/form_tambah_pegawai/:id" element={<ProtectedRoute component={EditFormTambahPegawai} roles={['admin']} />} />
        <Route path="/paket_laundry" element={<ProtectedRoute component={PaketLaundry} roles={['admin']} />} />
        <Route path="/paket_express_tersedia" element={<ProtectedRoute component={PaketExpressTersedia} roles={['admin']} />} />
        <Route path="/paket_reguler_tersedia" element={<ProtectedRoute component={PaketRegulerTersedia} roles={['admin']} />} />
        <Route path="/paket_setrika_tersedia" element={<ProtectedRoute component={PaketSetrikaTersedia} roles={['admin']} />} />
        <Route path="/persetujuan_pengajuan" element={<ProtectedRoute component={PersetujuanPengajuan} roles={['admin']} />} />
        <Route path="/persetujuan/form_pengajuan/:id" element={<ProtectedRoute component={EditFormPersetujuan} roles={['admin']} />} />
        <Route path="/laporan_orderan" element={<ProtectedRoute component={LaporanOrderan} roles={['admin']} />} />
      </Routes>
    </div>
  );
}

export default App;
