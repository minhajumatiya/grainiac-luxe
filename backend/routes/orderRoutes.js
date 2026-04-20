const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// A. Order Add (Customer)
router.post('/add', async (req, res) => {
    try {
        const { customerName, mobile, address, items, totalAmount } = req.body;
        const newOrder = new Order({
            user: { name: customerName, mobile: mobile },
            address, items, totalAmount
        });
        await newOrder.save();
        res.status(201).json({ message: "Order Placed!" });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// B. Get All Orders (Admin)
router.get('/', async (req, res) => {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
});

// C. TRACK ORDER (Mobile Se)
router.get('/track/:mobile', async (req, res) => {
    try {
        const orders = await Order.find({ "user.mobile": req.params.mobile }).sort({ createdAt: -1 });
        if (orders.length === 0) return res.status(404).json({ message: "Not Found" });
        res.json(orders);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// D. Status Update (Admin)
router.patch('/:id/status', async (req, res) => {
    try {
        const updated = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        res.json(updated);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;