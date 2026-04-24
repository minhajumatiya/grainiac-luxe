import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';
import UserNavbar from '../components/UserNavbar';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // 🔥 LIVE BACKEND URL
    const BACKEND_URL = 'https://grainiac-luxe-backend.onrender.com';

    const currentCategory = searchParams.get('cat');

    useEffect(() => {
        const getProducts = async () => {
            try {
                // ✅ AB YE SAHI HAI
                const res = await axios.get(`${BACKEND_URL}/api/products`);
                setProducts(res.data);
                setFilteredProducts(res.data);
            } catch (err) {
                console.error("Data fetch error:", err);
            }
        };
        getProducts();
    }, []);

    useEffect(() => {
        if (currentCategory) {
            const result = products.filter(item => item.category === currentCategory);
            setFilteredProducts(result);
        } else {
            setFilteredProducts(products);
        }
    }, [currentCategory, products]);

    return (
        <div className="bg-white min-h-screen">
            <UserNavbar />
            <main className="max-w-7xl mx-auto px-6 md:px-10 py-12">
                <div className="flex justify-between items-end mb-12 border-b pb-6">
                    <div>
                        <p className="text-[#d4af37] font-black text-[10px] uppercase tracking-[0.3em] mb-2">Exclusive Collection</p>
                        <h2 className="text-5xl font-black tracking-tighter uppercase italic text-slate-900">
                            {currentCategory ? currentCategory : "All Fragrances"}
                        </h2>
                    </div>
                    <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">
                        Showing {filteredProducts.length} Results
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filteredProducts.map((product) => (
                        <div
                            key={product._id}
                            onClick={() => navigate(`/product/${product._id}`)}
                            className="group cursor-pointer"
                        >
                            <div className="aspect-[3/4] bg-slate-50 rounded-[2.5rem] overflow-hidden mb-6 border border-slate-100 relative shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
                                <img
                                    // ✅ LOCALHOST HATA KAR BACKEND_URL LAGAYA HAI
                                    src={`${BACKEND_URL}${product.imageUrl}`}
                                    alt={product.name}
                                    className="w-full h-full object-contain p-10 group-hover:scale-110 transition duration-700"
                                />
                                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border shadow-sm text-slate-500">
                                    {product.category}
                                </div>
                            </div>

                            <div className="px-2">
                                <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight mb-1 group-hover:text-[#d4af37] transition-colors">{product.name}</h3>
                                <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em] mb-3">{product.brand}</p>
                                <div className="flex justify-between items-center">
                                    <p className="text-2xl font-black text-slate-900">₹{product.price}</p>
                                    <span className="text-[10px] font-black uppercase underline tracking-widest opacity-0 group-hover:opacity-100 transition-all">View Details</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-32 border-2 border-dashed border-slate-100 rounded-[3rem]">
                        <p className="text-slate-300 font-black text-3xl uppercase italic tracking-tighter">No scents found in this category.</p>
                        <button onClick={() => navigate('/')} className="mt-6 text-[#d4af37] font-bold uppercase text-xs tracking-widest hover:underline">Clear Filters</button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Home;