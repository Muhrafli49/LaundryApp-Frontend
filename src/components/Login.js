import React, { useState } from 'react';
import '../style/App.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [valid, SetValid] = useState('');

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
        setError('');
        SetValid('');
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
        setError('');
        SetValid('');
    }

    const submitLogin = () => {
        const data = {
            username: username,
            password: password
        }
        axios.post('http://localhost:5000/login', data)
        .then(response => {
            console.log(response)
            if(response.data.token) {
                localStorage.setItem('token', response.data.token);
                navigate('/dashboard'); 
            }
        })
        .catch(error => {
            console.log(error.response.data.message)
            setError(error.response.data.message);
        })
        // .catch(e => {
        //     console.log(e.response.data.message)
        //     setError(e.response.data.message);
        // })
        // .catch(valid => {
        //     console.log(valid)
        //     SetValid(valid.response.data.message);
        // })
    }

    return (
        <div style={{marginTop: 100}}>
            <div className='container'>
                <h2 className="text-center mb-4">Bingo Laundry Admin Panel</h2>
                <p className="text-center mb-4">Selamat Datang</p>
                <div className='row justify-content-center'>
                    <div className='col-md-6'>
                        <div className='card p-4'>
                                {
                                    error && (
                                        <div className="alert alert-danger">
                                            {error}
                                            {valid}
                                        </div>
                                    )
                                }
                            <div className='card-body d-flex flex-column justify-content-between'>
                                <div className='form-group'>
                                    <label className='text-left label-text'>Username</label>
                                    <input placeholder='Username' className='form-control' value={username} onChange={onChangeUsername}/>
                                </div>
                                <div className='form-group'>
                                    <label className='text-left label-text'>Password</label>
                                    <input type='password' placeholder='Password' className='form-control' value={password} onChange={onChangePassword}/>
                                </div>

                                <div className='d-flex justify-content-between'>
                                    <Link className="btn btn-link mt-4 me-2 text-decoration-none text-dark" to="/register">Belum mendaftar admin?</Link>
                                    <button className='btn btn-primary mt-3' onClick={submitLogin}>Login</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
