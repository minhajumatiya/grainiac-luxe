import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Package, ShoppingBag, Users, ArrowRight } from 'lucide-react';

const Dashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({ products: 0, orders: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const prodRes = await axios.get('http://localhost:5000/api/products');
                const orderRes = await axios.get('http://localhost:5000/api/orders');
                setStats({
                    products: prodRes.data.length,
                    orders: orderRes.data.length
                });
            } catch (err) {
                console.error(err);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="flex bg-slate-50 min-h-screen font-sans">
            {/* Main Content */}
            <main className="p-10 w-full max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tighter">DASHBOARD</h1>
                        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em]">Grainiac Luxe Admin Control</p>
                    </div>
                    <button
                        onClick={() => navigate('/')}
                        className="bg-white border-2 border-black px-6 py-2 rounded-xl font-bold hover:bg-black hover:text-white transition"
                    >
                        View Website
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
                        <Package className="text-[#d4af37] mb-4" size={32} />
                        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Total Products</p>
                        <h2 className="text-5xl font-black">{stats.products}</h2>
                    </div>

                    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
                        <ShoppingBag className="text-[#d4af37] mb-4" size={32} />
                        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">New Orders</p>
                        <h2 className="text-5xl font-black">{stats.orders}</h2>
                    </div>

                    <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-xl text-white">
                        <Users className="text-[#d4af37] mb-4" size={32} />
                        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Status</p>
                        <h2 className="text-4xl font-black uppercase italic">Online</h2>
                    </div>
                </div>

                {/* Navigation Buttons (Yahan Fix kiya gaya hai) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div
                        onClick={() => navigate('/admin-products')}
                        className="group bg-white p-10 rounded-[2.5rem] border-2 border-transparent hover:border-[#d4af37] cursor-pointer transition-all shadow-sm flex justify-between items-center"
                    >
                        <div>
                            <h3 className="text-2xl font-black mb-2">Inventory</h3>
                            <p className="text-slate-400 text-sm">Add, Edit or Delete Products</p>
                        </div>
                        <ArrowRight className="group-hover:translate-x-2 transition" />
                    </div>

                    <div
                        onClick={() => navigate('/admin-orders')}
                        className="group bg-white p-10 rounded-[2.5rem] border-2 border-transparent hover:border-[#d4af37] cursor-pointer transition-all shadow-sm flex justify-between items-center"
                    >
                        <div>
                            <h3 className="text-2xl font-black mb-2">Orders</h3>
                            <p className="text-slate-400 text-sm">Manage Customer Deliveries</p>
                        </div>
                        <ArrowRight className="group-hover:translate-x-2 transition" />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;