import React, { useState } from 'react';
import { LayoutDashboard, Package, ShoppingCart, Users, LogOut, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
        { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/dashboard' },
        { icon: <Package size={20} />, label: 'Products', path: '/admin-products' },
        { icon: <ShoppingCart size={20} />, label: 'Orders', path: '/admin-orders' },
        { icon: <Users size={20} />, label: 'Customers', path: '/admin-customers' },
    ];

    return (
        <>
            {/* Mobile Menu Button */}
            <div className="md:hidden fixed top-0 left-0 w-full bg-[#0f172a] p-4 flex justify-between items-center z-[100] shadow-lg">
                <h1 className="text-xl font-black text-[#d4af37]">GRAINIAC</h1>
                <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2 bg-slate-800 rounded-lg">
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Sidebar Shell */}
            <div className={`fixed top-0 left-0 h-full bg-[#0f172a] text-white z-[90] transition-all duration-300 
                ${isOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full md:translate-x-0'}`}>

                <div className="p-10 hidden md:block">
                    <h1 className="text-2xl font-black tracking-widest text-[#d4af37]">GRAINIAC</h1>
                    <p className="text-[10px] text-slate-500 font-bold uppercase italic">Luxe Admin</p>
                </div>

                <nav className="px-6 mt-20 md:mt-0 space-y-2">
                    {menuItems.map((item, index) => (
                        <div key={index} onClick={() => { navigate(item.path); setIsOpen(false); }}
                            className="flex items-center gap-4 px-5 py-4 hover:bg-slate-800 rounded-2xl cursor-pointer transition group">
                            <span className="text-slate-500 group-hover:text-[#d4af37]">{item.icon}</span>
                            <span className="font-bold text-sm tracking-tight">{item.label}</span>
                        </div>
                    ))}
                </nav>

                <div className="absolute bottom-10 w-full px-6">
                    <button onClick={() => navigate('/')} className="w-full flex items-center gap-4 px-5 py-4 text-red-400 hover:bg-red-500/10 rounded-2xl transition font-bold text-sm">
                        <LogOut size={20} /> Logout
                    </button>
                </div>
            </div>

            {/* Mobile Overlay */}
            {isOpen && <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/60 z-[80] md:hidden"></div>}
        </>
    );
};

export default Sidebar;