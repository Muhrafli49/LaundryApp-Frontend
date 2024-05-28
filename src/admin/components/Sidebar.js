import { ChevronLast, ChevronFirst } from "lucide-react";
import { useContext, createContext, useState, useEffect } from "react";
import { Link, useLocation} from "react-router-dom";
import DashbordIcon from '../../assets/dashboard-removebg.png';
import PegawaiIcon from '../../assets/pegawaai-removebg.png'; 
import PaketLaundryIcon from '../../assets/paket.png'; 
import LaporanIcon from '../../assets/laporan-removebg.png'; 
import PengajuanIcon from '../../assets/pengajuan-removebg.png'; 
import ProfileIcon from '../../assets/Profile_icon-removebg.png';

const SidebarContext = createContext();

export default function Sidebar({ children }) {
    const [expanded, setExpanded] = useState(() => {
        const savedState = localStorage.getItem('sidebar-expanded');
        return savedState !== null ? JSON.parse(savedState) : true;
    });

    const handleResize = () => {
        if (window.innerWidth < 720) {
            setExpanded(false);
        } else {
            const savedState = localStorage.getItem('sidebar-expanded');
            setExpanded(savedState !== null ? JSON.parse(savedState) : true);
        }
    };

    const toggleSidebar = () => {
        if (window.innerWidth >= 720) {
            setExpanded((curr) => {
                localStorage.setItem('sidebar-expanded', JSON.stringify(!curr));
                return !curr;
            });
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (window.innerWidth >= 720) {
            localStorage.setItem('sidebar-expanded', JSON.stringify(expanded));
        }
    }, [expanded]);

    return (
        <aside className={`h-screen ${expanded ? "w-1/5" : "w-20"} transition-all bg-orange-100 mt-0 rounded-sm border border-slate-900`}>
            <nav className="h-full flex flex-col bg-white border-r shadow-sm">
                <div className="p-4 pb-2 flex justify-between items-center">
                    <Link to="/dashboard/admin" className="flex items-center">
                        <img
                            src={DashbordIcon}
                            className="w-10 h-10"
                            alt="Dashboard Icon"
                        />
                        <h1 className={`text-2xl font-bold ml-3 mb-2 transition-all ${expanded ? "block" : "hidden"}`}>Dashboard</h1>
                    </Link>
                    <button
                        onClick={toggleSidebar}
                        className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-200"
                    >
                        {expanded ? <ChevronFirst /> : <ChevronLast />}
                    </button>
                </div>

                <SidebarContext.Provider value={{ expanded }}>
                    <ul className="flex-1 px-3">
                        <SidebarItem icon={<img src={PegawaiIcon} alt="Pegawai Icon" className="w-10 h-10 icon hover:scale-105" />} text="Pegawai" link="/jumlah_karyawan" />
                        <SidebarItem icon={<img src={PaketLaundryIcon} alt="Paket Laundry Icon" className="w-10 h-10 icon hover:scale-105" />} text="Paket Laundry" link="/paket_laundry" />
                        <SidebarItem icon={<img src={LaporanIcon} alt="Laporan Pengajuan Icon" className="w-10 h-10 icon hover:scale-105" />} text="Rekap Order" link="/laporan_orderan" />
                        <SidebarItem icon={<img src={PengajuanIcon} alt="Pengajuan Icon" className="w-10 h-10 icon hover:scale-105" />} text="Pengajuan" link="/persetujuan_pengajuan" />
                        {children}
                    </ul>
                </SidebarContext.Provider>

                <div className="border-t flex p-3">
                    <img
                        src={ProfileIcon}
                        alt=""
                        className="w-8 h-8 rounded-md"
                    />
                    <div
                        className={`
                            flex justify-between items-center
                            overflow-hidden transition-all ${expanded ? "w-30 ml-3" : "w-0"}
                        `}
                    >
                        <div className="leading-4">
                            <h4 className="font-semibold">Admin</h4>
                            <span className="text-xs text-gray-600">bingolaundry@gmail.com</span>
                        </div>
                    </div>
                </div>
            </nav>
        </aside>
    );
}

function SidebarItem({ icon, text, link }) {
    const { expanded } = useContext(SidebarContext);
    const location = useLocation(); // React Router DOM's useLocation hook

    // Menentukan apakah item sidebar aktif berdasarkan path saat ini
    const isActive = location.pathname === link;

    return (
        <li className={`flex items-center my-2 sidebar-item ${isActive ? "bg-slate-300" : ""}`}>
            <Link
                to={link}
                className={`flex items-center w-full ${isActive ? "text-gray-900" : "text-gray-500 hover:text-gray-900"}`}
            >
                <div className="flex items-center justify-center w-16 h-16">
                    {icon}
                </div>
                <span className={`text-lg font-semibold ml-3 transition-all text-center ${expanded ? "block" : "hidden"}`}>
                    {text}
                </span>
            </Link>
        </li>
    );
}

