const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// 1. MODELS IMPORT (Pakka check karein ki ye files isi naam se hain)
const Product = require('./models/Product');
const Order = require('./models/Order');
const User = require('./models/User'); // Agar aapka model Admin hai toh yahan badal dein

const app = express();

// 2. MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 3. DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("🔥 GRAINIAC LUXE: Cloud Database Connected!"))
    .catch(err => console.log("❌ DB Connection Error:", err));

// --- 4. ADMIN STATS ROUTE (500 Error Fix) ---
app.get('/api/admin/stats', async (req, res) => {
    try {
        const totalProducts = await Product.countDocuments();
        const totalCustomers = await User.countDocuments();
        const orders = await Order.find().sort({ createdAt: -1 });

        // Revenue Calculation
        const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.totalAmount) || 0), 0);

        res.json({
            totalProducts,
            totalCustomers,
            totalOrders: orders.length,
            totalRevenue,
            recentOrders: orders.slice(0, 5) // Dashboard ke liye top 5
        });
    } catch (err) {
        console.error("Stats Error:", err);
        res.status(500).json({ error: "Backend phat gaya: " + err.message });
    }
});

// --- 5. ORDERS ROUTES ---
// Saare orders dekhne ke liye
app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Naya Order add karne ke liye (Checkout ke liye)
app.post('/api/orders/add', async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        await newOrder.save();
        res.status(201).json({ message: "Order Placed!", order: newOrder });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Single Order Detail dekhne ke liye
app.get('/api/orders/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: "Order nahi mila" });
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- 6. PRODUCT ROUTES ---
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

// --- 7. AUTH ROUTES ---
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Dummy Customers route (Crash se bachne ke liye)
app.get('/api/customers', async (req, res) => {
    try {
        const customers = await User.find();
        res.json(customers);
    } catch (err) {
        res.json([]);
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));