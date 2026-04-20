const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const multer = require('multer');

// Multer Setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage: storage });

// ADD PRODUCT
router.post('/add', upload.single('image'), async (req, res) => {
    try {
        const { name, brand, price, category, description, sizes } = req.body;

        const newProduct = new Product({
            name,
            brand,
            price,
            category,
            description,
            // Agar ek hi size hai toh wo string aayega, warna array. Ise fix karte hain:
            sizes: Array.isArray(sizes) ? sizes : [sizes],
            imageUrl: `/uploads/${req.file.filename}`
        });

        await newProduct.save();
        res.status(201).json({ message: "Perfume Added!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET ALL PRODUCTS
router.get('/', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

module.exports = router;