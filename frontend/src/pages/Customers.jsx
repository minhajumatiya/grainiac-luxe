import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { User, Calendar, Phone } from 'lucide-react';

const Customers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/auth/users')
            .then(res => setUsers(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="flex bg-slate-50 min-h-screen">
            <Sidebar />
            <main className="flex-1 ml-64 p-10">
                <h1 className="text-3xl font-black mb-10 tracking-tighter uppercase italic">Grainiac Members</h1>

                <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-slate-900 text-white uppercase text-[10px] tracking-widest font-black">
                            <tr>
                                <th className="p-6">Member Name</th>
                                <th className="p-6">Mobile Number</th>
                                <th className="p-6">Joined Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {users.map(u => (
                                <tr key={u._id} className="hover:bg-slate-50 transition-all group">
                                    <td className="p-6 flex items-center gap-3">
                                        <div className="w-10 h-10 bg-[#d4af37]/10 text-[#d4af37] rounded-full flex items-center justify-center font-black">{u.name[0]}</div>
                                        <span className="font-bold text-slate-700">{u.name}</span>
                                    </td>
                                    <td className="p-6 font-bold text-slate-400 font-mono tracking-tighter">{u.mobile}</td>
                                    <td className="p-6 text-xs text-slate-300 font-bold uppercase">{new Date(u.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default Customers;