import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const BACKEND_URL = 'https://grainiac-luxe-backend.onrender.com';

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/admin/stats`)
            .then(res => { setStats(res.data); setLoading(false); })
            .catch(err => { console.error(err); setLoading(false); });
    }, []);

    if (loading) return <div className="h-screen flex items-center justify-center font-black text-purple-600 italic">LEXRON LOADING...</div>;

    return (
        <div className="flex min-h-screen bg-[#F8F9FD] text-[#2D3142] font-sans">
            {/* --- SIDEBAR --- */}
            <div className="w-72 bg-white p-8 flex flex-col gap-10 border-r border-gray-100">
                <h1 className="text-3xl font-black text-[#7B61FF] italic tracking-tighter">Lexron.</h1>
                <div className="flex flex-col gap-2">
                    <button className="flex items-center gap-4 p-4 bg-[#F0EEFF] text-[#7B61FF] rounded-2xl font-bold">📊 Dashboard</button>
                    <button onClick={() => navigate('/admin-products')} className="flex items-center gap-4 p-4 text-gray-400 hover:text-[#7B61FF] font-bold">📦 Inventory</button>
                    <button className="flex items-center gap-4 p-4 text-gray-400 hover:text-[#7B61FF] font-bold">🛒 Sales</button>
                    <button className="flex items-center gap-4 p-4 text-gray-400 hover:text-[#7B61FF] font-bold">⚙️ Settings</button>
                </div>
            </div>

            {/* --- MAIN CONTENT --- */}
            <div className="flex-1 p-12 overflow-y-auto">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h2 className="text-4xl font-black tracking-tight">Welcome Back! 👋</h2>
                        <p className="text-gray-400 font-medium">Grainiac Luxe Business Overview</p>
                    </div>
                    <button onClick={() => navigate('/add-product')} className="bg-[#7B61FF] text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-purple-200 active:scale-95 transition-all">+ New Product</button>
                </div>

                {/* --- STATS CARDS --- */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm">
                        <p className="text-gray-400 text-xs font-bold uppercase mb-2">Total Revenue</p>
                        <h3 className="text-3xl font-black">₹{stats?.totalRevenue.toLocaleString()}</h3>
                    </div>
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border-l-4 border-purple-500">
                        <p className="text-gray-400 text-xs font-bold uppercase mb-2">Monthly Sales</p>
                        <h3 className="text-3xl font-black">₹{stats?.thisMonthRev.toLocaleString()}</h3>
                    </div>
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm">
                        <p className="text-gray-400 text-xs font-bold uppercase mb-2">Growth</p>
                        <h3 className={`text-3xl font-black ${stats?.growth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {stats?.growth}% {stats?.growth >= 0 ? '↑' : '↓'}
                        </h3>
                    </div>
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm">
                        <p className="text-gray-400 text-xs font-bold uppercase mb-2">Active Users</p>
                        <h3 className="text-3xl font-black">{stats?.totalUsers}</h3>
                    </div>
                </div>

                {/* --- RECENT ORDERS TABLE --- */}
                <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-50">
                    <h3 className="text-xl font-black mb-8 italic">Latest Transactions</h3>
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-gray-300 text-[10px] uppercase tracking-widest border-b pb-4">
                                <th className="pb-6">Customer</th>
                                <th className="pb-6">Status</th>
                                <th className="pb-6">Amount</th>
                                <th className="pb-6">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats?.recentOrders.map((order) => (
                                <tr key={order._id} className="border-b last:border-0 hover:bg-gray-50 transition-all group">
                                    <td className="py-6 font-bold">
                                        {order.customerName} <br />
                                        <span className="text-[10px] text-gray-400 font-medium">{order.mobile}</span>
                                    </td>
                                    <td className="py-6">
                                        <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-[9px] font-black uppercase">Paid</span>
                                    </td>
                                    <td className="py-6 font-black text-lg">₹{order.totalAmount}</td>
                                    <td className="py-6">
                                        <button
                                            onClick={() => navigate(`/admin-orders/${order._id}`)}
                                            className="bg-[#7B61FF] text-white text-[10px] font-black uppercase px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all shadow-md"
                                        >
                                            Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;