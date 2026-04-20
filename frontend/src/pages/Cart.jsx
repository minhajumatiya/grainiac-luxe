import React, { useState, useEffect, useContext } from 'react'; // useContext add kiya
import axios from 'axios';
import UserNavbar from '../components/UserNavbar';
import { Trash2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // 1. Navigate import kiya
import { CartContext } from '../context/CartContext'; // Count sync ke liye

const Cart = () => {
    const navigate = useNavigate(); // 2. Hook initialize kiya
    const { updateCartCount } = useContext(CartContext); // Context se function liya
    const [cartItems, setCartItems] = useState([]);

    // Cart load karne ke liye
    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(items);
    }, []);

    // Product remove karne ke liye
    const removeFromCart = (index) => {
        const updatedCart = [...cartItems];
        updatedCart.splice(index, 1);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));

        // 3. Navbar count ko turant update karein
        updateCartCount();
    };

    const total = cartItems.reduce((acc, item) => acc + Number(item.price), 0);

    return (
        <div className="bg-white min-h-screen font-sans">
            <UserNavbar />

            <main className="max-w-4xl mx-auto px-6 md:px-10 py-12">
                <h1 className="text-3xl font-black text-slate-800 mb-10 tracking-tight">YOUR SHOPPING BAG</h1>

                {cartItems.length > 0 ? (
                    <div className="space-y-6">
                        {cartItems.map((item, index) => (
                            <div key={index} className="flex items-center gap-6 p-4 bg-slate-50 rounded-[2rem] border border-slate-100 shadow-sm group">
                                <div className="w-24 h-24 bg-white rounded-2xl p-2 overflow-hidden border border-slate-100">
                                    <img
                                        src={`http://localhost:5000${item.imageUrl}`}
                                        className="w-full h-full object-contain group-hover:scale-110 transition duration-500"
                                        alt={item.name}
                                    />
                                </div>

                                <div className="flex-1">
                                    <h3 className="font-bold text-slate-800 text-lg">{item.name}</h3>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{item.brand}</p>
                                    <p className="text-sm text-slate-500 mt-1 italic">{item.category}</p>
                                </div>

                                <div className="text-right flex flex-col items-end gap-2">
                                    <p className="font-black text-xl text-slate-900">₹{item.price}</p>
                                    <button
                                        onClick={() => removeFromCart(index)}
                                        className="text-red-400 p-2 hover:bg-red-50 rounded-xl transition-all"
                                        title="Remove Item"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}

                        {/* Order Summary & Checkout Button */}
                        <div className="mt-12 p-8 bg-slate-900 rounded-[2.5rem] text-white flex flex-col md:flex-row justify-between items-center gap-6 shadow-2xl border-t-4 border-[#d4af37]">
                            <div>
                                <p className="text-slate-400 text-xs font-black uppercase tracking-[0.2em] mb-1">Estimated Total</p>
                                <h2 className="text-4xl font-black text-white">₹{total}</h2>
                                <p className="text-[10px] text-slate-500 uppercase mt-1 italic font-bold">Inclusve of all luxury taxes</p>
                            </div>

                            {/* 4. Checkout Button with Navigation */}
                            <button
                                onClick={() => navigate('/checkout')}
                                className="w-full md:w-auto bg-[#d4af37] text-white px-12 py-5 rounded-[1.5rem] font-black flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-all duration-300 shadow-xl active:scale-95"
                            >
                                PROCEED TO CHECKOUT <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-24 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Trash2 size={32} className="text-slate-300" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-800 mb-2">Your Bag is Empty</h2>
                        <p className="text-slate-400 font-medium mb-8">Discover our signature collection and find your scent.</p>
                        <button
                            onClick={() => navigate('/')}
                            className="bg-black text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#d4af37] transition-all"
                        >
                            CONTINUE SHOPPING
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Cart;