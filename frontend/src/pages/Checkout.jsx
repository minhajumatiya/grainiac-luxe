import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import UserNavbar from '../components/UserNavbar'; // Navbar consistency ke liye

const Checkout = () => {
    const navigate = useNavigate();
    const { updateCartCount } = useContext(CartContext);

    // LocalStorage se cart items uthana
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Total price calculate karna
    const total = cartItems.reduce((acc, item) => acc + Number(item.price), 0);

    // User input state
    const [user, setUser] = useState({ name: '', mobile: '', address: '' });

    const placeOrder = async (e) => {
        e.preventDefault();

        // --- ORDER DATA OBJECT ---
        const orderData = {
            customerName: user.name,
            mobile: user.mobile,
            address: user.address,
            // Items map jisme ab ML Size bhi jayega
            items: cartItems.map(item => ({
                name: item.name,
                price: item.price,
                imageUrl: item.imageUrl,
                selectedSize: item.selectedSize, // <--- Ye line ab database mein size bhejegi
                quantity: 1
            })),
            totalAmount: total
        };

        try {
            // API Call to save order
            // await axios.post('http://localhost:5000/api/orders/add', orderData);
            // Checkout.jsx ke andar:
            await axios.post('http://localhost:5000/api/orders/add', orderData);
            alert("🎉 GRAINIAC LUXE: Order Successful!");

            // Cleanup: Cart khali karna aur UI refresh
            localStorage.removeItem('cart');
            updateCartCount();
            navigate('/'); // Home page par wapas bhej dena
        } catch (err) {
            console.error(err);
            alert("Order Fail ho gaya! Backend console check karein.");
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen">
            <UserNavbar />

            <main className="max-w-4xl mx-auto px-6 py-12">
                <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl border border-slate-100">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-black tracking-tighter uppercase italic text-slate-900">Finalize Your Scent</h2>
                        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-2">Enter your delivery details below</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Order Form */}
                        <form onSubmit={placeOrder} className="space-y-5">
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 ring-[#d4af37] font-medium"
                                onChange={e => setUser({ ...user, name: e.target.value })}
                                required
                            />
                            <input
                                type="number"
                                placeholder="Mobile Number"
                                className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 ring-[#d4af37] font-medium"
                                onChange={e => setUser({ ...user, mobile: e.target.value })}
                                required
                            />
                            <textarea
                                placeholder="Shipping Address (Village, City, Pincode)"
                                className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 ring-[#d4af37] h-32 font-medium"
                                onChange={e => setUser({ ...user, address: e.target.value })}
                                required
                            ></textarea>

                            <button className="w-full bg-black text-white py-5 rounded-[2rem] font-black text-lg hover:bg-[#d4af37] transition-all shadow-lg active:scale-95">
                                PLACE ORDER (₹{total})
                            </button>
                        </form>

                        {/* Order Summary Summary Side */}
                        <div className="bg-slate-50 p-6 rounded-[2.5rem] border border-slate-100 h-fit">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Your Bag</p>
                            <div className="space-y-4">
                                {cartItems.map((item, i) => (
                                    <div key={i} className="flex justify-between items-center gap-4">
                                        <div className="flex items-center gap-3">
                                            <img src={`http://localhost:5000${item.imageUrl}`} className="w-12 h-12 rounded-xl object-contain bg-white border" alt="" />
                                            <div>
                                                <p className="text-sm font-bold text-slate-800">{item.name}</p>
                                                <p className="text-[10px] font-black text-[#d4af37] uppercase">{item.selectedSize}</p>
                                            </div>
                                        </div>
                                        <p className="font-black text-slate-900 text-sm">₹{item.price}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 pt-6 border-t border-slate-200 flex justify-between items-center">
                                <span className="font-black text-slate-400 uppercase text-xs">Grand Total</span>
                                <span className="text-2xl font-black text-slate-900">₹{total}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Checkout;