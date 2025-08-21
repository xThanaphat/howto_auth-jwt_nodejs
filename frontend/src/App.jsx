
import { useState } from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


// Components
import Navbar from './component/Navbar'
import Home from './component/Home'
import RegisterForm from './component/RegisterForm'
import LoginForm from './component/LoginForm'
import Dashboard from './component/Dashboard'
import ProtectedRoute from './component/ProtectedRoute'
import PublicRoute from './component/PublicRoute'


function App() {
  const [isAuthenticated, setAuth] = useState(!!localStorage.getItem('token'));

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} setAuth={setAuth} />
      <div>
        <Routes> 
          <Route path='/dashboard' element={
            // validate admin
              <ProtectedRoute> 
                <Dashboard /> 
              </ProtectedRoute>
          } />
          <Route path='/register' element={
            <PublicRoute>
              <RegisterForm />
            </PublicRoute>
          } />
          <Route path='/login' element={
            <PublicRoute>
              <LoginForm setAuth={setAuth} />
            </PublicRoute>
          } />
          <Route path='/' element={<Home />} />
        </Routes>
      </div>

    </Router>
  )
}

export default App
