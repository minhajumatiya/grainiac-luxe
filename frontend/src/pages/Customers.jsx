import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { User, Mail, Phone } from 'lucide-react';

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const BACKEND_URL = 'https://grainiac-luxe-backend.onrender.com';

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const res = await axios.get(`${BACKEND_URL}/api/customers`);
                setCustomers(res.data);
            } catch (err) {
                console.error("Fetch Customers Error:", err);
            }
        };
        fetchCustomers();
    }, []);

    return (
        <div className="flex bg-slate-50 min-h-screen">
            <Sidebar />
            <main className="flex-1 md:ml-64 p-4 md:p-10">
                <header className="mb-10 mt-16 md:mt-0">
                    <h1 className="text-4xl font-black italic uppercase tracking-tighter">Customers</h1>
                    <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-1">Client Relations</p>
                </header>

                <div className="bg-white rounded-[2rem] border shadow-sm overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-slate-900 text-white uppercase text-[10px] tracking-widest">
                            <tr>
                                <th className="p-6">Name</th>
                                <th className="p-6">Contact</th>
                                <th className="p-6">Registration Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {customers.map((c) => (
                                <tr key={c._id} className="hover:bg-slate-50">
                                    <td className="p-6">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-slate-100 p-2 rounded-lg text-slate-400"><User size={16} /></div>
                                            <p className="font-black text-sm uppercase italic">{c.name}</p>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <p className="text-sm font-bold text-slate-600">{c.mobile}</p>
                                        <p className="text-[10px] text-slate-400">{c.email}</p>
                                    </td>
                                    <td className="p-6 text-xs font-black text-slate-300 uppercase tracking-widest">
                                        {new Date(c.createdAt).toLocaleDateString()}
                                    </td>
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