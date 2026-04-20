const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Check Admin
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: "Admin account nahi mila!" });
        }

        // 2. Compare Password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Password galat hai!" });
        }

        // 3. Create JWT Token
        const token = jwt.sign(
            { id: admin._id },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '1d' }
        );

        res.status(200).json({
            token,
            message: "Login successful!"
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};