import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar({isAuthenticated, setAuth}) {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setAuth(false);
        navigate('/login');
    }

  return (
    <div className='navbar navbar-expand-lg navbar-light bg-light fixed-top'>
      <div className="container">
        <Link to="/" className="navbar-brand">Auth&JWT</Link>
        <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNav' aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>

    <div className='collapse navbar-collapse' id='navbarNav'>
      <ul className='navbar-nav ms-auto align-items-lg-center'>
                {!isAuthenticated ? (
                <>
                <li className='nav-item'>
                    <Link to='/login' className='nav-link'>Login</Link>
                </li>
                <li className='nav-item'>
                    <Link to='/register' className='nav-link'>Register</Link>
                </li>
                </>) : (
               <>
               <li className='nav-item'>
                   <Link to='/dashboard' className='nav-link'>Dashboard</Link>
               </li>
               <li className='nav-item'>
                   <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
               </li>
           </>)}
            </ul>
        </div>

      </div>
    </div>
  )
}

export default Navbar
