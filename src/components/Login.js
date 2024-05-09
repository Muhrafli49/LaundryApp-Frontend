import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
        setError('');
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
        setError('');
    }

    const submitLogin = () => {
        const data = {
            username: username,
            password: password
        }
        axios.post('http://localhost:5000/login', data)
        .then(response => {
            if(response.data.token) {
                localStorage.setItem('token', response.data.token);
                navigate('/dashboard'); 
            }
        })
        .catch(error => {
            setError(error.response.data.message);
        })
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-r from-amber-500" style={{ backgroundColor: '#ED9455' }}>
            <div className="max-w-xl w-full mx-auto mt-5">
                <div className="rounded-xl shadow-md px-10 py-8 mb-4" style={{ backgroundColor: '#FFFBDA' }}>
                    <h1 className="text-3xl font-bold text-center mb-4">Bingo Laundry</h1>
                    <h4 className="text-lg text-center mb-4 text-gray-600">Selamat Datang !!!</h4>
                    {error && (
                            <div className="text-red-600 text-sm mb-3">{error}</div>
                    )}
                    <form onSubmit={(e) => { e.preventDefault(); submitLogin(); }}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Username
                            </label>
                            <input id="username" name="username" type="text" 
                                className="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700"
                                placeholder="Username" value={username} onChange={onChangeUsername}/>
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input id="password" name="password" type="password" 
                                className="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 mb-3"
                                placeholder="Password" value={password} onChange={onChangePassword}/>
                        </div>
                        <div className="flex items-center justify-center">
                            <button type="submit" className="text-white font-bold text-lg py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition duration-300 ease-in-out transform hover:bg-customBlueHover hover:scale-105" style={{ backgroundColor: '#ED9455', height: '3rem' }}>
                                <span className="relative top-0.5">Login</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
