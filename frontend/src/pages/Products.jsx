import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const BACKEND_URL = 'https://grainiac-luxe-backend.onrender.com';

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/products`)
            .then(res => setProducts(res.data))
            .catch(err => console.log("Fetch Error", err));
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Delete kar du?")) {
            await axios.delete(`${BACKEND_URL}/api/products/${id}`);
            setProducts(products.filter(p => p._id !== id));
        }
    };

    return (
        <div className="flex min-h-screen bg-[#F8F9FD]">
            {/* Sidebar (Same as Dashboard) */}
            <div className="hidden md:flex w-64 bg-white p-8 border-r flex-col gap-10">
                <h1 className="text-3xl font-black text-[#7B61FF] italic tracking-tighter">Lexron.</h1>
                <nav className="flex flex-col gap-2 font-bold">
                    <button onClick={() => navigate('/dashboard')} className="p-4 text-gray-400">📊 Dashboard</button>
                    <button className="p-4 bg-[#F0EEFF] text-[#7B61FF] rounded-2xl">📦 Inventory</button>
                </nav>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 md:p-12">
                <h2 className="text-4xl font-black mb-10 italic">Product <span className="text-gray-300">Vault</span></h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map(p => (
                        <div key={p._id} className="bg-white p-6 rounded-[2.5rem] shadow-sm group">
                            <img src={`${BACKEND_URL}${p.imageUrl}`} className="w-full h-48 object-contain mb-4" />
                            <p className="text-[10px] font-bold text-[#d4af37] uppercase">{p.brand}</p>
                            <h3 className="text-lg font-black uppercase mb-4 truncate">{p.name}</h3>
                            <div className="flex justify-between items-center">
                                <span className="font-black italic text-xl">₹{p.price}</span>
                                <button onClick={() => handleDelete(p._id)} className="text-red-500 font-bold text-xs uppercase underline">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Products;