import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [data, setData] = useState({ totalProducts: 0, totalOrders: 0, totalRevenue: 0, recentOrders: [] });
    const [allOrders, setAllOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const BACKEND_URL = 'https://grainiac-luxe-backend.onrender.com';

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const [statsRes, ordersRes] = await Promise.all([
                    axios.get(`${BACKEND_URL}/api/admin/stats`),
                    axios.get(`${BACKEND_URL}/api/orders`)
                ]);
                setData(statsRes.data);
                setAllOrders(ordersRes.data);
            } catch (err) { console.log("Fetch error"); }
            setLoading(false);
        };
        fetchAll();
    }, []);

    if (loading) return <div className="min-h-screen flex items-center justify-center font-black uppercase italic">Grainiac Luxe Business Loading...</div>;

    return (
        <div className="min-h-screen bg-[#fcfcfc] p-6 md:p-12 text-slate-900">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex justify-between items-end mb-16 border-b-2 pb-8">
                    <div>
                        <p className="text-[#d4af37] font-black text-[10px] uppercase tracking-[0.5em] mb-2">Grainiac Exim Portal</p>
                        <h1 className="text-6xl font-black uppercase italic tracking-tighter">Owner <span className="text-slate-300">Desk</span></h1>
                    </div>
                    <button onClick={() => navigate('/add-product')} className="bg-black text-white px-8 py-4 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-[#d4af37] transition-all">+ Add Product</button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-black text-white p-10 rounded-[3rem] shadow-2xl">
                        <p className="text-gray-500 font-bold text-[10px] uppercase tracking-widest mb-2">Total Revenue</p>
                        <h3 className="text-4xl font-black italic">₹{data.totalRevenue.toLocaleString()}</h3>
                    </div>
                    <div className="bg-white p-10 rounded-[3rem] border shadow-sm">
                        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-2">Total Orders</p>
                        <h3 className="text-4xl font-black italic">{allOrders.length}</h3>
                    </div>
                    <div className="bg-white p-10 rounded-[3rem] border shadow-sm">
                        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-2">Total Scents</p>
                        <h3 className="text-4xl font-black italic">{data.totalProducts}</h3>
                    </div>
                </div>

                {/* --- ORDERS TABLE (Jahan aapko order dikhenge) --- */}
                <div className="bg-white rounded-[3rem] border-2 border-slate-100 shadow-xl overflow-hidden mb-20">
                    <div className="p-8 bg-slate-50 border-b">
                        <h2 className="text-xl font-black uppercase italic tracking-tight">Recent Customer Orders</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-white">
                                <tr className="text-[10px] uppercase tracking-widest text-slate-400 border-b">
                                    <th className="p-8">Customer</th>
                                    <th className="p-8">Items</th>
                                    <th className="p-8">Amount</th>
                                    <th className="p-8">Status</th>
                                    <th className="p-8">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allOrders.map(order => (
                                    <tr key={order._id} className="border-b hover:bg-slate-50 transition-all">
                                        <td className="p-8">
                                            <p className="font-black text-slate-800 uppercase">{order.customerName}</p>
                                            <p className="text-[10px] font-bold text-slate-400">{order.mobile}</p>
                                        </td>
                                        <td className="p-8 text-xs font-bold text-slate-600">{order.items.length} Scent(s)</td>
                                        <td className="p-8 font-black text-lg">₹{order.totalAmount}</td>
                                        <td className="p-8">
                                            <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-[9px] font-black uppercase">Pending</span>
                                        </td>
                                        <td className="p-8">
                                            {/* 🔥 Ispe click karte hi Details page khulega */}
                                            <button
                                                onClick={() => navigate(`/admin-orders/${order._id}`)}
                                                className="text-[#d4af37] font-black text-[10px] uppercase underline tracking-widest"
                                            >
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {allOrders.length === 0 && <p className="p-20 text-center font-black uppercase italic text-slate-200 text-4xl">No Orders Yet</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Dashboard;