const User = require('../models/User');

exports.getAllCustomers = async (req, res) => {
    try {
        const customers = await User.find().select('name mobile createdAt');
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: "Customer data error!", error });
    }
};