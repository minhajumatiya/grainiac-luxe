import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProductPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        brand: '',
        price: '',
        category: 'Men',
        description: '',
        sizes: ''
    });
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // 🔥 AAPKA LIVE BACKEND URL
    const BACKEND_URL = 'https://grainiac-luxe-backend.onrender.com';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // FormData use karna zaroori hai kyunki hum image bhej rahe hain
        const data = new FormData();
        data.append('name', formData.name);
        data.append('brand', formData.brand);
        data.append('price', formData.price);
        data.append('category', formData.category);
        data.append('description', formData.description);
        data.append('sizes', formData.sizes);
        data.append('image', image);

        try {
            await axios.post(`${BACKEND_URL}/api/products/add`, data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert("🔥 GRAINIAC LUXE: Perfume Added Successfully!");
            navigate('/dashboard'); // Success ke baad dashboard bhejo
        } catch (err) {
            console.error(err);
            alert("Error: " + (err.response?.data?.error || "Kuch gadbad ho gayi!"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white p-4 md:p-20 font-sans">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="mb-12">
                    <button onClick={() => navigate('/dashboard')} className="text-[10px] font-black uppercase tracking-widest mb-4 hover:underline">← Back to Dashboard</button>
                    <h1 className="text-5xl font-black uppercase italic tracking-tighter text-slate-900">
                        Add New <span className="text-slate-300">Scent</span>
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="bg-slate-50 p-8 md:p-12 rounded-[3rem] border-2 border-slate-100 shadow-2xl space-y-8">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Name */}
                        <div className="flex flex-col">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-2">Product Name</label>
                            <input type="text" placeholder="e.g. Royal Oud" className="p-5 rounded-2xl border-none bg-white shadow-inner outline-none focus:ring-2 ring-[#d4af37] transition-all" onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                        </div>

                        {/* Brand */}
                        <div className="flex flex-col">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-2">Brand</label>
                            <input type="text" placeholder="e.g. Grainiac Luxe" className="p-5 rounded-2xl border-none bg-white shadow-inner outline-none focus:ring-2 ring-[#d4af37] transition-all" onChange={e => setFormData({ ...formData, brand: e.target.value })} required />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Price */}
                        <div className="flex flex-col">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-2">Price (₹)</label>
                            <input type="number" placeholder="2999" className="p-5 rounded-2xl border-none bg-white shadow-inner outline-none focus:ring-2 ring-[#d4af37] transition-all" onChange={e => setFormData({ ...formData, price: e.target.value })} required />
                        </div>

                        {/* Category */}
                        <div className="flex flex-col">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-2">Category</label>
                            <select className="p-5 rounded-2xl border-none bg-white shadow-inner outline-none focus:ring-2 ring-[#d4af37] transition-all font-bold" onChange={e => setFormData({ ...formData, category: e.target.value })}>
                                <option value="Men">Men</option>
                                <option value="Women">Women</option>
                                <option value="Unisex">Unisex</option>
                            </select>
                        </div>

                        {/* Sizes */}
                        <div className="flex flex-col">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-2">Sizes (Comma separated)</label>
                            <input type="text" placeholder="50ml, 100ml" className="p-5 rounded-2xl border-none bg-white shadow-inner outline-none focus:ring-2 ring-[#d4af37] transition-all" onChange={e => setFormData({ ...formData, sizes: e.target.value })} />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="flex flex-col">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-2">Description</label>
                        <textarea placeholder="Tell about the fragrance notes..." className="p-5 rounded-2xl border-none bg-white shadow-inner outline-none focus:ring-2 ring-[#d4af37] transition-all h-32" onChange={e => setFormData({ ...formData, description: e.target.value })}></textarea>
                    </div>

                    {/* Image Upload */}
                    <div className="flex flex-col">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-2">Product Image</label>
                        <div className="p-8 border-2 border-dashed border-slate-200 rounded-[2rem] bg-white text-center hover:border-[#d4af37] transition-all">
                            <input type="file" className="text-xs" onChange={e => setImage(e.target.files[0])} required />
                            <p className="mt-2 text-[10px] text-slate-400 font-bold uppercase tracking-tighter">PNG or JPG preferred (Max 5MB)</p>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white p-6 rounded-[2rem] font-black uppercase tracking-[0.3em] text-xs hover:bg-[#d4af37] hover:text-black transition-all shadow-2xl active:scale-95 disabled:opacity-50"
                    >
                        {loading ? "Adding to Vault..." : "Save to Collection"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProductPage;