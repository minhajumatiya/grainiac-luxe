require('dotenv').config(); // Sabse upar: environment variables load karne ke liye
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Routes Import
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Image Uploads ko public karne ke liye (Static Folder)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- DATABASE CONNECTION LOGIC ---
// Ye logic ab tumhare .env file se MONGO_URI uthayega
const DB_URL = process.env.MONGO_URI;

mongoose.connect(DB_URL)
    .then(() => console.log("🔥 GRAINIAC LUXE: Cloud Database Connected!"))
    .catch(err => {
        console.log("❌ Connection Error Detail:", err);
        console.log("Tip: Check karo ki .env mein link sahi hai aur Atlas mein IP allow kiya hai.");
    });

// --- ROUTES REGISTRATION ---
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Perfume Shop Server running on port ${PORT}`);
});
// Routes registration se pehle ye dalo:
app.get('/', (req, res) => {
    res.send("🚀 GRAINIAC LUXE API is running perfectly!");
});
// server.js mein routes ke niche ye add karo
app.get('/api/customers', (req, res) => {
    // Abhi hamare paas customers nahi hain, toh khali array bhej do
    res.json([]);
});