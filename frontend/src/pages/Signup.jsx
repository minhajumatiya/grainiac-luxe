import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserNavbar from '../components/UserNavbar';

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', mobile: '', password: '' });
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/signup', formData);
            alert("Success: Account created! Please login.");
            navigate('/login');
        } catch (err) {
            alert(err.response?.data?.message || "Signup failed!");
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen">
            <UserNavbar />
            <div className="max-w-md mx-auto mt-20 p-10 bg-white rounded-[3rem] shadow-2xl border">
                <h2 className="text-3xl font-black mb-8 text-center tracking-tighter italic text-slate-900">JOIN THE CLUB</h2>
                <form onSubmit={handleSignup} className="space-y-5">
                    <input type="text" placeholder="Your Name" className="w-full p-4 bg-slate-50 rounded-2xl outline-none border focus:border-[#d4af37]" onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                    <input type="number" placeholder="Mobile Number" className="w-full p-4 bg-slate-50 rounded-2xl outline-none border focus:border-[#d4af37]" onChange={e => setFormData({ ...formData, mobile: e.target.value })} required />
                    <input type="password" placeholder="Create Password" className="w-full p-4 bg-slate-50 rounded-2xl outline-none border focus:border-[#d4af37]" onChange={e => setFormData({ ...formData, password: e.target.value })} required />
                    <button className="w-full bg-black text-white py-5 rounded-2xl font-black text-lg hover:bg-[#d4af37] transition-all shadow-lg">CREATE ACCOUNT</button>
                </form>
                <p className="mt-8 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Already a member? <span className="text-black cursor-pointer underline" onClick={() => navigate('/login')}>Login Here</span>
                </p>
            </div>
        </div>
    );
};

export default Signup;