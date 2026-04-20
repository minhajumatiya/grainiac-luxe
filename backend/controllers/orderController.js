const Order = require('../models/Order');

// Saare orders ki list (User details ke sath)
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user', 'name mobile').sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Orders fetch karne mein error!", error });
    }
};

// Order Status Update (Admin panel se change karne ke liye)
exports.updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body; // Status: 'Confirmed', 'Delivered', etc.
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { status: status },
            { new: true }
        );
        res.status(200).json({ message: "Status updated!", updatedOrder });
    } catch (error) {
        res.status(500).json({ message: "Status update fail ho gaya!", error });
    }
};