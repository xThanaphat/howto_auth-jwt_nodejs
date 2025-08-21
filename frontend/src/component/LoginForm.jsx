import React, { useState } from 'react'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'

function LoginForm({ setAuth }) {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', formData);
            localStorage.setItem('token', res.data.token); // keep store token in localStorage
            setAuth(true);
            navigate('/dashboard');
        } catch (err) {
            const msg = err?.response?.data?.message || 'Login failed';
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

  return (
    <div className='container mt-5'>
        <div className='row justify-content-center'>
            <div className='col-md-6'>
                <div className='card'>
                    <div className='card-header text-center'>
                        <h3 className='mb-0'>Login Form</h3>
                    </div>
                    <div className='card-body'>
                        {error && <div className='alert alert-danger py-2 mb-3'>{error}</div>}
                        <form onSubmit={handleSubmit} noValidate>
                            <div className='form-group mb-3'>
                                <label htmlFor='email'>Email</label>
                                <input
                                    id='email'
                                    type='email'
                                    name='email'
                                    className='form-control'
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='form-group mb-3'>
                                <label htmlFor='password'>Password</label>
                                <input
                                    id='password'
                                    type='password'
                                    name='password'
                                    className='form-control'
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button type='submit' className='btn btn-primary w-100' disabled={loading}>
                                {loading ? 'Logging in...' : 'Login'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LoginForm
