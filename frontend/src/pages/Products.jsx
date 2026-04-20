import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { Trash2, PlusCircle, Package } from 'lucide-react';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({ name: '', brand: '', price: '', category: 'Men', description: '', image: null });
    const [selectedSizes, setSelectedSizes] = useState([]);

    const allSizes = ["5ml", "10ml", "15ml", "20ml", "30ml", "35ml", "40ml", "50ml", "80ml", "100ml", "150ml", "200ml", "500ml"];

    const fetchInventory = async () => {
        const res = await axios.get('http://localhost:5000/api/products');
        setProducts(res.data);
    };

    useEffect(() => { fetchInventory(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        selectedSizes.forEach(size => data.append('sizes', size));
        await axios.post('http://localhost:5000/api/products/add', data);
        alert("Scent Added!");
        fetchInventory();
    };

    return (
        <div className="flex bg-slate-50 min-h-screen">
            <Sidebar />
            <main className="flex-1 md:ml-64 p-4 md:p-10 transition-all">
                <div className="mt-16 md:mt-0 grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">

                    {/* Add Product Form */}
                    <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border shadow-sm h-fit">
                        <h2 className="text-xl font-black mb-6 uppercase italic flex items-center gap-2">
                            <PlusCircle size={20} className="text-[#d4af37]" /> Add Scent
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input type="text" placeholder="Perfume Name" className="w-full p-4 bg-slate-50 rounded-2xl outline-none border border-slate-100 text-sm" onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                            <input type="text" placeholder="Brand" className="w-full p-4 bg-slate-50 rounded-2xl outline-none border border-slate-100 text-sm" onChange={e => setFormData({ ...formData, brand: e.target.value })} required />

                            <div className="grid grid-cols-2 gap-3">
                                <input type="number" placeholder="Price" className="w-full p-4 bg-slate-50 rounded-2xl outline-none border border-slate-100 text-sm" onChange={e => setFormData({ ...formData, price: e.target.value })} required />
                                <select className="w-full p-4 bg-slate-50 rounded-2xl font-bold text-xs border" onChange={e => setFormData({ ...formData, category: e.target.value })}>
                                    <option value="Men">Men</option>
                                    <option value="Women">Women</option>
                                    <option value="Unisex">Unisex</option>
                                </select>
                            </div>

                            <textarea placeholder="Description" className="w-full p-4 bg-slate-50 rounded-2xl border h-28 text-sm" onChange={e => setFormData({ ...formData, description: e.target.value })} required></textarea>

                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Sizes</p>
                            <div className="grid grid-cols-4 md:grid-cols-3 gap-2">
                                {allSizes.map(size => (
                                    <button type="button" key={size} onClick={() => setSelectedSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size])}
                                        className={`p-2 rounded-xl text-[9px] font-black border transition ${selectedSizes.includes(size) ? 'bg-black text-white' : 'bg-white text-slate-400'}`}>
                                        {size}
                                    </button>
                                ))}
                            </div>

                            <input type="file" className="text-[10px] py-2" onChange={e => setFormData({ ...formData, image: e.target.files[0] })} required />
                            <button className="w-full bg-[#d4af37] text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg">Save Scent</button>
                        </form>
                    </div>

                    {/* Inventory List */}
                    <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-[2.5rem] border shadow-sm">
                        <h2 className="text-xl font-black mb-6 uppercase italic flex items-center gap-2">
                            <Package size={20} className="text-[#d4af37]" /> Inventory ({products.length})
                        </h2>
                        <div className="grid grid-cols-1 gap-4">
                            {products.map(p => (
                                <div key={p._id} className="flex items-center justify-between p-4 bg-slate-50 rounded-[2rem] border border-slate-100">
                                    <div className="flex items-center gap-4">
                                        <img src={`http://localhost:5000${p.imageUrl}`} className="w-12 h-12 md:w-16 md:h-16 object-contain bg-white rounded-2xl border p-1" />
                                        <div>
                                            <p className="font-black text-slate-800 uppercase text-xs md:text-sm">{p.name}</p>
                                            <p className="text-[9px] font-bold text-slate-400 uppercase">₹{p.price} • {p.category}</p>
                                        </div>
                                    </div>
                                    <button onClick={async () => { await axios.delete(`http://localhost:5000/api/products/${p._id}`); fetchInventory(); }} className="p-3 text-red-400 hover:bg-red-50 rounded-2xl transition">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default Products;