import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { ShoppingBag, Users, IndianRupee, Package } from 'lucide-react';

const Dashboard = () => {
    const [stats, setStats] = useState({ orders: 0, products: 0, customers: 0, revenue: 0 });
    const BACKEND_URL = 'https://grainiac-backend.onrender.com';

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const ordersRes = await axios.get(`${BACKEND_URL}/api/orders`);
                const productsRes = await axios.get(`${BACKEND_URL}/api/products`);
                const customersRes = await axios.get(`${BACKEND_URL}/api/customers`); // Agar ye route banaya hai toh

                const totalRevenue = ordersRes.data.reduce((acc, curr) => acc + curr.totalAmount, 0);

                setStats({
                    orders: ordersRes.data.length,
                    products: productsRes.data.length,
                    customers: customersRes.data.length,
                    revenue: totalRevenue
                });
            } catch (err) {
                console.error("Dashboard Fetch Error:", err);
            }
        };
        fetchStats();
    }, []);

    const cards = [
        { title: 'Total Revenue', value: `₹${stats.revenue}`, icon: IndianRupee, color: 'text-amber-500', bg: 'bg-amber-50' },
        { title: 'Orders', value: stats.orders, icon: ShoppingBag, color: 'text-blue-500', bg: 'bg-blue-50' },
        { title: 'Products', value: stats.products, icon: Package, color: 'text-purple-500', bg: 'bg-purple-50' },
        { title: 'Customers', value: stats.customers, icon: Users, color: 'text-green-500', bg: 'bg-green-50' },
    ];

    return (
        <div className="flex bg-slate-50 min-h-screen">
            <Sidebar />
            <main className="flex-1 md:ml-64 p-4 md:p-10">
                <header className="mb-10 mt-16 md:mt-0">
                    <h1 className="text-4xl font-black italic uppercase tracking-tighter">Grainiac Dashboard</h1>
                    <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-1">Real-time Performance</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {cards.map((card, i) => (
                        <div key={i} className="bg-white p-8 rounded-[2.5rem] border shadow-sm group hover:shadow-md transition-all">
                            <div className={`${card.bg} ${card.color} w-12 h-12 rounded-2xl flex items-center justify-center mb-6`}>
                                <card.icon size={24} />
                            </div>
                            <p className="text-slate-400 font-black uppercase text-[10px] tracking-widest mb-1">{card.title}</p>
                            <h2 className="text-3xl font-black italic tracking-tighter">{card.value}</h2>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;