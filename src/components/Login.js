import React, { useState } from 'react';
import '../style/App.css';
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
    }

    return (
        <div style={{marginTop: 100}}>
            <div className='container'>
                <h1 className="text-center mb-4 text-bold">Bingo Laundry</h1>
                <h5 className="text-center mb-4 text-bold">Selamat Datang !!!</h5>
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
                                    <label className='text-left label-text mb-2'>Username</label>
                                    <input placeholder='Username' className='form-control' value={username} onChange={onChangeUsername}/>
                                </div>
                                <div className='form-group'>
                                    <label className='text-left label-text mb-2'>Password</label>
                                    <input type='password' placeholder='Password' className='form-control' value={password} onChange={onChangePassword}/>
                                </div>
    
                                <button className='btn-login-custom mt-3' onClick={submitLogin}>Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    
}

export default Login;
