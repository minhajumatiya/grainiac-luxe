import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { Plus, Trash2, Package } from 'lucide-react';

const Products = () => {
    const [products, setProducts] = useState([]);
    const BACKEND_URL = 'https://grainiac-backend.onrender.com';

    const fetchProducts = async () => {
        try {
            const res = await axios.get(`${BACKEND_URL}/api/products`);
            setProducts(res.data);
        } catch (err) {
            console.error("Fetch Products Error:", err);
        }
    };

    useEffect(() => { fetchProducts(); }, []);

    const deleteProduct = async (id) => {
        if (window.confirm("Remove this perfume from Grainiac Luxe?")) {
            try {
                await axios.delete(`${BACKEND_URL}/api/products/${id}`);
                fetchProducts();
            } catch (err) {
                alert("Delete failed");
            }
        }
    };

    return (
        <div className="flex bg-slate-50 min-h-screen">
            <Sidebar />
            <main className="flex-1 md:ml-64 p-4 md:p-10">
                <header className="flex justify-between items-center mb-10 mt-16 md:mt-0">
                    <div>
                        <h1 className="text-4xl font-black italic uppercase tracking-tighter">Inventory</h1>
                        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-1">Premium Collection</p>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((p) => (
                        <div key={p._id} className="bg-white p-6 rounded-[2.5rem] border shadow-sm group hover:shadow-xl transition-all">
                            <div className="relative h-48 mb-6 bg-slate-50 rounded-[2rem] overflow-hidden flex items-center justify-center p-8">
                                <img 
                                    src={`${BACKEND_URL}${p.imageUrl}`} 
                                    className="h-full object-contain group-hover:scale-110 transition-transform duration-500" 
                                    alt={p.name} 
                                />
                                <button onClick={() => deleteProduct(p._id)} className="absolute top-4 right-4 bg-white/80 backdrop-blur-md p-3 rounded-2xl text-red-500 hover:bg-red-500 hover:text-white transition-all">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-black text-lg uppercase italic">{p.name}</h3>
                                <div className="flex justify-between items-center">
                                    <p className="text-[#d4af37] font-black text-xl italic">₹{p.price}</p>
                                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{p.category}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Products;