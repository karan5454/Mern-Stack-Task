const axios = require('axios');
const Transaction = require('../models/Transaction');

exports.listTransactions = async (req, res) => {
    try {
        const { page = 1, perPage = 10, search = '', month } = req.query;
        const regex = new RegExp(search, 'i'); // Case-insensitive search

        // Filter by month if provided
        const filter = month? { dateOfSale: { $regex: new RegExp(`-${month.padStart(2, '0')}-`) } } : {};

        // Search in title, description, and price
        if (search) {
            filter.$or = [
                { title: { $regex: regex } },
                { description: { $regex: regex } },
                { price: { $regex: regex } }
            ];
        }

        // Pagination
        const transactions = await Transaction.find(filter)
           .skip((page - 1) * perPage)
           .limit(Number(perPage));

        const total = await Transaction.countDocuments(filter);

        res.status(200).json({ transactions, total, page: Number(page), perPage: Number(perPage) });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getStatistics = async (req, res) => {
    try {
        const { month } = req.query;

        // Filter transactions by month
        const filter = month ? { dateOfSale: { $regex: new RegExp(`-${month.padStart(2, '0')}-`) } } : {};

        const totalSales = await Transaction.aggregate([
            { $match: filter },
            { $group: { _id: null, total: { $sum: '$price' } } }
        ]);

        const soldItemsCount = await Transaction.countDocuments({ ...filter, sold: true });
        const notSoldItemsCount = await Transaction.countDocuments({ ...filter, sold: false });

        res.status(200).json({
            totalSales: totalSales.length ? totalSales[0].total : 0,
            soldItemsCount,
            notSoldItemsCount
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getBarChartData = async (req, res) => {
    try {
        const { month } = req.query;

        // Filter transactions by month
        const filter = month ? { dateOfSale: { $regex: new RegExp(`-${month.padStart(2, '0')}-`) } } : {};

        const priceRanges = [
            { range: '0-100', min: 0, max: 100 },
            { range: '101-200', min: 101, max: 200 },
            { range: '201-300', min: 201, max: 300 },
            { range: '301-400', min: 301, max: 400 },
            { range: '401-500', min: 401, max: 500 },
            { range: '501-600', min: 501, max: 600 },
            { range: '601-700', min: 601, max: 700 },
            { range: '701-800', min: 701, max: 800 },
            { range: '801-900', min: 801, max: 900 },
            { range: '901-above', min: 901, max: Infinity }
        ];

        const barChartData = await Promise.all(priceRanges.map(async (range) => {
            const count = await Transaction.countDocuments({
                ...filter,
                price: { $gte: range.min, $lte: range.max }
            });
            return { range: range.range, count };
        }));

        res.status(200).json(barChartData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getPieChartData = async (req, res) => {
    try {
        const { month } = req.query;

        // Filter transactions by month
        const filter = month? { dateOfSale: { $regex: new RegExp(`-${month.padStart(2, '0')}-`) } } : {};

        const pieChartData = await Transaction.aggregate([
            { $match: filter },
            { $group: { _id: '$category', count: { $sum: 1 } } },
            { $project: { _id: 0, category: '$_id', count: 1 } }
        ]);

        res.status(200).json(pieChartData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



// Define and export each function
exports.initializeTransactions = async (req, res) => {
    // Your function implementation
};

exports.listTransactions = async (req, res) => {
    // Your function implementation
};

exports.getStatistics = async (req, res) => {
    // Your function implementation
};

exports.getBarChartData = async (req, res) => {
    // Your function implementation
};

exports.getPieChartData = async (req, res) => {
    // Your function implementation
};

exports.getCombinedData = async (req, res) => {
    // Your function implementation
};