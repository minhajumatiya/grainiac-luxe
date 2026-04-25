import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const BACKEND_URL = 'https://grainiac-luxe-backend.onrender.com';

    // 🔥 LOGIN CHECK: Agar token nahi hai toh seedha login page bhej do
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/admin'); // Login page ka route yahan likho
        } else {
            loadData();
        }
    }, []);

    const loadData = async () => {
        try {
            const res = await axios.get(`${BACKEND_URL}/api/products`);
            setProducts(res.data || []);
        } catch (err) { console.log("Fetch Error"); }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (window.confirm("🗑️ Delete this perfume from vault?")) {
            try {
                await axios.delete(`${BACKEND_URL}/api/products/${id}`);
                loadData();
            } catch (err) { alert("Delete failed!"); }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/admin');
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center font-black uppercase italic text-2xl tracking-tighter">Authenticating...</div>;

    return (
        <div className="min-h-screen bg-white text-slate-900 p-6 md:p-12">
            <div className="max-w-7xl mx-auto">

                {/* --- PREMIUM HEADER --- */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 border-b-4 border-slate-50 pb-12">
                    <div>
                        <p className="text-[#d4af37] font-black text-[10px] uppercase tracking-[0.5em] mb-4">Master Control Panel</p>
                        <h1 className="text-7xl font-black tracking-tighter uppercase italic leading-none">
                            Grainiac <span className="text-slate-200">Vault</span>
                        </h1>
                    </div>
                    <div className="mt-8 md:mt-0 flex items-center gap-8">
                        <div className="text-right">
                            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-1">Live Inventory</p>
                            <p className="text-4xl font-black italic leading-none">{products.length}</p>
                        </div>
                        <button onClick={handleLogout} className="bg-slate-100 p-4 rounded-2xl hover:bg-red-50 text-red-500 transition-all font-black text-[10px] uppercase tracking-widest">Logout</button>
                    </div>
                </div>

                {/* --- ACTION BAR --- */}
                <div className="flex justify-between items-center mb-12">
                    <h2 className="text-2xl font-black uppercase tracking-tight italic">Current Collection</h2>
                    <button
                        onClick={() => navigate('/add-product')}
                        className="bg-black text-white px-10 py-5 rounded-full font-black text-[10px] uppercase tracking-[0.3em] hover:bg-[#d4af37] hover:text-black transition-all shadow-2xl active:scale-95"
                    >
                        + Add New Masterpiece
                    </button>
                </div>

                {/* --- PREMIUM PRODUCT GRID --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                    {products.map((p) => (
                        <div key={p._id} className="group relative bg-slate-50 rounded-[3.5rem] p-8 border border-transparent hover:border-slate-200 hover:bg-white hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] transition-all duration-700">
                            <div className="aspect-[4/5] mb-8 overflow-hidden rounded-[2.5rem] bg-white border border-slate-50 p-8 flex items-center justify-center">
                                <img
                                    src={`${BACKEND_URL}${p.imageUrl}`}
                                    className="w-full h-full object-contain group-hover:scale-110 transition duration-1000"
                                    alt={p.name}
                                />
                            </div>

                            <div className="mb-8">
                                <div className="flex justify-between items-start mb-2">
                                    <p className="text-[#d4af37] font-black text-[9px] uppercase tracking-[0.2em]">{p.brand}</p>
                                    <span className="text-[8px] font-black px-3 py-1 bg-slate-200 rounded-full uppercase">{p.category}</span>
                                </div>
                                <h3 className="text-2xl font-black uppercase tracking-tighter leading-tight mb-4">{p.name}</h3>
                                <p className="text-3xl font-black italic">₹{p.price}</p>
                            </div>

                            <button
                                onClick={() => handleDelete(p._id)}
                                className="w-full py-5 rounded-[1.5rem] bg-red-50 text-red-500 font-black text-[10px] uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
                            >
                                Remove From Vault
                            </button>
                        </div>
                    ))}
                </div>

                {products.length === 0 && (
                    <div className="text-center py-48 border-4 border-dashed border-slate-50 rounded-[5rem]">
                        <p className="text-slate-200 font-black text-7xl uppercase italic tracking-tighter">Empty Vault</p>
                        <p className="text-slate-400 mt-6 font-bold uppercase text-[10px] tracking-[0.4em]">Ready for your next curation</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;