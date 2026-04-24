const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// SIGNUP LOGIC
exports.signup = async (req, res) => {
    try {
        const { name, mobile, password } = req.body;

        // Check if user exists
        const existingAdmin = await Admin.findOne({ mobile });
        if (existingAdmin) return res.status(400).json({ message: "Mobile number pehle se register hai!" });

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 12);

        const newAdmin = new Admin({ name, mobile, password: hashedPassword });
        await newAdmin.save();

        res.status(201).json({ message: "Account Ban Gaya! Ab login karo." });
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};

// LOGIN LOGIC
exports.login = async (req, res) => {
    try {
        const { mobile, password } = req.body;
        const admin = await Admin.findOne({ mobile });

        if (!admin) return res.status(404).json({ message: "Account nahi mila!" });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(400).json({ message: "Password galat hai!" });

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET || 'secret123', { expiresIn: '1d' });

        res.status(200).json({ token, admin: { name: admin.name, mobile: admin.mobile }, message: "Welcome Back!" });
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};