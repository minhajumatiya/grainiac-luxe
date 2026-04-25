import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const BACKEND_URL = 'https://grainiac-luxe-backend.onrender.com';

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${BACKEND_URL}/api/auth/login`, { mobile, password });
            localStorage.setItem('token', res.data.token); // Token save karo
            alert("Welcome Back, Boss!");
            navigate('/dashboard'); // Login hote hi dashboard bhejo
        } catch (err) {
            alert(err.response?.data?.message || "Login Failed!");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white p-6">
            <form onSubmit={handleLogin} className="bg-slate-50 p-12 rounded-[3rem] shadow-2xl w-full max-w-md border-2 border-slate-100">
                <p className="text-[#d4af37] font-black text-[10px] uppercase tracking-[0.4em] mb-4 text-center">Security Check</p>
                <h2 className="text-4xl font-black mb-10 text-center italic uppercase tracking-tighter">Admin <span className="text-slate-300">Access</span></h2>

                <div className="space-y-6">
                    <input
                        type="number"
                        placeholder="Mobile Number"
                        className="w-full p-5 bg-white rounded-2xl outline-none shadow-inner border-none focus:ring-2 ring-black transition-all"
                        onChange={e => setMobile(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-5 bg-white rounded-2xl outline-none shadow-inner border-none focus:ring-2 ring-black transition-all"
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    <button className="w-full bg-black text-white p-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#d4af37] hover:text-black transition-all shadow-xl active:scale-95">
                        Authorize Now
                    </button>
                </div>
            </form>
        </div>
    );
};
export default AdminLogin;