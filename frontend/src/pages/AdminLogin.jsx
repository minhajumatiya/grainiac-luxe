import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Yahan aap apna backend admin login API call karenge
            const res = await axios.post('https://grainiac-luxe-backend.onrender.com/api/admin/login', credentials);
            localStorage.setItem('adminToken', res.data.token);
            alert("Admin Login Successful!");
            navigate('/dashboard');
        } catch (err) {
            alert("Invalid Admin Credentials!");
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
            <div className="max-w-md w-full bg-white rounded-[2.5rem] p-10 shadow-2xl">
                <h2 className="text-3xl font-black text-center mb-2 tracking-tighter">ADMIN ACCESS</h2>
                <p className="text-slate-400 text-center text-sm mb-8 font-bold uppercase tracking-widest">Grainiac Luxe Control</p>

                <form onSubmit={handleLogin} className="space-y-5">
                    <input
                        type="email"
                        placeholder="Admin Email"
                        className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 ring-[#d4af37]"
                        onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 ring-[#d4af37]"
                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                        required
                    />
                    <button className="w-full bg-black text-white py-5 rounded-2xl font-black text-lg hover:bg-[#d4af37] transition-all">
                        ENTER DASHBOARD
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;