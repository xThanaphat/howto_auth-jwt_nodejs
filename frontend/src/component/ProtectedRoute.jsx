import React from 'react'
import { Navigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

function ProtectedRoute({ children }) {
    const token = localStorage.getItem('token')
    if (!token) return <Navigate to="/login" replace />
    try {
        const decoded = jwtDecode(token)
        const now = Date.now() / 1000
        if (decoded.exp && decoded.exp < now) {
            // หมดอายุ
            localStorage.removeItem('token')
            return <Navigate to="/login" replace />
        }
        return children
    } catch (e) {
        localStorage.removeItem('token')
        return <Navigate to="/login" replace />
    }
}

export default ProtectedRoute
