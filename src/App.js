import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

// Pegawai
import Login from './components/Login';
import Dashboard from './layouts/Dashboard';
import PaketTersedia from './layanan/PaketTersedia';
import PaketExpress from './layanan/PaketExpress';
import PaketReguler from './layanan/PaketReguler';
import PaketSetrika from './layanan/PaketSetrika';
import RiwayatTransaksi from './layanan/RiwayatTransaksi';
import TambahOrder from './layanan/TambahOrderan';
import FormOrderExpress from './pages/Form/FormOrderExpress';
import FormOrderReguler from './pages/Form/FormOrderReguler';
import FormOrderSetrika from './pages/Form/FormOrderSetrika';
import FormPengajuanBarang from './pages/Form/FormPengajuan';
import PengajuanBarang from './layanan/PengajuanBarang';
import EditFormPengajuan from './pages/Edit/EditFormPengajuan';
import DetailOrderExp from './pages/Detail/DetailOrderExp';
import DetailOrderReg from './pages/Detail/DetailOrderReg';
import DetailOrderStr from './pages/Detail/DetailOrderStr';
import PembayaranExp from './layanan/PembayaranExp';
import PembayaranReg from './layanan/PembayaranReg';
import PembayaranStr from './layanan/PembayaranStr';
import TentangKami from './components/TentangKami';

// Admin
import DashboardAdmin from './admin/layouts/DashboardAdmin';
import JumlahKaryawan from './admin/pages/JumlahKaryawan';
import FormTambahPegawai from './admin/Form/FormTambahPegawai';
import EditFormTambahPegawai from './admin/Edit/EditFormTambahPegawai';
import PaketLaundry from './admin/pages/PaketLaundry';
import PaketExpressTersedia from './admin/pages/Paket/PaketExpressTersedia';
import PaketRegulerTersedia from './admin/pages/Paket/PaketRegulerTersedia';
import PaketSetrikaTersedia from './admin/pages/Paket/PaketSetrikaTersedia';
import FormPaketExpress from './admin/Form/FormPaketExpress';
import FormPaketReguler from './admin/Form/FormPaketReguler';
import FormPaketSetrika from './admin/Form/FormPaketSetrika';
import PersetujuanPengajuan from './admin/pages/PersetujuanPengajuan';
import EditFormPersetujuan from './admin/Edit/EditFormPersetujuan';
import Invoice from './layanan/Invoice';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Pegawai */}
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} roles={['pegawai', 'admin']} />} />
        <Route path="/paket_tersedia" element={<ProtectedRoute component={PaketTersedia} roles={['pegawai', 'admin']} />} />
        <Route path="/paket_express" element={<ProtectedRoute component={PaketExpress} roles={['pegawai', 'admin']} />} />
        <Route path="/paket_reguler" element={<ProtectedRoute component={PaketReguler} roles={['pegawai', 'admin']} />} />
        <Route path="/paket_setrika" element={<ProtectedRoute component={PaketSetrika} roles={['pegawai', 'admin']} />} />
        <Route path="/riwayat_transaksi" element={<ProtectedRoute component={RiwayatTransaksi} roles={['pegawai', 'admin']} />} />
        <Route path="/tambah_orderan" element={<ProtectedRoute component={TambahOrder} roles={['pegawai', 'admin']} />} />
        <Route path="/form_order_express" element={<ProtectedRoute component={FormOrderExpress} roles={['pegawai', 'admin']} />} />
        <Route path="/form_order_reguler" element={<ProtectedRoute component={FormOrderReguler} roles={['pegawai', 'admin']} />} />
        <Route path="/form_order_setrika" element={<ProtectedRoute component={FormOrderSetrika} roles={['pegawai', 'admin']} />} />
        <Route path="/pengajuan_barang" element={<ProtectedRoute component={PengajuanBarang} roles={['pegawai', 'admin']} />} />
        <Route path="/form_pengajuan" element={<ProtectedRoute component={FormPengajuanBarang} roles={['pegawai', 'admin']} />} />
        <Route path="/edit/form_pengajuan/:id" element={<ProtectedRoute component={EditFormPengajuan} roles={['pegawai', 'admin']} />} />
        <Route path="/detail/order_exp/:id" element={<ProtectedRoute component={DetailOrderExp} roles={['pegawai', 'admin']} />} />
        <Route path="/detail/order_reg/:id" element={<ProtectedRoute component={DetailOrderReg} roles={['pegawai', 'admin']} />} />
        <Route path="/detail/order_str/:id" element={<ProtectedRoute component={DetailOrderStr} roles={['pegawai', 'admin']} />} />
        <Route path="/pembayaran/exp/:id" element={<ProtectedRoute component={PembayaranExp} roles={['pegawai', 'admin']} />} />
        <Route path="/pembayaran/reg/:id" element={<ProtectedRoute component={PembayaranReg} roles={['pegawai', 'admin']} />} />
        <Route path="/pembayaran/str/:id" element={<ProtectedRoute component={PembayaranStr} roles={['pegawai', 'admin']} />} />
        <Route path="/invoice/:type/:id" element={<ProtectedRoute component={Invoice} roles={['pegawai', 'admin']} />} />
        <Route path="/tentang_kami" element={<TentangKami />} />

        {/* Admin */}
        <Route path="/dashboard/admin" element={<ProtectedRoute component={DashboardAdmin} roles={['admin']} />} />
        <Route path="/jumlah_karyawan" element={<ProtectedRoute component={JumlahKaryawan} roles={['admin']} />} />
        <Route path="/form_tambah_pegawai" element={<ProtectedRoute component={FormTambahPegawai} roles={['admin']} />} />
        <Route path="/edit/form_tambah_pegawai/:id" element={<ProtectedRoute component={EditFormTambahPegawai} roles={['admin']} />} />
        <Route path="/paket_laundry" element={<ProtectedRoute component={PaketLaundry} roles={['admin']} />} />
        <Route path="/paket_express_tersedia" element={<ProtectedRoute component={PaketExpressTersedia} roles={['admin']} />} />
        <Route path="/paket_reguler_tersedia" element={<ProtectedRoute component={PaketRegulerTersedia} roles={['admin']} />} />
        <Route path="/paket_setrika_tersedia" element={<ProtectedRoute component={PaketSetrikaTersedia} roles={['admin']} />} />
        <Route path="/form_paket_express" element={<ProtectedRoute component={FormPaketExpress} roles={['admin']} />} />
        <Route path="/form_paket_reguler" element={<ProtectedRoute component={FormPaketReguler} roles={['admin']} />} />
        <Route path="/form_paket_setrika" element={<ProtectedRoute component={FormPaketSetrika} roles={['admin']} />} />
        <Route path="/persetujuan_pengajuan" element={<ProtectedRoute component={PersetujuanPengajuan} roles={['admin']} />} />
        <Route path="/persetujuan/form_pengajuan/:id" element={<ProtectedRoute component={EditFormPersetujuan} roles={['admin']} />} />
      </Routes>
    </div>
  );
}

export default App;
