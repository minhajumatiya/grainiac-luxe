import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    // 🔥 LIVE BACKEND URL
    const BACKEND_URL = 'https://grainiac-luxe-backend.onrender.com';

    // 1. Data Load karne ka Logic (Safe Fetch)
    const loadData = async () => {
        setLoading(true);

        // Products fetch karo
        try {
            const pRes = await axios.get(`${BACKEND_URL}/api/products`);
            setProducts(pRes.data || []);
        } catch (err) {
            console.log("Products load nahi ho paye");
        }

        // Customers fetch karo (Agar ye fail hua toh bhi Dashboard chalta rahega)
        try {
            const cRes = await axios.get(`${BACKEND_URL}/api/customers`);
            setCustomers(cRes.data || []);
        } catch (err) {
            console.log("Customers 404: Abhi route nahi bana hai, tension mat lo.");
            setCustomers([]); // Khali array set kar do
        }

        setLoading(false);
    };

    useEffect(() => {
        loadData();
    }, []);

    // 2. Delete Logic
    const handleDelete = async (id) => {
        if (window.confirm("Pakka delete karna hai?")) {
            try {
                await axios.delete(`${BACKEND_URL}/api/products/${id}`);
                alert("🗑️ Product Hat gaya!");
                loadData(); // List refresh karo
            } catch (err) {
                alert("Delete fail ho gaya!");
            }
        }
    };

    if (loading) return <div className="p-10 text-center font-bold">Grainiac Luxe Loading...</div>;

    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-12">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-black italic uppercase mb-10 text-slate-900 border-b-4 border-black inline-block">
                    Admin Dashboard
                </h1>

                {/* --- STATS CARDS --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    <div className="bg-white p-8 rounded-[2rem] shadow-sm border">
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Total Products</p>
                        <h3 className="text-4xl font-black">{products.length}</h3>
                    </div>
                    <div className="bg-white p-8 rounded-[2rem] shadow-sm border">
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Active Customers</p>
                        <h3 className="text-4xl font-black">{customers.length}</h3>
                    </div>
                </div>

                {/* --- ADD PRODUCT SECTION (Hamesha dikhega) --- */}
                <div className="bg-black text-white p-10 rounded-[3rem] mb-12 shadow-2xl">
                    <h2 className="text-2xl font-bold mb-6 uppercase tracking-tighter">Add New Perfume</h2>
                    <p className="text-gray-400 mb-6 text-sm">Naya product add karne ke liye niche wala form bhariye.</p>

                    {/* Yahan aapka AddProduct Component ya Form aayega */}
                    <button
                        onClick={() => window.location.href = '/add-product'} // Ya jahan bhi aapka add form hai
                        className="bg-[#d4af37] text-black px-8 py-3 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-white transition-all"
                    >
                        Open Add Product Form
                    </button>
                </div>

                {/* --- PRODUCT LIST --- */}
                <div className="bg-white rounded-[3rem] shadow-sm border overflow-hidden">
                    <div className="p-8 border-b bg-slate-50">
                        <h2 className="font-black uppercase tracking-tight">Current Inventory</h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-[10px] uppercase tracking-widest text-slate-400 border-b">
                                    <th className="p-6">Product</th>
                                    <th className="p-6">Category</th>
                                    <th className="p-6">Price</th>
                                    <th className="p-6">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(p => (
                                    <tr key={p._id} className="border-b hover:bg-slate-50 transition-colors">
                                        <td className="p-6">
                                            <div className="flex items-center gap-4">
                                                <img src={`${BACKEND_URL}${p.imageUrl}`} className="w-12 h-12 object-contain bg-slate-100 rounded-lg" alt="" />
                                                <span className="font-bold text-slate-800">{p.name}</span>
                                            </div>
                                        </td>
                                        <td className="p-6 text-xs font-bold text-slate-500 uppercase">{p.category}</td>
                                        <td className="p-6 font-black text-slate-900">₹{p.price}</td>
                                        <td className="p-6">
                                            <button
                                                onClick={() => handleDelete(p._id)}
                                                className="text-red-500 font-bold text-[10px] uppercase hover:underline"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {products.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="p-20 text-center text-slate-300 font-bold uppercase italic">
                                            Abhi koi product nahi hai. Naya add kijiye!
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;