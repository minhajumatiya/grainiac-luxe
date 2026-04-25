import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalCustomers: 0,
        totalRevenue: 0,
        currentTotal: 0,
        percentageChange: 0,
        allTimeSales: 0
    });
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const BACKEND_URL = 'https://grainiac-luxe-backend.onrender.com';

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            // Stats aur Products dono load karo
            const [sRes, pRes] = await Promise.all([
                axios.get(`${BACKEND_URL}/api/admin/stats`),
                axios.get(`${BACKEND_URL}/api/products`)
            ]);
            setStats(sRes.data);
            setProducts(pRes.data);
        } catch (err) { console.log("Data fetch error"); }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-[#fafafa] p-4 md:p-10 font-sans">
            <div className="max-w-7xl mx-auto">

                {/* --- HEADER --- */}
                <div className="mb-12 border-b pb-8 flex justify-between items-end">
                    <div>
                        <p className="text-[#d4af37] font-black text-[10px] uppercase tracking-[0.5em] mb-2">Executive Overview</p>
                        <h1 className="text-5xl font-black uppercase italic tracking-tighter">Sales <span className="text-slate-300">Dashboard</span></h1>
                    </div>
                    <div className="text-right">
                        <p className="text-slate-400 font-bold text-[10px] uppercase">Last Sync</p>
                        <p className="font-black text-xs uppercase">Today, {new Date().toLocaleTimeString()}</p>
                    </div>
                </div>

                {/* --- STATS GRID (Revenue & Comparison) --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">

                    {/* Revenue Card */}
                    <div className="bg-black text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                        <div className="relative z-10">
                            <p className="text-gray-500 font-bold text-[10px] uppercase tracking-widest mb-2">Total Revenue</p>
                            <h3 className="text-3xl font-black italic">₹{stats.totalRevenue.toLocaleString()}</h3>
                            <p className="text-[10px] text-[#d4af37] mt-4 font-bold uppercase underline">All time earnings</p>
                        </div>
                        <div className="absolute -right-4 -bottom-4 text-white/5 text-8xl font-black italic">₹</div>
                    </div>

                    {/* Sales Comparison Card */}
                    <div className="bg-white p-8 rounded-[2.5rem] border shadow-sm">
                        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-2">Monthly Sales</p>
                        <h3 className="text-3xl font-black italic">₹{stats.currentTotal.toLocaleString()}</h3>
                        <div className={`mt-4 flex items-center gap-2 ${stats.percentageChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            <span className="text-lg font-black">{stats.percentageChange >= 0 ? '↑' : '↓'} {Math.abs(stats.percentageChange)}%</span>
                            <span className="text-[9px] font-bold uppercase text-slate-400">vs last month</span>
                        </div>
                    </div>

                    {/* Active Products */}
                    <div className="bg-white p-8 rounded-[2.5rem] border shadow-sm">
                        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-2">Inventory Items</p>
                        <h3 className="text-3xl font-black italic">{stats.totalProducts}</h3>
                        <p className="text-[10px] text-slate-400 mt-4 font-bold uppercase">Live in shop</p>
                    </div>

                    {/* Active Users */}
                    <div className="bg-white p-8 rounded-[2.5rem] border shadow-sm">
                        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-2">Total Customers</p>
                        <h3 className="text-3xl font-black italic">{stats.totalCustomers}</h3>
                        <button className="text-[10px] text-blue-500 mt-4 font-bold uppercase hover:underline">View Client List →</button>
                    </div>
                </div>

                {/* --- RECENT PRODUCTS TABLE --- */}
                <div className="bg-white rounded-[3rem] border shadow-sm overflow-hidden">
                    <div className="p-10 border-b flex justify-between items-center bg-slate-50">
                        <h2 className="text-xl font-black uppercase italic tracking-tight text-slate-800">Product Vault</h2>
                        <button onClick={() => window.location.href = '/add-product'} className="bg-black text-white px-6 py-3 rounded-full text-[9px] font-black uppercase tracking-widest">Add Product</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-white">
                                <tr className="text-[10px] uppercase tracking-widest text-slate-400 border-b">
                                    <th className="p-8">Product Name</th>
                                    <th className="p-8">Category</th>
                                    <th className="p-8">Price</th>
                                    <th className="p-8">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(p => (
                                    <tr key={p._id} className="border-b hover:bg-slate-50 transition-colors">
                                        <td className="p-8">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-slate-100 rounded-2xl p-2">
                                                    <img src={`${BACKEND_URL}${p.imageUrl}`} className="w-full h-full object-contain" alt="" />
                                                </div>
                                                <span className="font-black text-slate-800 uppercase text-sm">{p.name}</span>
                                            </div>
                                        </td>
                                        <td className="p-8 text-[10px] font-black uppercase text-slate-400">{p.category}</td>
                                        <td className="p-8 font-black text-lg text-slate-900">₹{p.price}</td>
                                        <td className="p-8">
                                            <span className="px-4 py-1 bg-green-100 text-green-600 rounded-full text-[9px] font-black uppercase">Active</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;