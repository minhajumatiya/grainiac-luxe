import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import UserNavbar from '../components/UserNavbar';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { updateCartCount } = useContext(CartContext);
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:5000/api/products`).then(res => {
            const found = res.data.find(p => p._id === id);
            setProduct(found);
            if (found && found.sizes.length > 0) setSelectedSize(found.sizes[0]);
        });
    }, [id]);

    const addToCart = () => {
        if (!selectedSize) return alert("Please select a size!");
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push({
            ...product,
            selectedSize: selectedSize // Cart mein size save ho gaya
        });
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        navigate('/cart');
    };

    if (!product) return <div className="p-20 text-center font-black">FETCHING SCENT...</div>;

    return (
        <div className="bg-white min-h-screen">
            <UserNavbar />
            <main className="max-w-7xl mx-auto px-10 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div className="bg-slate-50 rounded-[3rem] p-12 flex items-center justify-center border shadow-inner">
                    <img src={`http://localhost:5000${product.imageUrl}`} className="w-full max-h-[500px] object-contain hover:scale-105 transition duration-500" alt="" />
                </div>
                <div className="flex flex-col justify-center">
                    <h1 className="text-5xl font-black mb-2 uppercase tracking-tighter italic">{product.name}</h1>
                    <p className="text-[#d4af37] font-black tracking-[0.2em] mb-10 text-xs uppercase">{product.brand}</p>

                    <div className="mb-10">
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-4">Choose Volume</p>
                        <div className="flex flex-wrap gap-3">
                            {product.sizes.map(size => (
                                <button key={size} onClick={() => setSelectedSize(size)} className={`px-8 py-3 rounded-2xl font-black text-xs transition-all ${selectedSize === size ? 'bg-black text-white' : 'bg-slate-50 text-slate-400 border'}`}>{size}</button>
                            ))}
                        </div>
                    </div>

                    <div className="mb-10">
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2">Description</p>
                        <p className="text-slate-600 font-medium leading-relaxed">{product.description}</p>
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-10 border-t">
                        <p className="text-4xl font-black">₹{product.price}</p>
                        <button onClick={addToCart} className="bg-black text-white px-12 py-5 rounded-[2rem] font-black hover:bg-[#d4af37] transition-all shadow-xl">ADD TO BAG</button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProductDetail;