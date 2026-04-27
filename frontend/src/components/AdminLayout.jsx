import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminLayout = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { name: 'Dashboard', path: '/dashboard', icon: '📊' },
        { name: 'Inventory', path: '/admin-products', icon: '📦' },
        { name: 'Orders', path: '/admin-orders', icon: '🛒' },
    ];

    return (
        <div className="flex min-h-screen bg-[#F8F9FD] text-[#2D3142] font-sans">
            {/* --- SIDEBAR (Desktop) --- */}
            <aside className="hidden lg:flex w-72 bg-white p-8 flex-col gap-10 border-r border-gray-100 sticky top-0 h-screen">
                <h1 className="text-3xl font-black text-[#7B61FF] italic tracking-tighter">Lexron.</h1>
                <nav className="flex flex-col gap-2">
                    {menuItems.map((item) => (
                        <button
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            className={`flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${location.pathname === item.path ? "bg-[#F0EEFF] text-[#7B61FF]" : "text-gray-400 hover:bg-gray-50"
                                }`}
                        >
                            <span>{item.icon}</span> {item.name}
                        </button>
                    ))}
                </nav>
            </aside>

            {/* --- MOBILE HEADER & MENU --- */}
            <div className="lg:hidden fixed top-0 w-full bg-white border-b z-50 p-4 flex justify-between items-center">
                <h1 className="text-2xl font-black text-[#7B61FF] italic">Lexron.</h1>
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-2xl text-[#7B61FF]">
                    {isMenuOpen ? "✕" : "☰"}
                </button>
            </div>

            {/* Mobile Nav Overlay */}
            {isMenuOpen && (
                <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setIsMenuOpen(false)}>
                    <div className="w-64 bg-white h-full p-6 flex flex-col gap-6 shadow-2xl" onClick={e => e.stopPropagation()}>
                        <h1 className="text-2xl font-black text-[#7B61FF] mb-6">Menu</h1>
                        {menuItems.map((item) => (
                            <button
                                key={item.path}
                                onClick={() => { navigate(item.path); setIsMenuOpen(false); }}
                                className="flex items-center gap-4 p-4 font-bold text-gray-500"
                            >
                                {item.icon} {item.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* --- MAIN CONTENT --- */}
            <main className="flex-1 p-6 lg:p-12 mt-16 lg:mt-0 w-full">
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;