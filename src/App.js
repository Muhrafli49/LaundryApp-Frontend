import { Route, Routes } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './layouts/Dashboard';
import PaketTersedia from './layanan/PaketTersedia';
import PaketExpress from './layanan/PaketExpress';
import PaketReguler from './layanan/PaketReguler';
import PaketSetrika from './layanan/PaketSetrika';
import JumlahKaryawan from './admin/JumlahKaryawan';
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


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />'
        <Route path='/paket_tersedia' element={<PaketTersedia />} />
        <Route path='/paket_express' element={<PaketExpress />} />
        <Route path='/paket_reguler' element={<PaketReguler />} />
        <Route path='/paket_setrika' element={<PaketSetrika />} />
        <Route path='/jumlah_karyawan' element={<JumlahKaryawan />} />
        <Route path='/riwayat_transaksi' element={<RiwayatTransaksi />} />
        <Route path='/tambah_orderan' element={<TambahOrder />} />
        <Route path='/form_order_express'element={<FormOrderExpress/>}/>
        <Route path='/form_order_reguler'element={<FormOrderReguler/>}/>
        <Route path='/form_order_setrika'element={<FormOrderSetrika/>}/>
        <Route path='/pengajuan_barang'element={<PengajuanBarang/>}/>
        <Route path='/form_pengajuan'element={<FormPengajuanBarang/>}/>
        <Route path='/edit/form_pengajuan/:id'element={<EditFormPengajuan/>}/>
        <Route path='/detail/order_exp/:id'element={<DetailOrderExp/>}/>
        <Route path='/detail/order_reg/:id'element={<DetailOrderReg/>}/>
      </Routes>
    </div>
  );
}

export default App;
