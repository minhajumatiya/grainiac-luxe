import React, { useState } from 'react';
import axios from 'axios';
import UserNavbar from '../components/UserNavbar';

const TrackOrder = () => {
    const [mobile, setMobile] = useState('');
    const [orders, setOrders] = useState([]);

    const handleTrack = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get(`http://https://grainiac-luxe-backend.onrender.com/api/orders/track/${mobile}`);
            setOrders(res.data);
        } catch (err) { alert("No orders found!"); }
    };

    return (
        <div className="bg-white min-h-screen">
            <UserNavbar />
            <main className="max-w-2xl mx-auto p-10">
                <h1 className="text-4xl font-black italic text-center mb-10 uppercase">Order Status</h1>
                <form onSubmit={handleTrack} className="flex gap-2 mb-10">
                    <input type="number" placeholder="Enter Mobile Number" className="flex-1 p-5 bg-slate-50 rounded-2xl outline-none border" onChange={e => setMobile(e.target.value)} required />
                    <button className="bg-black text-white px-8 rounded-2xl font-black uppercase text-xs">Find</button>
                </form>

                {orders.map(o => (
                    <div key={o._id} className="p-8 border rounded-[3rem] bg-slate-50 mb-6">
                        <div className="flex justify-between items-center mb-6">
                            <span className="font-black text-xs text-slate-800 uppercase italic">ID: #{o._id.slice(-6)}</span>
                            <span className="bg-slate-900 text-[#d4af37] px-4 py-1 rounded-full font-black text-[20px] uppercase">{o.status}</span>
                        </div>
                        <p className="font-bold text-slate-500 text-sm mb-4">📍 {o.address}</p>
                        {o.items.map((item, i) => (
                            <p key={i} className="font-black text-sm text-slate-800">📦 {item.name} - {item.selectedSize}</p>
                        ))}
                        <p className="mt-6 text-2xl font-black tracking-tighter">Total: ₹{o.totalAmount}</p>
                    </div>
                ))}
            </main>
        </div>
    );
};
export default TrackOrder;