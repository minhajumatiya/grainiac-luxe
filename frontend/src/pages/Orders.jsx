import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://grainiac-luxe-backend.onrender.com').then(res => setOrders(res.data));
    }, []);

    return (
        <div className="flex bg-slate-50 min-h-screen">
            <Sidebar />
            <main className="flex-1 md:ml-64 p-4 md:p-10 transition-all">
                <div className="mt-16 md:mt-0 flex justify-between items-end mb-8 border-b pb-4">
                    <h1 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter">Live Orders</h1>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{orders.length} Orders</span>
                </div>

                <div className="space-y-4">
                    {orders.map(o => (
                        <div key={o._id} onClick={() => navigate(`/admin-orders/${o._id}`)}
                            className="bg-white p-6 md:p-8 rounded-[2.5rem] border hover:border-[#d4af37] cursor-pointer transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm group">
                            <div className="flex items-center gap-5">
                                <div className="w-12 h-12 bg-slate-900 text-[#d4af37] flex items-center justify-center rounded-2xl font-black text-xs italic">G</div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">#{o._id.slice(-6).toUpperCase()}</p>
                                    <h3 className="text-lg md:text-xl font-black uppercase text-slate-800 group-hover:text-[#d4af37] transition-colors">{o.user.name}</h3>
                                </div>
                            </div>

                            <div className="flex justify-between items-center w-full md:w-auto md:gap-16">
                                <div className="text-left md:text-right">
                                    <p className="text-xl md:text-2xl font-black text-slate-900">₹{o.totalAmount}</p>
                                    <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-full ${o.status === 'Delivered' ? 'bg-green-50 text-green-500' : 'bg-amber-50 text-amber-500'}`}>
                                        {o.status}
                                    </span>
                                </div>
                                <div className="md:hidden text-slate-300 font-black text-2xl">→</div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Orders;