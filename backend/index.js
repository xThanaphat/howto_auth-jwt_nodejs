const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

const authRoutes = require('./router/auth');
const protectedRoutes = require('./router/protected')

// Middleware
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)

app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);

// Minimal protected route (requires Authorization: Bearer <token>)
app.get('/api/data', (req, res) => {
    const authHeader = req.headers.authorization || ''
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null
    if (!token) return res.status(401).json({ message: 'No token' })
    try {
        const decoded = require('jsonwebtoken').verify(token, process.env.JWT_SECRET)
        return res.json([
            { id: 1, name: 'Item One', userId: decoded.userId },
            { id: 2, name: 'Item Two', userId: decoded.userId }
        ])
    } catch (e) {
        return res.status(401).json({ message: 'Invalid token' })
    }
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});