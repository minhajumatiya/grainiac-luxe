import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { ArrowLeft, User, Phone, MapPin, Package } from 'lucide-react';

const OrderDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);

    // Render Backend URL setup
    const BACKEND_URL = 'https://grainiac-backend.onrender.com';

    const fetchDetail = async () => {
        try {
            const res = await axios.get(`${BACKEND_URL}/api/orders`);
            // Finding the specific order from the list
            const foundOrder = res.data.find(o => o._id === id);
            setOrder(foundOrder);
        } catch (error) {
            console.error("Error fetching order:", error);
        }
    };

    useEffect(() => {
        fetchDetail();
    }, [id]);

    const changeStatus = async (status) => {
        try {
            await axios.patch(`${BACKEND_URL}/api/orders/${id}/status`, { status });
            alert(`Order status updated to: ${status}`);
            fetchDetail(); // Refresh data after update
        } catch (error) {
            alert("Error updating status");
            console.error(error);
        }
    };

    if (!order) return (
        <div className="flex bg-slate-50 min-h-screen items-center justify-center">
            <p className="font-black text-slate-400 tracking-widest animate-pulse">FETCHING DETAILS...</p>
        </div>
    );

    return (
        <div className="flex bg-slate-50 min-h-screen font-sans">
            <Sidebar />
            <main className="flex-1 md:ml-64 p-4 md:p-10">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/admin-orders')}
                    className="mt-16 md:mt-0 flex items-center gap-2 text-slate-400 font-black uppercase text-[10px] mb-8 tracking-widest hover:text-slate-900 transition-colors"
                >
                    <ArrowLeft size={14} /> Back to List
                </button>

                <div className="bg-white rounded-[2.5rem] md:rounded-[4rem] p-6 md:p-12 border shadow-sm max-w-5xl">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row justify-between md:items-center border-b pb-8 mb-8 gap-4">
                        <div>
                            <h1 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase">
                                #{order._id.slice(-6)}
                            </h1>
                            <p className="text-slate-400 font-bold uppercase text-[10px] mt-2 tracking-widest">Order Tracking Details</p>
                        </div>
                        <span className="bg-slate-900 text-[#d4af37] px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest w-fit border border-[#d4af37]/30">
                            {order.status}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">
                        {/* Left Side: Customer & Actions */}
                        <div className="space-y-8">
                            <section className="bg-slate-50 p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] border border-slate-100">
                                <h2 className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-6">Customer Profile</h2>
                                <div className="space-y-5">
                                    <p className="flex items-center gap-3 font-black text-xl uppercase italic">
                                        <User size={20} className="text-[#d4af37]" /> {order.user.name}
                                    </p>
                                    <p className="flex items-center gap-3 font-bold text-slate-500">
                                        <Phone size={18} className="text-[#d4af37]" /> {order.user.mobile}
                                    </p>
                                    <div className="flex items-start gap-3 font-bold text-slate-500 text-sm leading-relaxed">
                                        <MapPin size={18} className="text-[#d4af37] mt-1 shrink-0" />
                                        <span>{order.address}</span>
                                    </div>
                                </div>
                            </section>

                            {/* Logistics Actions */}
                            <section>
                                <h2 className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-4">Logistics Action</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
                                    <button onClick={() => changeStatus('Confirmed')} className="bg-blue-50 text-blue-600 p-4 rounded-2xl font-black text-[10px] uppercase border border-blue-100 hover:bg-blue-600 hover:text-white transition-all">Confirm</button>
                                    <button onClick={() => changeStatus('Delivered')} className="bg-green-50 text-green-600 p-4 rounded-2xl font-black text-[10px] uppercase border border-green-100 hover:bg-green-600 hover:text-white transition-all">Deliver</button>
                                    <button onClick={() => changeStatus('Cancelled')} className="bg-red-50 text-red-600 p-4 rounded-2xl font-black text-[10px] uppercase border border-red-100 hover:bg-red-600 hover:text-white transition-all">Cancel</button>
                                </div>
                            </section>
                        </div>

                        {/* Right Side: Order Summary Bag */}
                        <div className="bg-slate-900 rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-10 text-white shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37] opacity-5 rounded-full -mr-16 -mt-16"></div>

                            <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-8 flex items-center gap-2 italic">
                                <Package size={14} /> Shopping Bag
                            </h2>

                            <div className="space-y-6">
                                {order.items.map((item, i) => (
                                    <div key={i} className="flex justify-between items-center border-b border-slate-800 pb-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-white rounded-xl p-1.5 shrink-0 flex items-center justify-center shadow-inner">
                                                <img
                                                    src={`${BACKEND_URL}${item.imageUrl}`}
                                                    className="w-full h-full object-contain"
                                                    alt={item.name}
                                                />
                                            </div>
                                            <div>
                                                <p className="font-black text-xs md:text-sm uppercase tracking-tight">{item.name}</p>
                                                <p className="text-[9px] font-black text-[#d4af37] uppercase tracking-widest">{item.selectedSize}</p>
                                            </div>
                                        </div>
                                        <p className="font-black text-sm text-slate-200">₹{item.price}</p>
                                    </div>
                                ))}

                                <div className="pt-6 flex justify-between items-center border-t border-slate-800">
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Revenue</span>
                                    <span className="text-3xl md:text-4xl font-black text-[#d4af37] tracking-tighter italic">
                                        ₹{order.totalAmount}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default OrderDetail;