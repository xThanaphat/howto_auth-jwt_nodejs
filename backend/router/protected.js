const express = require('express')
const auth = require('../middleware/auth')
const User = require('../model/User')
const router = express.Router()

router.get('/', auth, async (req, res) => {
    try {
    const user = await User.findById(req.userId)
        if (!user) return res.status(404).json({ message: 'User not found' })
        res.json({ message: 'Protected route accessed', 
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            } 
        })
    } catch (error) {
        console.error('Error fetching protected data:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
})

module.exports = router;
