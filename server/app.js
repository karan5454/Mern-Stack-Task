const express = require('express');
const connectDB = require('./config/db');
const transactions = require('./routes/transactions');

const app = express();

// Connect Database
connectDB().catch(err => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
});

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/transactions', transactions);

// Catch-all error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server started on port ${PORT}'));