const Order = require('../models/Order');
const User = require('../models/User');

exports.getDashboardStats = async (req, res) => {
    try {
        // 1. Total Sales (Saare Delivered orders ka sum)
        const totalSales = await Order.aggregate([
            { $match: { status: 'Delivered' } },
            { $group: { _id: null, total: { $sum: "$totalAmount" } } }
        ]);

        // 2. Last Month Sales (Pichle 30 dino ka data)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const lastMonthSales = await Order.aggregate([
            {
                $match: {
                    status: 'Delivered',
                    createdAt: { $gte: thirtyDaysAgo }
                }
            },
            { $group: { _id: null, total: { $sum: "$totalAmount" } } }
        ]);

        // 3. Total Customer Count
        const customerCount = await User.countDocuments();

        // 4. Pending Orders Count
        const pendingOrders = await Order.countDocuments({ status: 'Pending' });

        res.status(200).json({
            totalRevenue: totalSales[0]?.total || 0,
            lastMonthRevenue: lastMonthSales[0]?.total || 0,
            totalCustomers: customerCount,
            pendingOrders: pendingOrders
        });
    } catch (error) {
        res.status(500).json({ message: "Stats nikalne mein error!", error });
    }
};