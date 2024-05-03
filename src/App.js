import { Route, Routes } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './layouts/Dashboard';
import PaketTersedia from './layouts/PaketTersedia';
import PaketExpress from './layanan/PaketExpress';
import PaketReguler from './layanan/PaketReguler';
import PaketSetrika from './layanan/PaketSetrika';
import JumlahKaryawan from './layouts/JumlahKaryawan';
import TotalOrderan from './layouts/TotalOrderan';
import TambahOrder from './pages/TambahOrderan';
import FormOrderExpress from './pages/Form/FormOrderExpress';


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
        <Route path='/total_orderan' element={<TotalOrderan />} />
        <Route path='/tambah_orderan' element={<TambahOrder />} />
        <Route path='/form_order_express'element={<FormOrderExpress/>}/>
      </Routes>
    </div>
  );
}

export default App;
