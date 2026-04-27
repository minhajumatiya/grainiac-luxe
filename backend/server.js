const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// 1. MODELS IMPORT
// 🚨 Dhyan dein: Agar file ka naam Admin.js hai toh niche User ki jagah Admin likhein
const Product = require('./models/Product');
const Order = require('./models/Order');
const User = require('./models/User');

const app = express();

// 2. MIDDLEWARE
app.use(cors());
app.use(express.json());
// Images dikhane ke liye uploads folder ko public kiya
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 3. MONGODB CONNECTION
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("🔥 GRAINIAC LUXE: Database Connected!"))
    .catch(err => console.log("❌ DB Connection Error:", err));

// --- 4. THE LEXRON STATS ROUTE (500 Error Fix) ---
app.get('/api/admin/stats', async (req, res) => {
    try {
        // Safe count logic
        const totalProducts = await Product.countDocuments().catch(() => 0);
        const totalUsers = await User.countDocuments().catch(() => 0);
        const orders = await Order.find().sort({ createdAt: -1 }).catch(() => []);

        // Revenue Calculation
        const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.totalAmount) || 0), 0);

        // Monthly Calculation (Growth)
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
            totalOrders: orders.length,
            thisMonthRev,
            growth: growth.toFixed(1),
            recentOrders: orders.slice(0, 10) // Dashboard table ke liye
        });
    } catch (err) {
        console.error("Stats API Error:", err);
        res.status(500).json({ error: "Stats load nahi ho paye: " + err.message });
    }
});

// --- 5. ORDERS ROUTES ---
// Saare orders fetch karne ke liye
app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Naya order add karne ke liye (Checkout ke liye)
app.post('/api/orders/add', async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        await newOrder.save();
        res.status(201).json({ message: "Order Placed Successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Single order detail page ke liye
app.get('/api/orders/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: "Order not found" });
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- 6. PRODUCT & AUTH ROUTES (404 Error Fix) ---
// 🚨 Check karein ki ye files 'routes' folder mein isi naam se hain
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

// --- 7. START SERVER ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Lexron Backend Live on Port ${PORT}`);
});