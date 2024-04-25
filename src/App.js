import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './layouts/Dashboard';
import TambahOrder from './layouts/TambahOrder';
import { Route, Routes } from 'react-router-dom'; 

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />'
        <Route path='/tambah_orderan' element={<TambahOrder />} />
      </Routes>
    </div>
  );
}

export default App;
