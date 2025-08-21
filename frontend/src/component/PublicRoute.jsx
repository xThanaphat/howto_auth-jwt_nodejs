import React from 'react'
import { Navigate } from 'react-router-dom'

function PublicRoute({ children }) {
  const isAuth = !!localStorage.getItem('token')
  if (isAuth) return <Navigate to="/dashboard" replace />
  return children
}

export default PublicRoute
