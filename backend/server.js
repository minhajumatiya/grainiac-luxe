const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// MODELS IMPORT (File names check kar lena)
const Product = require('./models/Product');
const Order = require('./models/Order');
const User = require('./models/User');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- 🔥 THE LEXRON STATS ROUTE ---
app.get('/api/admin/stats', async (req, res) => {
    try {
        const totalProducts = await Product.countDocuments();
        const totalUsers = await User.countDocuments();
        const orders = await Order.find().sort({ createdAt: -1 });

        // 1. Total Revenue
        const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.totalAmount) || 0), 0);

        // 2. Growth Calculation (Last 30 Days vs Previous 30 Days)
        const now = new Date();
        const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);

        const thisMonthOrders = orders.filter(o => new Date(o.createdAt) >= thisMonthStart);
        const lastMonthOrders = orders.filter(o => new Date(o.createdAt) >= lastMonthStart && new Date(o.createdAt) < thisMonthStart);

        const thisMonthRev = thisMonthOrders.reduce((sum, o) => sum + (Number(o.totalAmount) || 0), 0);
        const lastMonthRev = lastMonthOrders.reduce((sum, o) => sum + (Number(o.totalAmount) || 0), 0);

        let growth = 0;
        if (lastMonthRev > 0) {
            growth = ((thisMonthRev - lastMonthRev) / lastMonthRev) * 100;
        } else if (thisMonthRev > 0) { growth = 100; }

        res.json({
            totalProducts,
            totalUsers,
            totalRevenue,
            thisMonthRev,
            growth: growth.toFixed(1),
            recentOrders: orders.slice(0, 8)
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Single Order Route
app.get('/api/orders/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        res.json(order);
    } catch (err) { res.status(404).json({ message: "Not found" }); }
});

// Port & Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Lexron Backend on ${PORT}`));