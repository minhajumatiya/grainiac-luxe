const express = require('express');
const router = express.Router();

// ADMIN LOGIN ROUTE
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Yahan humne password aur email set kiya hai
    const ADMIN_EMAIL = "admin@gmail.com";
    const ADMIN_PASSWORD = "admin123";

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        // Login success
        res.json({
            success: true,
            token: "grainiac_admin_secret_token",
            message: "Welcome Admin!"
        });
    } else {
        // Login fail
        res.status(401).json({
            success: false,
            message: "Galt Email ya Password hai, check karein!"
        });
    }
});

module.exports = router;