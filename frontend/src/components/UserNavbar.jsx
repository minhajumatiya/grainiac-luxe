import React, { useContext } from 'react';
import { ShoppingBag, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const UserNavbar = () => {
    const { cartCount } = useContext(CartContext);
    const navigate = useNavigate();
    const loggedInUser = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <nav className="flex justify-between items-center px-10 py-6 bg-white border-b sticky top-0 z-50 shadow-sm">
            {/* Logo */}
            <div className="text-2xl font-black tracking-widest cursor-pointer" onClick={() => navigate('/')}>
                GRAINIAC <span className="text-[#d4af37]">LUXE</span>
            </div>

            {/* Navigation Links with Category Filter */}
            <div className="hidden md:flex gap-8 font-bold text-[10px] uppercase tracking-widest text-slate-500">
                <span onClick={() => navigate('/')} className="hover:text-black cursor-pointer transition">All</span>

                {/* Yahan se category URL mein jayegi */}
                <span onClick={() => navigate('/?cat=Men')} className="hover:text-black cursor-pointer transition">Men</span>
                <span onClick={() => navigate('/?cat=Women')} className="hover:text-black cursor-pointer transition">Women</span>
                <span onClick={() => navigate('/?cat=Unisex')} className="hover:text-black cursor-pointer transition">Unisex</span>

                <span onClick={() => navigate('/track-order')} className="text-[#d4af37] cursor-pointer hover:underline transition">Track Order</span>
            </div>

            {/* Action Icons */}
            <div className="flex gap-6 items-center text-slate-800">
                <div className="relative cursor-pointer group" onClick={() => navigate('/cart')}>
                    <ShoppingBag size={22} className="group-hover:text-[#d4af37] transition" />
                    {cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                            {cartCount}
                        </span>
                    )}
                </div>

                {loggedInUser ? (
                    <div className="flex items-center gap-4 bg-slate-50 px-4 py-2 rounded-full border">
                        <span className="text-[10px] font-black uppercase tracking-tighter italic">Hi, {loggedInUser.name.split(' ')[0]}</span>
                        <LogOut size={18} className="cursor-pointer text-red-400 hover:text-red-600 transition" onClick={handleLogout} />
                    </div>
                ) : (
                    <User size={22} className="cursor-pointer hover:text-[#d4af37] transition" onClick={() => navigate('/login')} />
                )}
            </div>
        </nav>
    );
};

export default UserNavbar;