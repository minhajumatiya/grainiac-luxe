import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false); // Form toggle karne ke liye

    const BACKEND_URL = 'https://grainiac-luxe-backend.onrender.com';

    const loadData = async () => {
        setLoading(true);
        // Products load karo
        try {
            const pRes = await axios.get(`${BACKEND_URL}/api/products`);
            setProducts(pRes.data || []);
        } catch (err) { console.log("Products load error"); }

        // Customers load karo (Safe fetch)
        try {
            const cRes = await axios.get(`${BACKEND_URL}/api/customers`);
            setCustomers(cRes.data || []);
        } catch (err) {
            console.log("Customers route not found, keeping empty list.");
            setCustomers([]);
        }
        setLoading(false);
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("🗑️ Pakka delete karna hai?")) {
            try {
                await axios.delete(`${BACKEND_URL}/api/products/${id}`);
                loadData();
            } catch (err) { alert("Delete fail!"); }
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center font-black uppercase italic tracking-tighter text-2xl">Grainiac Luxe Loading...</div>;

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans p-4 md:p-10">
            <div className="max-w-7xl mx-auto">

                {/* --- HEADER --- */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b-2 border-slate-100 pb-10">
                    <div>
                        <p className="text-[#d4af37] font-black text-[10px] uppercase tracking-[0.4em] mb-3">Administrator Control</p>
                        <h1 className="text-6xl font-black tracking-tighter uppercase italic leading-none">
                            Inventory <span className="text-slate-300">Hub</span>
                        </h1>
                    </div>
                    <div className="mt-6 md:mt-0 flex gap-4">
                        <div className="text-right">
                            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Total Scents</p>
                            <p className="text-3xl font-black italic">{products.length}</p>
                        </div>
                        <div className="w-[1px] bg-slate-200 h-10 self-center"></div>
                        <div className="text-right">
                            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Clients</p>
                            <p className="text-3xl font-black italic">{customers.length}</p>
                        </div>
                    </div>
                </div>

                {/* --- ACTION BAR --- */}
                <div className="flex justify-between items-center mb-10">
                    <h2 className="text-xl font-black uppercase tracking-tight">Active Collection</h2>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="bg-black text-white px-8 py-4 rounded-full font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[#d4af37] transition-all shadow-xl active:scale-95"
                    >
                        {showForm ? "✕ Close Form" : "+ Add New Perfume"}
                    </button>
                </div>

                {/* --- ADD PRODUCT FORM (Toggle logic) --- */}
                {showForm && (
                    <div className="mb-16 bg-slate-50 p-10 rounded-[3rem] border-2 border-black border-dashed animate-in fade-in slide-in-from-top-4 duration-500">
                        <p className="text-center font-bold text-slate-400 uppercase text-xs mb-4">Form Section</p>
                        {/* Minhaj bhai, yahan apna AddProduct.jsx wala form render karlo ya component dalo */}
                        <div className="text-center py-10">
                            <h3 className="text-2xl font-black italic mb-4">Ready to add a new scent?</h3>
                            <p className="text-slate-500 mb-6">Apne product details yahan bhariye (Ya /add-product page ka use karein)</p>
                            <button className="border-2 border-black px-10 py-3 rounded-full font-bold uppercase text-[10px]">Open Full Form Editor</button>
                        </div>
                    </div>
                )}

                {/* --- PRODUCT GRID (Premium Card Design) --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {products.map((p) => (
                        <div key={p._id} className="group relative bg-slate-50 rounded-[2.5rem] p-6 border border-transparent hover:border-slate-200 hover:bg-white hover:shadow-2xl transition-all duration-500">
                            <div className="aspect-square mb-6 overflow-hidden rounded-[2rem] bg-white border border-slate-100 p-6 flex items-center justify-center">
                                <img
                                    src={`${BACKEND_URL}${p.imageUrl}`}
                                    className="w-full h-full object-contain group-hover:scale-110 transition duration-700"
                                    alt={p.name}
                                />
                            </div>

                            <div className="mb-6">
                                <p className="text-[#d4af37] font-black text-[9px] uppercase tracking-widest mb-1">{p.brand}</p>
                                <h3 className="text-xl font-black uppercase tracking-tighter leading-tight mb-2">{p.name}</h3>
                                <div className="flex justify-between items-center">
                                    <span className="text-2xl font-black italic">₹{p.price}</span>
                                    <span className="bg-slate-200 text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">{p.category}</span>
                                </div>
                            </div>

                            <button
                                onClick={() => handleDelete(p._id)}
                                className="w-full py-4 rounded-2xl bg-red-50 text-red-500 font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
                            >
                                Remove From Vault
                            </button>
                        </div>
                    ))}
                </div>

                {products.length === 0 && (
                    <div className="text-center py-40 border-2 border-dashed border-slate-100 rounded-[4rem]">
                        <p className="text-slate-200 font-black text-5xl uppercase italic tracking-tighter">Vault is Empty</p>
                        <p className="text-slate-400 mt-4 font-bold uppercase text-[10px] tracking-widest">Start adding your exclusive collection</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;