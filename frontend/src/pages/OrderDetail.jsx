import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const OrderDetail = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const navigate = useNavigate();
    const BACKEND_URL = 'https://grainiac-luxe-backend.onrender.com';

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/orders/${id}`)
            .then(res => setOrder(res.data))
            .catch(err => console.log(err));
    }, [id]);

    if (!order) return <div className="p-20 text-center">Loading Details...</div>;

    return (
        <div className="min-h-screen bg-white p-10">
            <div className="max-w-4xl mx-auto bg-slate-50 p-12 rounded-[4rem] border shadow-2xl">
                <button onClick={() => navigate('/dashboard')} className="mb-6 font-black text-[10px] uppercase">← Back</button>
                <h1 className="text-4xl font-black uppercase italic mb-10 border-b-4 border-black inline-block">Order Details</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
                    <div>
                        <p className="text-[10px] font-black uppercase text-slate-400 mb-2">Customer Info</p>
                        <h2 className="text-2xl font-black uppercase">{order.customerName}</h2>
                        <p className="font-bold text-slate-600">{order.mobile}</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase text-slate-400 mb-2">Shipping Address</p>
                        <p className="font-bold text-slate-800 leading-relaxed italic">{order.address}</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <p className="text-[10px] font-black uppercase text-slate-400">Ordered Items</p>
                    {order.items.map((item, i) => (
                        <div key={i} className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm border">
                            <div className="flex items-center gap-4">
                                <img src={`${BACKEND_URL}${item.imageUrl}`} className="w-16 h-16 object-contain" alt="" />
                                <div>
                                    <p className="font-black uppercase">{item.name}</p>
                                    <p className="text-[10px] font-black text-[#d4af37]">{item.selectedSize}</p>
                                </div>
                            </div>
                            <p className="font-black text-xl">₹{item.price}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-12 pt-8 border-t-2 border-black flex justify-between items-end">
                    <p className="font-black text-4xl italic uppercase">Total: ₹{order.totalAmount}</p>
                    <button className="bg-green-500 text-white px-8 py-3 rounded-full font-black text-[10px] uppercase">Mark as Shipped</button>
                </div>
            </div>
        </div>
    );
};
export default OrderDetail;