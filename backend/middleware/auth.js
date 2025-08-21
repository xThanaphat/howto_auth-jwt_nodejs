const jwt = require('jsonwebtoken')

function auth(req, res, next) {
    // Support both Authorization: Bearer <token> and legacy x-auth-token
    const authHeader = req.headers.authorization || ''
    let token = null
    if (authHeader.startsWith('Bearer ')) token = authHeader.slice(7)
    if (!token) token = req.header('x-auth-token')
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' })
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.userId
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Token is not valid' })
    }
}

module.exports = auth;
