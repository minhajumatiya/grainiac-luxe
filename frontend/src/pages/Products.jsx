import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../components/AdminLayout';

const Products = () => {
    const [products, setProducts] = useState([]);
    const BACKEND_URL = 'https://grainiac-luxe-backend.onrender.com';

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/products`).then(res => setProducts(res.data));
    }, []);

    return (
        <AdminLayout>
            <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-black italic">Inventory <span className="text-gray-300">Vault</span></h2>
                <button className="bg-[#7B61FF] text-white px-6 py-2 rounded-xl text-xs font-bold">+ New</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map(p => (
                    <div key={p._id} className="bg-white p-6 rounded-[2.5rem] shadow-sm">
                        <img src={`${BACKEND_URL}${p.imageUrl}`} className="h-40 w-full object-contain mb-4" />
                        <h3 className="font-black uppercase text-sm truncate">{p.name}</h3>
                        <p className="text-xl font-black italic mt-2">₹{p.price}</p>
                    </div>
                ))}
            </div>
        </AdminLayout>
    );
};

export default Products;