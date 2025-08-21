const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../model/User')
const router = express.Router()

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body
    if (!username || !email || !password) return res.status(400).json({ message: 'All fields required' })
    try {
        const exists = await User.findOne({ email })
        if (exists) return res.status(409).json({ message: 'Email already registered' })
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({ username, email, password: hashedPassword })
        await newUser.save()
        res.status(201).json({ message: 'User registered successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' })
    try {
        const user = await User.findOne({ email }) //find user by email
        if (!user) return res.status(400).json({ message: 'Invalid credentials' })

        const match = await bcrypt.compare(password, user.password) //compare passwords in db
        if (!match) return res.status(400).json({ message: 'Invalid credentials' })

        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' }) //create token
        res.json({ token })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router;