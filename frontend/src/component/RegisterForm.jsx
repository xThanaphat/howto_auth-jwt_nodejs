import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function RegisterForm() {

    const [formData, setFormData] = React.useState({
        username: '',
        email: '',
        password: ''
    });
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await axios.post('http://localhost:5000/api/auth/register', formData);
            alert('Registration successful');
            navigate('/login');
        } catch (err) {
            const msg = err?.response?.data?.message || 'Registration failed';
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

  return (
    <div className='container mt-5 pt-5'>
        <div className='row justify-content-center'>
            <div className='col-md-6'>
                <div className='card'>
                    <div className='card-header text-center'>
                        <h3 className='mb-0'>Register Form</h3>
                    </div>
                    <div className='card-body'>
                        {error && <div className='alert alert-danger py-2 mb-3'>{error}</div>}
                        <form onSubmit={handleSubmit} noValidate>
                            <div className='form-group mb-3'>
                                <label htmlFor='username'>Username</label>
                                <input
                                    id='username'
                                    type='text'
                                    name='username'
                                    className='form-control'
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
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
                                {loading ? 'Registering...' : 'Register'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default RegisterForm
