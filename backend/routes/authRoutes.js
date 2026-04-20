const express = require('express');
const router = express.Router();
const User = require('../models/User');

// --- SIGNUP ROUTE ---
router.post('/signup', async (req, res) => {
    try {
        const { name, mobile, password } = req.body;
        const existingUser = await User.findOne({ mobile });
        if (existingUser) return res.status(400).json({ message: "Mobile number already exists!" });

        const newUser = new User({ name, mobile, password });
        await newUser.save();
        res.status(201).json({ message: "Account created successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- LOGIN ROUTE ---
router.post('/login', async (req, res) => {
    try {
        const { mobile, password } = req.body;
        const user = await User.findOne({ mobile, password });
        if (!user) return res.status(400).json({ message: "Invalid credentials!" });

        res.json({ user: { name: user.name, mobile: user.mobile } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// GET ALL REGISTERED USERS (Admin ke liye)
router.get('/users', async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Password nahi bhejenge
        res.json(users);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;