import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState({ message: '', type: '' });

    const onChangeEmail = (e) => {
        const value = e.target.value;
        setEmail(value);
    }
    const onChangeUsername = (e) => 
    {
        const value = e.target.value;
        setUsername(value);
    }
    const onChangePassword = (e) => 
    {
        const value = e.target.value;
        setPassword(value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/registrasi', {
                email,
                username,
                password
            });

            if (response.data) {
                setEmail('');
                setUsername('');
                setPassword('');
                setAlert({ message: response.data.message, type: 'success' });
                setTimeout(() => {
                    setAlert('')
                }, 3000)
            }

            console.log(response.data);
        } catch (error) {        
            if (error.response && error.response.data && error.response.data.message) {
                setAlert({ message: error.response.data.message, type: 'danger' });
            } else {
                setAlert({ message: 'Pastikan Semua Kolom Terisi', type: 'danger' });
            }
            console.error(error);
        }        
    };

    return (
        <div style={{ marginTop: 100 }}>
            <div className='container'>
                <h2 className="text-center mb-4">Register Form Admin</h2>
                <div className='row justify-content-center'>
                    <div className='col-md-6'>
                        <div className='card'>
                            <div className='card-body'>
                                {
                                    alert.message && (
                                        <div className={`alert alert-${alert.type} text-center fw-bold`}>
                                            <p>{alert.message}</p>
                                        </div>
                                    )
                                }
                                <form onSubmit={handleSubmit}>
                                    <div className='form-group'>
                                        <label>Email</label>
                                        <input
                                            type='email'
                                            placeholder='Email'
                                            className='form-control'
                                            value={email}
                                            onChange={onChangeEmail}
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <label>Username</label>
                                        <input
                                            placeholder='Username'
                                            className='form-control'
                                            value={username}
                                            onChange={onChangeUsername}
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <label>Password</label>
                                        <input
                                            type='password'
                                            placeholder='Password'
                                            className='form-control'
                                            value={password}
                                            onChange={onChangePassword}
                                        />
                                    </div>
                                    <div className='d-flex justify-content-end'>
                                        <button type="submit" className='btn btn-primary me-2'>Register</button>
                                        <Link to="/" className='btn btn-danger'>Cancel</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
