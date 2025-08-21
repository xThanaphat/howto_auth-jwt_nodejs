import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Dashboard() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [timedOut, setTimedOut] = useState(false)
    const [error, setError] = useState('')
    const [noToken, setNoToken] = useState(false)
    const [userInfo, setUserInfo] = useState(null)
    const [protectedError, setProtectedError] = useState('')
    const navigate = useNavigate()
    // token retrieved inside loadData; no need to store here

    // Logout handled in Navbar / other component; no local handler needed here

    const loadData = async ({ silent = false } = {}) => {
        const token = localStorage.getItem('token')
        if (!token) {
            setNoToken(true)
            setLoading(false)
            return
        }
        if (!silent) setLoading(true)
        setError('')
        setTimedOut(false)
        let cancelled = false
        const timeoutId = setTimeout(() => { if (!cancelled) setTimedOut(true) }, 8000)
        try {
            const res = await axios.get('http://localhost:5000/api/data', {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (!cancelled) setData(Array.isArray(res.data) ? res.data : [])
        } catch (err) {
            if (err?.response?.status === 401) {
                localStorage.removeItem('token')
                navigate('/login')
            } else if (!cancelled) {
                setError(err?.response?.data?.message || err.message || 'Failed to load data')
            }
        } finally {
            clearTimeout(timeoutId)
            if (!cancelled) setLoading(false)
        }
        return () => { cancelled = true }
    }

    const loadProtected = async () => {
        const token = localStorage.getItem('token')
        if (!token) return
        setProtectedError('')
        try {
            const res = await axios.get('http://localhost:5000/api/protected', {
                headers: { Authorization: `Bearer ${token}` }
            })
            setUserInfo(res.data)
        } catch (err) {
            if (err?.response?.status === 401) {
                localStorage.removeItem('token')
                navigate('/login')
            } else {
                setProtectedError(err?.response?.data?.message || 'Failed to load user info')
            }
        }
    }

    const refreshAll = () => {
        loadData({ silent: false })
        loadProtected()
    }

    useEffect(() => {
        loadData()
        loadProtected()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const itemCount = Array.isArray(data) ? data.length : 0

    return (
        <div className='container py-3'>
            <div className='dashboard-hero rounded-3 p-4 mb-4 position-relative overflow-hidden'>
                <div className='d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3'>
                    <div className='text-center text-md-start'>
                        <h2 className='fw-bold mb-2 mb-md-0'>Dashboard</h2>
                        <p className='mb-0 text-muted small'>Overview of your protected data</p>
                        {userInfo?.user && (
                            <div className='mt-2 small'>
                                <span className='badge text-bg-light border'>Logged in as <strong>{userInfo.user.username}</strong> ({userInfo.user.email})</span>
                            </div>
                        )}
                    </div>
                    <div className='d-flex gap-2 justify-content-center'>
                        <button type='button' className='btn btn-outline-primary btn-sm' onClick={refreshAll} disabled={loading}>↻ {loading ? 'Loading...' : 'Refresh'}</button>
                    </div>
                </div>
                <div className='hero-accent' />
            <div className='row g-3 mb-4'>
                <div className='col-sm-6 col-lg-3'>
                    <div className='stat-tile shadow-sm'>
                        <div className='stat-label'>Items</div>
                        <div className='stat-value'>{itemCount}</div>
                    </div>
                </div>
            </div>
            </div>
            {loading && (
                <div className='py-4 text-center'>
                    <div className='spinner-border text-primary mb-3' aria-hidden='true'></div>
                    <div className='small text-muted'>Loading data...</div>
                    {timedOut && <div className='text-warning small mt-2'>Taking longer than usual... <button type='button' className='btn btn-sm btn-outline-secondary ms-1' onClick={() => loadData()}>Retry</button></div>}
                </div>
            )}
            {!loading && noToken && (
                <div className='alert alert-warning'>No token found. Please login first.</div>
            )}
            {!loading && error && (
                <div className='alert alert-danger'>{error}</div>
            )}
            {!loading && protectedError && (
                <div className='alert alert-warning'>{protectedError}</div>
            )}
            {!loading && !error && itemCount === 0 && (
                <div className='alert alert-info'>No data available.</div>
            )}
            {!loading && !error && itemCount > 0 && (
                <div className='row g-4'>
                    {data.map(item => (
                        <div key={item.id || item._id || item.name} className='col-sm-6 col-lg-4'>
                            <div className='data-card h-100 p-3 shadow-sm'>
                                <h6 className='mb-1'>{item.name || 'Untitled'}</h6>
                                <p className='small text-muted mb-2'>ID: {item.id || item._id || '—'}</p>
                                <pre className='small bg-light rounded p-2 mb-2 overflow-auto mb-0'>
                                {JSON.stringify(item, null, 2)}
                                </pre>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {userInfo && (
                <div className='mt-4'>
                    <h5 className='mb-2'>Protected API Result</h5>
                    <div className='data-card p-3 shadow-sm'>
                        <pre className='small mb-0 bg-light p-2 rounded overflow-auto'>{JSON.stringify(userInfo, null, 2)}</pre>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Dashboard
