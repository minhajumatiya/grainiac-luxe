const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) return res.status(401).json({ message: "Access Denied! Token missing." });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = verified;
        next(); // Agle function par jao
    } catch (error) {
        res.status(400).json({ message: "Invalid Token!" });
    }
};

module.exports = { protect };