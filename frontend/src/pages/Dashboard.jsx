import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../components/AdminLayout';

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const BACKEND_URL = 'https://grainiac-luxe-backend.onrender.com';

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/admin/stats`).then(res => setStats(res.data)).catch(e => console.log(e));
    }, []);

    return (
        <AdminLayout>
            <div className="max-w-7xl mx-auto">
                <header className="mb-10">
                    <h2 className="text-3xl lg:text-4xl font-black tracking-tight">Overview 👋</h2>
                </header>

                {/* STATS CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {[
                        { label: "Revenue", val: `₹${stats?.totalRevenue || 0}`, bg: "bg-white" },
                        { label: "Orders", val: stats?.totalOrders || 0, bg: "bg-white" },
                        { label: "Inventory", val: stats?.totalProducts || 0, bg: "bg-white" },
                        { label: "Customers", val: stats?.totalUsers || 0, bg: "bg-white" }
                    ].map((s, i) => (
                        <div key={i} className={`${s.bg} p-8 rounded-[2.5rem] shadow-sm border border-gray-50`}>
                            <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-2">{s.label}</p>
                            <h3 className="text-2xl font-black">{s.val}</h3>
                        </div>
                    ))}
                </div>

                {/* RECENT ORDERS TABLE */}
                <div className="bg-white p-6 lg:p-10 rounded-[3rem] shadow-sm border border-gray-50 overflow-x-auto">
                    <h3 className="text-xl font-black mb-8 italic text-[#7B61FF]">Live Transactions</h3>
                    <table className="w-full text-left min-w-[600px]">
                        <thead>
                            <tr className="text-gray-300 text-[10px] uppercase border-b pb-4">
                                <th className="pb-6">Client</th>
                                <th className="pb-6">Amount</th>
                                <th className="pb-6">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats?.recentOrders?.map(o => (
                                <tr key={o._id} className="border-b last:border-0 hover:bg-gray-50 transition-all">
                                    <td className="py-6 font-bold">{o.customerName}</td>
                                    <td className="py-6 font-black italic text-lg">₹{o.totalAmount}</td>
                                    <td className="py-6"><button className="text-[#7B61FF] font-black text-[10px] uppercase underline">Details</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Dashboard;