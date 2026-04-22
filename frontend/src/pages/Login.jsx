import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    // Ab yahan email ki jagah mobile hai
    const [formData, setFormData] = useState({ mobile: '', password: '' });
    const navigate = useNavigate();

    const BACKEND_URL = 'https://grainiac-backend.onrender.com';

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            // Backend ko mobile aur password bhej rahe hain
            const res = await axios.post(`${BACKEND_URL}/api/auth/login`, formData);

            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));

            alert("Login Successful!");
            navigate('/');
        } catch (err) {
            console.error("Login Error:", err);
            alert(err.response?.data?.message || "Login Failed! Mobile ya Password galat hai.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 font-sans">
            <form onSubmit={onSubmit} className="bg-white p-8 md:p-12 rounded-[2.5rem] md:rounded-[4rem] shadow-sm border w-full max-w-md">
                <header className="mb-8">
                    <h2 className="text-4xl font-black italic uppercase tracking-tighter leading-none">Login</h2>
                    <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-2">Grainiac Luxe Admin Access</p>
                </header>

                <div className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-slate-300 ml-4">Mobile Number</label>
                        <input
                            type="number"
                            placeholder="Enter Registered Mobile"
                            className="w-full p-5 bg-slate-50 rounded-3xl border-none outline-none font-bold text-slate-700 focus:ring-2 focus:ring-[#d4af37]/20 transition-all"
                            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-slate-300 ml-4">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full p-5 bg-slate-50 rounded-3xl border-none outline-none font-bold text-slate-700 focus:ring-2 focus:ring-[#d4af37]/20 transition-all"
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-slate-900 text-[#d4af37] p-6 rounded-3xl font-black uppercase tracking-widest hover:bg-black hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-slate-200 mt-4"
                    >
                        Access Dashboard
                    </button>
                </div>

                <div className="mt-8 text-center border-t pt-6">
                    <p className="text-slate-400 font-bold text-xs uppercase tracking-tight">
                        New Member? <Link to="/signup" className="text-slate-900 underline underline-offset-4 decoration-[#d4af37] decoration-2">Join the Club</Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;