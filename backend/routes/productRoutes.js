const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const multer = require('multer');
const path = require('path');

// --- MULTER SETUP (Images ke liye) ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Make sure 'uploads' folder exists in your root
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5000000 }, // Max 5MB
});

// --- 1. ADD PRODUCT (POST) ---
router.post('/add', upload.single('image'), async (req, res) => {
    try {
        const { name, brand, price, category, description, sizes } = req.body;

        if (!req.file) {
            return res.status(400).json({ error: "Please upload an image" });
        }

        const newProduct = new Product({
            name,
            brand,
            price,
            category,
            description,
            // Sizes check: string ko array mein convert karta hai
            sizes: Array.isArray(sizes) ? sizes : (sizes ? [sizes] : []),
            imageUrl: `/uploads/${req.file.filename}`
        });

        await newProduct.save();
        res.status(201).json({ message: "🔥 Perfume Added Successfully!", product: newProduct });
    } catch (err) {
        console.error("Add Error:", err);
        res.status(500).json({ error: err.message });
    }
});

// --- 2. GET ALL PRODUCTS (GET) ---
router.get('/', async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 }); // Naye products pehle
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch products" });
    }
});

// --- 3. GET SINGLE PRODUCT BY ID (GET) ---
// 🔥 Yahi route missing tha jiski wajah se 404 aa raha tha
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product nahi mila!" });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: "Invalid Product ID format" });
    }
});

// --- 4. DELETE PRODUCT (DELETE) ---
// Dashboard mein delete button ke liye kaam aayega
router.delete('/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product pehle se delete ho chuka hai" });
        }
        res.json({ message: "🗑️ Product Deleted Successfully!" });
    } catch (err) {
        res.status(500).json({ error: "Delete failed" });
    }
});

module.exports = router;